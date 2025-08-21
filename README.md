# OpenChat Code

Uma interface de linha de comando simples e elegante para interagir com APIs de IA, inspirada na simplicidade do Claude Code.

## Funcionalidades

- **Chat Interativo**: Conversas contínuas com contexto mantido
- **Mensagens Únicas**: Envio direto de comandos
- **Interface Limpa**: Design minimalista focado no conteúdo
- **Banner Elegante**: Apresentação visual com ASCII art
- **Cores Intuitivas**: Diferenciação clara entre usuário e assistente

## Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd openchat-code
```

2. Instale as dependências:
```bash
npm install
```

3. Configure sua chave da API:
```bash
cp .env.example .env
# Edite o arquivo .env e adicione sua OPENAI_API_KEY
```

## Uso

### Chat Interativo
```bash
npm run dev chat
```
- Digite suas mensagens e receba respostas com contexto mantido
- Digite "sair" ou pressione Ctrl+C para encerrar
- Console é limpo automaticamente ao sair

### Mensagem Única
```bash
npm run dev "Sua mensagem aqui"
```

### Comandos de Desenvolvimento
```bash
npm run build    # Compilar TypeScript
npm run start    # Executar versão compilada
npm run dev      # Executar em modo desenvolvimento
```

## Estrutura do Projeto

```
openchat-code/
├── src/
│   ├── app/
│   │   └── index.ts          # Aplicação principal
│   ├── package.json          # Dependências e scripts
│   ├── tsconfig.json         # Configuração TypeScript
│   └── .env.example          # Exemplo de configuração
├── CLAUDE.md                 # Documentação para Claude Code
├── README.md                 # Este arquivo
└── LICENSE.md                # Licença MIT
```

## Tecnologias

- **TypeScript** - Linguagem principal
- **Node.js** - Runtime
- **OpenAI SDK** - Integração com API
- **Commander.js** - Interface CLI
- **Chalk** - Cores no terminal
- **Figlet** - Banner ASCII
- **Readline-sync** - Entrada interativa

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

### Modelos Suportados

O projeto está configurado para usar `gpt-4.1-nano`, mas pode ser facilmente alterado no código.

## Filosofia de Design

Este projeto segue os princípios de:

- **Simplicidade**: Interface limpa sem elementos visuais desnecessários
- **Funcionalidade**: Foco nas necessidades reais do usuário
- **Confiabilidade**: Tratamento adequado de erros e interrupções
- **Extensibilidade**: Código bem estruturado para futuras melhorias

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Faça commit das mudanças
4. Push para a branch
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.

## Contato

Para dúvidas, sugestões ou problemas, abra uma issue no repositório.