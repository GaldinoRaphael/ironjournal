create schema ironjournal;

create table ironjournal."user" (
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
);

create table ironjournal.workout (
    workout_id uuid primary key,
    user_id uuid NOT NULL REFERENCES ironjournal.user(user_id),
    name text not null,
    description text
);

create table ironjournal.workout_set (
    workout_set_id uuid primary key,
    workout_id uuid NOT NULL REFERENCES ironjournal.workout(workout_id) ON DELETE CASCADE,
    exercise_id uuid NOT NULL REFERENCES ironjournal.exercise(exercise_id),
    weight integer,
    reps integer,
    type text
);
