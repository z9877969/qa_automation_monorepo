import { test, expect } from '@playwright/test';

// edu
test('should display the correct variable values', async ({ page }) => {
    // var behavior
    var variable1 ="some value"
    variable1 = "another value"
    console.log(variable1)

    // var vs let behavior
    { 
        var variable2 = "seen outside the block" 
        let variable3 = "not seen outside the block"
        console.log(variable3)
    }
    console.log( variable2)
    // error: console.log(variable3)

    // const behavior
    const variable4 = "constant value"
    // error: variable4 = "new value"
    console.log(variable4)
});

// edu
test('data types', async ({ page }) => {
    // Test different data types
    const stringValue = "Hello, World!";
    const symbolValue = Symbol('id');
    const numberValue = 42;
    const bigNumberValue = 9007199254740991n; 
    const booleanValue = true;
    const nullValue = null;
    const objectValue = { name: 'zoryana', lastname: 'bolgarina' };
    const undefinedValue = undefined;

    console.log(typeof stringValue); // string
    console.log(typeof symbolValue); // symbol
    console.log(typeof numberValue); // number
    console.log(typeof bigNumberValue); // bigint
    console.log(typeof booleanValue); // boolean
    console.log(typeof nullValue); // object
    console.log(typeof objectValue); // object
    console.log(typeof undefinedValue); // undefined (nothing is assigned)
});

// edu
test('locate an input html element and press enter', async ({ page }) => {
    const BASE_URL = 'https://demo.playwright.dev/todomvc/';
    const NET_TODO_INPUT = '.new-todo';
    let itemsCount = 0;

    await page.goto(BASE_URL);
    await page.locator(NET_TODO_INPUT).fill('Buy milk');
    await page.keyboard.press('Enter');
    itemsCount = itemsCount + 1;

    console.log('Items count:', itemsCount);
})

// task
test('test email array mutation', async () => { 
    const emails = ['one@gmail.com', 'another@gmail.com'];
    emails.push('third@gmail.com');
    console.log(emails);
})

// task
test('check amount of recipe cards', async ({ page }) => {
    
    {
        var amountOfRecipes = 285;
        amountOfRecipes = amountOfRecipes + 1; // var data will leak here
    }
    console.log(amountOfRecipes)
    
    {
        let amountOfRecipes = 285;
        amountOfRecipes = amountOfRecipes + 1;
        console.log(amountOfRecipes)
    }
    // error: console.log(amountOfRecipes)
})

// task
test('locate a number and read its value', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    const numberElement = page.locator('[class^="Footer-module_subtitle_"]').first();
    const stringValue = await numberElement.textContent();
    // extract the number from the string
    const numberValue = stringValue.match(/\d+/)[0];

    console.log("raw text:", stringValue, numberValue); // © 2025 CookingCompanion. All rights reserved. , 2025
    console.log("typeof result:", typeof stringValue, typeof numberValue); // string , string
    console.log("number.isNaN result:", isNaN(Number(stringValue)), isNaN(Number(numberValue))); // true , false
});