-- @BLOCK
CREATE INDEX birthdays ON Users(discord_id);

-- @BLOCK
CREATE TABLE birthdays(
    id INT AUTO_INCREMENT,
    birthday INT,
    discord_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (owner_id) REFERENCES Users(id)
);

-- @BLOCK
INSERT INTO Rooms (owner_id, street)
VALUES
    (1, 'san diego sailboat'),
    (1, 'Kyoto townhouse'),
    (1, 'French Villa'),
    (1, 'sf cardboard box');

-- @BLOCK
SELECT * FROM users
LEFT JOIN Rooms
ON Rooms.owner_id = Users.id;

-- @block
SELECT 
    Users.id AS user_id,
    Rooms.id AS room_id,
    email,
    street

FROM users
INNER JOIN Rooms ON Rooms.owner_id = Users.id;