
const { test } = require('@playwright/test');

// Тест 1. Змінні та масиви
test('тестові дані для перевірки логіну', async () => {
    const testEmails = [
        'anna@gmail.com',
        'wrong-email',
        'ivan@test.com',
        '',
        'maria@example.com'
    ];

    console.log('До додавання:', testEmails);

    testEmails.push('another@example.com');

    console.log('Після додавання:', testEmails);

    // Використовуємо let, оскільки значення лічильника змінюється
    let checksPassed = 0;
    console.log('Початковий лічильник:', checksPassed);
});

// Тест 2. Умови та приведення типів
test('перевірка кількості знайдених рецептів', async () => {
    const recipesFoundText = '12';
    const recipesCount = Number(recipesFoundText);

    if (recipesCount === 0) {
        console.log('Рецептів не знайдено');
    } else if (recipesCount === 12) {
        console.log('Знайдено очікувані 12 рецептів');
    } else {
        console.log('Знайдено іншу кількість:', recipesCount);
    }

    const recipeAuthor = null;
    const authorName = recipeAuthor || 'Автор невідомий';

    console.log(authorName);
});

// Тест 3. Цикл for...of, continue та break
test('перебір email через continue і break', async () => {
    const testEmails = [
        'anna@gmail.com',
        'wrong-email',
        'ivan@test.com',
        '',
        'maria@example.com'
    ];

    testEmails.push('another@example.com');

    let checksPassed = 0;

    for (const email of testEmails) {
        if (email === '') {
            console.log('Пропускаємо порожній email');
            continue;
        }

        checksPassed++;
        console.log('Перевіряємо:', email);

        if (email === 'another@example.com') {
            console.log('Знайдено потрібний email. Зупиняємо цикл');
            break;
        }
    }

    console.log('checksPassed:', checksPassed);
});

// Тест 4. Цикли while та do...while
test('зменшення часу приготування через цикли', async () => {
    let cookingTime = 90;

    console.log('Цикл while:');

    while (cookingTime >= 30) {
        console.log(cookingTime);
        cookingTime -= 10;
    }

    console.log(cookingTime);

    cookingTime = 90;

    console.log('Цикл do...while:');

    do {
        console.log(cookingTime);
        cookingTime -= 10;
    } while (cookingTime >= 30);

    console.log(cookingTime);

    // Якщо початковий час менший за 30, while не виконається,
    // а do...while виконається хоча б один раз.
});

