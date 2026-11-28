// «Навіщо взагалі займатись автоматизацією?»
//
// QA automation is a cost-effective way to achieve reliable and consistent 
// results. Once tests are written, they can be executed as many times as 
// necessary, especially after every change. This allows more scenarios to 
// be checked in minutes while saving time and reducing manual work. Early 
// and thorough bug detection is especially important for critical features, 
// such as authorization and payment processing. It also gives the team 
// greater confidence when releasing the product.

// ✅ автоматизувати / ⚠️ почекати / ❌ не автоматизувати
//
// Форма логіну - автоматизувати - перевіряється при кожному деплої, стабільна 
// і має високу частоту повторення. 
// Дизайн головної сторінки - почекати - вимоги ще не фіналізовані, тому 
// автоматизовані UI-тести доведеться часто змінювати.
// Генерація 500 тестових юзерів - автоматизувати - це багато повторюване та 
// стабільне завдання з чітким результатом.
// Перевірка зручності онбордингу - не автоматизувати - це завдання потребує 
// людської оцінки.
// Checkout-флоу - автоматизувати - стабільний UI та регулярний запуск двічі на 
// тиждень, критичність завдання оплати для бізнесу.

// проєкт, де немає автоматизації
//
// Пропоную обрати Playwright. Він дозволяє перевіряти роботу застосунку в 
// Chrome, Firefox і Safari, щоб виявляти проблеми, які можуть виникати у 
// користувачів різних браузерів. Playwright автоматично очікує, поки елемент 
// стане доступним для взаємодії, тому нам не доведеться додавати зайві 
// фіксовані паузи та боротися з нестабільними тестами у зв'язку з цим. 

// тести погані чи їх просто ніхто не запускає?
//
// «Коли тести запускали востаннє, які результати вони показали та чи були 
// знайдені ними дефекти, які вдалося відтворити й виправити до релізу?»
// 
// одну зміну ти запропонуєш першою 
//
// Вбудувати в CI/CD невеликий набір із 5 найважливіших smoke-тестів, які 
// перевіряють основні функції застосунку.

// **************************************************************************

// 2 QA + тімлід
//
// 2 QA + тімлід використовує Git.
//      1. 2 QA створюють окремі гілки (branches), пишуть Playwright-тести, 
//      комітять зміни та надсилають Pull Request для перевірки.
//      2. Тімлід переглядає Pull Request, вирішує конфлікти та затверджує 
//      злиття змін у спільну гілку.
//
// один QA на Mac, інший на Windows — як Docker вирішує потенційну проблему 
// між середовищами
// 
// Docker створює стандартне середовище виконання тестів, яке містить необхідну 
// версію Node.js, Playwright та браузери.

// Не оновлюй Node.js — проєкт на попередній версії. Чому це правильне рішення
//
// версія Node.js впливає на сумісність і стабільність проєкту
//
// "engines": { "node": ">=20.0.0 <21.0.0" }
// 
// >=20.0.0 — версія має бути не нижчою за 20.0.0
// <21.0.0 — версія має бути нижчою за 21.0.0

// Microsoft Windows [Version 10.0.26300.9974]
// (c) Microsoft Corporation. All rights reserved.

// Terminal
//
// ...playwright_practice_project\qa_automation>git init
// Initialized empty Git repository in
//
// ...playwright_practice_project\qa_automation>git config --global user.name "Zoryana Bolgarina"
// ...playwright_practice_project\qa_automation>git config --global user.email "dr.bolgarina@gmail.com”
// ...playwright_practice_project\qa_automation>git config --global --list
// user.name=Zoryana Bolgarina
// user.email=dr.bolgarina@gmail.com”

// test-commit.spec.js

// Terminal
//
// ...\playwright_practice_project>node -v
// v26.13.0
// ...\playwright_practice_project>npm -v
// 11.20.0
// ...\playwright_practice_project>git --version
// git version 2.56.1.windows.1
// ...\playwright_practice_project>docker --version
// Docker version 29.9.3, build 5457199

// Встановлено Playwright Test for VSCode, ESLint, Prettier, та GitLens.

// **************************************************************************

// qa-automation/
//      лежить поруч із apps/ і docker-compose.yml
//      містить playwright.config.js і папку tests/

// qa-automation/playwright.config.js
//      use {
//          baseURL: 'http://localhost:5173', ...

// tests/example.spec.js
//      await page.goto('https://playwright.dev/')
//          await гарантує, що навігація завершиться, перш ніж буде виконана 
//          наступна команда
//      await expect(page).toHaveTitle(/Playwright/);
//          await очікує, поки перевірка пройде успішно або завершиться помилкою
//      await page.getByRole('link', { name: 'Get started' }).click();
//          await гарантує, що операція натискання завершиться, перш ніж виконання 
//          продовжиться
//      await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
//          await очікує на результат

// відкриває твій GitHub і бачить форк Tasteorama
//      структуру репозиторію — чи зрозуміло організовані файли та папки
//      git history — чи мають коміти зрозумілі назви та чи видно послідовність 
//      роботи
//      гілки та Pull Requests — чи вмієш ти працювати з Git у командному форматі
//      Playwright-тести — чи правильно вони написані, чи використовують зрозумілі 
//      локатори та assertions
//      .gitignore — чи не потрапили в репозиторій тимчасові файли, node_modules, 
//      звіти тестування та конфіденційні дані
//
// PR для кожного тесту - пушну прямо в main ризики
//      потрапляння помилок у спільний код
//      складніше відстежувати зміни
//      ускладнення інтеграції змін git merge main

// ZoryanaB / playwright_practice_project
// description: qa automation practice project (playwright, javascript)
//
// Вдалося залогінитись тестовим акаунтом із README | goit@gmail.com | Foodies2025!
//
// D:\ua - goit - fullstack web dev n qa\qa manual n qa automation\my project\playwright_practice_project\qa_automation>npx playwright test
// Running 6 tests using 4 workers
//   6 passed (22.9s)

// **************************************************************************

// ...\playwright_practice_project\qa_automation>git log --oneline -5
// 443163d (HEAD -> initproject) feat: test commit for environment setup verification
//
// коміт описує зрозумілі, завершені дії

// ...\playwright_practice_project\qa_automation>git check-ignore -v qa-automation/node_modules/.package-lock.json
// .gitignore:3:node_modules/      qa-automation/node_modules/.package-lock.json
//      .gitignore — файл, у якому знайдено правило
//      3 — номер рядка
//      node_modules/ — правило, яке ігнорує папку node_modules на будь-якому рівні
//      /node_modules/.package-lock.json — файл, який підпадає під це правило
//
// .gitignore запобігає лише новим файлам у відстеженні — для вже закомічених файлів 
// потрібен окремий крок git rm --cached

// git merge main
// ...\playwright_practice_project\qa_automation>git merge main
// merge: main - not something we can merge
//
// гілка створена сьогодні

// чернетка опису Pull Request «Що зроблено → Як перевірити → Нюанси»
// 
// Що зроблено. Створено форк Tasteorama та клоновано репозиторій. Запущено 
// застосунок за допомогою Docker. Створено qa-automation та налаштовано 
// Playwright. Додано test-commit.spec.js та його дані закоммічені. Налаштовано 
// .gitignore. Створено module-1-tasks.spec.js із практичними завданнями. Зміни 
// внесені в окрему гілку. Виконано коміти відповідно до Conventional Commits. 
// 
// Як перевірити. Запустити docker compose up --build. Перевірити 
// http://localhost:5173/. Виконати npx playwright test у qa-automation папці. 
// Переконатися, що всі 6 тестів зелені. Code review. 
//
// Нюанси. git merge main виконати пізніше.

// Встановлено VS Code, Node.js (версія LTS), Git та Docker.
// Зроблено форк репозиторію Tasteorama у свій GitHub-акаунт.
// Клоновано свій форк локально (git clone)
// Запущено застосунок у Docker (docker compose up --build)
// Відкрила http://localhost:5173/
// Відкрила http://localhost:4040/api-docs
// Створено qa-automation папку
// Встановлено в ній Playwright (npm init playwright@latest).
// npx playwright test виконано без посилок

// Створена git checkout -b initproject
// Added to .gitignore
//      node_modules/
//      /qa-automation/test-results/
//      /qa-automation/playwright-report/
//      /qa-automation/blob-report/
//      /qa-automation/playwright/.cache/
//      playwright/.local-browsers/
// Повідомлення коміту оформлено за стандартом Conventional Commits
//      chore: configure Playwright test environment