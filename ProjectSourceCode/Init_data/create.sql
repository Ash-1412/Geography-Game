CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS leaderboard (
    id INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    score VARCHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS  locations (
    id INT PRIMARY KEY,
    location VARCHAR(100) NOT NULL,
    facts VARCHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS friends (
    id INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS users_to_leaderboard (
    username_id INT NOT NULL,
    score_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS users_to_friends (
    username_id INT NOT NULL,
    friend_id INT NOT NULL
);