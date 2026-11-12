CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS leaderboard (
    leaderboard_id INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    score VARCHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS  locations (
    location_id INT PRIMARY KEY,
    location VARCHAR(100) NOT NULL,
    facts VARCHAR(60) NOT NULL
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