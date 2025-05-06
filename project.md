# iron journal

O objetivo deste projeto é criar um diário de academia, em uma aplicação mobile, com layout simples. Onde será possível lançar treinos pré definidos e visualizar o histórico 

Os treinos são associados a um usuário identificado por e-mail e senha

Cada usuário pode criar inúmeras planilhas de treino, lançar seus treinos e fazer o acompanhamento da evolução por meio de gráficos

### Use cases

## Signup
Cria conta na plataforma

## Login
Realiza o login na plataforma

## Cria Exercicio
Realiza o cadastro do exercício

**Input**: Nome
**Output**: Id, Nome

Regra:

* Id é incrementado automaticamente
* Nome não pode ser duplicado
* Deve ignorar case


### Modelos de dados

create schema ironjournal;

create table ironjournal.user {
    email text,
    name text,
    password text
    primary key (email)
}


create table ironjournal.exercise {
    id numeric,
    name text,
    primary key (id)
}