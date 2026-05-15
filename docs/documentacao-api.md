# Documentação da API — Restful Booker

## 1. Visão geral

API REST para gestão de reservas de hotel: criação, consulta, atualização e exclusão de reservas, além de autenticação e filtros de busca.

| Recurso | Link |
|---------|------|
| Documentação oficial (interativa) | [https://restful-booker.herokuapp.com/apidoc/](https://restful-booker.herokuapp.com/apidoc/) |

## 2. URL base

| Variável | Valor |
|----------|--------|
| **Base URL** | `https://restful-booker.herokuapp.com` |

## 3. Autenticação

A API gera um **token** via `POST /auth`. Nas operações que exigem autorização (**PUT**, **PATCH**, **DELETE**), o token deve ser enviado como **Cookie** nas requisições.

### 3.1 POST /auth — Gerar token

| Campo | Detalhe |
|-------|---------|
| **Descrição** | Gera token para operações que exigem autorização. |
| **Autenticação** | Não requer. |

**Requisição**

```http
POST {{base_url}}/auth
Content-Type: application/json
```

```json
{
  "username": "admin",
  "password": "password123"
}
```

**Resposta de sucesso (200)**

```json
{
  "token": "abc123def456ghi789"
}
```

**Resposta com credenciais inválidas (200)**

```json
{
  "reason": "Bad credentials"
}
```

**Observações**

- A API pode retornar **200** mesmo quando as credenciais são inválidas; o campo `reason` indica falha.
- O token **não** apresenta prazo de expiração explícito na documentação pública da API.

## 4. Estrutura de uma reserva

```json
{
  "firstname": "string (obrigatório)",
  "lastname": "string (obrigatório)",
  "totalprice": "number (obrigatório)",
  "depositpaid": "boolean (obrigatório)",
  "bookingdates": {
    "checkin": "date (obrigatório - formato YYYY-MM-DD)",
    "checkout": "date (obrigatório - formato YYYY-MM-DD)"
  },
  "additionalneeds": "string (opcional)"
}
```

## 5. Endpoints de reservas

### 5.1 GET /booking — Listar todas as reservas

| Campo | Detalhe |
|-------|---------|
| **Descrição** | Retorna lista com os **IDs** de todas as reservas. |
| **Autenticação** | Não requer. |

**Requisição**

```http
GET {{base_url}}/booking
```

**Resposta (200)**

```json
[
  { "bookingid": 1 },
  { "bookingid": 2 },
  { "bookingid": 3 }
]
```

### 5.2 GET /booking/{id} — Buscar reserva por ID

| Campo | Detalhe |
|-------|---------|
| **Descrição** | Retorna os dados completos de uma reserva. |
| **Autenticação** | Não requer. |

**Requisição**

```http
GET {{base_url}}/booking/1
Accept: application/json
```

**Resposta de sucesso (200)**

```json
{
  "firstname": "João",
  "lastname": "Silva",
  "totalprice": 350,
  "depositpaid": true,
  "bookingdates": {
    "checkin": "2026-01-15",
    "checkout": "2026-01-20"
  },
  "additionalneeds": "Café da manhã incluso"
}
```

**Resposta de erro (404)** — `Not Found`

### 5.3 POST /booking — Criar nova reserva

| Campo | Detalhe |
|-------|---------|
| **Descrição** | Cria uma nova reserva. |
| **Autenticação** | Não requer. |

**Requisição**

```http
POST {{base_url}}/booking
Content-Type: application/json
```

```json
{
  "firstname": "João",
  "lastname": "Silva",
  "totalprice": 350,
  "depositpaid": true,
  "bookingdates": {
    "checkin": "2026-01-15",
    "checkout": "2026-01-20"
  },
  "additionalneeds": "Café da manhã incluso"
}
```

**Resposta de sucesso (200)**

```json
{
  "bookingid": 1234,
  "booking": {
    "firstname": "João",
    "lastname": "Silva",
    "totalprice": 350,
    "depositpaid": true,
    "bookingdates": {
      "checkin": "2026-01-15",
      "checkout": "2026-01-20"
    },
    "additionalneeds": "Café da manhã incluso"
  }
}
```

**Resposta de erro (500)** — `Internal Server Error` (comum quando campos obrigatórios estão ausentes).

### 5.4 PUT /booking/{id} — Atualizar reserva (completo)

| Campo | Detalhe |
|-------|---------|
| **Descrição** | Substitui **integralmente** os dados da reserva. |
| **Autenticação** | Requer token (**Cookie**). |

**Requisição**

```http
PUT {{base_url}}/booking/1234
Content-Type: application/json
Cookie: token=abc123def456ghi789
```

```json
{
  "firstname": "Pedro",
  "lastname": "Almeida",
  "totalprice": 500,
  "depositpaid": false,
  "bookingdates": {
    "checkin": "2026-02-01",
    "checkout": "2026-02-10"
  },
  "additionalneeds": "Jantar incluso"
}
```

**Resposta (200)**

```json
{
  "firstname": "Pedro",
  "lastname": "Almeida",
  "totalprice": 500,
  "depositpaid": false,
  "bookingdates": {
    "checkin": "2026-02-01",
    "checkout": "2026-02-10"
  },
  "additionalneeds": "Jantar incluso"
}
```

**Resposta de erro (403)** — `Forbidden` (token ausente ou inválido).

### 5.5 PATCH /booking/{id} — Atualizar reserva (parcial)

| Campo | Detalhe |
|-------|---------|
| **Descrição** | Atualiza apenas os campos enviados. |
| **Autenticação** | Requer token (**Cookie**). |

**Requisição**

```http
PATCH {{base_url}}/booking/1234
Content-Type: application/json
Cookie: token=abc123def456ghi789
```

```json
{
  "firstname": "Ana",
  "lastname": "Costa"
}
```

**Resposta (200)**

```json
{
  "firstname": "Ana",
  "lastname": "Costa",
  "totalprice": 500,
  "depositpaid": false,
  "bookingdates": {
    "checkin": "2026-02-01",
    "checkout": "2026-02-10"
  },
  "additionalneeds": "Jantar incluso"
}
```

### 5.6 DELETE /booking/{id} — Excluir reserva

| Campo | Detalhe |
|-------|---------|
| **Descrição** | Remove a reserva do sistema. |
| **Autenticação** | Requer token (**Cookie**). |

**Requisição**

```http
DELETE {{base_url}}/booking/1234
Cookie: token=abc123def456ghi789
```

| Status | Corpo / significado |
|--------|---------------------|
| **201 Created** | `Created` — exclusão bem-sucedida (comportamento documentado da API). |
| **403 Forbidden** | Token ausente ou inválido. |

## 6. Filtros de busca

O endpoint `GET /booking` aceita **query string** para filtrar resultados.

| Parâmetro | Tipo | Descrição | Exemplo |
|-----------|------|-----------|---------|
| `firstname` | string | Filtrar por primeiro nome | `?firstname=João` |
| `lastname` | string | Filtrar por sobrenome | `?lastname=Silva` |
| `checkin` | date | Filtrar por data de check-in | `?checkin=2026-01-15` |
| `checkout` | date | Filtrar por data de check-out | `?checkout=2026-01-20` |

**Exemplo**

```http
GET {{base_url}}/booking?firstname=João&lastname=Silva
```

**Resposta (200)**

```json
[
  { "bookingid": 1 },
  { "bookingid": 1234 }
]
```

## 7. Códigos de status HTTP

| Código | Significado | Quando ocorre |
|--------|-------------|---------------|
| **200** | OK | Sucesso em GET, POST, PUT, PATCH e autenticação. |
| **201** | Created | Exclusão bem-sucedida (`DELETE`) — comportamento da API. |
| **403** | Forbidden | Token ausente, inválido ou expirado. |
| **404** | Not Found | Reserva inexistente para o ID informado. |
| **500** | Internal Server Error | Erro no servidor; comum com campos obrigatórios ausentes. |

## 8. Cenários de teste

### 8.1 Fluxo completo de reserva

1. `POST /auth` — obter token.
2. `POST /booking` — criar reserva.
3. `GET /booking/{id}` — validar dados.
4. `PUT /booking/{id}` — atualização completa.
5. `PATCH /booking/{id}` — atualização parcial (ex.: nome).
6. `DELETE /booking/{id}` — excluir.
7. `GET /booking/{id}` — confirmar exclusão (**404**).

### 8.2 Validação de campos obrigatórios

- `POST /booking` sem `firstname` → esperado **500**.
- `POST /booking` sem `lastname` → esperado **500**.
- `POST /booking` sem `totalprice` → esperado **500**.
- `POST /booking` sem `bookingdates` → esperado **500**.

### 8.3 Autenticação

- `DELETE /booking/{id}` sem token → esperado **403**.
- `DELETE /booking/{id}` com token inválido → esperado **403**.
- `PUT /booking/{id}` sem token → esperado **403**.

### 8.4 Busca e filtros

- `GET /booking` — listar todas.
- `GET /booking?firstname=João&lastname=Silva` — filtrar por nome.
- `GET /booking?checkin=2026-01-15` — filtrar por data.

### 8.5 Rastreabilidade com os specs Playwright

| Spec | Describe | Testes automatizados |
|------|----------|----------------------|
| `tests/api/auth.spec.ts` | API Auth | `POST /auth - credenciais válidas`, `senha incorreta`, `campos vazios` |
| `tests/api/bookings-crud.spec.ts` | API Bookings CRUD | `GET /booking`, `POST /booking`, `GET/PUT/PATCH/DELETE /booking/{id}`, `GET após delete`, `DELETE sem token` |
| `tests/api/fields-validation.spec.ts` | API Validação de campos | sem `firstname`, sem `lastname`, preço negativo, datas invertidas, filtros por nome e checkin |
| `tests/api/performance.spec.ts` | API Performance | `GET /booking`, `POST /booking`, `POST /auth`, `10 GETs consecutivos` (limite 2s) |
| `tests/api/security.spec.ts` | API Segurança | `DELETE` sem token e com token inválido, SQL injection, XSS, headers, rate limiting |

**Cenários documentados acima, mas sem spec dedicado hoje**

- `POST /booking` sem `totalprice` ou sem `bookingdates` (comportamento esperado 500 — apenas na collection Postman / teste manual).
- Validação estrita de headers ausentes (o spec apenas executa a requisição; não falha por CSP/HSTS ausentes).

Payloads de exemplo nos testes: `tests/utils/test-data.ts` (`BOOKING_TEMPLATE`).

## 9. Variáveis de ambiente (Postman)

| Variável | Valor inicial | Descrição |
|----------|---------------|-----------|
| `{{base_url}}` | `https://restful-booker.herokuapp.com` | URL base da API. |
| `{{token}}` | *(preenchido pela collection)* | Token de autenticação. |
| `{{booking_id}}` | *(preenchido pela collection)* | ID da reserva criada. |

## 10. Observações e bugs conhecidos

### 10.1 Comportamentos documentados

- **Autenticação com status 200 em erro**: credenciais inválidas retornam `{"reason": "Bad credentials"}` com **200**, em vez de **401**.
- **Campos obrigatórios ausentes → 500**: o esperado em APIs bem desenhadas seria **400** com mensagem clara.
- **DELETE retorna 201**: comportamento atípico; em REST comum usa-se **204 No Content** ou **200**.

### 10.2 Bugs identificados

| Bug | Detalhe |
|-----|---------|
| **Preço negativo** | `totalprice: -100` pode ser aceito na criação (**200**). |
| **Datas inconsistentes** | `checkout` anterior a `checkin` não é validado. |
| **Tipos inconsistentes** | `totalprice` e outros campos podem aceitar formatos não numéricos. |
| **Headers de segurança** | Ausência de CSP, HSTS, `X-Frame-Options`, `X-XSS-Protection`, etc. |

## 11. Collection Postman

| Campo | Detalhe |
|-------|---------|
| **Arquivo** | `postman/restful-booker-collection.json` |

### 11.1 Como importar

1. Abrir o Postman.
2. **Import** → **File**.
3. Selecionar `postman/restful-booker-collection.json`.
4. Ajustar variáveis de ambiente/collection se necessário (`base_url`, `token`, `booking_id`).

### 11.2 Estrutura sugerida da collection

```
Restful Booker API - QA Testing
├── Autenticação
│   ├── POST - Criar Token
│   └── POST - Credenciais Inválidas
├── Reservas (CRUD)
│   ├── GET - Listar Reservas
│   ├── POST - Criar Reserva
│   ├── GET - Buscar Reserva por ID
│   ├── PUT - Atualizar Reserva
│   ├── PATCH - Atualizar Parcialmente
│   └── DELETE - Excluir Reserva
├── Filtros e Buscas
│   ├── GET - Filtrar por Nome
│   └── GET - Filtrar por Data
└── Testes de Erro
    ├── POST - Sem firstname (500)
    ├── GET - Reserva Inexistente (404)
    └── DELETE - Sem Token (403)
```

## 12. Notas da collection

- **Scripts de teste**: as requisições *POST - Criar Token* e *POST - Criar Reserva* podem salvar `token` e `booking_id` nas variáveis da collection.
- **Ordem de execução**: executar primeiro *Criar Token*, depois *Criar Reserva*; as demais requisições reutilizam os valores.
- **403 em operações autenticadas**: gerar token novamente com `POST /auth`.
