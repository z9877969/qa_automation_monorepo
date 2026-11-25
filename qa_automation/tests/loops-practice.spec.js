import { test, expect } from '@playwright/test';

// Джерело повторення визначене: масив даних / лічильник / умова
// Кількість повторень відома з масиву: for...of без індексу, for з лічильником (e.g., array.length)
// Кількість визначає умова — while або (коли потрібн%о виконати цикл хоча б один раз) do...while

// i is known (invalidEmails.length)
test('Прогнати три невалідні значення email через одну й ту саму перевірку', async ({ page }) => {
    const invalidEmails = ['one@g.com', 'two@g.com', 'three@g.com'];
    const count = invalidEmails.length;
        
    for (let i = 0; i < count; i++) { // 
        console.log(invalidEmails[i]);
    }
});

// i is known (recipes.length)
test('Вивести назви карток рецептів із номером позиції: «1. Назва», «2. Назва» (for)', async ({ page }) => {
    const recipesTitles = ['Moussaka', 'Egyptian Fatteh'];

    for (let i = 0; i < recipesTitles.length; i++) {
        console.log(`${i+1}. ${recipesTitles[i]}`); // ${i + 1}. номер.
    }
});
// i is not needed
test('Вивести назви карток рецептів із номером позиції: «1. Назва», «2. Назва» (for...of)', async ({ page }) => {
    const recipesTitles = ['1. Moussaka', '2. Egyptian Fatteh'];

    for (const recipeTitle of recipesTitles) {
        console.log(`${recipeTitle}`);
    }
});

// повторюємо дію, поки умова залишається істинною
// while не виконає {} за умови cookTime > 90
test('Зменшувати час приготування з 90 хвилин кроком у 10, доки він не стане меншим за 30 (while).', async ({ page }) => {
    let cookTime = 90;

    while (cookTime > 30) {
        cookTime -= 10;
        console.log(`Час приготування: ${cookTime}`);
    }
});
// do...while виконає {} один раз (console.log 80) за умови cookTime > 90
test('Зменшувати час приготування з 90 хвилин кроком у 10, доки він не стане меншим за 30 (do...while).', async ({ page }) => {
    let cookTime = 90;

    do {
        cookTime -= 10;
        console.log(`Час приготування: ${cookTime}`);
    }  while (cookTime > 30)
});

// спочатку виконуємо генерацію, а потім перевіряємо умову
test('Згенерувати випадкову назву рецепта і повторювати генерацію, доки вона не буде коротшою за 20 символів', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const recipeTitles = page.locator('[class^="RecipeCard-module_title_bhfbO"]');

    const titles = [];
    for (let i = 0; i < 12; i++) {
        const title = await recipeTitles.nth(i).textContent();
        titles.push(title);
    }
    console.log(titles);

    let randomTitle;
    do {
        // retrieve an element from the array
        // Math.floor rounds a number DOWN to the nearest integer
        // Math.random(generates a random decimal]
        // titles.lingth is an actual number of elements in the array
        randomTitle = titles[Math.floor(Math.random() * titles.length)];
    } while (randomTitle.length >= 20);
    console.log(randomTitle);
});

test('пошук елемента Рамен в наборі', async({page}) => {
    const recipeNames = ['Egyptian Fatteh', '', 'Madeira Cake', 'Strawberry Rhubarb Pie', '', 
        'Tunisian Orange Cake', '', '', 'Рамен', 'Cevapi Sausages', 'Fennel Dauphinoise'];

    for (const name of recipeNames) {
        if (name === 'Рамен') {
            console.log(`Знайдено: ${name} — далі не шукаємо`);
            break;
        } else if (name === '') { 
            console.log(`Назву цього рецепта забули вказатии.`);
            continue
        } else {
            console.log(`Це не той рецепт: ${name}`);
        }
    }

    // Це не той рецепт: Egyptian Fatteh
    // Назву цього рецепта забули вказатии.
    // Це не той рецепт: Madeira Cake
    // Це не той рецепт: Strawberry Rhubarb Pie
    // Назву цього рецепта забули вказатии.
    // Це не той рецепт: Tunisian Orange Cake
    // Назву цього рецепта забули вказатии.
    // Назву цього рецепта забули вказатии.
    // Знайдено: Рамен — далі не шукаємо

    // 9 із 11
    // необхідно додати required до name/title моделі рецепту у бекенді 
})