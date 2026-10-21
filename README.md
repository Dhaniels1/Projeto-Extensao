# Cuidar Muriaé — Protótipo acadêmico (v0.2)

**Modo atual: demonstração com dados sintéticos.** Este repositório apresenta uma hipótese de solução para organizar orientações administrativas de unidades de saúde, sem representar nenhuma instituição real.

> **Atenção:** “Unidade Modelo Aurora”, “Unidade Modelo Horizonte”, seus setores, percursos e orientações são totalmente inventados para testar a interface. Não utilizar os textos para consultas, internações, visitas ou decisões reais. Não há parceria, autorização nem vinculação institucional declarada.

## Objetivo

Demonstrar como um usuário poderia consultar informações organizadas de forma contextual por unidade, assunto e setor, em linguagem clara, especialmente no celular. A proposta é candidata a projeto de extensão em planejamento e, posteriormente, a evolução em TCC, mediante avaliação do orientador.

## Funcionalidades implementadas na v0.2

- Seleção entre **duas instituições fictícias** com conteúdos e fluxos diferentes;
- Navegação em três etapas: unidade → assunto → orientação;
- Busca textual por assunto, resumo, explicações e setores;
- Orientações específicas quando é selecionado um setor fictício;
- Checklists interativos demonstrativos, sem envio de dados a servidor;
- Avisos persistentes de que o conteúdo é sintético;
- Interface responsiva e ampliação dos textos;
- Links/rotas do protótipo via hash, sem depender de backend ou banco.

**Dados:** `data.js` é o catálogo fictício. Não há cadastro, prontuários, agendamentos, leitos, horários de visita ou políticas de hospitais reais. As marcações do checklist ficam apenas na memória da aba e se perdem ao recarregar.

## Executar localmente

```bash
git clone https://github.com/Dhaniels1/Projeto-Extensao.git
cd Projeto-Extensao
python -m http.server 8000
```

Abra `http://localhost:8000`. Um servidor local é recomendado porque o JavaScript utiliza módulos ES.

## Verificação

Node.js 20+:

```bash
npm test
node --check app.js
node --check data.js
```

O fluxo de integração contínua verifica o catálogo. A publicação estática é preparada pelo workflow `.github/workflows/pages.yml`; o endereço só deve ser divulgado como publicado após confirmação do deploy.

## Arquitetura

| Arquivo | Papel |
| --- | --- |
| `index.html` | Estrutura semântica e avisos de demonstração |
| `styles.css` | Layout, responsividade, estados e acessibilidade |
| `data.js` | Unidades e orientações **fictícias**; validação estrutural |
| `app.js` | Rotas, filtros, setor selecionado, checklists e renderização |
| `tests.mjs` | Testes de dados sintéticos e de comportamento esperado |
| `docs/ESCOPO_E_GOVERNANCA.md` | Separação entre demonstração e proposta extensionista |

## Escopo e limites

O protótipo **não** oferece triagem, diagnóstico, atendimento, instruções clínicas, reserva ou consulta de leitos, internação, alta, agenda ou acesso a sistemas internos. Não solicita dados de pacientes.

**Simulação não é validação institucional nem resultado de extensão.** Para uma fase com informações reais serão necessários: orientação do professor, planejamento de atividade extensionista com participação da comunidade, autorização institucional quando aplicável, fontes primárias verificadas, governança editorial, acessibilidade e avaliações autorizadas.

## Próximas etapas

1. Revisar o protótipo com o professor e refinar requisitos;
2. Validar acessibilidade e navegação em testes internos, sem inferir impacto social;
3. Planejar oficinas e escuta de usuários reais somente com as autorizações necessárias;
4. Criar um modelo de curadoria que substitua os dados sintéticos por conteúdo institucional validado;
5. Avaliar a viabilidade acadêmica e técnica de evolução para TCC.

**Versão atual:** v0.2 — prova de conceito de usabilidade, não serviço hospitalar.

## Hospedagem de demonstração

O projeto Cloudflare Pages `cuidar-muriae-demo` está conectado à branch `main` para publicação automática. O endereço de destino é https://cuidar-muriae-demo.pages.dev/; confirme um deploy bem-sucedido antes de divulgar.
