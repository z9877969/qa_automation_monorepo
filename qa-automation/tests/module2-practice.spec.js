import { test } from '@playwright/test';

test('Масиви та змінні', async () => {
    // Масив тестових email-адрес
    const testEmails = [
        'user@example.com',
        'admin@gmail.com',
        'invalid-email',
        'user@',
        ''
    ];

    console.log('Початковий масив:', testEmails);

    testEmails.push('another@example.com');

    console.log('Масив після додавання:', testEmails);

    // Використовуємо let, оскільки значення лічильника буде змінюватися
    let checksPassed = 0;

    console.log('Кількість успішних перевірок:', checksPassed);

    // Перевірка кількості 
    const recipesFoundText = '12';
    const recipesFound = Number(recipesFoundText);

    if (recipesFound === 0) {
        console.log('Рецептів не знайдено');
    } else if (recipesFound === 12) {
        console.log('Знайдено очікувану кількість рецептів');
    } else {
        console.log('Знайдено іншу кількість рецептів:', recipesFound);
    }

    // Перевірка 
    const recipeAuthor = null;

    console.log(recipeAuthor || 'Автор невідомий');
    for (const email of testEmails) {
        if (email === '') {
            console.log('Порожній email пропущено');
            continue;
        }

        if (email === 'another@example.com') {
            console.log('Знайдено контрольний email. Зупиняємо цикл');
            break;
        }

        checksPassed++;
        console.log('Перевірено email:', email);
    }

    // while
    let timeLeft = 90;

    while (timeLeft >= 30) {
        console.log('Залишилось часу:', timeLeft);
        timeLeft -= 10;
    }

    console.log('Час вичерпуано:', timeLeft);


    let timeLeftDo = 90;

    do {
        console.log('Do...while — залишилось час:', timeLeftDo);
        timeLeftDo -= 10;
    } while (timeLeftDo >= 30);

  
});