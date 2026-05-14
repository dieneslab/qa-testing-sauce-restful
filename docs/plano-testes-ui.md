# 📋 Plano de Testes - Sauce Demo (UI Testing)

## 1. Escopo
Testar a plataforma de e-commerce Sauce Demo, cobrindo funcionalidades críticas de autenticação, catálogo, carrinho e checkout.

### 1.1 Funcionalidades no Escopo
- Login/logout com diferentes perfis de usuário
- Ordenação e filtragem de produtos
- Fluxo completo de checkout
- Gestão do carrinho (adicionar/remover)
- Navegação entre páginas

### 1.2 Fora do Escopo
- Testes de integração com gateway de pagamento (simulado)
- Testes com múltiplas abas simultâneas
- Testes de internacionalização

## 2. Estratégia de Teste

### 2.1 Níveis de Teste
| Nível | Descrição | Status |
|-------|-----------|--------|
| Nível 1 | Funcionalidades obrigatórias | ✅ Implementado |
| Nível 2 | Responsividade, acessibilidade | ✅ Implementado |

### 2.2 Tipos de Teste
- **Funcional**: Validação de fluxos principais
- **Exploratório**: Busca de bugs em cenários edge-case
- **Responsividade**: Diferentes viewports
- **Acessibilidade**: Análise com axe-core

### 2.3 Ambiente de Teste
- **URL**: https://www.saucedemo.com/
- **Navegadores**: Chromium (desktop + mobile)
- **Dados**: Usuários pré-cadastrados fornecidos pela plataforma

## 3. Cobertura de Usuários

| Usuário | Funcionalidades testadas |
|---------|-------------------------|
| `standard_user` | Fluxo completo, ordenação, checkout |
| `locked_out_user` | Validação de bloqueio |
| `performance_glitch_user` | Tempo de resposta |
| `problem_user` | Comportamento anômalo |
| `error_user` | Tratamento de erros |
| `visual_user` | Layout |

## 4. Cronograma
- Planejamento e setup: ✅ Concluído
- Implementação Nível 1: ✅ Concluído
- Implementação Nível 2: ✅ Concluído
- Documentação e evidências: ✅ Concluído