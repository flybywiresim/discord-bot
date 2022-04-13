-- @block
CREATE TABLE birthdays (
        id int auto_increment primary key,
        username varchar (100),
        userid varchar(100),
        birthdate date,
        lastnotified date,
        status varchar(30)
);


-- @block 
INSERT INTO birthdays (username, userid, birthdate, lastnotified)
VALUES  

-- @block
SELECT * FROM birthdays;