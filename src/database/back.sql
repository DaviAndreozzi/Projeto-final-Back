-- Active: 1688481738794@@127.0.0.1@3306
CREATE TABLE users(
    id TEXT PRIMARY KEY NOT NULL,
    apelido TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    role NOT NULL,
    created_at TEXT DEFAULT(DATETIME())
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
    creator_id TEXT NOT NULL,
    conteudo TEXT NOT NULL,
    likes TEXT DEFAULT(0) NOT NULL,
    dislikes TEXT DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id)
 );

INSERT INTO postagens(id,creator_id,conteudo)
VALUES
('p001', '01', 'Porque calsa agente bota e bota agente calsa?'),
('p002', '03', 'Somos grãos de areia em meio a esse universo tão maravilhoso!^^');

 SELECT * FROM postagens;



CREATE TABLE likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY(post_id) REFERENCES post(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

INSERT INTO likes_dislikes (user_id,post_id,like)
VALUES
('01','p001',1),
('03','p001',1),
('01','p002',1),
('02','p002',0),
('03','p002',0);

SELECT * FROM likes_dislikes;

CREATE TABLE comentarios(
  id TEXT UNIQUE PRIMARY KEY NOT NULL,
    id_user NOT NULL,
    id_post NOT NULL,
    comentarios TEXT NOT NULL,
    likes INTEGER NOT NULL,
    dislikes INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT ,
    Foreign Key (id_user) REFERENCES users(id),
    Foreign Key (id_post) REFERENCES post(id)
);

CREATE TABLE like_dislike_comentario_post(
    id_user TEXT NOT NULL,
    id_comment TEXT NOT NULL,
    like INTEGER,

    Foreign Key (id_user) REFERENCES users(id),
    Foreign Key (id_comment) REFERENCES comment_post(id)
);
