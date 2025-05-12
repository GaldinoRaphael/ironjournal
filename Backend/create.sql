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

create table ironjournal.user (
    user_id uuid not null,
    name text not null,
    password text not null,
    email text not null,
)