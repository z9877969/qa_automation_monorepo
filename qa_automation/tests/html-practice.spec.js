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