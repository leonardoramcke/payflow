import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await authService.login({ email, password });
      localStorage.setItem('payflow_token', result.accessToken);
      localStorage.setItem('payflow_user', JSON.stringify(result.user));
      navigate('/dashboard');
    } catch (err) {
      setError('E-mail ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.title}>PayFlow</h1>
        <p style={styles.subtitle}>Entre na sua conta</p>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    fontFamily: 'sans-serif',
  },
  form: {
    backgroundColor: '#1e293b',
    padding: '40px',
    borderRadius: '12px',
    width: '340px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  title: {
    color: '#fff',
    margin: 0,
    fontSize: '28px',
  },
  subtitle: {
    color: '#94a3b8',
    margin: '0 0 12px 0',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #334155',
    backgroundColor: '#0f172a',
    color: '#fff',
    fontSize: '14px',
  },
  button: {
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#22c55e',
    color: '#0f172a',
    fontWeight: 'bold',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '8px',
  },
  error: {
    color: '#f87171',
    fontSize: '13px',
    margin: 0,
  },
};