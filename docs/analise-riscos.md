# Análise de riscos

## Riscos identificados

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| API sem rate limiting adequado | Alta | Médio | Throttling no servidor |
| Injeção de SQL aceita pela API | Média | Crítico | Sanitizar inputs; prepared statements |
| XSS nos campos de nome | Média | Alto | Escapar HTML nas respostas |
| Falta de HTTPS enforcement | Baixa | Crítico | HSTS em toda a comunicação |
| Carrinho compartilhado entre usuários | Baixa | Baixo | Isolamento por sessão/token |
| Perda de dados mockados | Baixa | Médio | Backup ou seed automático |

## Recomendações para produção

1. **Autenticação**: avaliar JWT com expiração em vez de cookie sem TTL explícito.
2. **Validação**: JSON Schema (ou equivalente) em todas as rotas.
3. **Monitoramento**: logging estruturado e alertas para 5xx.
4. **CI/CD**: integrar `npm run test:all` em pipeline (GitHub Actions, Jenkins, etc.).

## Relação com os testes automatizados

| Risco | Cobertura atual |
|-------|-----------------|
| Rate limiting | `tests/api/security.spec.ts` → `rate limiting` (20 GETs; não exige 429) |
| SQL injection | `security.spec.ts` → `SQL injection no firstname` |
| XSS | `security.spec.ts` → `XSS no firstname` |
| Headers de segurança | `security.spec.ts` → `headers de segurança` |
| Carrinho entre usuários | Não automatizado (UI demo; sessão por navegador) |
