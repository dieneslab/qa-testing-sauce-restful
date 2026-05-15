# Análise de bugs — Sauce Demo e API

## Bug 1: Lentidão no `performance_glitch_user`

| Campo | Detalhe |
|-------|---------|
| Severidade | Média |
| Usuário | `performance_glitch_user` |
| Descrição | Login e ações demoram mais que com `standard_user`. |
| Automação | `login.spec.ts` → `performance_glitch_user` (limite 15s) |
| Impacto | UX degradada; risco de abandono. |

## Bug 2: API aceita preço negativo

| Campo | Detalhe |
|-------|---------|
| Severidade | Alta |
| Descrição | `POST /booking` com `totalprice: -100` pode retornar 200. |
| Automação | `fields-validation.spec.ts` → `POST /booking com preço negativo` |
| Impacto | Dados financeiros inconsistentes. |
| Sugestão | Validar `totalprice >= 0` no backend. |

## Bug 3: API aceita datas inconsistentes

| Campo | Detalhe |
|-------|---------|
| Severidade | Média |
| Descrição | `checkout` anterior a `checkin` não é rejeitado de forma confiável. |
| Automação | `fields-validation.spec.ts` → `POST /booking com datas invertidas` |
| Impacto | Reservas inválidas no sistema. |
| Sugestão | Validar `checkout > checkin`. |

## Bug 4: Headers de segurança ausentes (API)

| Campo | Detalhe |
|-------|---------|
| Severidade | Média |
| Descrição | CSP, HSTS, `X-Frame-Options`, etc. frequentemente ausentes. |
| Automação | `security.spec.ts` → `headers de segurança` |
| Referência | [`documentacao-api.md`](documentacao-api.md) §10 |
