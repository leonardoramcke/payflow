# Módulo: Payments (o coração do projeto)

O que vamos construir aqui:
- payments.module.ts
- payments.controller.ts
- payments.service.ts (criação de cobrança, consulta, listagem)
- simulação de processamento assíncrono usando setTimeout em memória
  (sem necessidade de Redis/fila externa — mais simples de rodar localmente)
- dto/create-payment.dto.ts
- state machine: PENDING -> PROCESSING -> PAID | FAILED

Status: ainda não iniciado.
