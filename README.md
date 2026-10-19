# Cuidar Muriaé — Projeto de Extensão

**MVP 0.1 | Protótipo acadêmico independente, em desenvolvimento**

Plataforma informacional responsiva para orientar a navegação por informações públicas de hospitais em **Muriaé, Minas Gerais**. O piloto considera duas instituições:

- **Fundação Cristiano Varella (FCV)** — Hospital do Câncer de Muriaé;
- **Hospital São Paulo** — Casa de Caridade de Muriaé.

A proposta é parte de um projeto de extensão universitária em planejamento. **Não existe neste momento parceria ou aprovação institucional declarada** e as informações não representam orientações operacionais vigentes dos hospitais.

## Demonstração

O site funciona sem backend e sem banco de dados. O fluxo de publicação automática está em `.github/workflows/pages.yml`. Para habilitar o site pela primeira vez:

1. Abra **Settings → Pages** neste repositório.
2. Em **Build and deployment → Source**, selecione **GitHub Actions** (não "Deploy from a branch").
3. Abra **Actions → Publicar protótipo no GitHub Pages → Run workflow**, selecionando `main`, se a execução anterior não tiver concluído.
4. Confira o resultado da execução e, depois da publicação bem-sucedida, acesse o endereço **https://dhaniels1.github.io/Projeto-Extensao/**.

**Importante:** o endereço acima é o destino previsto. **Não considere o site publicado até a execução concluir e o link responder corretamente.** O repositório é público e a plataforma deve continuar claramente identificada como protótipo acadêmico independente.

### Execução local

```bash
git clone https://github.com/Dhaniels1/Projeto-Extensao.git
cd Projeto-Extensao
python -m http.server 8000
```

Acesse **http://localhost:8000**. Também é possível usar a extensão Live Server do VS Code.

> A utilização direta de `file://` pode bloquear módulos JavaScript no navegador. Por isso, recomenda-se um servidor HTTP local.

## Funcionalidades do MVP

- Seleção entre FCV e Hospital São Paulo;
- Temas específicos de cada instituição;
- Busca de assunto;
- Consulta à fonte oficial do conteúdo;
- Seleção informacional por setor no Hospital São Paulo;
- Sinalização de conteúdo localizado, mas ainda em revisão, e de informações pendentes;
- Navegação por teclado, layout responsivo e ampliação de texto;
- Página sobre a proposta e suas limitações.

## Segurança informacional e limites

Este MVP **não**:

- faz triagem, diagnóstico, recomendações clínicas ou tratamento;
- exibe disponibilidade de leitos, faz reservas, internações, altas ou agendamentos;
- coleta, guarda ou transmite dados pessoais ou prontuários;
- acessa sistemas internos das instituições;
- confirma automaticamente horários de visitas ou documentação obrigatória de internação.

A Casa de Apoio da FCV **não** equivale a um leito de internação. Documentos publicados pelo Hospital São Paulo apresentam situações que exigem revisão de vigência e confirmação institucional; portanto, regras específicas não são divulgadas como atuais.

**Revisar documentação e obter as autorizações acadêmicas, éticas e institucionais aplicáveis antes de realizar atividades com pacientes e acompanhantes.**

## Organização do código

| Arquivo | Responsabilidade |
| --- | --- |
| `index.html` | Estrutura semântica e acessível |
| `styles.css` | Aparência responsiva |
| `data.js` | Catálogo informacional e validação básica |
| `app.js` | Navegação, busca, seleção e renderização |
| `tests.mjs` | Verificações automatizadas do catálogo |
| `docs/ESCOPO_E_GOVERNANCA.md` | Escopo da extensão e política de conteúdo |
| `.github/workflows/ci.yml` | Testes em pull requests e atualizações |
| `.github/workflows/pages.yml` | Testes e publicação estática automática no GitHub Pages |

## Testes

Requer **Node.js 20+**. Nenhuma dependência externa é necessária.

```bash
npm test
node --check app.js
node --check data.js
```

## Evolução prevista

1. Conferir o escopo com o orientador e os requisitos da extensão universitária;
2. Validar as fontes públicas e solicitar confirmação institucional das informações administrativas;
3. Revisar linguagem simples e acessibilidade com avaliação autorizada;
4. Planejar a oficina comunitária e a devolutiva;
5. Registrar resultados e consolidar requisitos de uma fase futura do TCC.

## Fontes institucionais consultadas

- [FCV — Orientações aos pacientes](https://fcv.org.br/orientacoes-aos-pacientes/)
- [FCV — Casa de Apoio](https://fcv.org.br/casa-de-apoio/)
- [Hospital São Paulo — Normas para visitantes e acompanhantes](https://www.hsp.org.br/noticia/detalhe/1923/normas-e-regras-para-visitantes-e-acompanhantes)
- [Hospital São Paulo — Orientação sobre documentos](https://hsp.org.br/noticia/detalhe/1958/antes-de-vir-ao-hospital-organize-os-seus-documentos)

Consulte o registro e a classificação das fontes no catálogo do projeto. **Fontes públicas localizadas não são equivalentes à validação de regras vigentes.**

---

**Estado do trabalho:** prova de conceito acadêmica, não serviço oficial de saúde.