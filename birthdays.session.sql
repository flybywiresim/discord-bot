-- @BLOCK
CREATE INDEX birthdays ON Users(discord_id);

-- @BLOCK
CREATE TABLE birthdays(
    id INT AUTO_INCREMENT,
    birthday INT,
    discord_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (discord_id) REFERENCES Users(id)
);

-- @BLOCK
INSERT INTO birthdays (discord_id)
VALUES
    (1, '111999'),
    (1, '111994'),
    (1, '111995'),
    (1, '111990');

-- @BLOCK
SELECT * FROM users
LEFT JOIN discord_id
ON users.discord_id = Users.id;

-- @block
SELECT 
    Users.id AS discord_id
    birthday.id AS birthday_id,
    discord_id
    birthday

FROM users
INNER JOIN birthday ON birthday.id = Users.id;