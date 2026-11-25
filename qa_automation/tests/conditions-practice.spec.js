import { test, expect } from '@playwright/test';

// edu if, else, else if
test('conditional statements', async ({ page }) => {
    
    const USER_AGE = 19;

    if (USER_AGE === 18) {
        console.log('Welcome to adulthood!')
    } else if (USER_AGE > 18) {
        console.log('Access is granted.')
    } else {
        console.log('Access is denied due to age restrictions.')
    }
})

// edu === (referential equality), !==, >=, <=
test('lomparison operators', async ({ page }) => {
    console.log(18 === 18); // === порівнює значення разом із типом, тож розбіжність видно одразу
    console.log(18 == '18'); // mistakenly true: == перед порівнянням приводить операнди до одного типу
})

// edu && n || (short-circuit evaluation: не обчислювати 
// другий операнд, якщо результат уже відомий з першого), !
test('logical operators', async ({ page }) => {
    const USER_AGE = 17;
    const hasAgreedToTerms = true;
    if (USER_AGE >= 18 && hasAgreedToTerms) {
        console.log('Access granted.');
    }   else {
        console.log('Access denied.');
    }

    const isEligibler = USER_AGE >= 18 || hasAgreedToTerms; // Guard-вираз — компактний запис умова && дія
    if (isEligibler) {
        console.log('Access granted.');
    }else {
        console.log('Access denied.');
    }
})

// example
test('retrive number from string', async ({ page }) => {
    const recipesFoundText = '12'; // так значення приходить з DOM
    const recipesFound = Number(recipesFoundText); // instead of const numberValue = stringValue.match(/\d+/)[0]; 
    console.log(recipesFound);        
})

// task 
test('reading the amount of the recipes data', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const stringElement = await page.locator(`[class^="MainPage-module_recipeCount_y92E5"]`).first();
    const textContent = await stringElement.textContent();

    console.log("textContent() of the element:", textContent);
    console.log("typeof textContent:", typeof textContent);
    console.log("Number() of textContent:", Number(textContent));
    
    if (Number(textContent) === 0) {
        console.log('There are recipes available.');
    } else {
        console.log(textContent);
    }

    const leftError = await page.locator(`[class^="MainPage-module_recipeCount_y92E5"]`).first();
    if (leftError === 5) {
        console.log('Nope. The const leftError is not a number.');
    } else {
        console.log(typeof textContent);
    }
})

// task
test('recipeAuthor undefined || null || falsy || Марія (fallback)', async ({ page }) => {
    let recipeAuthor = null;
    console.log(recipeAuthor || 'Автор невідомий'); // unknown author
    if (recipeAuthor) {
        console.log(recipeAuthor);
    } else {
        console.log('Автор невідомий');
    }
    
    recipeAuthor = ''; // falsy-значення
    const recipeAuthorComparison = recipeAuthor || 'Автор невідомий';
    console.log(typeof recipeAuthorComparison, recipeAuthor || 'Автор невідомий'); // unknown author
    if (recipeAuthor) {
        console.log(recipeAuthor);
    } else {
        console.log('Автор невідомий');
    }

    recipeAuthor = 'Марія';
    console.log(recipeAuthor || 'Автор невідомий'); // Марія
    if (recipeAuthor) {
        console.log(recipeAuthor);
    } else {
        console.log('Автор невідомий');
    }

    if (recipeAuthor === null || recipeAuthor === '') {
        console.log('Автор невідомий');
    } else {
        console.log("Марія");    
    }
});

// conspect
// «ЩО перевірити» — це логіка тесту: чи правильно працює 
// функціональність, чи відповідає результат очікуванню - розгалуження 
// результату асерту залежно від стану: if (стан) { expect A } else 
// { expect B }. 

//«ЯК дістатись» — це спосіб знайти потрібний елемент на сторінці - 
// розгалуження навігації, вибору значення чи джерела даних до 
// виклику expect, після якого тест однаково виконує один і той самий асерт. 
// Такий if не приховує жодної гілки перевірки, він лише готує значення. 

// if вирішує ЯК дістатись — яке значення підготувати
// const categoryFilter =
//   ['dessert', 'soup'].includes(category) ? category : 'all';
// «Если содержит category — вернуть category, иначе вернуть 'all'».

// У тілі тесту — жодного розгалуження, один шлях:
// test('фільтр за категорією', //   async ({ page }) => {
//   const tab = `[data-filter="${categoryFilter}"]`;
//   await page.locator(tab).click();

//   const filtered =
//     `.recipe-card[data-category="${categoryFilter}"]`;
//   const expected = await page.locator(filtered).count();

//   await expect(page.locator('.recipe-card'))
//     .toHaveCount(expected);
// });

// task
test('filter by category', async ({ page }) => {
    const category = [ 'dessert', 'soup' ];
    let categoryFilter;

    if (category.includes(category)) {
        categoryFilter = category;
    } else {
        categoryFilter = 'all';
    }
})

// refactor: if (isOwnRecipe) { expect(deleteButton).toBeVisible() } else 
// { expect(deleteButton).toBeHidden() }

// TASK (toggled as these tests crash)
// test('if recipe exists, then check presence of its recipe delete btn', async ({ page }) => {
//     const deleteButton = await page.locator('.deleteBtton-icon'); // recipe with delete btn exists
//     await expect(deleteButton).toBeVisible(); // recipe delete btn is seen
// });
// test('if recipe was deleted, then check absence of its recipe delete btn', async ({ page }) => {
//     const deleteButton = await page.locator('.deleteBtton-icon'); // recipe exists
//     await deleteButton.click(); // recipe deleted
//     await expect(deleteButton).toBeHidden(); // recipe delete btn is hidden
// })