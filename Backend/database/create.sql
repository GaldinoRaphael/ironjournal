create schema ironjournal;

create table ironjournal.user (
    id serial primery key,
    email text not null,
    name text not null,
    password text not null
)
