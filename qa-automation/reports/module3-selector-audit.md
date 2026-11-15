
# Аудит локаторів і DOM Tasteorama

## Крок 2. Форма входу

| Елемент | Атрибути | Пріоритет | Локатор |
|---|---|---|---|
| Email |id="email", type="email", name="email", placeholder="email@gmail.com" |1 | #email|
| Password | `id="password"`, `type="password"`, `name="password"`, `placeholder="*********"` | 1 | `#password` |
| Кнопка входу | `type="submit"`, `class="LoginPage-module_loginBtn_asHm3"` | 2 | `button[type="submit"]` |

## Крок 3. Картки рецептів

- Однакових кнопок збереження: 12
- Найближчий спільний предок: `article.RecipeCard-module_card_uHg1E`
- Кнопка збереження є вкладеним елементом

## Крок 3. Картки рецептів

- Однакових кнопок збереження: 12
- Найближчий спільний предок: `article.RecipeCard-module_card_uHg1E`
- Кнопка збереження є вкладеним елементом, а не прямою дитиною картки.

| Елемент | Комбінатор | Результат перевірки |
|---|---|---|
| Картка → назва рецепта | Пробіл ` ` | 12 |
| Картка → назва рецепта | `>` | 0 |
| Картка → кнопка збереження | Пробіл ` ` | 12 |
| Картка → кнопка збереження | `>` | 0 |

## Крок 4. Перевірка неправильного пароля

- Селектор повідомлення: не знайдено
- Кількість знайдених повідомлень: 0 (`.Toastify__toast`)
- Елементи `[role="alert"]`: 0
- Помилки в Console: помилок застосунку не виявлено
- Попередження: preload шрифту Montserrat не використано
- Статус запиту: `401 Unauthorized`
- Час запиту: `53 мс`
- URL запиту: `http://localhost:4040/api/auth/login`
- Відповідь сервера: `UnauthorizedError`

## Крок 5. Перевірка CSS-селекторів

| Перевірка | Команда | Результат |
|---|---|---|
| Поля пароля | `input[type="password"]` | 2 |
| Поле за id | `#password` | 1 |
| Чекбокс всередині label | `label[for="terms"] > input[type="checkbox"]` | 1 |
| Елемент після чекбокса | `input#terms + span` | 1 |
| Чекбокс до кліку | `#terms:checked` | 0 |
| Чекбокс після кліку | `#terms:checked` | 1 |
| Неактивні кнопки | `button:disabled` | 1 |
| Кнопка попередньої сторінки | `button[aria-label="previous page"]` | 1 |

## Підсумок

|| Елемент | Сторінка | Локатор | Пояснення |
|---|---|---|---|
| Email | Login | `#email` | Унікальний id |
| Password | Login | `#password` | Унікальний id |
| Кнопка входу | Login | `button[type="submit"]` | Атрибут type |
| Кнопки збереження рецептів | Recipes | `button[data-testid="Save recipe button"]` | Знайдено 12 кнопок |
| Назва рецепта | Recipes | `article.RecipeCard-module_card_uHg1E p[data-testid="Recipe title"]` | Вкладений елемент, 12 збігів |
| Кнопка збереження в картці | Recipes | `article.RecipeCard-module_card_uHg1E button[data-testid="Save recipe button"]` | Вкладений елемент, 12 збігів |
| Повідомлення про помилку | Login | `.Toastify__toast` | 0 збігів |
| Поле пароля | Register | `#password` | Унікальний id |
| Повтор пароля | Register | `#repeatPassword` | Унікальний id |
| Чекбокс | Register | `#terms` | Унікальний id |
| Елемент після чекбокса | Register | `input#terms + span` | Сусідній елемент |
| Попередня сторінка | Recipes | `button[aria-label="previous page"]` | 1 збіг |