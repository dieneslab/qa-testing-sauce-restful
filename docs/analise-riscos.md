# ⚠️ Análise de Riscos

## Riscos Identificados

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| API sem rate limiting adequado | Alta | Médio | Implementar throttling no servidor |
| Injeção de SQL aceita pela API | Média | Crítico | Sanitizar inputs, usar prepared statements |
| XSS refletido nos campos de nome | Média | Alto | Escapar HTML nas respostas da API |
| Falta de HTTPS enforcement | Baixa | Crítico | Forçar HSTS em toda a comunicação |
| Carrinho compartilhado entre usuários | Baixa | Baixo | Garantir isolamento por sessão/token |
| Dados mockados se perderem | Baixa | Médio | Backup periódico ou seed automático |

## Recomendações para Produção
1. **Autenticação**: Migrar de Basic Auth + Cookie para JWT com expiração
2. **Validação**: Implementar schema validation (JSON Schema) em todas as rotas
3. **Monitoramento**: Adicionar logging estruturado e alertas para erros 5xx
4. **Testes Automatizados**: Integrar com CI/CD (GitHub Actions, Jenkins)# ⚠️ Análise de Riscos

## Riscos Identificados

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| API sem rate limiting adequado | Alta | Médio | Implementar throttling no servidor |
| Injeção de SQL aceita pela API | Média | Crítico | Sanitizar inputs, usar prepared statements |
| XSS refletido nos campos de nome | Média | Alto | Escapar HTML nas respostas da API |
| Falta de HTTPS enforcement | Baixa | Crítico | Forçar HSTS em toda a comunicação |
| Carrinho compartilhado entre usuários | Baixa | Baixo | Garantir isolamento por sessão/token |
| Dados mockados se perderem | Baixa | Médio | Backup periódico ou seed automático |

## Recomendações para Produção
1. **Autenticação**: Migrar de Basic Auth + Cookie para JWT com expiração
2. **Validação**: Implementar schema validation (JSON Schema) em todas as rotas
3. **Monitoramento**: Adicionar logging estruturado e alertas para erros 5xx
4. **Testes Automatizados**: Integrar com CI/CD (GitHub Actions, Jenkins)