CREATE DATABASE IF NOT EXISTS tanos;

-- Criação das tabelas

CREATE TABLE users (
  userId serial PRIMARY KEY,
  nome varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  senha varchar(255) NOT NULL
);

CREATE TABLE spending (
  compraId serial PRIMARY KEY,
  descricao varchar(255) NOT NULL,
  valor numeric(10, 2) NOT NULL,
  dataCompra date NOT NULL,
  categoria varchar(255) NOT NULL,
  recorrencia varchar(255) NOT NULL,
  statusPagamento varchar(255) NOT NULL,
  userId integer REFERENCES users (userId)
);

CREATE TABLE services (
  serviceId serial PRIMARY KEY,
  nome varchar(255) NOT NULL,
  valor numeric(10, 2) NOT NULL,
  descricao text,
  userId integer REFERENCES users (userId)
);

CREATE TABLE clients (
  clientId serial PRIMARY KEY,
  nome varchar(255) NOT NULL,
  email varchar(255),
  cpf varchar(14),
  imagem varchar(255),
  userId integer REFERENCES users (UserId)
);

CREATE TABLE projects (
  projectId serial PRIMARY KEY,
  titulo varchar(255) NOT NULL,
  descricao text,
  dataPedido date NOT NULL,
  dataEntrega date NOT NULL,
  status varchar(255) NOT NULL,
  userId integer REFERENCES users (userId),
  clientId integer REFERENCES clients (clientId)
);


CREATE TABLE phones (
  numero varchar(20) PRIMARY KEY,
  tipoTelefone varchar(255),
  clientId integer REFERENCES clients (clientId)
);

CREATE TABLE socialMedia (
  socialId serial PRIMARY KEY,
  nome varchar(255) NOT NULL,
  linkRede varchar(255),
  clientId integer REFERENCES clients (clientId)
);

-- Fim da criação das tabelas


INSERT INTO users (nome, email, senha) VALUES ('Nycole Ribeiro', 'rpnyck@gmail.com', 'Senha123');
