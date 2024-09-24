
# Crochet - Gerenciador de Linhas para Crochê

Este projeto é uma API construída com TypeScript e arquitetura Clean Architecture para gerenciar informações sobre linhas de crochê. O projeto oferece funcionalidades CRUD (Create, Read, Update, Delete) para manipular dados de linhas, como fio, composição, comprimento, peso, tamanho de agulhas e muito mais.

## Funcionalidades

- **CREATE (Criar uma linha)**: Adiciona uma nova linha de crochê ao banco de dados, gerando automaticamente um id e a data de criação.
- **LISTALL (Listar todas as linhas)**: Recupera e exibe todas as linhas de crochê armazenadas.
- **UPDATE (Atualizar uma linha)**: Atualiza as informações de uma linha específica.
- **DELETE (Deletar uma linha)**: Remove uma linha de crochê do banco de dados.

## Estrutura de Domínio

O projeto lida com um objeto de domínio que contém as seguintes propriedades:

```json
{
  "id": "string",
  "created_at": "string",
  "fio": "string",
  "tex": "number",
  "composicao": "string",
  "comprimento": "string",
  "peso": "string",
  "agulha_croche_minimo": "string",
  "agulha_croche_maximo": "string",
  "agulha_trico_minimo": "string",
  "agulha_trico_maximo": "string",
  "quantidade_cores": "number",
  "malha_rendimento_dimensao": "string",
  "malha_rendimento_agulha_trico": "string"
}
```

## Arquitetura

O projeto segue a Clean Architecture, separando responsabilidades em camadas:

- **Domain**: Define as interfaces de dados e o modelo de domínio.
- **Application**: Contém os casos de uso (Use Cases), como criar, listar, atualizar e deletar uma linha.
- **Infrastructure**: Implementa a persistência dos dados, utilitários, e configuração das dependências.
- **Interface**: Responsável por lidar com as requisições HTTP e interagir com os casos de uso.

## Estrutura de Diretórios

```
crochetype/
├── src/
│   ├── application/
│   │   ├── repositories/
│   │   ├── use-cases/
│   ├── domain/
│   │   └── crochet.ts
│   ├── infrastructure/
│   │   ├── database/
│   │   └── utils/
│   ├── interface/
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Como Rodar o Projeto

### Clonar o repositório:

```bash
git clone https://github.com/usuario/crochetype.git
cd crochetype
```

### Instalar dependências:

```bash
npm install
```

### Iniciar o servidor:

```bash
npm start
```

O servidor será iniciado na porta 3333.

## Rotas Disponíveis e testes no Postman

- `POST /crochets`: Cria uma nova linha de crochê.
  
  Exemplo de corpo da requisição:
  
  ```json
  {
    "fio": "277 Tex",
    "composicao": "100% Acrílico",
    "comprimento": "360 m",
    "peso": "100 g",
    "agulha_croche_minimo": "3.0 mm",
    "agulha_croche_maximo": "4.0 mm",
    "agulha_trico_minimo": "4.0 mm",
    "agulha_trico_maximo": "5.5 mm",
    "quantidade_cores": 26,
    "malha_rendimento_dimensao": "30 cm x 102 cm",
    "malha_rendimento_agulha_trico": "5.0 mm"
  }
  ```
    ![Minha Imagem](/src/media/create.png)

- `GET /crochets`: Lista todas as linhas de crochê.

    ![Minha Imagem](/src/media/listall.png)


- `PUT /crochets/:id`: Atualiza uma linha específica com base no id.

    ![Minha Imagem](/src/media/update.png)

- `DELETE /crochets/:id`: Deleta uma linha de crochê com base no id.

    ![Minha Imagem](/src/media/delete.png)


## Tecnologias Utilizadas

- **TypeScript**
- **Express.js**
- **Clean Architecture**
- **ts-node-dev**

## Contribuições

Sinta-se à vontade para contribuir com o projeto, seja reportando problemas, sugerindo melhorias ou enviando pull requests.
