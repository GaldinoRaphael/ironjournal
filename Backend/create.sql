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
CREATE TABLE ironjournal.workout (
    workout_id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    FOREIGN KEY (user_id) REFERENCES ironjournal.user(user_id) ON DELETE CASCADE
);

CREATE TABLE ironjournal.workout_set (
    workout_set_id UUID PRIMARY KEY,
    workout_id UUID NOT NULL,
    exercise_id UUID NOT NULL,
    load INTEGER,
    reps INTEGER,
    type TEXT,
    FOREIGN KEY (workout_id) REFERENCES ironjournal.workout(workout_id) ON DELETE CASCADE,
    FOREIGN KEY (exercise_id) REFERENCES ironjournal.exercise(exercise_id)
);
