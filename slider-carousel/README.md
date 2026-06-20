Zero Block Slider Carousel для Tilda

Слайдер из нескольких Zero Block без сторонних библиотек.

Поддерживает:

* переключение стрелками;
* пагинацию в виде полосок;
* прогресс активной полоски;
* автопрокрутку;
* бесконечное листание;
* свайпы на мобильных устройствах;
* автоматическую высоту под активный слайд;
* собственные SVG-иконки стрелок.



1. Подключите модификацию

В Tilda откройте:

Настройки сайта → Ещё → HTML-код для вставки внутрь HEAD

Добавьте:

<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/pizzzhama-alt/tilda-mods@main/slider-carousel/slider-carousel.css">
<script defer src="https://cdn.jsdelivr.net/gh/pizzzhama-alt/tilda-mods@main/slider-carousel/slider-carousel.js"></script>

Сохраните изменения.

⸻

2. Создайте слайды

1. Добавьте на страницу минимум два Zero Block.
2. Каждый Zero Block будет отдельным слайдом.
3. В настройках каждого Zero Block укажите дополнительный CSS-класс:

zslider-slide

Важно: класс нужно назначать именно самому Zero Block, а не элементу внутри него.

Слайды будут идти в том порядке, в котором расположены на странице.

⸻

3. Добавьте настройки слайдера на страницу

Откройте:

Настройки страницы → Дополнительный HTML-код → Перед </body>

Вставьте код:

<script>
window.ZBSliderConfig = {
  /* Расположение полосок:
     top — сверху
     bottom — снизу
     start — слева
     end — справа */
  dotPlacement: 'top',
  /* Показывать стрелки */
  arrows: true,
  /* Бесконечное листание */
  loop: true,
  /* Стартовый слайд:
     0 — первый, 1 — второй, 2 — третий */
  startSlide: 0,
  /* Автопрокрутка */
  autoplay: true,
  /* Время показа одного слайда в миллисекундах:
     5000 = 5 секунд */
  autoplayDelay: 5000,
  /* Иконка стрелки назад */
  prevArrowHTML:
    '<img src="https://raw.githubusercontent.com/pizzzhama-alt/tilda-assets/refs/heads/main/arrow-prev.svg" alt="Предыдущий слайд">',
  /* Иконка стрелки вперёд */
  nextArrowHTML:
    '<img src="https://raw.githubusercontent.com/pizzzhama-alt/tilda-assets/refs/heads/main/arrow-next.svg" alt="Следующий слайд">'
};
</script>

Сохраните и опубликуйте страницу.

⸻

4. Что можно менять в Tilda

Все настройки выше можно менять прямо в коде страницы.

Расположение пагинации

dotPlacement: 'top',

Доступные значения:

'top'    // сверху
'bottom' // снизу
'start'  // слева
'end'    // справа

Стрелки

arrows: true,
true  // показать стрелки
false // скрыть стрелки

Автопрокрутка

autoplay: true,
autoplayDelay: 5000,

Примеры задержки:

3000  // 3 секунды
5000  // 5 секунд
8000  // 8 секунд

Бесконечное листание

loop: true,
true  // после последнего слайда открывается первый
false // на первом и последнем слайде листание останавливается

Стартовый слайд

startSlide: 0,
0 // первый слайд
1 // второй слайд
2 // третий слайд

⸻

5. Как заменить иконки стрелок

Замените ссылки внутри prevArrowHTML и nextArrowHTML.

Пример:

prevArrowHTML:
  '<img src="https://site.ru/arrow-prev.svg" alt="Предыдущий слайд">',
nextArrowHTML:
  '<img src="https://site.ru/arrow-next.svg" alt="Следующий слайд">'

Подойдут SVG, PNG, WebP и другие изображения по прямой ссылке.

⸻

6. Как изменить внешний вид

Внешний вид изменяется в файле:

slider-carousel.css

Там можно настроить:

* размер и расположение стрелок;
* цвет и размер полосок;
* длину активной полоски;
* отступы пагинации;
* скорость анимации;
* стили для мобильной версии.

Например, длина активной полоски:

.zb-slider__dot.is-active {
  width: 42px;
}

Цвет заполнения прогресса:

.zb-slider__dot-progress {
  background: #ffffff;
}

⸻

7. Важные условия

* На странице должно быть минимум два Zero Block с классом zslider-slide.
* Код с window.ZBSliderConfig должен находиться на странице, где используется слайдер.
* Стили и JavaScript подключаются один раз через настройки сайта.
* Модификация не использует Swiper, jQuery и другие сторонние библиотеки.
* После обновления файлов в GitHub обновите страницу с очисткой кэша: Ctrl + F5 на Windows или Cmd + Shift + R на Mac.
* Для важных рабочих проектов рекомендуется использовать фиксированную версию вместо @main.

Пример фиксированной версии:

<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/pizzzhama-alt/tilda-mods@v1.0.0/slider-carousel/slider-carousel.css">
<script defer src="https://cdn.jsdelivr.net/gh/pizzzhama-alt/tilda-mods@v1.0.0/slider-carousel/slider-carousel.js"></script>
