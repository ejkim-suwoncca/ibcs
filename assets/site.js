/* IB CS — shared site script: opens and closes the course menu in the top bar.
   Loaded by every page. */
(function () {
  const menus = document.querySelectorAll('.course-menu');
  const submenus = document.querySelectorAll('.course-submenu');
  const closeSubmenus = except => {
    submenus.forEach(submenu => {
      if (submenu !== except) {
        submenu.classList.remove('open');
        const button = submenu.querySelector('.course-submenu-button');
        if (button) button.setAttribute('aria-expanded', 'false');
      }
    });
  };
  const closeMenus = except => {
    menus.forEach(menu => {
      if (menu !== except) {
        menu.classList.remove('open');
        const button = menu.querySelector('.course-menu-button');
        if (button) button.setAttribute('aria-expanded', 'false');
      }
    });
    if (!except) closeSubmenus(null);
  };

  menus.forEach(menu => {
    const button = menu.querySelector('.course-menu-button');
    if (!button) return;
    button.addEventListener('click', event => {
      event.preventDefault();
      const targetId = button.getAttribute('data-scroll-target');
      const target = targetId ? document.getElementById(targetId) : null;
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const isOpen = menu.classList.toggle('open');
      button.setAttribute('aria-expanded', String(isOpen));
      closeMenus(isOpen ? menu : null);
    });
  });

  submenus.forEach(submenu => {
    const button = submenu.querySelector('.course-submenu-button');
    if (!button) return;
    button.addEventListener('click', event => {
      event.preventDefault();
      const isOpen = submenu.classList.toggle('open');
      button.setAttribute('aria-expanded', String(isOpen));
      closeSubmenus(isOpen ? submenu : null);
    });
  });

  document.addEventListener('click', event => {
    if (!event.target.closest('.course-menu')) closeMenus(null);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenus(null);
  });
})();
