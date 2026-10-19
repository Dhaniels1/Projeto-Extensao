/* Catálogo de demonstração, não uma base de regras hospitalares validadas.
 * Nunca atribuir horários de visita, documentos obrigatórios ou disponibilidades
 * de leitos sem confirmação vigente da instituição correspondente.
 */
export const hospitals = [
  {
    id: "fcv",
    name: "Fundação Cristiano Varella",
    short: "FCV · Hospital do Câncer de Muriaé",
    type: "Assistência oncológica",
    description: "Conteúdos sobre apoio ao paciente, cartilhas e informações institucionais.",
    initials: "FCV",
    website: "https://fcv.org.br/",
    topics: [
      {
        id: "casa-de-apoio", title: "Casa de Apoio", label: "Hospedagem e acolhimento",
        summary: "Informações públicas sobre a estrutura de apoio e hospedagem.",
        status: "documented", sourceTitle: "FCV · Casa de Apoio", sourceUrl: "https://fcv.org.br/casa-de-apoio/",
        paragraph: "A Fundação Cristiano Varella disponibiliza orientações públicas sobre sua Casa de Apoio. Essa estrutura de hospedagem é diferente dos leitos de internação hospitalar.",
        caution: "Critérios de acesso, condições e funcionamento devem ser confirmados diretamente com a instituição antes da visita.",
        sectorOptions: []
      },
      {
        id: "orientacoes", title: "Orientações aos pacientes", label: "Cartilhas e conteúdos institucionais",
        summary: "Materiais educativos e informações gerais disponíveis no site.",
        status: "documented", sourceTitle: "FCV · Orientações aos Pacientes", sourceUrl: "https://fcv.org.br/orientacoes-aos-pacientes/",
        paragraph: "A Fundação Cristiano Varella mantém uma página com cartilhas e outros conteúdos informacionais para pacientes e familiares.",
        caution: "Essas publicações não substituem instruções específicas fornecidas pela equipe responsável pela internação.",
        sectorOptions: []
      },
      {
        id: "internacao", title: "Preparação para internação", label: "Admissão e documentos",
        summary: "Orientações operacionais específicas ainda não verificadas.",
        status: "pending", sourceTitle: "FCV · Portal institucional", sourceUrl: "https://fcv.org.br/",
        paragraph: "Ainda não há, neste protótipo, um conjunto de instruções de internação da FCV com vigência confirmada.",
        caution: "Confirme diretamente com o hospital os documentos, local de apresentação, horários e eventuais orientações particulares do seu atendimento.",
        sectorOptions: []
      },
      {
        id: "acompanhantes", title: "Acompanhantes e visitas", label: "Regras de acesso",
        summary: "Necessária confirmação de normas vigentes da internação.",
        status: "pending", sourceTitle: "FCV · Portal institucional", sourceUrl: "https://fcv.org.br/",
        paragraph: "As regras de acompanhantes e visitantes para internação não foram validadas para publicação neste projeto.",
        caution: "Consulte a equipe da unidade sobre autorização de acompanhantes, acesso aos setores e horários atuais.",
        sectorOptions: []
      }
    ]
  },
  {
    id: "hsp",
    name: "Hospital São Paulo",
    short: "Casa de Caridade de Muriaé",
    type: "Hospital geral",
    description: "Publicações de documentos, setores e orientações a visitantes.",
    initials: "HSP",
    website: "https://www.hsp.org.br/",
    topics: [
      {
        id: "visitantes", title: "Visitantes e acompanhantes", label: "Orientações por setor",
        summary: "Documentos publicados, mas com regras ainda em revisão.",
        status: "pending", sourceTitle: "HSP · Normas e Regras para Visitantes e Acompanhantes", sourceUrl: "https://www.hsp.org.br/noticia/detalhe/1923/normas-e-regras-para-visitantes-e-acompanhantes",
        paragraph: "O Hospital São Paulo publicou documentos com orientações diferenciadas por setor. Na revisão preliminar, foram identificadas divergências entre documentos e referências a práticas de períodos anteriores.",
        caution: "Não considere horários, limites ou critérios desses materiais automaticamente vigentes. Confirme as regras atuais com o próprio hospital.",
        sectorOptions: ["Visão geral", "UTI adulto", "Enfermaria SUS e pediatria", "Enfermaria particular/convênio", "Maternidade", "UTI neonatal/pediátrica", "Sala Vermelha"]
      },
      {
        id: "documentos", title: "Documentos para atendimento", label: "Informações gerais de cadastro",
        summary: "Publicação institucional sobre preparação de documentos.",
        status: "documented", sourceTitle: "HSP · Antes de vir ao hospital, organize os seus documentos", sourceUrl: "https://hsp.org.br/noticia/detalhe/1958/antes-de-vir-ao-hospital-organize-os-seus-documentos",
        paragraph: "O Hospital São Paulo publicou orientações gerais para que as pessoas organizem documentos de identificação e cadastro antes de comparecer à instituição.",
        caution: "A página não representa, por si só, uma lista completa de documentos obrigatórios para todos os tipos de internação. Confirme as exigências do seu atendimento.",
        sectorOptions: []
      },
      {
        id: "internacao", title: "Etapas da internação", label: "Admissão hospitalar",
        summary: "Fluxo administrativo específico precisa de validação.",
        status: "pending", sourceTitle: "HSP · Portal institucional", sourceUrl: "https://www.hsp.org.br/",
        paragraph: "O projeto ainda não dispõe de um fluxo completo de admissão hospitalar validado para cada modalidade de atendimento.",
        caution: "Confirme com a equipe responsável os procedimentos, documentos e o local de apresentação da sua internação.",
        sectorOptions: []
      }
    ]
  }
];
export const getHospital = id => hospitals.find(h => h.id === id) || null;
export const getTopic = (hospitalId, topicId) => getHospital(hospitalId)?.topics.find(t => t.id === topicId) || null;
export function validateCatalog() {
  const errors = [];
  for (const hospital of hospitals) {
    if (!hospital.id || !hospital.name || !hospital.website?.startsWith("https://")) errors.push("Hospital incompleto: " + hospital.id);
    for (const topic of hospital.topics) {
      if (!topic.title || !["pending", "documented"].includes(topic.status)) errors.push("Assunto incompleto: " + topic.id);
      if (!topic.sourceUrl?.startsWith("https://")) errors.push("Fonte inválida: " + topic.id);
      if (!topic.paragraph || !topic.caution) errors.push("Orientação incompleta: " + topic.id);
    }
  }
  return errors;
}

