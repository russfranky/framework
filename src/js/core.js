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
