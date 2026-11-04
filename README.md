# Soul Up — Sprint 4

A Soul Up é uma plataforma digital que aproxima pessoas interessadas em sustentabilidade, colaboração e impacto positivo. A experiência combina conteúdo institucional, desafios sustentáveis com pontuação e um mural para compartilhar ideias e iniciativas com a comunidade.

> Projeto acadêmico da disciplina Front-End Design Engineering — Sprint 4. O catálogo de ações e os registros de participação são integrados à API Java do grupo, publicada no Render.

## Tecnologias

- React 19 + Vite
- TypeScript
- Tailwind CSS 4
- React Router DOM
- React Hook Form
- Fetch API nativa para requisições HTTP (sem Axios)
- Git, GitHub e GitFlow
- Vercel (deploy previsto)

## Funcionalidades

- Navegação SPA com páginas institucionais e rotas de solução.
- Rotas estáticas e rota dinâmica `/solucao/:id`.
- Página de desafios consumindo ações e categorias da API Java, registrando participações e exibindo pontos aprovados.
- Mural da comunidade com criação, edição e exclusão de publicações.
- Estados de carregamento, erro e lista vazia nas funcionalidades integradas à API.
- Camada de serviços separada dos componentes de interface.
- Tipagem TypeScript com interfaces, tipos literais, union types e intersection types.
- Layout responsivo com breakpoints do Tailwind CSS.

### Páginas e rotas

| Rota | Descrição |
| --- | --- |
| `/` | Página inicial |
| `/sobre` | Apresentação da Soul Up |
| `/solucao` | Visão geral da solução |
| `/solucao/:id` | Detalhe dinâmico de uma solução |
| `/desafios` | Desafios e progresso do participante |
| `/comunidade` | Mural com operações de publicação |
| `/faq` | Perguntas frequentes |
| `/integrantes` | Integrantes e perfis |
| `/contato` | Formulário de contato |

## Requisitos

- Node.js 20.19+ ou 22.12+
- npm

## Como executar

```bash
npm ci
npm run dev
```

Abra a URL local exibida pelo Vite (normalmente `http://localhost:5173`).

### Verificações

```bash
npm run check
npm run build
npm run preview
```

## Integração com a API Java

O Back-End Java já está publicado em [soulup-api](https://github.com/guilhermenovaes07-coder/soulup-api), com base URL `https://soulup-api-x6cl.onrender.com`. O serviço de integração do Front-End fica em `src/services/sustainableActionService.ts` e utiliza `fetch`.

Copie `.env.example` para `.env.local` se quiser configurar outra URL. A aplicação já usa a URL pública acima quando `VITE_API_URL` não estiver definida.

Endpoints usados pela página **Desafios**:

| Operação | Método | Caminho esperado |
| --- | --- | --- |
| Listar ações sustentáveis | GET | `/soulup/acao` |
| Listar categorias | GET | `/soulup/categoria` |
| Consultar ações de um usuário | GET | `/soulup/usuario/{codigo}/acoes` |
| Registrar participação | POST | `/soulup/registro-acao` |

O POST de participação envia `{ "codigoUsuario": 7, "codigoAcao": 1 }`; a API registra a participação como pendente e os pontos são mostrados após aprovação. Como o Back-End atual não oferece autenticação, a página solicita o código de um usuário já cadastrado. A API já inclui operações `PUT` e `DELETE` nos recursos CRUD descritos no README do Back-End. O mural da comunidade não tem endpoint correspondente no Back-End atual e, por isso, permanece salvo localmente neste navegador; não é apresentado como dado remoto.

### Testar o fluxo de participação

1. Consulte `GET /soulup/usuario` na API para localizar um usuário existente e use seu campo `codigo` na página **Desafios**.
2. Carregue o progresso para ver os registros já feitos por esse usuário.
3. Registre uma ação disponível. A API responde com um registro `PENDENTE`, que aparece no histórico até ser aprovado ou rejeitado.
4. Após a aprovação pela equipe responsável, carregue novamente o progresso para conferir os Ecoa Points contabilizados.

Os registros retornam os status `PENDENTE`, `APROVADO` ou `REJEITADO`. A interface apresenta esses estados como “Em análise”, “Aprovada” e “Não aprovada”. O Front-End não aprova nem rejeita participações, pois essas decisões dependem das regras e dos endpoints de moderação do Back-End.

> O serviço no Render usa o plano gratuito e pode levar alguns segundos para responder após ficar inativo. Consulte o [status da API](https://soulup-api-x6cl.onrender.com/soulup).

## Estrutura de pastas

```text
src/
├── assets/          # imagens e recursos estáticos
├── components/      # componentes reutilizáveis
├── context/         # estado compartilhado da aplicação
├── data/            # conteúdo estático da solução
├── pages/           # páginas e rotas
├── services/        # comunicação HTTP e serviços de domínio
├── types/           # interfaces e tipos TypeScript
├── App.tsx
├── index.css
└── main.tsx
public/              # arquivos públicos
```

## Integrantes e créditos

| Integrante | RM | Turma | Foto | GitHub | LinkedIn |
| --- | --- | --- | --- | --- | --- |
| Arthur Cordão | RM 570313 | 1TDSR | `src/assets/members/arthur.jpg` | [tuzin07on](https://github.com/tuzin07on) | [LinkedIn](https://www.linkedin.com/in/arthur-cord%C3%A3o-4bb94434b/) |
| Guilherme Novaes | RM 570444 | 1TDSR | `src/assets/members/guilherme.jpg` | [guilherme-novaes](https://github.com/guilherme-novaes) | [LinkedIn](https://www.linkedin.com/in/guilherme-novaes-09b2b024b/) |
| Jeferson Faria | RM 573038 | 1TDSR | `src/assets/members/jeferson.jpg` | [jeffersonfaria](https://github.com/jeffersonfaria) | [LinkedIn](https://www.linkedin.com/in/jeffersonfaria-09b2b024b/) |
| Josué Menezes | RM 569220 | 1TDSR | `src/assets/members/josue.png` | [josuemenezes](https://github.com/josuemenezes) | [LinkedIn](https://www.linkedin.com/in/josu%C3%A9-menezes/) |

## Estratégia de versionamento (GitFlow)

- `main`: versão estável preparada para entrega.
- `develop`: integração das etapas da Sprint 4 antes da publicação.
- `STEP-5`, `STEP-6`, `STEP-7` e seguintes: branches de trabalho sequenciais para cada etapa, com commits objetivos e rastreáveis.
- Após validar cada etapa, suas alterações devem ser integradas à branch `develop` por merge.
- A equipe deve manter contribuições individuais reais no histórico. A exigência da atividade é de pelo menos 5 commits por integrante e 15 no total.

## Entrega e publicação

Preencher após a publicação oficial:

- **Repositório GitHub:** pendente de criação/confirmação.
- **Deploy Vercel:** pendente de publicação.
- **API Java publicada:** [soulup-api no GitHub](https://github.com/guilhermenovaes07-coder/soulup-api) · [API no Render](https://soulup-api-x6cl.onrender.com/soulup).
- **Vídeo YouTube (até 3 minutos):** pendente de gravação e publicação.

O projeto deve ser entregue em um único arquivo ZIP, sem a pasta `node_modules/`.

## Contato

Para dúvidas sobre o projeto, utilize os perfis GitHub e LinkedIn dos integrantes listados acima.
