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
