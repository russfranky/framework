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
