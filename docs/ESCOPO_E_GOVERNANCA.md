# Escopo e governança informacional

**Status:** planejamento acadêmico. A criação deste repositório não representa aprovação do projeto de extensão, parceria hospitalar nem autorização para atividades com participantes.

## Problema e contribuição extensionista

O projeto pretende investigar e reduzir barreiras informacionais no acesso a orientações administrativas relacionadas à jornada de internação hospitalar, de modo complementar às informações disponibilizadas pelos hospitais. Não pressupomos a existência de falhas em nenhuma instituição.

A extensão depende de interação com a comunidade — não se resume à entrega de software. Após as autorizações aplicáveis, a proposta prevê escuta, criação colaborativa, oficina sobre fontes confiáveis e devolutiva das melhorias.

## Alcance do piloto

- **FCV:** conteúdos públicos relacionados a orientações e à Casa de Apoio. Hospedagem na Casa de Apoio não é internação.
- **Hospital São Paulo:** documentos gerais e materiais de acompanhamento/visitação por setor, cuja vigência ainda deverá ser confirmada.
- **Extensão municipal:** objetivo de longo prazo; não está implementado neste MVP.

## Dados e funcionalidades

Os registros do catálogo em `data.js` têm finalidade demonstrativa e não armazenam dados pessoais. O sistema permite selecionar hospital, assunto e eventualmente setor; apresenta fonte, ressalva e aviso de pendência de verificação.

O MVP não faz diagnóstico, triagem, encaminhamento baseado em sintomas, recomendação terapêutica, reserva de leitos, internação, alta, agendamento ou acesso a prontuários e sistemas internos.

## Política de conteúdo

Cada orientação destinada a uma versão pública supervisionada deverá conter, no mínimo:

1. Hospital e eventual setor/modalidade;
2. Assunto e mensagem em linguagem simples;
3. Documento ou URL da fonte primária;
4. Data de verificação e identificação de responsável pela curadoria;
5. Estado da informação: localizada/em revisão, verificada documentalmente, validada institucionalmente ou pendente;
6. Canal institucional para dúvidas e correção.

**Nenhuma informação divergente ou desatualizada deve ser divulgada como regra vigente.** Horários e critérios de visita, documentação obrigatória de internação e fluxos operacionais precisam de revisão apropriada. O software deve encaminhar o usuário às fontes oficiais quando houver dúvida.

## Pesquisa, LGPD e autorizações

Não incluir dados de pacientes nem arquivos internos neste repositório público. Entrevistas, oficinas dentro de hospitais, marcas institucionais e aproveitamento de resultados em pesquisa/TCC dependem de planejamento e autorizações éticas e institucionais aplicáveis. Não realizar coleta com participantes como pesquisa sem encaminhamento prévio.

## Próximas entregas

- [ ] Validação do plano com professor orientador;
- [ ] Revisão documental e contatos institucionais;
- [ ] Refinamento dos critérios de acessibilidade;
- [ ] Especificação e execução da oficina comunitária;
- [ ] Registro autorizado da devolutiva;
- [ ] Avaliação técnica e priorização da evolução para TCC.
