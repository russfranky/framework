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
