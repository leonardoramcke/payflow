export function Dashboard() {
  const userJson = localStorage.getItem('payflow_user');
  const user = userJson ? JSON.parse(userJson) : null;

  function handleLogout() {
    localStorage.removeItem('payflow_token');
    localStorage.removeItem('payflow_user');
    window.location.href = '/';
  }

  return (
    <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1>Dashboard</h1>
      <p>Bem-vindo, {user?.name ?? 'usuário'}!</p>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}