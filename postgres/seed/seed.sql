BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined) VALUES('jessie', 'jessie@gmail.com', 5, '2018-01-10');
INSERT into login (hash, email) VALUES('$2y$12$.0TWb9QzHVElj5AAhaknYuFY/Xwx9hEXhLgmUDs3ox8d8Q0lsQwGC', 'jessie@gmail.com')

COMMIT;