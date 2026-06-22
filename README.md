# Project Headliner

Веб-застосунок для пошуку та збереження рецептів. Монорепо з React-фронтендом та Express.js-бекендом на MySQL.

---

## Вміст

- [Технологічний стек](#технологічний-стек)
- [Що потрібно для запуску](#що-потрібно-для-запуску)
- [Швидкий старт](#швидкий-старт)
- [Сервіси та порти](#сервіси-та-порти)
- [Початкові дані](#початкові-дані)
- [Управління даними](#управління-даними)
- [Змінні середовища](#змінні-середовища)
- [Структура проєкту](#структура-проєкту)
- [Часті запитання](#часті-запитання)

---

## Технологічний стек

| Шар | Технологія |
|-----|-----------|
| Frontend | React 19, Vite 7, Redux Toolkit, React Router v7, MUI |
| Backend | Node.js 20, Express.js 5, mysql2 (raw SQL) |
| База даних | MySQL 8.0 |
| Контейнеризація | Docker, Docker Compose |

---

## Що потрібно для запуску

Лише **Docker Desktop** — Node.js, MySQL та всі залежності встановлюються автоматично всередині контейнерів.

### macOS

1. Перейдіть на [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop) та завантажте **Docker Desktop for Mac**
2. Виберіть версію під свій чіп: **Apple Silicon (M1/M2/M3)** або **Intel**
3. Відкрийте завантажений `.dmg` файл і перетягніть Docker у папку `Applications`
4. Запустіть Docker із `Applications` — у меню-барі з'явиться іконка 🐳
5. Дочекайтесь поки статус зміниться на **"Docker Desktop is running"**

### Windows

1. Переконайтесь що увімкнено **WSL 2** (Windows Subsystem for Linux):
   ```powershell
   # Виконайте у PowerShell від імені адміністратора
   wsl --install
   # Після встановлення перезавантажте комп'ютер
   ```
2. Перейдіть на [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop) та завантажте **Docker Desktop for Windows**
3. Запустіть інсталятор, залиште галочку **"Use WSL 2 instead of Hyper-V"**
4. Після встановлення перезавантажте комп'ютер
5. Запустіть Docker Desktop — у системному треї з'явиться іконка 🐳
6. Дочекайтесь статусу **"Docker Desktop is running"**

> **Windows Home** підтримується через WSL 2. **Windows Pro/Enterprise** також може використовувати Hyper-V, але WSL 2 рекомендується.

### Linux (Ubuntu/Debian)

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
# Після цього вийдіть і зайдіть знову (або виконайте: newgrp docker)
```

### Перевірка встановлення

```bash
docker --version
docker compose version
```

---

## Швидкий старт

### 1. Клонуйте монорепо

```bash
git clone <url-репозиторію>
cd qa_automation_monorepo
```

### 2. Запустіть

```bash
docker compose up --build
```

> Перший запуск займає 3–5 хвилин: Docker завантажує образи, встановлює залежності та наповнює базу даних початковими даними.

### 3. Відкрийте у браузері

| Сервіс | URL |
|--------|-----|
| Застосунок (Frontend) | http://localhost:5173 |
| API (Backend) | http://localhost:5000 |
| Swagger документація | http://localhost:5000/api-docs |
| MySQL | localhost:3306 |

---

## Сервіси та порти

```
docker compose up --build
        │
        ├── mysql:3306      MySQL 8.0
        │     └── Автоматично виконує schema.sql + seed.sql при першому запуску
        │
        ├── backend:5000    Express.js API
        │     └── Чекає на готовність MySQL (healthcheck) перед стартом
        │
        └── frontend:5173   React + Vite dev server
              └── Стартує після backend
```

---

## Початкові дані

При першому запуску база автоматично заповнюється:

| Таблиця | Кількість записів |
|---------|-----------------|
| categories | 15 |
| ingredients | 574 |
| recipes | 285 |
| users (seed) | 3 |

### Seed-користувачі

| Email | Пароль | Ім'я |
|-------|--------|------|
| goit@gmail.com | Foodies2025! | GoIT |

> Seed-користувачі призначені для початкового наповнення. Ви можете зареєструвати власний акаунт через інтерфейс застосунку.

---

## Управління даними

### Зупинити (зберегти дані)
```bash
docker compose down
```

### Перезапустити (дані збережуться)
```bash
docker compose up
```

### Повністю скинути базу до початкового стану
```bash
docker compose down -v
docker compose up --build
```
> ⚠️ Прапор `-v` видаляє всі Docker volumes — всі користувацькі дані, рецепти та зображення будуть втрачені.

### Перезбудувати образи без скидання даних
```bash
docker compose up --build
```

---

## Змінні середовища

Усі змінні мають вбудовані значення за замовчуванням — `.env` файл **не обов'язковий** для локального запуску.

Щоб змінити налаштування, скопіюйте та відредагуйте:
```bash
cp .env.example .env
```

### Доступні змінні

```env
# MySQL
MYSQL_ROOT_PASSWORD=rootpassword
MYSQL_USER=headliner
MYSQL_PASSWORD=headliner_pass
MYSQL_DB=headliner_db

# Backend
PORT=5000
MYSQL_HOST=mysql
MYSQL_PORT=3306
APP_DOMAIN=http://localhost:5000

# Frontend
VITE_API_URL=http://localhost:5000
```

> `MYSQL_HOST` та `MYSQL_PORT` у Docker Compose вже встановлені автоматично (`mysql:3306`). Ці змінні потрібні лише при запуску бекенду поза Docker.

---

## Структура проєкту

```
.
├── apps/
│   ├── backend/                 Express.js API
│   │   ├── db/
│   │   │   ├── schema.sql       MySQL схема (7 таблиць)
│   │   │   ├── seed.sql         Початкові дані
│   │   │   └── json-to-seed.mjs Генератор seed.sql з JSON
│   │   ├── public/
│   │   │   ├── avatars/         Аватари користувачів
│   │   │   ├── recipes/         Фото рецептів
│   │   │   └── ingredients/     Фото інгредієнтів
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── services/        Вся логіка роботи з БД (raw SQL)
│   │   │   ├── middlewares/
│   │   │   ├── routers/
│   │   │   └── db/
│   │   │       └── initMySQLConnection.js
│   │   └── Dockerfile
│   │
│   └── frontend/                React + Vite
│       ├── src/
│       │   ├── api/
│       │   ├── components/
│       │   ├── pages/
│       │   └── redux/
│       └── Dockerfile
│
├── db_json/foodies/             Оригінальні MongoDB-колекції (референс)
├── docker-compose.yml
├── .env.example
├── start.sh                     Скрипт запуску (Linux/Mac)
├── start.bat                    Скрипт запуску (Windows)
└── CLAUDE.md
```

### MySQL схема

```
users ──────────┬──── sessions
                │
                ├──── recipes ────── recipe_ingredients ──── ingredients
                │
                └──── user_favorites (junction)
                           │
                        recipes

categories   (довідник, рядок у recipes.category)
```

---

## Часті запитання

**Перший запуск дуже довгий — це нормально?**
Так. Docker завантажує образи Node.js та MySQL (~500MB), встановлює npm-залежності та завантажує 285 рецептів у базу. Наступні запуски (`docker compose up`) стартують за 10–15 секунд.

**Backend не стартує і пише "MySQL connection failed"?**
MySQL потребує до 30 секунд на ініціалізацію при першому запуску. Backend автоматично чекає через healthcheck — зазвичай це вирішується само. Якщо проблема залишається:
```bash
docker compose logs mysql
```

**Як підключитись до MySQL напряму?**
```bash
docker compose exec mysql mysql -u headliner -pheadliner_pass headliner_db
```

**Як переглянути логи окремого сервісу?**
```bash
docker compose logs backend
docker compose logs frontend
docker compose logs mysql
```

**Як оновити seed-дані після зміни JSON-файлів?**
```bash
node apps/backend/db/json-to-seed.mjs   # генерує новий seed.sql
docker compose down -v                   # скидає volume
docker compose up --build                # запускає з новими даними
```
