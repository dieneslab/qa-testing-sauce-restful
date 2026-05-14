# 💡 Sugestões de Melhorias - Sauce Demo

## 1. Mensagens de Erro Mais Descritivas
**Problema**: Mensagem "Username and password do not match" não distingue usuário inexistente de senha incorreta.
**Sugestão**: Diferenciar mensagens ou adicionar código de erro específico.

## 2. Validação em Tempo Real
**Problema**: Campos do checkout só validam ao submeter.
**Sugestão**: Adicionar validação on-blur com feedback instantâneo.

## 3. Acessibilidade
**Problema**: Violações de contraste e falta de labels ARIA em alguns elementos.
**Sugestão**: Implementar correções identificadas pelo axe-core (contraste de cores, focus indicators).

## 4. Persistência do Carrinho
**Problema**: Carrinho limpa ao fazer logout.
**Sugestão**: Avaliar sessionStorage para manter carrinho durante a sessão.

## 5. Indicador de Carregamento
**Problema**: performance_glitch_user não mostra feedback de loading.
**Sugestão**: Adicionar skeleton loading ou spinner durante operações lentas.