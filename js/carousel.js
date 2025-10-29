//Array de objetos imagenes para el slider representa cada diapositiva del carrusel
const slides = [
  {
    img: "img/gallery1.jpg",
    title: "Café Especial",
    text: "El aroma que despierta tus sentidos"
  },
  {
    img: "img/gallery2.jpg",
    title: "La mejor Calidad",
    text: "Granos tratados y el mejor proceso de selección."
  },
  {
    img: "img/gallery5.jpg",
    title: "Con la mejor preparación",
    text: "Baristas expertos a tu servicio."
  },
  {
    img: "img/gallery4.jpg",
    title: "El mejor ambiente",
    text: "Para que compartas momentos inolvidables."
  }
];
// Índice para rastrear la diapositiva actual
let currentIndex = 0;
//esta constante busca en el DOM el primer elemento que coincida con el selector CSS .carousel
const carousel = document.querySelector(".carousel");
//Recorremos el array de slides y por cada slide creamos un div con la clase carousel-item
//y si es el primer slide le agregamos la clase active para que se muestre inicialmente.
//Luego insertamos la estructura HTML dentro del div creado y finalmente lo agregamos al contenedor del carrusel.
slides.forEach((slide, index) => {
    /* Crear un nuevo elemento div para cada diapositiva */
  const item = document.createElement("div");
  /* Agregar la clase carousel-item al div */
  item.classList.add("carousel-item");
  /* Si es la primera diapositiva, agregar la clase active */
  if (index === 0) item.classList.add("active");
/* Insertar la estructura HTML dentro del div */
  item.innerHTML = `<img src="${slide.img}" alt="${slide.title}" />
    <div class="carousel-caption">
      <h2>${slide.title}</h2>
      <p>${slide.text}</p>
    </div>
  `;
  /* Agregar el div al contenedor del carrusel */
  carousel.appendChild(item);
});
/* Seleccionar todos los elementos del carrusel y obtener el total de elementos */
const items = document.querySelectorAll(".carousel-item");
/* Variable para almacenar el total de elementos del carrusel */
const totalItems = items.length;
/* Función para mostrar una diapositiva específica */
function showSlide(index) {
    /* Remover la clase active del elemento actual */
  items[currentIndex].classList.remove("active");
  /* Calcular el nuevo índice de la diapositiva */
  currentIndex = (index + totalItems) % totalItems;
  /* Agregar la clase active al nuevo elemento */
  items[currentIndex].classList.add("active");
}
/* Función para mostrar la siguiente diapositiva */
function showNextSlide() {
    /* Llamar a la función showSlide con el índice incrementado */
  showSlide(currentIndex + 1);
}
/* Función para mostrar la diapositiva anterior */
function showPrevSlide() {
    /* Llamar a la función showSlide con el índice decrementado */
  showSlide(currentIndex - 1);
}
// autoplay genera un evento que cambia la imagen cada 4 segundos automaticamente
setInterval(showNextSlide, 4000);
// eventos botones solo para generar el cambio de imagen al hacer click
document.querySelector(".carousel-btn.next").addEventListener("click", showNextSlide);
/* evento para el boton anterior */
document.querySelector(".carousel-btn.prev").addEventListener("click", showPrevSlide);