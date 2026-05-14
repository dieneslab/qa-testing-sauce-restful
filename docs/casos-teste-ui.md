# 📝 Casos de Teste - Sauce Demo (UI)

## CT-UI-001: Login com Sucesso
| Campo | Valor |
|-------|-------|
| **ID** | CT-UI-001 |
| **Descrição** | Login com usuário padrão |
| **Pré-condição** | Estar na página de login |
| **Passos** | 1. Inserir `standard_user` no campo username<br>2. Inserir `secret_sauce` no campo password<br>3. Clicar em Login |
| **Resultado Esperado** | Redirecionamento para `/inventory.html` com lista de produtos |
| **Status** | ✅ Aprovado |

## CT-UI-002: Login com Usuário Bloqueado
| Campo | Valor |
|-------|-------|
| **ID** | CT-UI-002 |
| **Descrição** | Tentar login com conta bloqueada |
| **Passos** | 1. Inserir `locked_out_user` / `secret_sauce`<br>2. Clicar em Login |
| **Resultado Esperado** | Exibir mensagem "Sorry, this user has been locked out." |
| **Status** | ✅ Aprovado |

## CT-UI-003: Ordenação A-Z
| Campo | Valor |
|-------|-------|
| **ID** | CT-UI-003 |
| **Pré-condição** | Logado como standard_user |
| **Passos** | 1. Selecionar "Name (A to Z)" no filtro<br>2. Verificar ordem dos produtos |
| **Resultado Esperado** | Produtos em ordem alfabética crescente |
| **Status** | ✅ Aprovado |

## CT-UI-004: Fluxo de Compra Completo
| Campo | Valor |
|-------|-------|
| **ID** | CT-UI-004 |
| **Pré-condição** | Logado como standard_user |
| **Passos** | 1. Adicionar 2 produtos<br>2. Ir ao carrinho<br>3. Checkout<br>4. Preencher dados<br>5. Finalizar |
| **Resultado Esperado** | Mensagem "Thank you for your order!" |
| **Status** | ✅ Aprovado |

## CT-UI-005: Remoção de Item do Carrinho
| Campo | Valor |
|-------|-------|
| **ID** | CT-UI-005 |
| **Passos** | 1. Adicionar item<br>2. Remover via botão Remove<br>3. Verificar badge |
| **Resultado Esperado** | Badge do carrinho desaparece |
| **Status** | ✅ Aprovado |

## CT-UI-006: Checkout sem Dados
| Campo | Valor |
|-------|-------|
| **ID** | CT-UI-006 |
| **Passos** | 1. Ir ao checkout<br>2. Clicar Continue sem preencher<br>3. Verificar erro |
| **Resultado Esperado** | "Error: First Name is required" |
| **Status** | ✅ Aprovado |

## CT-UI-007: Logout
| Campo | Valor |
|-------|-------|
| **ID** | CT-UI-007 |
| **Passos** | 1. Abrir menu lateral<br>2. Clicar Logout<br>3. Tentar acessar /inventory.html |
| **Resultado Esperado** | Redirecionado à tela de login |
| **Status** | ✅ Aprovado |