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
