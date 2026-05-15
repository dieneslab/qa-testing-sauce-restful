# Plano de testes — Sauce Demo (UI)

## 1. Escopo

Testar a plataforma [Sauce Demo](https://www.saucedemo.com/), cobrindo autenticação, catálogo, carrinho, checkout e navegação.

### 1.1 No escopo

- Login/logout e mensagens de erro de autenticação
- Ordenação de produtos (nome e preço)
- Carrinho (adicionar, remover, navegação)
- Checkout (fluxo feliz e validações de campos)
- Navegação (menu, logo, carrinho)
- Responsividade (vários viewports)
- Acessibilidade (axe-core)

### 1.2 Fora do escopo

- Pagamento real (simulado no demo)
- Múltiplas abas simultâneas
- Internacionalização
- Automação dedicada para `problem_user`, `error_user` e `visual_user` (ver seção 4)

## 2. Estratégia

### 2.1 Níveis

| Nível | Conteúdo | Specs |
|-------|----------|-------|
| 1 | Login, produtos, carrinho, checkout, navegação | `login`, `products-filters`, `cart-management`, `checkout-flow`, `navigation` |
| 2 | Responsividade, acessibilidade | `responsiveness`, `accessibility` |

### 2.2 Tipos de teste

- **Funcional**: fluxos principais (Playwright)
- **Responsividade**: viewports + screenshots em `evidencias/`
- **Acessibilidade**: análise axe-core nas páginas login, inventário e carrinho

### 2.3 Ambiente

| Item | Valor |
|------|-------|
| URL | https://www.saucedemo.com/ |
| Navegador (padrão nos scripts npm) | Chromium |
| Projetos no `playwright.config.ts` | `chromium` (desktop), `mobile` (iPhone 12) |
| Dados | Usuários pré-cadastrados do demo |

## 3. Cobertura de usuários

| Usuário | Automação | Onde |
|---------|-----------|------|
| `standard_user` | Sim | Fluxo principal em todos os specs de UI |
| `locked_out_user` | Sim | `login.spec.ts` → `locked_out_user` |
| `performance_glitch_user` | Sim | `login.spec.ts` → `performance_glitch_user` |
| `problem_user` | Não | Apenas `test-data.ts`; teste manual/exploratório |
| `error_user` | Não | Apenas `test-data.ts` |
| `visual_user` | Não | Apenas `test-data.ts` |

## 4. Rastreabilidade

- Casos detalhados e IDs: [`casos-teste-ui.md`](casos-teste-ui.md)
- Bugs conhecidos: [`analise-bugs-ui.md`](analise-bugs-ui.md)
- Melhorias sugeridas: [`melhorias-ui.md`](melhorias-ui.md)

## 5. Status do plano

| Fase | Status |
|------|--------|
| Planejamento e setup | Concluído |
| Nível 1 (funcional) | Concluído |
| Nível 2 (responsividade e acessibilidade) | Concluído |
| Documentação alinhada aos specs | Concluído |
