import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const menuItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Clientes', path: '/customers' },
  { label: 'Pagamentos', path: '/payments' },
];

export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const userJson = localStorage.getItem('payflow_user');
  const user = userJson ? JSON.parse(userJson) : null;

  function handleLogout() {
    localStorage.removeItem('payflow_token');
    localStorage.removeItem('payflow_user');
    navigate('/');
  }

  return (
    <div style={styles.wrapper}>
      <aside style={styles.sidebar}>
        <div>
          <h2 style={styles.logo}>PayFlow</h2>

          <nav style={styles.nav}>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  style={{
                    ...styles.navItem,
                    ...(isActive ? styles.navItemActive : {}),
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div style={styles.userBox}>
          <p style={styles.userName}>{user?.name ?? 'Usuário'}</p>
          <p style={styles.userEmail}>{user?.email ?? ''}</p>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Sair
          </button>
        </div>
      </aside>

      <main style={styles.content}>{children}</main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    fontFamily: 'sans-serif',
  },
  sidebar: {
    width: '240px',
    backgroundColor: '#1e293b',
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  logo: {
    color: '#fff',
    marginBottom: '32px',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  navItem: {
    textAlign: 'left',
    padding: '10px 12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#94a3b8',
    fontSize: '14px',
    cursor: 'pointer',
  },
  navItemActive: {
    backgroundColor: '#22c55e',
    color: '#0f172a',
    fontWeight: 'bold',
  },
  userBox: {
    borderTop: '1px solid #334155',
    paddingTop: '16px',
  },
  userName: {
    color: '#fff',
    fontSize: '14px',
    margin: 0,
    fontWeight: 'bold',
  },
  userEmail: {
    color: '#94a3b8',
    fontSize: '12px',
    margin: '2px 0 12px 0',
  },
  logoutButton: {
    width: '100%',
    padding: '8px',
    borderRadius: '6px',
    border: '1px solid #334155',
    backgroundColor: 'transparent',
    color: '#f87171',
    fontSize: '13px',
    cursor: 'pointer',
  },
  content: {
    flex: 1,
    padding: '32px',
  },
};