# QA Testing — Sauce Demo + Restful Booker

Projeto de testes automatizados para demonstração prática de QA: **UI** com [Playwright](https://playwright.dev/) no [Sauce Demo](https://www.saucedemo.com/) e **API** na [Restful Booker](https://restful-booker.herokuapp.com/apidoc/index.html).

---

## Sumário

- [Visão geral](#visão-geral)
- [Stack](#stack)
- [Estrutura do repositório](#estrutura-do-repositório)
- [Cobertura por nível](#cobertura-por-nível)
- [Como executar](#como-executar)
- [Postman](#postman)
- [Premissas](#premissas)
- [Bugs e melhorias](#bugs-e-melhorias)
- [Evidências e relatórios](#evidências-e-relatórios)
- [Documentação](#documentação)

---

## Visão geral

| Área | Alvo | Foco |
|------|------|------|
| UI | Sauce Demo | Login, catálogo, carrinho, checkout, navegação, responsividade, acessibilidade |
| API | Restful Booker | Auth, CRUD de reservas, validação de campos, performance e segurança |

---

## Stack

| Ferramenta | Uso |
|------------|-----|
| **Playwright** (`@playwright/test`) | Automação UI e testes de API |
| **TypeScript** | Linguagem dos specs e helpers |
| **@axe-core/playwright** | Verificações de acessibilidade |
| **Postman** | Collection complementar da API |

Versões aproximadas: Playwright 1.40+, TypeScript 5.3+, Node.js 18+ recomendado.

---

## Estrutura do repositório

```
qa-testing-sauce-restful/
├── tests/
│   ├── ui/                    # Playwright — interface (Sauce Demo)
│   │   ├── login.spec.ts
│   │   ├── products-filters.spec.ts
│   │   ├── checkout-flow.spec.ts
│   │   ├── cart-management.spec.ts
│   │   ├── navigation.spec.ts
│   │   ├── responsiveness.spec.ts   # Nível 2
│   │   └── accessibility.spec.ts    # Nível 2
│   ├── api/                   # Playwright — API (Restful Booker)
│   │   ├── auth.spec.ts
│   │   ├── bookings-crud.spec.ts
│   │   ├── fields-validation.spec.ts
│   │   ├── performance.spec.ts      # Nível 2
│   │   └── security.spec.ts         # Nível 2
│   └── utils/
│       ├── test-data.ts
│       └── helpers.ts
├── docs/                      # Plano, casos, bugs, riscos, API
├── postman/
│   └── restful-booker-collection.json
├── evidencias/                # Screenshots (ex.: responsividade)
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Cobertura por nível

### UI (Sauce Demo)

**Nível 1**

- Login com diferentes perfis de usuário
- Ordenação e filtragem de produtos
- Fluxo completo de compra (checkout)
- Remoção de itens do carrinho
- Navegação entre páginas
- Logout

**Nível 2**

- Responsividade (vários viewports)
- Acessibilidade (axe-core)
- Automação Playwright

### API (Restful Booker)

**Nível 1**

- Autenticação
- CRUD de reservas
- Validação de campos obrigatórios

**Nível 2**

- Performance (carga leve, tempos)
- Segurança (ex.: SQLi, XSS, headers)
- Scripts Playwright + collection Postman

---

## Como executar

### Pré-requisitos

- **Node.js** 18 ou superior  
- **npm** 9 ou superior (ou compatível com o lockfile do projeto)

### Instalação

```bash
git clone <url-do-repositorio>
cd qa-testing-sauce-restful
npm install
npx playwright install
```

> O pacote `@axe-core/playwright` já consta em `package.json`; o `npm install` instala as dependências do projeto.

### Scripts npm

| Comando | Descrição |
|---------|-----------|
| `npm run test:all` | Todos os testes (UI + API), projeto Chromium |
| `npm run test:ui` | Apenas testes em `tests/ui/` |
| `npm run test:api` | Apenas testes em `tests/api/` |
| `npm run test:headed` | Execução com navegador visível |
| `npm run test:debug` | Modo debug do Playwright |
| `npm run report` | Abre o relatório HTML (`playwright show-report`) |
| `npm run codegen` | Gera código a partir do Sauce Demo (grava interações) |

Exemplos:

```bash
npm run test:all
npm run test:ui
npm run report
```

---

## Postman

1. Abra o Postman.  
2. **Import** → arquivo `postman/restful-booker-collection.json`.  
3. Ajuste variáveis de ambiente/collection conforme necessário (ex.: `base_url`, `token`, `booking_id`).  
4. Execute a collection.

---

## Premissas

- Os ambientes **Sauce Demo** e **Restful Booker** são públicos e **voláteis**; dados podem ser resetados.
- A API **não valida tudo** (ex.: `totalprice` negativo pode ser aceito — ver documentação de bugs).
- O Sauce Demo é **demonstração**; comportamentos como imagens trocadas (`problem_user`) são esperados no contexto do demo.
- A API usa autenticação via **cookie** (`token`); o token deve ir como `Cookie: token=<valor>` quando aplicável.
- Testes podem ser **sequenciais** para reduzir conflito em recursos compartilhados (ex.: carrinho).

---

## Bugs e melhorias

**Bugs** (detalhes nos docs):

- API aceita `totalprice` negativo  
- API aceita datas inconsistentes (checkout anterior ao checkin)  
- `performance_glitch_user` com latência elevada  
- Ausência de alguns headers de segurança na API (ex.: CSP, HSTS)

**Onde aprofundar**

- Bugs UI: [`docs/analise-bugs-ui.md`](docs/analise-bugs-ui.md)  
- API: [`docs/documentacao-api.md`](docs/documentacao-api.md)  
- Melhorias UI: [`docs/melhorias-ui.md`](docs/melhorias-ui.md)

---

## Evidências e relatórios

- **Screenshots** de responsividade: pasta `evidencias/` (gerados ao rodar os testes de UI de nível 2, conforme configuração do projeto).  
- **Artefatos de falha** (vídeos, traces): em geral em `test-results/`.  
- **Relatório HTML** do Playwright: `npm run report` após uma execução com relatório gerado.

---

## Documentação

| Arquivo | Conteúdo |
|---------|----------|
| [`docs/plano-testes-ui.md`](docs/plano-testes-ui.md) | Plano de testes UI |
| [`docs/casos-teste-ui.md`](docs/casos-teste-ui.md) | Casos de teste UI + vínculo com cada `*.spec.ts` |
| [`docs/analise-bugs-ui.md`](docs/analise-bugs-ui.md) | Bugs conhecidos (UI e API) |
| [`docs/melhorias-ui.md`](docs/melhorias-ui.md) | Sugestões de melhorias |
| [`docs/analise-riscos.md`](docs/analise-riscos.md) | Análise de riscos |
| [`docs/documentacao-api.md`](docs/documentacao-api.md) | Manual da API + rastreabilidade dos specs |

Os arquivos em `docs/` foram alinhados aos nomes atuais dos testes em `tests/` (sem emojis nos títulos dos specs). Usuários `problem_user`, `error_user` e `visual_user` constam em `test-data.ts`, mas não possuem automação dedicada — ver plano e casos de teste.

---

## Autor e licença

**Autor:** Dienes Stein 

**Licença:** Projeto desenvolvido para fins de **demonstração técnica**; uso restrito pessoal, salvo outra definição explícita pelo autor.
