CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS leaderboard (
    leaderboard_id INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    score VARCHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS  countries (
    country_id SERIAL PRIMARY KEY,
    c_name VARCHAR(100) UNIQUE NOT NULL,
    c_capital VARCHAR(100),
    c_codes VARCHAR(3) UNIQUE,
    c_flag TEXT,
    c_region VARCHAR(50),
    c_population BIGINT,
    c_area INT
);

CREATE TABLE IF NOT EXISTS friends (
    friend_id INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS users_to_leaderboard (
    user_id INT NOT NULL,
    score_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (score_id) REFERENCES leaderboard (leaderboard_id)
);

CREATE TABLE IF NOT EXISTS users_to_friends (
    user_id INT NOT NULL,
    friend_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (friend_id) REFERENCES friends (friend_id)
);