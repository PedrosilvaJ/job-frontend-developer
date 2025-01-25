# Sistema Verdes Mares: Frontend Coding Test

# Apresentação

Este projeto tentei desenvolve o codigo visando os principios de codigo limpo, manuteção, suporte,desenpempenho e otimização para entrega todos os requisitos solicitados.
Trabalhei com `vitejs` para poder montar o projeto usando a versão do `React` na extensão `jsx` para construir todas as funcionalidades sempre trabalhando com componentes separados 
para poder organizar melhor o código e mais otimizado isso tambem permite escalabilidade do projeto futuramente se nescessario e no `css` que tambem foi tratado separadamente para cada component assim facilitando a manutenção e suporte.

## Tecnologias utilizadas

- React
- Vite
- Axios (para consumir a API de notícias)
- React Router (para navegação entre páginas)
- Bootsrap
- CSS para estilo



## Instalação

### 1. Clonar o repositório
`git clone https://github.com/PedrosilvaJ/job-frontend-developer.git`

### 2. Navegar para o diretório do projeto                             
`cd job-frontend.developer`

### 3. Instalar as dependências
`npm install` 

### 4. Rodar o projeto
`npm run dev`


### Requisitos Funcinais
- [x] Deve ser possível listar as notícias mais recentes em ordem cronológica;
- [x] Deve ser possível listar as notícias com `thumbnail`, `heading`, `description`, `author`, `image`, `category` e `source`;
- [x] Deve ser possível acessar a notícia pelo `slug`;
- [x] Deve ser possível o usuário buscar notícias desejada pelo `heading`;
- [x] Deve ser possível o usuário buscar notícia por `author`;
- [x] Deve ser possível o usuário ler uma notícia;
- [x] Deve ser possível salvar um `id` da notíca lida;
      
### Regras de negócio
- [x] O usuário não pode ler mais que 2 vezes a mesma notícia;
- [x] O usuário não pode ler uma notícia com o JavaScript desabilitado;
- [ ] O usuário não pode ler uma notícia em modo anônimo;
- [x] O usuário não poderá acessar uma página de categoria;
- [x] O usuário não poderá acessar uma página de author;
- [x] O usuário deverá ser redirecionado para página principal quando tentar acessar a página de categoria;
      
### Requisitos não-funcionais
- [ ] Dynamic Routes: o `slug` da notícida deve ser: `/[category]/[heading]-[id]`
- [x] O `id` da notícia lida precisam estar persistidos em `localStorage`;
- [x] O `id` da notícia persistida em `localStorage`, deve ser retornado quando passado o nome da chave `articles_read`;
- [x] A lista de notícias deve estar paginadas com 20 itens por página;
- [x] A lista de notícias deve exibir as últimas notícias em ordem cronológica;
- [x] O usuário com JavaScript desabilitado no Browser deverá ser direcionado para page-block;
- [ ] O usuário em aba anônimo no Browser deverá ser direcionado para page-block;
- [x] O usuário com mais de 10 leituras diferentes deverá ser direcionado para page-block;

