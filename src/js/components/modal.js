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
