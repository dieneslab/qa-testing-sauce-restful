# Sugestões de melhorias — Sauce Demo

## 1. Mensagens de erro de login

**Problema:** "Username and password do not match" não diferencia usuário inexistente de senha incorreta.

**Sugestão:** mensagens ou códigos distintos por causa (sem expor se o usuário existe, se for requisito de segurança).

## 2. Validação do checkout

**Problema:** campos só validam ao clicar em Continue.

**Sugestão:** validação on-blur com feedback imediato.

## 3. Acessibilidade

**Problema:** violações de contraste e labels ARIA incompletos (identificados pelo axe-core).

**Sugestão:** corrigir contraste e indicadores de foco; ver `tests/ui/accessibility.spec.ts`.

## 4. Persistência do carrinho

**Problema:** carrinho zera no logout.

**Sugestão:** avaliar `sessionStorage` para manter itens na mesma sessão do navegador.

## 5. Feedback de carregamento

**Problema:** `performance_glitch_user` demora sem indicador visual.

**Sugestão:** spinner ou skeleton durante operações lentas.
