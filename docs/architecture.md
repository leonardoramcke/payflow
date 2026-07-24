# Arquitetura — PayFlow

## Visão geral

PayFlow é um SaaS fictício multi-tenant de gerenciamento de pagamentos, organizado
como monorepo com backend (NestJS) e frontend (React) desacoplados, comunicando-se via API REST.

## Diagrama de domínio (alto nível)

```
Tenant (empresa cliente do SaaS)
 ├── Users (equipe da empresa: OWNER, ADMIN, MEMBER)
 ├── Customers (clientes finais que recebem cobranças)
 │    └── Payments (cobranças)
 │         └── Transactions (histórico de status)
 └── Webhooks (notificações de eventos)
```

## Fluxo de um pagamento (simulado)

1. Uma cobrança é criada com status `PENDING`.
2. Um job é enfileirado (BullMQ) para simular o processamento assíncrono do gateway.
3. O worker atualiza o status para `PROCESSING` e, após um delay simulado,
   decide (de forma determinística ou aleatória controlada) entre `PAID` ou `FAILED`.
4. Cada mudança de status gera um registro em `Transaction` (auditoria).
5. Um evento de webhook é disparado para notificar o "cliente" da API.

## Decisões técnicas

- **Multi-tenancy por coluna (tenantId)**: mais simples de demonstrar e testar
  do que schema-per-tenant, mantendo o projeto didático mas realista.
- **BullMQ + Redis**: para simular processamento assíncrono real de um gateway de pagamento,
  em vez de apenas mudar o status de forma síncrona.
- **Prisma**: produtividade e tipagem forte ponta a ponta.
- **Swagger**: documentação de API viva, acessível em `/docs`.

## Próximos documentos a criar

- `docs/api-reference.md` — referência dos endpoints (gerado a partir do Swagger)
- `docs/diagrams/` — diagramas exportados (ex: dbdiagram.io, Excalidraw)
