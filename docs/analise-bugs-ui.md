# 🐛 Análise de Bugs - Sauce Demo (UI)

## Bug #1: performance_glitch_user - Lentidão excessiva
| Campo | Detalhe |
|-------|---------|
| **Severidade** | Média |
| **Prioridade** | Média |
| **Usuário afetado** | `performance_glitch_user` |
| **Descrição** | O login deste usuário leva significativamente mais tempo que os demais (3-10 segundos extras). |
| **Impacto** | Experiência do usuário degradada; pode causar abandono da sessão. |
| **Sugestão** | Investigar queries lentas ou timeouts artificiais associados ao perfil. |

## Bug #2: API aceita preço negativo (Restful Booker)
| Campo | Detalhe |
|-------|---------|
| **Severidade** | Alta |
| **Prioridade** | Alta |
| **Descrição** | POST /booking com `totalprice: -100` retorna 200 e cria a reserva. |
| **Impacto** | Financeiro: reservas com valor negativo distorcem relatórios. |
| **Sugestão** | Adicionar validação `totalprice >= 0` no backend. |

## Bug #3: API aceita datas inconsistentes
| Campo | Detalhe |
|-------|---------|
| **Severidade** | Média |
| **Prioridade** | Média |
| **Descrição** | POST /booking com checkout anterior ao checkin retorna 200. |
| **Impacto** | Integridade dos dados; pode gerar estadias impossíveis. |
| **Sugestão** | Validar `checkout > checkin` no servidor. |