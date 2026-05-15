# Casos de teste — Sauce Demo (UI)

Casos manuais/documentados e vínculo com os specs em `tests/ui/`.

## Legenda

| Coluna | Significado |
|--------|-------------|
| **Automação** | Nome do teste no Playwright (`describe` > `test`) |
| **Arquivo** | Spec correspondente |

---

## Login — `tests/ui/login.spec.ts`

| ID | Descrição | Passos resumidos | Resultado esperado | Automação | Arquivo |
|----|-----------|------------------|--------------------|-----------|---------|
| CT-UI-001 | Login com usuário padrão | `standard_user` / `secret_sauce` → Login | Redireciona para inventário; título "Products" | `standard_user` | login.spec.ts |
| CT-UI-002 | Usuário bloqueado | `locked_out_user` / `secret_sauce` → Login | Mensagem de bloqueio (locked out) | `locked_out_user` | login.spec.ts |
| CT-UI-003 | Usuário com lentidão | `performance_glitch_user` → Login | Login conclui em tempo aceitável (< 15s) | `performance_glitch_user` | login.spec.ts |
| CT-UI-004 | Campos vazios | Login sem preencher campos | "Username is required" | `campos vazios` | login.spec.ts |
| CT-UI-005 | Credenciais inválidas | Usuário/senha inexistentes | Mensagem de credenciais inválidas | `credenciais inválidas` | login.spec.ts |
| CT-UI-006 | Logout | Login → menu → Logout | Volta à tela de login | `logout` | login.spec.ts |

---

## Produtos — `tests/ui/products-filters.spec.ts`

| ID | Descrição | Resultado esperado | Automação | Arquivo |
|----|-----------|--------------------|-----------|---------|
| CT-UI-007 | Ordenação A-Z | Nomes em ordem alfabética crescente | `ordenar A-Z` | products-filters.spec.ts |
| CT-UI-008 | Ordenação Z-A | Nomes em ordem decrescente | `ordenar Z-A` | products-filters.spec.ts |
| CT-UI-009 | Preço crescente | Preços do menor para o maior | `ordenar preço crescente` | products-filters.spec.ts |
| CT-UI-010 | Preço decrescente | Preços do maior para o menor | `ordenar preço decrescente` | products-filters.spec.ts |
| CT-UI-011 | Quantidade na listagem | 6 produtos visíveis | `listagem com 6 produtos` | products-filters.spec.ts |
| CT-UI-012 | Página de detalhe | URL de item; nome, preço e descrição visíveis | `detalhe do produto` | products-filters.spec.ts |

---

## Carrinho — `tests/ui/cart-management.spec.ts`

| ID | Descrição | Resultado esperado | Automação | Arquivo |
|----|-----------|--------------------|-----------|---------|
| CT-UI-013 | Adicionar ao carrinho | Badge com quantidade 1 | `adicionar item atualiza badge` | cart-management.spec.ts |
| CT-UI-014 | Remover na listagem | Badge some (quantidade 0) | `remover pela listagem` | cart-management.spec.ts |
| CT-UI-015 | Remover no carrinho | Item removido; demais permanecem | `remover na página do carrinho` | cart-management.spec.ts |
| CT-UI-016 | Continue Shopping | Retorna ao inventário | `continue shopping` | cart-management.spec.ts |
| CT-UI-017 | Carrinho vazio | Página do carrinho sem itens | `carrinho vazio` | cart-management.spec.ts |

---

## Checkout — `tests/ui/checkout-flow.spec.ts`

| ID | Descrição | Resultado esperado | Automação | Arquivo |
|----|-----------|--------------------|-----------|---------|
| CT-UI-018 | Fluxo completo | 2 itens → checkout → dados → "Thank you for your order!" | `fluxo completo` | checkout-flow.spec.ts |
| CT-UI-019 | Checkout sem first name | "First Name is required" | `sem first name` | checkout-flow.spec.ts |
| CT-UI-020 | Checkout sem last name | "Last Name is required" | `sem last name` | checkout-flow.spec.ts |
| CT-UI-021 | Cancelar no overview | Retorna ao inventário | `cancelar no overview` | checkout-flow.spec.ts |

---

## Navegação — `tests/ui/navigation.spec.ts`

| ID | Descrição | Resultado esperado | Automação | Arquivo |
|----|-----------|--------------------|-----------|---------|
| CT-UI-022 | Menu lateral | All Items mantém inventário; Reset limpa badge | `menu lateral - All Items e Reset App State` | navigation.spec.ts |
| CT-UI-023 | Logo | Do carrinho volta ao inventário | `logo volta para o inventário` | navigation.spec.ts |
| CT-UI-024 | Ícone do carrinho | Abre página do carrinho | `ícone do carrinho` | navigation.spec.ts |
| CT-UI-025 | Fechar menu | Menu lateral fecha no X | `menu fecha no X` | navigation.spec.ts |
| CT-UI-026 | Acesso após logout | `/inventory.html` sem sessão não mantém inventário | `logout bloqueia acesso direto` | navigation.spec.ts |

---

## Responsividade (nível 2) — `tests/ui/responsiveness.spec.ts`

| ID | Viewport | Automação |
|----|----------|-----------|
| CT-UI-027 | 1920×1080 | `desktop-fhd (1920x1080)` |
| CT-UI-028 | 1366×768 | `desktop-hd (1366x768)` |
| CT-UI-029 | 768×1024 | `tablet (768x1024)` |
| CT-UI-030 | 390×844 | `mobile (390x844)` |
| CT-UI-031 | 375×667 | `mobile-se (375x667)` |
| CT-UI-032 | Menu no mobile | `menu hamburguer no mobile` |

Screenshots: pasta `evidencias/` (nomes `responsividade-{viewport}.png`).

---

## Acessibilidade (nível 2) — `tests/ui/accessibility.spec.ts`

| ID | Página | Automação |
|----|--------|-----------|
| CT-UI-033 | Login | `página de login` |
| CT-UI-034 | Inventário | `inventário` |
| CT-UI-035 | Carrinho | `carrinho` |
| CT-UI-036 | Foco e menu | `foco e menu lateral` |

Os testes com axe-core registram violações no relatório do Playwright; não falham automaticamente por violação (apenas garantem que a análise executou).

---

## Usuários sem automação dedicada

Estão em `tests/utils/test-data.ts`, mas **não** possuem spec próprio hoje:

| Usuário | Uso no Sauce Demo (manual) |
|---------|----------------------------|
| `problem_user` | Imagens incorretas nos produtos |
| `error_user` | Erros em fluxos (checkout, menu, etc.) |
| `visual_user` | Problemas visuais de layout |

Para cobrir esses perfis, seria necessário novos casos em `login.spec.ts` ou specs separados.
