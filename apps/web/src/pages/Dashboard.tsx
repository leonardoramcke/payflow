import { Layout } from '../components/Layout';

export function Dashboard() {
  const userJson = localStorage.getItem('payflow_user');
  const user = userJson ? JSON.parse(userJson) : null;

  return (
    <Layout>
      <h1 style={{ color: '#fff' }}>Dashboard</h1>
      <p style={{ color: '#94a3b8' }}>Bem-vindo, {user?.name ?? 'usuário'}!</p>
    </Layout>
  );
}