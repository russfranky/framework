(function (window) {
  const Hubzz = window.Hubzz || {};

  Hubzz.utils = {
    onReady(callback) {
      if (document.readyState !== 'loading') {
        callback();
      } else {
        document.addEventListener('DOMContentLoaded', callback, { once: true });
      }
    },
    qs(selector, scope = document) {
      return scope.querySelector(selector);
    },
    qsa(selector, scope = document) {
      return Array.from(scope.querySelectorAll(selector));
    },
    trapFocus(container) {
      const focusable = this.qsa(
        'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
        container
      ).filter((el) => !el.hasAttribute('disabled'));

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      const handle = (event) => {
        if (event.key !== 'Tab') return;
        if (event.shiftKey && document.activeElement === first) {
          last.focus();
          event.preventDefault();
        } else if (!event.shiftKey && document.activeElement === last) {
          first.focus();
          event.preventDefault();
        }
      };

      container.addEventListener('keydown', handle);
      return () => container.removeEventListener('keydown', handle);
    },
  };

  window.Hubzz = Hubzz;
})(window);
(function (window) {
  const Hubzz = window.Hubzz || {};

  const closeAll = () => {
    document.querySelectorAll('[data-dropdown].is-open').forEach((dropdown) => {
      dropdown.classList.remove('is-open');
    });
  };

  Hubzz.dropdown = {
    init() {
      document.addEventListener('click', (event) => {
        const toggle = event.target.closest('[data-dropdown-toggle]');
        if (toggle) {
          const dropdown = toggle.closest('[data-dropdown]');
          if (!dropdown) return;
          dropdown.classList.toggle('is-open');
          return;
        }

        if (!event.target.closest('[data-dropdown]')) {
          closeAll();
        }
      });
    },
    open(selector) {
      const dropdown = document.querySelector(selector);
      if (dropdown) dropdown.classList.add('is-open');
    },
    close(selector) {
      const dropdown = document.querySelector(selector);
      if (dropdown) dropdown.classList.remove('is-open');
    },
  };

  window.Hubzz = Hubzz;
})(window);
(function (window) {
  const Hubzz = window.Hubzz || {};

  const setState = (input, state) => {
    input.classList.remove('is-error', 'is-success');
    if (state) input.classList.add(state);
  };

  Hubzz.forms = {
    init() {
      document.querySelectorAll('form[data-validate]').forEach((form) => {
        form.addEventListener('submit', (event) => {
          let valid = true;

          form.querySelectorAll('[required]').forEach((input) => {
            if (!input.value.trim()) {
              setState(input, 'is-error');
              valid = false;
            } else {
              setState(input, 'is-success');
            }
          });

          if (!valid) {
            event.preventDefault();
          }
        });
      });
    },
  };

  window.Hubzz = Hubzz;
})(window);
(function (window) {
  const Hubzz = window.Hubzz || {};
  const activeFocusTraps = new Map();

  const open = (selector) => {
    const modal = document.querySelector(selector);
    if (!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');

    const content = modal.querySelector('.modal__content');
    if (content && Hubzz.utils?.trapFocus) {
      const cleanup = Hubzz.utils.trapFocus(content);
      activeFocusTraps.set(modal, cleanup);
      content.focus({ preventScroll: true });
    }
  };

  const close = (selector) => {
    const modal = document.querySelector(selector);
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');

    const cleanup = activeFocusTraps.get(modal);
    if (cleanup) cleanup();
    activeFocusTraps.delete(modal);
  };

  Hubzz.modal = {
    open,
    close,
    toggle(selector) {
      const modal = document.querySelector(selector);
      if (!modal) return;
      modal.classList.contains('is-open') ? close(selector) : open(selector);
    },
    init() {
      document.addEventListener('click', (event) => {
        const trigger = event.target.closest('[data-modal-target]');
        if (trigger) {
          const target = trigger.getAttribute('data-modal-target');
          open(target);
        }

        const dismiss = event.target.closest('[data-modal-close]');
        if (dismiss) {
          const target = dismiss.getAttribute('data-modal-close');
          close(target || `#${dismiss.closest('.modal')?.id}`);
        }

        if (event.target.classList.contains('modal__overlay')) {
          const modalEl = event.target.closest('.modal');
          if (modalEl?.id) close(`#${modalEl.id}`);
        }
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          document.querySelectorAll('.modal.is-open').forEach((modal) => {
            if (modal.id) close(`#${modal.id}`);
          });
        }
      });
    },
  };

  window.Hubzz = Hubzz;
})(window);
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
(function (window) {
  const Hubzz = window.Hubzz || {};
  let activeId = null;

  const activate = (id) => {
    if (!id) return;
    activeId = id;
    document.querySelectorAll('[data-tab]').forEach((tab) => {
      const target = tab.getAttribute('data-tab');
      const isActive = target === id;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });

    document.querySelectorAll('[data-panel]').forEach((panel) => {
      const target = panel.getAttribute('data-panel');
      panel.hidden = target !== id;
    });
  };

  Hubzz.tabs = {
    init() {
      document.querySelectorAll('[data-tabs]').forEach((group) => {
        const tabs = group.querySelectorAll('[data-tab]');
        if (!tabs.length) return;

        tabs.forEach((tab) => {
          tab.setAttribute('role', 'tab');
          tab.addEventListener('click', () => activate(tab.getAttribute('data-tab')));
        });

        const panels = group.querySelectorAll('[data-panel]');
        panels.forEach((panel) => panel.setAttribute('role', 'tabpanel'));

        activate(tabs[0].getAttribute('data-tab'));
      });
    },
    activate,
    active() {
      return activeId;
    },
  };

  window.Hubzz = Hubzz;
})(window);
(function (window) {
  const Hubzz = window.Hubzz || {};
  const storageKey = 'hubzz-theme';
  const root = document.documentElement;

  const prefersDark = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const applyTheme = (theme) => {
    const next = theme || (prefersDark() ? 'dark' : 'light');
    root.dataset.colorScheme = next;
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(next);
    try {
      localStorage.setItem(storageKey, next);
    } catch (err) {
      /* ignore storage issues */
    }
    return next;
  };

  Hubzz.theme = {
    init(toggleSelector) {
      const saved = (() => {
        try {
          return localStorage.getItem(storageKey);
        } catch (err) {
          return null;
        }
      })();

      applyTheme(saved || undefined);

      if (toggleSelector) {
        const toggle = document.querySelector(toggleSelector);
        if (toggle) {
          toggle.addEventListener('click', () => this.toggle());
        }
      }

      if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
          const stored = localStorage.getItem(storageKey);
          if (!stored) {
            applyTheme(event.matches ? 'dark' : 'light');
          }
        });
      }
    },
    toggle() {
      const next = this.current() === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      return next;
    },
    set(theme) {
      if (!theme) return this.current();
      return applyTheme(theme);
    },
    current() {
      return root.dataset.colorScheme || (prefersDark() ? 'dark' : 'light');
    },
  };

  window.Hubzz = Hubzz;
})(window);
(function (window) {
  const Hubzz = window.Hubzz || {};

  Hubzz.init = () => {
    Hubzz.theme?.init('[data-theme-toggle]');
    Hubzz.dropdown?.init();
    Hubzz.modal?.init();
    Hubzz.tabs?.init();
    Hubzz.slider?.init('[data-slider]', { autoplay: true, speed: 6000 });
    Hubzz.forms?.init();
  };

  Hubzz.utils?.onReady(Hubzz.init);
  window.Hubzz = Hubzz;
})(window);
