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

## Cria um Treino
Realiza o cadastro de um treino
Um treino deve conter um nome
Deve ser possível inserir multiplos exercícios em um treino
Deve ser possível adicionar número de sets de exercícios
Deve ser possível adicionar número de repetições por exercício


**Input**: Nome
**Output**: Id, Nome

Regra:

* Id é incrementado automaticamente
* Nome não pode ser duplicado
* Deve ignorar case


### Modelos de dados

create schema ironjournal;

create table ironjournal.user (
    user_id uuid primary key,
    email text not null,
    name text not null,
    password text not null
);

create table ironjournal.exercise (
    exercise_id uuid primary key,
    name text not null
);

create table ironjournal.training_sheet (
    training_sheet_id uuid primary key,
    name text not null
)

create table ironjournal.workout (
    workout_id uuid primary key,
    user_id uuid NOT NULL REFERENCES user(user_id),
    name text not null,
    description text,
)

create table ironjournal.workout_set{
    workout_set_id uuid primary key,
    workout_id uuid NOT NULL REFERENCES workout(workout_id) ON DELETE CASCADE,
    exercise_id uuid NOT NULL REFERENCES exercise(exercise_id),
    weight integer,
    reps integer,
    type string
}