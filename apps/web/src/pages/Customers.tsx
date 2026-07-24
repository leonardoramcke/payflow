import { FormEvent, useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { customersService, Customer } from '../services/customersService';

export function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [document, setDocument] = useState('');
  const [saving, setSaving] = useState(false);

  async function loadCustomers() {
    setLoading(true);
    const data = await customersService.list();
    setCustomers(data);
    setLoading(false);
  }

  useEffect(() => {
    loadCustomers();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      await customersService.create({ name, email, document: document || undefined });
      setName('');
      setEmail('');
      setDocument('');
      setShowForm(false);
      await loadCustomers();
    } catch (err) {
      alert('Erro ao criar cliente. Verifique os dados.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Layout>
      <div style={styles.header}>
        <h1 style={styles.title}>Clientes</h1>
        <button style={styles.newButton} onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : '+ Novo cliente'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
          <input
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            placeholder="Documento (opcional)"
            value={document}
            onChange={(e) => setDocument(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.saveButton} disabled={saving}>
            {saving ? 'Salvando...' : 'Salvar cliente'}
          </button>
        </form>
      )}

      {loading ? (
        <p style={{ color: '#94a3b8' }}>Carregando...</p>
      ) : customers.length === 0 ? (
        <p style={{ color: '#94a3b8' }}>Nenhum cliente cadastrado ainda.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Nome</th>
              <th style={styles.th}>E-mail</th>
              <th style={styles.th}>Documento</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td style={styles.td}>{customer.name}</td>
                <td style={styles.td}>{customer.email}</td>
                <td style={styles.td}>{customer.document ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  title: { color: '#fff', margin: 0 },
  newButton: {
    padding: '10px 16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#22c55e',
    color: '#0f172a',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  form: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
    backgroundColor: '#1e293b',
    padding: '16px',
    borderRadius: '8px',
    flexWrap: 'wrap',
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #334155',
    backgroundColor: '#0f172a',
    color: '#fff',
    flex: 1,
    minWidth: '180px',
  },
  saveButton: {
    padding: '10px 16px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#22c55e',
    color: '#0f172a',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#1e293b',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  th: {
    textAlign: 'left',
    padding: '12px 16px',
    color: '#94a3b8',
    borderBottom: '1px solid #334155',
    fontSize: '13px',
  },
  td: {
    padding: '12px 16px',
    color: '#fff',
    borderBottom: '1px solid #334155',
    fontSize: '14px',
  },
};