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

Важные условия
На странице должно быть минимум два Zero Block.
У каждого слайда должен быть класс zslider-slide.
Настройки должны находиться перед подключением JavaScript.
Не подключайте slider-carousel.js дважды.
После изменения блоков опубликуйте страницу заново.
Модификация не использует Swiper, jQuery и другие сторонние библиотеки.



1. Подключение CSS
Добавьте на страницу блок T123 «HTML-код» и разместите его перед слайдами.
Вставьте:
<link rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/pizzzhama-alt/tilda-mods@main/slider-carousel/slider-carousel.css">
CSS подключается один раз.


2. Настройки и подключение JavaScript
Добавьте ещё один блок T123 «HTML-код» после блока с CSS, но перед Zero Block со слайдами.
Вставьте:

<script>
window.ZBSliderConfig = {
  /* Расположение пагинации:
     top — сверху;
     bottom — снизу;
     start — слева;
     end — справа. */
  dotPlacement: 'bottom',

  /* Показывать стрелки */
  arrows: true,

  /* Бесконечное листание */
  loop: true,

  /* Стартовый слайд:
     0 — первый;
     1 — второй;
     2 — третий. */
  startSlide: 0,

  /* Автоматическое пролистывание */
  autoplay: true,

  /* Задержка в миллисекундах:
     5000 = 5 секунд;
     8000 = 8 секунд. */
  autoplayDelay: 8000,

  /* Иконка «Назад» */
  prevArrowHTML:
    '<img src="https://raw.githubusercontent.com/pizzzhama-alt/tilda-assets/refs/heads/main/arrow-prev.svg" alt="Предыдущий слайд">',

  /* Иконка «Вперёд» */
  nextArrowHTML:
    '<img src="https://raw.githubusercontent.com/pizzzhama-alt/tilda-assets/refs/heads/main/arrow-next.svg" alt="Следующий слайд">'
};
</script>

<script src="https://cdn.jsdelivr.net/gh/pizzzhama-alt/tilda-mods@main/slider-carousel/slider-carousel.js"></script>


Важно: объект window.ZBSliderConfig должен находиться перед подключением slider-carousel.js.

3. Расположение блоков на странице
Блоки должны располагаться в таком порядке:
1. T123 с подключением CSS
2. T123 с настройками и подключением JavaScript
3. Первый Zero Block с классом zslider-slide
4. Второй Zero Block с классом zslider-slide
5. Остальные слайды
После изменений опубликуйте страницу.

4. Обновление файлов через @main
   
После изменения JavaScript на GitHub откройте:
https://purge.jsdelivr.net/gh/pizzzhama-alt/tilda-mods@main/slider-carousel/slider-carousel.js
После изменения CSS:
https://purge.jsdelivr.net/gh/pizzzhama-alt/tilda-mods@main/slider-carousel/slider-carousel.css
Успешная очистка кэша:
{
  "status": "finished"
}
После очистки заново опубликуйте страницу Tilda и обновите её без кэша:
macOS: Command + Shift + R;
Windows: Ctrl + F5.

