# Contribuição — Soul Up Sprint 4

## Fluxo de branches

1. `main` deve conter somente versões estáveis e prontas para entrega.
2. `develop` reúne as etapas concluídas da Sprint 4.
3. Cada etapa de trabalho deve partir de `develop`, em uma branch sequencial (`STEP-5`, `STEP-6`, ...).
4. Ao concluir uma etapa, abra um Pull Request para `develop` e aguarde a revisão de outro integrante.
5. Após validação e aceite, integre a etapa em `develop`. A publicação estável deve partir de `main`.

## Commits

Use mensagens curtas e específicas, preferencialmente com os prefixos:

- `feat:` nova funcionalidade;
- `fix:` correção;
- `docs:` documentação;
- `style:` ajustes visuais sem alteração de comportamento;
- `refactor:` melhoria interna;
- `test:` testes.

A atividade exige pelo menos 5 commits por integrante e 15 no total. Cada pessoa deve realizar suas próprias contribuições com sua conta GitHub, de forma que o histórico represente o trabalho efetivamente realizado. Não reutilize commits de outra pessoa nem altere autoria para simular participação.

## Antes de abrir um Pull Request

```bash
npm ci
npm run check
npm run build
```

Inclua uma descrição objetiva do que mudou e, quando houver alteração visual, capturas das telas em desktop e mobile.
