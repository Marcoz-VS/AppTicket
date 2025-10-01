# MerendaGo - Sistema de Gerenciamento de Tickets de Refeição

## 📱 Sobre o Projeto

MerendaGo é um aplicativo móvel desenvolvido em React Native que gerencia tickets de refeição para instituições de ensino. O sistema possui dois tipos de usuários: alunos e administradores, cada um com suas respectivas funcionalidades.

## 🚀 Funcionalidades

### Alunos
- Login com matrícula
- Visualização do tempo restante do intervalo
- Geração de tickets de refeição
- Verificação de localização para validar presença na instituição
- Mapa interativo mostrando localização atual e área da instituição

### Administradores
- Login com usuário e senha
- Cadastro de novos alunos
- Visualização de tickets usados no dia
- Histórico completo de tickets

## 📋 Pré-requisitos

- Node.js
- npm ou yarn
- Expo CLI
- React Native
- Um dispositivo móvel ou emulador

## 🔧 Instalação

1. Clone o repositório
```bash
git clone https://github.com/Marcoz-VS/AppTicket.git
```

2. Instale as dependências
```bash
cd AppTicket
npm install
```

3. Inicie o projeto
```bash
npm start
```

## 🛠️ Construído com

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Navigation](https://reactnavigation.org/)
- [Formik](https://formik.org/)
- [Yup](https://github.com/jquense/yup)
- [AsyncStorage](https://react-native-async-storage.github.io/)
- [React Native Maps](https://github.com/react-native-maps/react-native-maps)

## 📱 Telas do Aplicativo

### Área do Aluno
- Login
- Home
- Timer (Intervalo)
- Mapa
- Ticket

### Área do Administrador
- Login Admin
- Cadastro de Alunos
- Tickets Usados Hoje
- Histórico de Tickets

## 🔒 Variáveis de Ambiente

O projeto utiliza as seguintes configurações:

- Coordenadas da escola: `-27.618337, -48.662516`
- Raio de verificação: `500 metros`
- Horário do intervalo: `09:20 - 09:35`

## 👥 Autores

* **Marcos**
* **Fernanda**
* **Isac**

## 📄 Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes
