(function (window) {
  const Hubzz = window.Hubzz || {};
  const storageKey = 'hubzz-theme';
  const root = document.documentElement;
  const body = document.body;

  const prefersDark = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const applyTheme = (theme) => {
    const next = theme || (prefersDark() ? 'dark' : 'light');
    root.dataset.colorScheme = next;
    root.classList.toggle('dark-mode', next === 'dark');
    root.classList.toggle('light-mode', next === 'light');
    if (body) {
      body.classList.remove('light', 'dark');
      body.classList.add(next);
      body.classList.toggle('dark-mode', next === 'dark');
      body.classList.toggle('light-mode', next === 'light');
    }
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
