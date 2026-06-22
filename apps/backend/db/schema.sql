CREATE DATABASE IF NOT EXISTS headliner_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE headliner_db;

CREATE TABLE IF NOT EXISTS categories (
  id   INT          AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS ingredients (
  id   VARCHAR(36)  NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  `desc` TEXT       NOT NULL,
  img  VARCHAR(500) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id         INT          AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  email      VARCHAR(255) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  avatar     VARCHAR(500)          DEFAULT NULL,
  created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS recipes (
  id           INT          AUTO_INCREMENT PRIMARY KEY,
  title        VARCHAR(255) NOT NULL,
  category     VARCHAR(255) NOT NULL,
  owner_id     INT          NOT NULL,
  area         VARCHAR(255)          DEFAULT NULL,
  calories     INT                   DEFAULT NULL,
  instructions TEXT         NOT NULL,
  description  TEXT         NOT NULL,
  thumb        VARCHAR(500)          DEFAULT NULL,
  time         VARCHAR(100) NOT NULL,
  created_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_recipe_owner FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS recipe_ingredients (
  id            INT         AUTO_INCREMENT PRIMARY KEY,
  recipe_id     INT         NOT NULL,
  ingredient_id VARCHAR(36) NOT NULL,
  measure       VARCHAR(100) NOT NULL,
  CONSTRAINT fk_ri_recipe     FOREIGN KEY (recipe_id)     REFERENCES recipes     (id) ON DELETE CASCADE,
  CONSTRAINT fk_ri_ingredient FOREIGN KEY (ingredient_id) REFERENCES ingredients (id)
);

CREATE TABLE IF NOT EXISTS user_favorites (
  user_id   INT NOT NULL,
  recipe_id INT NOT NULL,
  PRIMARY KEY (user_id, recipe_id),
  CONSTRAINT fk_fav_user   FOREIGN KEY (user_id)   REFERENCES users   (id) ON DELETE CASCADE,
  CONSTRAINT fk_fav_recipe FOREIGN KEY (recipe_id) REFERENCES recipes (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sessions (
  id                      INT          AUTO_INCREMENT PRIMARY KEY,
  user_id                 INT          NOT NULL,
  access_token            VARCHAR(500) NOT NULL,
  refresh_token           VARCHAR(500) NOT NULL,
  access_token_valid_until  DATETIME   NOT NULL,
  refresh_token_valid_until DATETIME   NOT NULL,
  created_at              TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at              TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_session_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);
