# PayFlow

> SaaS fictício de gerenciamento de pagamentos, multi-tenant, construído para
> demonstrar arquitetura de software, boas práticas de engenharia e um fluxo
> completo de produto — do banco de dados à interface.

**⚠️ Projeto de portfólio.** Não processa pagamentos reais; o "gateway" é simulado.

## Índice

- [Sobre o projeto](#sobre-o-projeto)
- [Stack](#stack)
- [Arquitetura](#arquitetura)
- [Como rodar localmente](#como-rodar-localmente)
- [Roadmap](#roadmap)

## Sobre o projeto

O PayFlow simula um SaaS real onde empresas (tenants) podem:

- Cadastrar clientes finais
- Gerar cobranças (PIX, cartão de crédito, boleto — simulados)
- Acompanhar o status das transações em tempo real
- Visualizar métricas financeiras em um dashboard
- Configurar webhooks para notificações de eventos

## Stack

**Backend:** Node.js · TypeScript · NestJS · Prisma · SQLite
**Frontend:** React · TypeScript · Vite · TailwindCSS · React Query
**Infra:** GitHub Actions (CI)

> Banco de dados em SQLite (arquivo local) para manter o projeto simples de rodar
> em qualquer máquina, sem depender de Docker ou serviços externos instalados.

## Arquitetura

Veja o detalhamento completo em [`docs/architecture.md`](./docs/architecture.md).

```
payflow/
├── apps/
│   ├── api/     → Backend NestJS
│   └── web/     → Frontend React
├── packages/
│   └── shared/  → Tipos compartilhados
└── docs/        → Documentação e diagramas
```

## Como rodar localmente

Pré-requisitos: apenas Node.js 20+ instalado. Nenhum banco ou serviço externo é necessário.

```bash
# 1. Clonar o repositório
git clone https://github.com/seu-usuario/payflow.git
cd payflow

# 2. Instalar dependências
npm install

# 3. Copiar variáveis de ambiente (dentro de apps/api)
# cria o arquivo apps/api/.env com o conteúdo de apps/api/.env.example

# 4. Rodar migrations (cria o arquivo dev.db do SQLite)
npm run prisma:migrate --workspace=apps/api

# 5. Rodar backend e frontend (em dois terminais separados)
npm run dev:api
npm run dev:web
```

API disponível em `http://localhost:3333` (documentação em `/docs`).
Frontend disponível em `http://localhost:5173`.

## Roadmap

- [ ] Autenticação (JWT + refresh token)
- [ ] CRUD de tenants e usuários
- [ ] CRUD de clientes
- [ ] Criação e processamento simulado de pagamentos
- [ ] Fila assíncrona com BullMQ
- [ ] Dashboard com métricas
- [ ] Webhooks
- [ ] Testes automatizados (unitários + e2e)
- [ ] Deploy (Railway/Render/Vercel) + link ao vivo no README

---

Desenvolvido por **[seu nome]** como projeto de portfólio.
