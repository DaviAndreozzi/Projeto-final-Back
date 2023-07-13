-- Active: 1688481738794@@127.0.0.1@3306
CREATE TABLE users(
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  apelido TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at TEXT DEFAULT(DATETIME()) NOT NULL
);

INSERT INTO users(id, apelido, email, password,role)
 VALUES
 ('01','Davi','Davi@gmail.com','123456789','ADMIN'),
 ('02','Larrysa','Lary@gmail.com','40028922','NORMAL'),
 ('03','Leticia','Leticia@gmail.com','22982004','NORMAL'),
 ('04','Karlos','Karlos@gmail.com','784572485','ADMIN');

 SELECT * FROM users;


 CREATE TABLE postagens(
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  creator_id TEXT UNIQUE NOT NULL,
  conteudoDaPostagem TEXT NOT NULL,
  likes INTEGER DEFAULT (0) NOT NULL,
  dislikes INTEGER DEFAULT (0) NOT NULL,
  created_at TEXT DEFAULT(DATETIME()) NOT NULL,
  updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
  Foreign Key (creator_id) REFERENCES users(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE
 );


INSERT INTO postagens(id,creator_id,conteudoDaPostagem)
VALUES
('p001', '01', 'Porque calsa agente bota e bota agente calsa?'),
('p002', '03', 'Somos grãos de areia em meio a esse universo tão maravilhoso!^^');

 SELECT * FROM postagens;

CREATE TABLE likes_dislikes(
  user_id TEXT NOT NULL,
  postagens_id TEXT NOT NULL,
  like INTEGER NOT NULL,
  Foreign Key (user_id) REFERENCES users(id),
  Foreign Key (postagens_id) REFERENCES postagens(id)
);

INSERT INTO likes_dislikes (user_id,postagens_id,like)
VALUES
('01','p001',1),
('03','p001',1),
('01','p002',1),
('02','p002',0),
('03','p002',0);

SELECT * FROM likes_dislikes;

CREATE TABLE comentarios(
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  creator_id TEXT UNIQUE NOT NULL,
  comentarios TEXT NOT NULL,
  likes INTEGER DEFAULT (0) NOT NULL,
  dislikes INTEGER DEFAULT (0) NOT NULL,
  created_at TEXT DEFAULT(DATETIME()) NOT NULL,
  updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
  Foreign Key (creator_id) REFERENCES postagens(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE
);


INSERT INTO comentarios(id,creator_id,comentarios)
VALUES
("c001","02","ksksk Boa"),
("c002","04","Realmente incrivel!!");

SELECT * FROM comentarios;


