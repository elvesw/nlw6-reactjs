<p align="center">
  <img alt="Letmeask" src=".github/logo.svg" width="160px">
</p>

<p align="center">

  <img src="https://img.shields.io/static/v1?label=NLW&message=06&color=8257E5&labelColor=505050" alt="NLW Together 06" />

  <a href="https://www.linkedin.com/in/elves/">
    <img alt="LinkedIn" src="  https://img.shields.io/badge/Elves-0077B5?style=flag&for-the-badge&logo=linkedin&logoColor=white">
  </a>

  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/elvesw/nlw6-reactjs.svg">

   <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/elvesw/nlw6-reactjs?color=%2304D361">


  <img alt="Repository size" src="https://img.shields.io/github/repo-size/elvesw/nlw6-reactjs">
	
  <a href="https://github.com/elvesw/nlw6-reactjs/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/elvesw/nlw6-reactjs">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen" alt="License">

  <img src="https://img.shields.io/github/stars/elvesw/nlw6-reactjs" alt="Stars">

</p>

<h1 align="center">
    <img alt="Letmeask" src=".github/pages.gif" />
</h1>

<br>

## ✅ Features
- [x] Autenticação com conta Google
- [x] Página com sala exclusiva para perguntas da sua audiência
- [x] Página de perfil com todas salas criadas pelo usuário
- [x] Página com todas as salas, abertas para perguntar e fechadas para rever as perguntas
- [ ] Layout responsivo
- [ ] Tema Dark e Light


## ✔️ Demonstração da aplicação
Hospedado Firebase Hosting, veja como ficou, deixe seu _Oieee_ registrado.
- [https://letmeask-a0347.web.app](https://letmeask-a0347.web.app/rooms/-MdFlb6GTIK7Mct1l1wI)

## 🧪 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [![ReactJS](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org)
- [![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
- [![Typescript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
## 🚀 Como executar

Clone o projeto e acesse a pasta do mesmo.

```bash
$ git clone https://github.com/elvesw/nlw6-reactjs
$ cd nlw6-reactjs
```

Para iniciá-lo, siga os passos abaixo:
```bash
# Instalar as dependências
$ yarn

# Cria um arquivo .env.local
$ copy .env.example .env.local
```

Lembrando que será necessário criar uma conta no [Firebase](https://firebase.google.com/) e um projeto para disponibilizar um Realtime Database.
Verificar as informações da apiKey do seu projeto firebase e demais informações, conforme imagens abaixo.

![Configurações do projeto](.github/settings_general.png)

![Configuração do SDK](.github/settings_sdk.png)

E em seguida colocar as informações no arquivo .env.local

![Configuração do .env.local](.github/settings_env.png)

Para iniciá-lo, siga os passos abaixo:
```bash
# o projeto está pronto para iniciar
$ yarn start
```
O app estará disponível no seu browser pelo endereço http://localhost:3000

## 🔥 Deploy no Firebase
```bash
# Instala o firebase-tools global
$ npm install -g firebase-tools 

# Abre uma página da Web que se conecta ao código localhost
$ firebase login

# Inicializa um projeto do Firebase
$ firebase init

# Build do projeto
$ yarn build

# Deploy do projeto no Firebase
$ firebase deploy
```
![Deploy](.github/deploy.png)
## 💻 Projeto

Letmeask é perfeito para criadores de conteúdos poderem criar salas de Q&A com o seu público, de uma forma muito organizada e democrática. 

Exemplo: uma live com 5000 pessoas online, fica difícil responder a todos, mais é possível responder as mais votadas pela galera.

Este é um projeto desenvolvido durante a **[Next Level Week Together](https://nextlevelweek.com/)**, apresentada dos dias 20 a 27 de Junho de 2021.


## 🔖 Layout

Você pode visualizar o layout do projeto através do link abaixo:

- [Layout Web](https://www.figma.com/file/u0BQK8rCf2KgzcukdRRCWh/Letmeask/duplicate) 

Lembrando que você precisa ter uma conta no [Figma](http://figma.com/).

## 📝 License

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

Valeu - NLW06 Together👋🏻 [Participe da comunidade da Rocketseat!](https://discord.gg/gKUVrzrPrU)
