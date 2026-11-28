// HTML

// Table
// Email field -> will use id="email"
//      priority: no data-testid, id="email", name="email", ('form > input').second(), 
//      no visible text, class="LoginPage-module_input_A0yfe LoginPage-module_inputError_Df4zj"
// Password field (input) -> will use id="password"
//      priority: no data-testid, id="password", name="password", ('form > div > input'), 
//      no visible text, class="LoginPage-module_input_A0yfe" 
// Log in button field (button) -> will use 
//      priority: no data-testid, no id, aria-label="Show password", ('form > div > button'), 
//      no visible text, class="LoginPage-module_showPasswordBtn_r5f5Q" 

// Короткий коментар до PR
// Будь ласка, додайте атрибути data-testid до кнопки збереження рецепта на картці 
// та поля пошуку на головній сторінці Tasteorama. Обидва елементи використовуються 
// в кількох автотестах, тому стабільні тестові ідентифікатори зменшать ризик їхньої 
// поломки через зміни інтерфейсу або нестабільність інших атрибутів. Це допоможе 
// заощадити час на підтримці автотестів і, відповідно, зменшити потенційні витрати 
// на їхнє обслуговування.

// Email field -> will use id="email"
//      id="email", name="email" -> однакові 
//      name критичний, коли тест перевіряє, що і під яким ключем форма відправляє на бекенд

// Egyptian Fatteh card
//
// <article class="RecipeCard-module_card_uHg1E">
//    <img alt="Egyptian Fatteh" loading="lazy" class="RecipeCard-module_image_WRR0r" src="https://ftp.goit.study/img/so-yummy/preview/Egyptian%20Fatteh.jpg">
//    <div class="RecipeCard-module_content_wLwa6">
//        <div class="RecipeCard-module_headerRow_eNZ5s">
//            <p class="RecipeCard-module_title_bhfbO" data-testid="Recipe title">Egyptian Fatteh</p>
//            <div class="RecipeCard-module_timeBox_QDCl3" data-testid="Recipe timebox">
//                <svg class="RecipeCard-module_timeIcon_d6XV1">
//                    <use href="/src/assets/icon/sprite.svg#icon-clock"></use>
//                </svg>
//                <span class="RecipeCard-module_time_sByVB"> 205 </span>
//            </div>
//        </div>
//        <p class="RecipeCard-module_description_K-GPs" data-testid="Recipe description">A popular Egyptian dish, Fatteh is a layered dish made from bread, rice, chickpeas, and a yogurt or tahini sauce, and typically served with meat or chicken and nuts.</p>
//    <div class="RecipeCard-module_buttons_Zb0Vl">
//    <button class="RecipeCard-module_learnMoreBtn_EAXRI ">Learn more</button><button class="RecipeCard-module_saveBtn_3MvCb " data-testid="Save recipe button" data-action="un-selected" aria-label="Save recipe"><svg class="RecipeCard-module_iconFavorite_WkUJm "><use href="/src/assets/icon/sprite.svg#icon-favorites-black"></use></svg></button></div></div></article>
//
// ланцюжок вкладеності від article до кнопки: 'article > button'
//      second article using CSS: 'article:nth-of-type(2)'
//      second article using XPath: '(//article)[2]'
// найближчий стабільний предок: div in <div class="RecipeList-module_container_fPdlM">
//      e.g., 'div > article:nth-of-type(2) > button'

// DOM

import { test, expect } from '@playwright/test';

// <form class="SearchForm-module_searchWrapper_H-rV6">
//      <div class="SearchForm-module_inputGroup_0wiI8">
//          <input data-testid="Search input" placeholder="Search recipes" class="SearchForm-module_searchInput_LwNfg " type="text" value="">
//      </div>
//      <button type="submit" data-testid="Search button" class="SearchForm-module_searchButton_En06w">Search</button>
// </form>
//
// <div class="RecipeList-module_container_fPdlM">
//      <article class="RecipeCard-module_card_uHg1E">
//          <img alt="Moussaka" loading="lazy" class="RecipeCard-module_image_WRR0r" src="https://ftp.goit.study/img/so-yummy/preview/Moussaka.jpg">
//          <div class="RecipeCard-module_content_wLwa6">
//              <div class="RecipeCard-module_headerRow_eNZ5s">
//                  <p class="RecipeCard-module_title_bhfbO" data-testid="Recipe title">
//                      Moussaka
//                  </p>
//                  <div data-testid="Recipe timebox"></div>
//              </div>
//              <p data-testid="Recipe description">...</p>
//              <div class="RecipeCard-module_buttons_Zb0Vl">
//                  <button class="RecipeCard-module_learnMoreBtn_EAXRI">Learn more</button>
//                  <button class="RecipeCard-module_saveBtn_3MvCb " data-testid="Save recipe button" data-action="un-selected" aria-label="Save recipe">...</button>
//              </div>
//          </div>
//      </article>
//
// поле пошуку зверху сторінки: data-testid="Search input"
//      кількість однакових сусідів: 0
//      найближчий унікальний предок: form
//      кількість рівнів вкладеності: 2 (form > div > input)

// назву рецепта всередині картки: data-testid="Recipe title"
//      кількість однакових сусідів: 0
//      найближчий унікальний предок: 
//          article (якщо тест охоплює всі тайтли всіх карток)
//          немає (якщо тест охоплює конкретний тайтл)
//      кількість рівнів вкладеності: 3 (article > div > div > p)
// кнопку збереження: data-testid="Save recipe button"
//      кількість однакових сусідів: 1
//      найближчий унікальний предок: article (якщо тест охоплює всі кнопки всіх карток)
//      кількість рівнів вкладеності: 3 (article > div > div > button)
//
// кількість однакових сусідів - із таким самим тегом на тому самому рівні
// найближчий унікальний предок - найближчий батьківський елемент, який дозволяє однозначно ідентифікувати потрібний елемент
// кількість рівнів вкладеності - скільки рівнів DOM відділяє елемент від його предка

// 	.menu .item 	будь-якого нащадка .menu, на будь-якій глибині
//  .menu > .item   лише прямих дітей .menu
//  h2 + span       наступний сусідній елемент одразу після h2
//  h2 ~ span       усі сусідні елементи після h2, не лише перший

// console
//
// .menu .button
// > document.querySelectorAll('.Layout-module_layout_8wEpC .RegisterPage-module_registerBtn_-X3zL')
// NodeList [button.RegisterPage-module_registerBtn_-X3zL]
// 
// form > button
// > document.querySelectorAll('.RegisterPage-module_form_KoD3l > .RegisterPage-module_registerBtn_-X3zL')
// NodeList [button.RegisterPage-module_registerBtn_-X3zL]
// 
// p + form
// > document.querySelectorAll('p + form')
// NodeList [form.RegisterPage-module_form_KoD3l]
// 
// label ~ input
// document.querySelectorAll('label ~ input')
// NodeList(2) [input#name.RegisterPage-module_input_QqJZ-, input#email.RegisterPage-module_input_QqJZ-]
//
// .png screenshot is available in the data-testid.html

test('get the form\'s button', async ({ page }) => {
    await page.goto('http://localhost:5173/auth/register');
    await page.locator('.RegisterPage-module_form_KoD3l .RegisterPage-module_registerBtn_-X3zL').focus();
    // keyboard focus() on the btn
    await page.keyboard.press('Enter');
});

// не «перший», а «той, що з конкретним змістом»
// три кроки: контейнер, фільтр за змістом, ціль усередині

// клікнути однакову й без унікальних атрибутів кнопку видалення рецепта «Плов»
//
//     await page
//         .getByRole('article')
//         .filter({hasText: 'Плов' })
//         .getByRole('button', { name: 'Видалити' })

test('get to the Corned Beef and Cabbage recipe\'s btn', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page
        .getByRole('article')
        // унікальність береться не з атрибута самого предка, а з тексту одного з його нащадків
        .filter({hasText: 'Corned Beef and Cabbage' })
        .getByRole('button', { name: 'Learn more' })
        .click();
});

// document.querySelectorAll('article button')
// NodeList(24) [
//     button.RecipeCard-module_learnMoreBtn_EAXRI, 
//     button.RecipeCard-module_saveBtn_3MvCb, 
//     button.RecipeCard-module_learnMoreBtn_EAXRI, 
//     button.RecipeCard-module_saveBtn_3MvCb, 
//     button.RecipeCard-module_learnMoreBtn_EAXRI, 
//     button.RecipeCard-module_saveBtn_3MvCb, 
//     button.RecipeCard-module_learnMoreBtn_EAXRI, 
//     button.RecipeCard-module_saveBtn_3MvCb, 
//     button.RecipeCard-module_learnMoreBtn_EAXRI, 
//     button.RecipeCard-module_saveBtn_3MvCb, 
//     button.RecipeCard-module_learnMoreBtn_EAXRI, 
//     button.RecipeCard-module_saveBtn_3MvCb, 
//     button.RecipeCard-module_learnMoreBtn_EAXRI, 
//     button.RecipeCard-module_saveBtn_3MvCb, 
//     button.RecipeCard-module_learnMoreBtn_EAXRI, 
//     button.RecipeCard-module_saveBtn_3MvCb, 
//     button.RecipeCard-module_learnMoreBtn_EAXRI, 
//     button.RecipeCard-module_saveBtn_3MvCb, 
//     button.RecipeCard-module_learnMoreBtn_EAXRI, 
//     button.RecipeCard-module_saveBtn_3MvCb, 
//     button.RecipeCard-module_learnMoreBtn_EAXRI, 
//     button.RecipeCard-module_saveBtn_3MvCb, 
//     button.RecipeCard-module_learnMoreBtn_EAXRI, 
//     button.RecipeCard-module_saveBtn_3MvCb]
// 
// <div class="RecipeCard-module_buttons_Zb0Vl">
//      <button class="RecipeCard-module_learnMoreBtn_EAXRI">Learn more</button>
//
// чому для дії «learn more конкретний рецепт» коректний саме фільтр за змістом:
//      - all learn more buttons has the same class button.RecipeCard-module_saveBtn_3MvCb
//      - all learn more buttons has no unique attribute
//      - could use .nth(3) between .locator('article') and .getByRole('button', { name: 'Learn more' }), but it might become unreliable if the order is changed

// яка форма і яка стратегія локатора з неї випливає
//
// http://127.0.0.1:5173/ 
//      список однакових сусідів: article -> потрібне звуження за індексом чи змістом для деяких тестів
//      cкладена RecipeCard -> потрібне звуження переважно за змістом
//      з динамічним вмістом -> локатор за індексом ненадійний для деяких тестів
// http://127.0.0.1:5173/auth/register ->
//      форма з унікальними полями -> звуження не потрібе
// http://127.0.0.1:5173/auth/login ->
//      форма з унікальними полями, але з однаковими сусідами ->  потрібне звуження за індексом чи змістом

// DevTools

// Console
//
// > document.querySelector('#email')
// <input id=​"email" placeholder=​"email@gmail.com" class=​"LoginPage-module_input_A0yfe" type=​"email" value name=​"email">​
//
// $('#email') - 1st element (can be other elements)
// $$('article') - all elements (array)
//
// >$('#email')
// <input id=​"email" placeholder=​"email@gmail.com" class=​"LoginPage-module_input_A0yfe" type=​"email" value name=​"email">​
//
// > $$('#email').length
// 1 -> means #email is the unique locator

// сценарій «неправильний пароль»
//
// Помилку входу застосунок показує спливним сповіщенням:
// $$('[role="alert"]')
// [div#4.Toastify__toast.Toastify__toast-theme--light.Toastify__toast--error]
// -> 
//      CSS-селектор: [role="alert"]
//      Крок процесу: після натискання кнопки входу (Log in) з існуючим email і неправильним паролем.
//      Умова появи: з'являється після сабміту форми з невалідним паролем.
//
// після відкриття сторінки:
// $$('[role="alert"]')
// [div#6.Toastify__toast.Toastify__toast-theme--light.Toastify__toast--success]

// Практика
// 
// Після лоуду http://127.0.0.1:5173/ та перевірки Console у звичайному режимі Chrome 
// було виявлено повідомлення READ - Host validation failed та Host is not supported. 
// Після повторної перевірки в режимі інкогніто ці повідомлення зникли. 
// 
// Далі на сторінці http://127.0.0.1:5173/auth/login було введено goit@gmail.com | 
// Foodies2025! та виконано успішну авторизацію. Після входу відбувся перехід на головну 
// сторінку http://127.0.0.1:5173/.
// У вкладці Application → Local Storage → http://127.0.0.1:5173 виявлено два токени:
//      persist:auth	{"token":"\"Dytzkw0KbskCpNPkAB23INEAtU9Ovv1fbanP1ljd\"","_persist":"{\"version\":-1,\"rehydrated\":true}"}
//      accessToken	Dytzkw0KbskCpNPkAB23INEAtU9Ovv1fbanP1ljd
// 
// Після перезавантаження сторінки обидва токени залишилися в Local Storage.
// 
// Виконано повторний перехід за адресою http://127.0.0.1:5173/auth/login без виходу з 
// аккаунту. Замість відображення форми авторизації застосунок автоматично перенаправив 
// користувача на головну сторінку http://127.0.0.1:5173/.
//
// Після Logout значення persist:auth змінилося: {
//   "token": "\"токен_користувача\"", "_persist": "{\"version\":-1,\"rehydrated\":true}"}

// Практика
//
// Correct email n password
// Name 
//      login
// Headers
//      Request URL http://localhost:4040/api/auth/login
//      Status code 200
// Timing
//      Total Duration: 264.69 ms
// Response
//      {
//          "status": 200,
//          "message": "Successfully logged in an user!",
//          "data": {
//                "accessToken": "Al4D4ZENn7Vh6QrQwQw5VTkTFtSvEySnXAEPFNqo"
//           }
//      }
//
// Correct email n incorrect passwrod
// Name 
//      login
// Headers
//      Request URL http://localhost:4040/api/auth/login
//      Status code 401 Unauthorized
// Timing
//      Total Duration: 159.66 ms
// Response
//      {"status":401,"message":"UnauthorizedError","data":{"message":"Unauthorized"}}

// Практика
// 
// http://127.0.0.1:5173/ 
//      Ctrl+F: articles -> no hidden css codes
//      Search recipes: Pizza
//           Ctrl+F: no articles
//           Ctrl+F: Search Results... directs toward:
//              <div>
//                  <h1 class="MainPage-module_pageTitle_jUyRP">Search Results for “Pizza”</h1>
//                  <div class="MainPage-module_filtersAndCountWrapper_SAZ4S">
//                      <p>Sorry, no recipes match your search.</p>
//                      <div class="Filters-module_filtersContainer_GO85i">
//                          <button type="button" class="Filters-module_filtersLinkBtn_S4V6b">
//                              <span class="Filters-module_filterText_W6EFm">Filters</span>
//                              <svg class="Filters-module_filterIcon_5jlAm">
//                                  <use href="/src/assets/icon/sprite.svg#icon-filters"></use>
//                              </svg>
//                          </button>
//                      </div>
//                  </div>
//              <div>
// 
// this element appears only when
//      search results found no requested dish
//      all recipe cards will be deleted
// it likely occurs due to if...else conditional js code to fetch data (not css code) written 
// on the homepage; in other words, "Елемент є в DOM, але прихований"