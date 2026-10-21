/** Cuidar Muriaé v0.2: EXCLUSIVAMENTE dados sintéticos. Nenhuma instituição real é representada. */
export const catalogMode = "synthetic-demo";
export const hospitals = [
  {
    "id": "aurora",
    "name": "Unidade Modelo Aurora",
    "short": "Instituição inteiramente fictícia • Cenário A",
    "type": "Internação clínica simulada",
    "description": "Um cenário de jornada de internação e orientação por setores, feito para testar a experiência de quem acompanha uma pessoa internada.",
    "initials": "A",
    "topics": [
      {
        "id": "chegada",
        "title": "Chegada para internação",
        "label": "Jornada guiada",
        "summary": "Acompanhe o percurso fictício de chegada até o setor de destino.",
        "intro": "Neste cenário inventado, a pessoa é orientada pela recepção simulada, passa pelo registro de chegada e recebe indicação de um setor.",
        "sections": [
          {
            "title": "1. Recepção de exemplo",
            "body": "Procure o balcão de acolhimento indicado no mapa ilustrativo. Uma pessoa da equipe fictícia esclareceria o próximo passo."
          },
          {
            "title": "2. Confirmação administrativa",
            "body": "Um atendente da simulação verifica o motivo da visita e informa qual etapa demonstrativa seguir."
          },
          {
            "title": "3. Orientação ao setor",
            "body": "Após o registro fictício, a tela indicaria o setor correspondente e apresentaria informações úteis ao acompanhante."
          }
        ],
        "checklist": [
          "Ler o resumo da jornada simulada",
          "Identificar a etapa inicial na recepção fictícia",
          "Revisar as informações do setor de exemplo"
        ]
      },
      {
        "id": "preparo",
        "title": "Preparação antes da chegada",
        "label": "Checklist ilustrativo",
        "summary": "Veja um roteiro de preparação totalmente inventado para testar o checklist.",
        "intro": "O checklist abaixo demonstra como o sistema poderia organizar informações administrativas após aprovação institucional. Não representa exigências de nenhum hospital.",
        "sections": [
          {
            "title": "Organize as informações",
            "body": "O protótipo simula uma lista de confirmação de dados administrativos. Nenhum documento real precisa ser fornecido."
          },
          {
            "title": "Planeje o deslocamento",
            "body": "Em uma versão validada, este espaço poderia exibir opções oficiais de acesso, entrada e estacionamento. Os endereços não são simulados para evitar confusão com locais reais."
          }
        ],
        "checklist": [
          "Verificar o resumo demonstrativo",
          "Anotar dúvidas para a equipe fictícia",
          "Conferir a etapa de chegada na simulação"
        ]
      },
      {
        "id": "visitas",
        "title": "Visitas e acompanhantes",
        "label": "Regras variáveis por setor",
        "summary": "Troque o setor e veja como as informações simuladas mudam.",
        "intro": "Os textos abaixo ilustram regras administrativas hipotéticas. Eles não descrevem horários, permissões ou políticas reais.",
        "sections": [
          {
            "title": "Visão geral",
            "body": "Neste cenário, o acesso do acompanhante depende do setor escolhido na simulação. Selecione um setor para visualizar uma orientação diferente."
          }
        ],
        "sectorOptions": [
          "Visão geral",
          "Enfermaria Modelo",
          "Setor Intensivo Modelo"
        ],
        "sectorDetails": {
          "Enfermaria Modelo": {
            "title": "Orientação fictícia — Enfermaria Modelo",
            "body": "A tela demonstraria uma identificação de visitante por meio de um cartão de exemplo e explicaria onde obter informações sobre a permanência na unidade simulada.",
            "steps": [
              "Consultar o balcão de exemplo",
              "Ler a orientação ilustrativa de entrada",
              "Confirmar o setor selecionado"
            ]
          },
          "Setor Intensivo Modelo": {
            "title": "Orientação fictícia — Setor Intensivo Modelo",
            "body": "Neste cenário inventado, a informação seria apresentada em linguagem mais objetiva, destacando que condições de acesso podem variar e exigem confirmação humana na aplicação real.",
            "steps": [
              "Abrir as orientações do setor intensivo simulado",
              "Identificar o ponto fictício de informações",
              "Concluir a leitura do aviso demonstrativo"
            ]
          }
        },
        "checklist": [
          "Selecionar um setor de exemplo",
          "Revisar a orientação específica do setor",
          "Entender que regras reais exigem validação"
        ]
      },
      {
        "id": "setores",
        "title": "Como encontrar um setor",
        "label": "Localização ilustrativa",
        "summary": "Explore a navegação informacional sem mapas ou endereços reais.",
        "intro": "A unidade, os setores e o fluxo de circulação são inteiramente fictícios.",
        "sections": [
          {
            "title": "Ponto de partida",
            "body": "Na demonstração, a navegação começa na recepção do edifício imaginário."
          },
          {
            "title": "Destino",
            "body": "O sistema indicaria uma sequência ilustrativa: recepção → ponto de informação → setor indicado."
          }
        ],
        "checklist": [
          "Escolher o setor pretendido na demonstração",
          "Revisar o percurso ilustrativo",
          "Ver onde solicitar orientação em uma versão futura"
        ]
      }
    ]
  },
  {
    "id": "horizonte",
    "name": "Unidade Modelo Horizonte",
    "short": "Instituição inteiramente fictícia • Cenário B",
    "type": "Acolhimento e apoio simulados",
    "description": "Outro cenário com categorias, setores e orientações diferentes, para comprovar que cada unidade pode ter seu próprio conteúdo.",
    "initials": "H",
    "topics": [
      {
        "id": "chegada",
        "title": "Primeiro atendimento informacional",
        "label": "Fluxo de chegada",
        "summary": "Um processo demonstrativo diferente do exibido na Unidade Aurora.",
        "intro": "Nesta unidade fictícia, o fluxo prioriza um ponto de informações gerais antes da seleção de um serviço de apoio.",
        "sections": [
          {
            "title": "1. Ponto de acolhimento simulado",
            "body": "A pessoa visualiza uma recepção fictícia que explica as opções disponíveis, sem classificar urgência ou sintomas."
          },
          {
            "title": "2. Seleção de objetivo",
            "body": "O sistema apresenta opções administrativas ilustrativas, como localizar um serviço de apoio ou acessar instruções gerais."
          },
          {
            "title": "3. Próximas orientações",
            "body": "A tela apresenta o cartão correspondente ao assunto escolhido. O protótipo não realiza agendamentos."
          }
        ],
        "checklist": [
          "Conhecer o ponto de acolhimento simulado",
          "Escolher um objetivo informacional",
          "Revisar a orientação ilustrativa"
        ]
      },
      {
        "id": "visitas",
        "title": "Informações para acompanhantes",
        "label": "Acesso por ambientes fictícios",
        "summary": "Selecione um ambiente para experimentar conteúdo contextual.",
        "intro": "Os setores Azul e Verde existem apenas neste protótipo. Nenhuma regra aqui corresponde a uma instituição real.",
        "sections": [
          {
            "title": "Orientação geral",
            "body": "Cada ambiente simulado pode ter um texto de acesso e um checklist próprio."
          }
        ],
        "sectorOptions": [
          "Visão geral",
          "Setor Azul",
          "Setor Verde"
        ],
        "sectorDetails": {
          "Setor Azul": {
            "title": "Orientação fictícia — Setor Azul",
            "body": "Neste ambiente de demonstração, a pessoa seria direcionada a um ponto ilustrativo de informações antes de seguir para a área de acolhimento.",
            "steps": [
              "Consultar o cartão do Setor Azul",
              "Ler o roteiro de orientação de exemplo"
            ]
          },
          "Setor Verde": {
            "title": "Orientação fictícia — Setor Verde",
            "body": "Este ambiente simula uma jornada com um ponto de apoio separado da recepção, permitindo demonstrar uma recomendação contextual diferente do Setor Azul.",
            "steps": [
              "Identificar o ponto fictício de apoio",
              "Revisar as instruções ilustrativas do Setor Verde"
            ]
          }
        },
        "checklist": [
          "Selecionar o ambiente de exemplo",
          "Comparar os textos de cada ambiente",
          "Revisar o aviso de caráter fictício"
        ]
      },
      {
        "id": "apoio",
        "title": "Serviços de apoio",
        "label": "Informações e acolhimento",
        "summary": "Conheça serviços inventados para explorar a jornada de informação.",
        "intro": "Este cenário não apresenta serviços hospitalares existentes. Os nomes são usados apenas para demonstrar organização de conteúdo.",
        "sections": [
          {
            "title": "Balcão de Informações Modelo",
            "body": "Um ponto de referência simulado para perguntas administrativas, utilizado para experimentar a navegação."
          },
          {
            "title": "Espaço de Acolhimento Modelo",
            "body": "Uma área imaginária descrita para ilustrar como futuros conteúdos de apoio poderiam ser apresentados."
          }
        ],
        "checklist": [
          "Localizar o Balcão de Informações Modelo",
          "Conhecer o Espaço de Acolhimento Modelo",
          "Concluir o percurso fictício"
        ]
      },
      {
        "id": "perguntas",
        "title": "Perguntas frequentes",
        "label": "Respostas demonstrativas",
        "summary": "Veja uma biblioteca de dúvidas típicas do processo, sem regras reais.",
        "intro": "Perguntas e respostas a seguir são exemplos de interface e não instruções para atendimento hospitalar.",
        "sections": [
          {
            "title": "Onde encontro informações sobre a unidade?",
            "body": "Neste protótipo, selecione um assunto na lista inicial ou utilize a busca. Uma versão institucional apresentaria contatos verificados."
          },
          {
            "title": "Posso registrar meus dados por aqui?",
            "body": "Não. A demonstração não coleta nomes, documentos, prontuários nem outras informações pessoais."
          },
          {
            "title": "Estas informações são oficiais?",
            "body": "Não. A Unidade Horizonte e todo o conteúdo associado são fictícios e destinados a testes de navegação."
          }
        ],
        "checklist": [
          "Experimentar a busca de assuntos",
          "Ler um exemplo de resposta",
          "Voltar para selecionar outra unidade"
        ]
      }
    ]
  }
];
export const getHospital = id => hospitals.find(h => h.id === id) || null;
export const getTopic = (hospitalId, topicId) => getHospital(hospitalId)?.topics.find(t => t.id === topicId) || null;
export function validateCatalog(){
 const errors=[];const ids=new Set();
 for(const hospital of hospitals){
  if(ids.has(hospital.id))errors.push("Unidade duplicada: "+hospital.id);
  ids.add(hospital.id);
  if(!hospital.name||!hospital.short||!hospital.description||!Array.isArray(hospital.topics))errors.push("Unidade incompleta: "+hospital.id);
  const tid=new Set();
  for(const t of hospital.topics||[]){
   if(tid.has(t.id))errors.push("Assunto duplicado: "+t.id);tid.add(t.id);
   if(!t.id||!t.title||!t.summary||!t.intro||!t.sections?.length||!t.checklist?.length)errors.push("Assunto incompleto: "+t.id);
   if(t.sectorDetails && Object.keys(t.sectorDetails).some(k=>!t.sectorOptions?.includes(k)))errors.push("Setor sem opção: "+t.id);
  }
 }
 return errors;
}
