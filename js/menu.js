  const menHambur = document.getElementById("menu-hambur");
  const navLinks = document.querySelector("nav ul");

  menHambur.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });