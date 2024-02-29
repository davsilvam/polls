# Polls

## :bookmark: **Sumário**
- [Sobre o Projeto](#bar_chart-sobre-o-projeto)
- [Rotas do Projeto](#file_folder-rotas-do-projeto)
- [Tecnologias](#wrench-tecnologias)
   - [Construção da API](#construção-da-api)
   - [Testes](#testes)
   - [IDE, Versionamento e Deploy](#ide-versionamento-e-deploy)
- [Configurações e Instalação](#rocket-configurações-e-instalação)
     - [Requisitos](#requisitos)
- [Licença](#balance_scale-licença)

## :bar_chart: **Sobre o Projeto**

Essa é uma API de enquetes com consulta em tempo real. 

## :file_folder: Rotas do Projeto

> - **`POST` /polls** _Cria uma enquete._
> - **`GET` /polls/{:pollId}** _Obtém uma enquete pelo seu Id._
> - **`POST` /polls/{:pollId}/votes** _Vota em uma enquete._
> - **`GET | WS` /polls/{:pollId}/results** _Obtém o resultado da enquete ._

## :wrench: **Tecnologias**

Tecnologias utilizadas no projeto.

### **Construção da API**

- [TypeScript](https://www.typescriptlang.org)
- [Fastify](https://fastify.dev)
- [Node.js](https://nodejs.org/en)
- [ioredis](https://github.com/redis/ioredis)
- [Zod](https://zod.dev)

### **Banco de Dados**

- [PostgreSQL](https://www.postgresql.org)
- [Redis](https://redis.io/)

### **Testes**

- [Vitest](https://vitest.dev)

### **IDE, Versionamento e Deploy**

- [Visual Studio Code](https://code.visualstudio.com)
- [Git](https://git-scm.com)
- [GitHub](https://github.com)
- [Render](https://render.com)

## :rocket: **Configurações e Instalação**

### Requisitos

- [Node](https://nodejs.org/) e [pnpm](https://pnpm.io/pt/).
- Teste das chamadas realizados com [HTTPie](https://httpie.io/desktop) e [Hoppscotch](https://hoppscotch.io/pt-br/).

```sh
# Caso não tenha o pnpm, execute:
npm install -g pnpm
```

Recomendo que veja a [documentação de configuração do Fastify](https://fastify.dev/docs/latest/Reference/).

```sh
# Clonando o projeto
git clone https://github.com/davsilvam/polls.git

# Instalando as dependências
pnpm install

# Rodar o servidor em desenvolvimento
pnpm dev
```

## :balance_scale: **Licença**

Esse projeto está sob a [licença MIT](https://github.com/davsilvam/polls/blob/main/LICENSE.md).

---

Feito com 💚 e ☕ por <a href="https://www.linkedin.com/in/davsilvam/">David Silva</a>.

> [Portfólio](https://davidsilvam.vercel.app) &nbsp;&middot;&nbsp;
> GitHub [@davsilvam](https://github.com/davsilvam) &nbsp;&middot;&nbsp;
> Instagram [@davsilvam_](https://www.instagram.com/davsilvam_/)
