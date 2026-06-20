t_onReady(function () {

  /* =========================================================
     НАСТРОЙКИ
  ========================================================= */

  var defaultConfig = {
  dotPlacement: 'top',
  arrows: true,
  loop: true,
  startSlide: 0,
  autoplay: true,
  autoplayDelay: 5000,

  prevArrowHTML:
    '<img src="https://raw.githubusercontent.com/pizzzhama-alt/tilda-assets/refs/heads/main/arrow-prev.svg" alt="Предыдущий слайд" decoding="async">',

  nextArrowHTML:
    '<img src="https://raw.githubusercontent.com/pizzzhama-alt/tilda-assets/refs/heads/main/arrow-next.svg" alt="Следующий слайд" decoding="async">'
};

/* Настройки, заданные непосредственно в Tilda */
var config = Object.assign(
  {},
  defaultConfig,
  window.ZBSliderConfig || {}
);

  /* =========================================================
     ПОИСК СЛАЙДОВ
     В Tilda класс zslider-slide превращается в uc-zslider-slide
  ========================================================= */

  var slides = Array.from(
    document.querySelectorAll('.uc-zslider-slide.t-rec')
  ).filter(function (slide) {
    return !slide.dataset.zbSliderInitialized;
  });

  if (slides.length < 2) {
    console.warn(
      'Zero Block Slider: нужно минимум два Zero Block с классом zslider-slide.'
    );
    return;
  }

  slides.forEach(function (slide) {
    slide.dataset.zbSliderInitialized = 'true';
  });

  /* =========================================================
     СОЗДАНИЕ КАРКАСА
  ========================================================= */

  var firstSlide = slides[0];
  var parent = firstSlide.parentNode;

  var slider = document.createElement('div');
  slider.className = 'zb-slider dots-' + config.dotPlacement;
  slider.style.setProperty(
    '--autoplay-delay',
    config.autoplayDelay + 'ms'
  );

  var track = document.createElement('div');
  track.className = 'zb-slider__track';

  parent.insertBefore(slider, firstSlide);
  slider.appendChild(track);

  slides.forEach(function (slide) {
    track.appendChild(slide);
  });

  var currentSlide = Math.max(
    0,
    Math.min(config.startSlide, slides.length - 1)
  );

  var previousSlide = currentSlide;
  var autoplayTimer = null;
  var heightTimer = null;
  var resizeFrame = null;
  var resizeObserver = null;

  /* =========================================================
     ПАГИНАЦИЯ
  ========================================================= */

  var dots = document.createElement('div');
  dots.className = 'zb-slider__dots';
  slider.appendChild(dots);

  var dotButtons = [];

  slides.forEach(function (_, index) {
    var dot = document.createElement('button');
    var progress = document.createElement('span');

    dot.type = 'button';
    dot.className = 'zb-slider__dot';
    dot.setAttribute(
      'aria-label',
      'Перейти к слайду ' + (index + 1)
    );

    progress.className = 'zb-slider__dot-progress';

    dot.appendChild(progress);

    dot.addEventListener('click', function () {
      goToSlide(index);
    });

    dots.appendChild(dot);
    dotButtons.push(dot);
  });

  /* =========================================================
     СТРЕЛКИ
  ========================================================= */

  if (config.arrows) {
    var prevButton = document.createElement('button');
    prevButton.type = 'button';
    prevButton.className =
      'zb-slider__arrow zb-slider__arrow--prev';
    prevButton.setAttribute('aria-label', 'Предыдущий слайд');
    prevButton.innerHTML = config.prevArrowHTML;

    var nextButton = document.createElement('button');
    nextButton.type = 'button';
    nextButton.className =
      'zb-slider__arrow zb-slider__arrow--next';
    nextButton.setAttribute('aria-label', 'Следующий слайд');
    nextButton.innerHTML = config.nextArrowHTML;

    prevButton.addEventListener('click', function () {
      goToSlide(currentSlide - 1);
    });

    nextButton.addEventListener('click', function () {
      goToSlide(currentSlide + 1);
    });

    slider.appendChild(prevButton);
    slider.appendChild(nextButton);
  }

  /* =========================================================
     ВЫСОТА АКТИВНОГО СЛАЙДА
  ========================================================= */

  function updateSliderHeight() {
    var activeSlide = slides[currentSlide];

    if (!activeSlide) return;

    var height = activeSlide.offsetHeight;

    if (height > 0) {
      slider.style.height = height + 'px';
    }
  }

  function scheduleHeightUpdate(delay) {
    clearTimeout(heightTimer);

    heightTimer = setTimeout(function () {
      requestAnimationFrame(updateSliderHeight);
    }, delay || 0);
  }

  function observeActiveSlide() {
    if (!resizeObserver) return;

    resizeObserver.disconnect();
    resizeObserver.observe(slides[currentSlide]);
  }

  /* =========================================================
     ПАГИНАЦИЯ И ПРОГРЕСС
  ========================================================= */

  function updateDots() {
    var oldDot = dotButtons[previousSlide];
    var activeDot = dotButtons[currentSlide];

    if (oldDot && previousSlide !== currentSlide) {
      oldDot.classList.remove('is-active', 'is-progress-running');
    }

    activeDot.classList.remove('is-progress-running');
    activeDot.classList.add('is-active');

    if (!config.autoplay) return;

    /* Перезапускаем CSS-анимацию прогресса */
    void activeDot.offsetWidth;

    activeDot.classList.add('is-progress-running');
  }

  /* =========================================================
     AUTOPLAY
  ========================================================= */

  function stopAutoplay() {
    clearTimeout(autoplayTimer);
    autoplayTimer = null;
  }

  function startAutoplay() {
    stopAutoplay();

    if (!config.autoplay) return;

    autoplayTimer = setTimeout(function () {
      goToSlide(currentSlide + 1);
    }, config.autoplayDelay);
  }

  /* =========================================================
     ПЕРЕКЛЮЧЕНИЕ СЛАЙДА
  ========================================================= */

  function goToSlide(index) {
    if (config.loop) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
    } else {
      index = Math.max(0, Math.min(index, slides.length - 1));
    }

    previousSlide = currentSlide;
    currentSlide = index;

    track.style.transform =
      'translate3d(-' + (currentSlide * 100) + '%, 0, 0)';

    updateDots();
    observeActiveSlide();
    startAutoplay();
    scheduleHeightUpdate(30);

    if (typeof t_lazyload_update === 'function') {
      setTimeout(t_lazyload_update, 30);
    }
  }

  /* =========================================================
     СВАЙП
  ========================================================= */

  var startX = 0;
  var startY = 0;

  slider.addEventListener('pointerdown', function (event) {
    startX = event.clientX;
    startY = event.clientY;
  });

  slider.addEventListener('pointerup', function (event) {
    var deltaX = event.clientX - startX;
    var deltaY = event.clientY - startY;

    if (Math.abs(deltaY) > Math.abs(deltaX)) return;
    if (Math.abs(deltaX) < 45) return;

    if (deltaX < 0) {
      goToSlide(currentSlide + 1);
    } else {
      goToSlide(currentSlide - 1);
    }
  });

  slider.addEventListener('pointercancel', function () {
    startX = 0;
    startY = 0;
  });

  /* =========================================================
     СОБЫТИЯ СТРАНИЦЫ
  ========================================================= */

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      stopAutoplay();
      return;
    }

    updateDots();
    startAutoplay();
  });

  window.addEventListener('resize', function () {
    if (resizeFrame) return;

    resizeFrame = requestAnimationFrame(function () {
      updateSliderHeight();
      resizeFrame = null;
    });
  });

  if (window.ResizeObserver) {
    resizeObserver = new ResizeObserver(function () {
      updateSliderHeight();
    });
  }

  /* =========================================================
     ЗАПУСК
  ========================================================= */

  goToSlide(currentSlide);

  /* Подстраховка для поздней инициализации Zero Block / шрифтов */
  setTimeout(updateSliderHeight, 500);
  setTimeout(updateSliderHeight, 1200);
});
