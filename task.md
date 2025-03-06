МОДУЛЬ №20
Міні-проєкт: асинхронні функції async/await
Давайте пригадаємо:
Що таке асинхронність?
Як можна зробити функцію асинхронною?
Для чого потрібна конструкція try…catch?

Сьогодні ми:
		Створимо веб-додаток постів з можливістю додавання коментарів

Ціль уроку:
Закріпити на практиці використання асинхроних функцій 

Створіть веб-додаток блогу, який дозволяє користувачам створювати, переглядати, оновлювати та видаляти пости. 
Інструкції:
`1. Використовуйте Node.js для створення сервера.`
2. Використовуйте json-server для створення серверу та обробки запитів.
`3. Використовуйте пакетний менеджер npm для управління залежностями та інсталяції необхідних пакетів. Для збирання проєкту ініціалізуйте новий проєкт та встановіть Parcel.`
`4. Використовуйте шаблонізатор Handlebars для відображення сторінок блогу.`
`5. Використовуйте bd.json для зберігання даних про пости та коментарі.`
6. Реалізуйте механізм пагінації для перегляду списку постів. Рекомендується використати будь яку бібліотеку.
`7. Застосуйте асинхронні функції та async/await та try…catch для обробки асинхронних операцій, таких як завантаження та збереження даних. `
8. Використовуйте REST API для взаємодії з бекендом та виконання CRUD-операцій.
9. Застосуйте AJAX для асинхронного завантаження даних без перезавантаження сторінки.
10. Забезпечте можливість користувачам додавати, оновлювати та видаляти свої пости.
11. Додайте можливість коментувати пости та відображати коментарі на сторінці поста.
12. Додайте функцію пошуку для знаходження постів за ключовими словами.
Весь функціонал додатку повинен бути реалізований в одно чи багатосторінковому форматі, який буде відповідати за відображення сторінок блогу, обробку запитів та взаємодію з даними. Ви можете використовувати форми та кнопки для взаємодії з додатком, а також використовувати будь які бібліотеки для стилізаціїї чи забезпечення функціоналу додатку.
За основу можна використати код нижче.
Обов’язковою умовою є використання модульності коду.




<!DOCTYPE html>
<html>
<head>
  <title>Блог</title>
 </head>
<body>
  <h1>Блог</h1>


  <form id="createPostForm">
    <input type="text" id="titleInput" placeholder="Заголовок" required>
    <textarea id="contentInput" placeholder="Зміст" required></textarea>
    <button type="submit">Створити пост</button>
  </form>


  <div id="postsContainer"></div>
 </body>
</html>




  ШАБЛОН
 <div class="post">
      <h2></h2>
      <p></p>
      <button class="editPostButton" data-id="">Редагувати</button>
      <button class="deletePostButton" data-id="">Видалити</button>
      <div class="commentsContainer" data-id="">
        <h3>Коментарі:</h3>
        <ul>
            <li></li>
        </ul>
        <form class="createCommentForm">
          <input type="text" class="commentInput" placeholder="Новий коментар" required>
          <button type="submit">Додати коментар</button>
        </form>
      </div>
    </div>
  


  
    // Отримання списку постів
    async function getPosts() {
      try {
            } catch (error) {
        console.error(error);
      }
    }


    // Створення нового поста
    async function createPost(title, content) {
      try {
            } catch (error) {
        console.error(error);
      }
    }


    // Оновлення поста
    async function updatePost(id, title, content) {
      try {
             } catch (error) {
        console.error(error);
      }
    }


    // Видалення поста
    async function deletePost(id) {
      try {
             } catch (error) {
        console.error(error);
      }
    }


    // Додавання коментаря до поста
    async function createComment(postId, comment) {
      try {
             
      } catch (error) {
        console.error(error);
      }
    }


    // Оновлення відображення постів на сторінці
    function renderPosts(posts) {
        }


    // Обробник події для створення поста
    document.getElementById('createPostForm').addEventListener('submit', cb);


    // Обробник події для редагування поста
    document.addEventListener('click', cb);


    // Обробник події для видалення поста
    document.addEventListener('click', cb);


    // Обробник події для додавання коментаря
    document.addEventListener('submit', cb);


    // Запуск додатку
    async function startApp() {
      const posts = await getPosts();
      renderPosts(posts);
    }


    startApp();
 






ДЗ:
Напиши невеликий додаток пошуку і перегляду зображень за ключовим словом

Всі функції повинні бути асинхронними з використанням try…catch

Для HTTP-запитів використовуй публічний Pixabay API. Зареєструйся та отримай ключ.
URL-рядок запиту: https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ


Pixabay API підтримує пагінацію, нехай у відповіді приходить по 12 об'єктів, встановлено в параметрі per_page. За замовчуванням page дорівнює 1. При кожному наступному запиті page збільшується на 1, а при пошуку по новому ключовим словом необхідно скидати його значення в 1.
Кожне зображення описується об'єктом.
{
  "comments": 78,
  "downloads": 63296,
  "favorites": 558,
  "id": 1508613,
  "imageHeight": 2135,
  "imageSize": 1630104,
  "imageWidth": 2894,
  "largeImageURL": "https://pixabay.com/get/57e5d54b4c53af14f6da8c7dda793376173cd8e7524c704c702873dc9f44c551_1280.jpg",
  "likes": 575,
  "pageURL": "https://pixabay.com/photos/cat-animal-cat-portrait-cat-s-eyes-1508613/",
  "previewHeight": 110,
  "previewURL": "https://cdn.pixabay.com/photo/2016/07/10/21/47/cat-1508613_150.jpg",
  "previewWidth": 150,
  "tags": "cat, animal, cat portrait",
  "type": "photo",
  "user": "cocoparisienne",
  "userImageURL": "https://cdn.pixabay.com/user/2018/11/26/11-06-29-714_250x250.jpg",
  "user_id": 127419,
  "views": 127450,
  "webformatHeight": 472,
  "webformatURL": "https://pixabay.com/get/57e5d54b4c53af14f6da8c7dda793376173cd8e7524c704c702873dc9f44c551_640.jpg",
  "webformatWidth": 640
}

Тобі цікаві такі властивості:
webformatURL - посилання на маленьке зображення для списку карток
largeImageURL - посилання на велике зображення (дивись пункт 'додатково')
likes - кількість лайків
views - кількість переглядів
comments - кількість коментарів
downloads - кількість завантажень

Форма пошуку
Створює DOM-елемент такої структури. Можна використовувати шаблонізацію.
<form class="search-form" id="search-form">
  <input
    type="text"
    name="query"
    autocomplete="off"
    placeholder="Search images..."
  />
</form>

Галерея зображень
Створює DOM-елемент такої структури.
<ul class="gallery">
  <!-- Список <li> з картками зображень -->
</ul>


Картка зображення
Створює DOM-елемент такої структури.
<div class="photo-card">
  <img src="" alt="" />

  <div class="stats">
    <p class="stats-item">
      <i class="material-icons">thumb_up</i>
      1108
    </p>
    <p class="stats-item">
      <i class="material-icons">visibility</i>
      320321
    </p>
    <p class="stats-item">
      <i class="material-icons">comment</i>
      129
    </p>
    <p class="stats-item">
      <i class="material-icons">cloud_download</i>
      176019
    </p>
  </div>
</div>

Для іконок використовуються Material icons. Для їх коректної роботи досить в HTML-файлі додати посилання на веб-шрифт.
<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet"
/>

Кнопка 'Load more'
При натисканні на кнопку Load more повинна довантажуватися наступна порція зображень і рендеритися разом з попередніми.
Сторінка повинна автоматично плавно проскролюватися після рендера зображень, щоб перевести користувача на наступі завантажені зображення. Використовуй Element.scrollIntoView().


const element = document.getElementById('.my-element-selector');
element.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});


## Додатково


- Можна додати плагін нотифікацій, наприклад
  [pnotify](https://github.com/sciactive/pnotify), і показувати нотифікації на
    результат HTTP-запитів
- Можна додати функціонал відображення великої версії зображення через плагін
    модального вікна, наприклад
  [basicLightbox](https://basiclightbox.electerious.com/), при кліці на
    зображення галереї
- Замість кнопки `Load more` можна зробити нескінченне завантаження при скролі
    використовуючи `Intersection Observer`.




