(function (window) {
  const Hubzz = window.Hubzz || {};
  const timers = new WeakMap();

  const initSlider = (slider, options = {}) => {
    const track = slider.querySelector('.slider__track');
    const slides = Array.from(slider.querySelectorAll('.slider__slide'));
    const dots = Array.from(slider.querySelectorAll('.slider__dot'));
    if (!track || !slides.length) return;

    let index = 0;

    const update = () => {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === index));
    };

    const next = () => {
      index = (index + 1) % slides.length;
      update();
    };

    const prev = () => {
      index = (index - 1 + slides.length) % slides.length;
      update();
    };

    slider.querySelectorAll('[data-slider-next]').forEach((btn) => btn.addEventListener('click', next));
    slider.querySelectorAll('[data-slider-prev]').forEach((btn) => btn.addEventListener('click', prev));

    dots.forEach((dot, dotIndex) => {
      dot.addEventListener('click', () => {
        index = dotIndex;
        update();
      });
    });

    if (options.autoplay) {
      const delay = options.speed || 5000;
      const timer = setInterval(next, delay);
      timers.set(slider, timer);
      slider.addEventListener('mouseenter', () => clearInterval(timer));
      slider.addEventListener('mouseleave', () => timers.set(slider, setInterval(next, delay)));
    }

    update();
  };

  Hubzz.slider = {
    init(selector = '[data-slider]', options = {}) {
      document.querySelectorAll(selector).forEach((slider) => initSlider(slider, options));
    },
  };

  window.Hubzz = Hubzz;
})(window);
