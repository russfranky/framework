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
