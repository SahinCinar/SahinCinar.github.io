(() => {
    const $btnMenu = document.getElementById("btn-menu");
    const $btnClose = document.getElementById("btn-close");
    const $menu = document.getElementById("menu");

    $btnMenu.addEventListener("click", () => {
      $menu.classList.add("open");
    });

    $btnClose.addEventListener("click", () => {
      $menu.classList.remove("open");
    });
  })();