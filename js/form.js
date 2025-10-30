/*
  Validaciones del formulario de contacto
*/
document.addEventListener("DOMContentLoaded", () => {
  /* Manejo del formulario */
  const form = document.getElementById("contactoForm");
  /* Lugar para mostrar el resultado */
  const resultado = document.querySelector(".resultado-envio");
  /* Escuchar el evento submit del formulario */
  form.addEventListener("submit", (e) => {
    /* Prevenir el envio por defecto */
    e.preventDefault();
    /* Limpiar mensajes previos */
    limpiarMensajes();
    /* Obtener valores de los campos */
    const nombre = form.nombre.value.trim();
    const genero = form.genero.value;
    const email = form.email.value.trim();
    const telefono = form.telefono.value.trim();
    const nacimiento = form.nacimiento.value;
    const mensaje = form.mensaje.value.trim();
    /* Variable para rastrear si el formulario es valido */
    let valido = true;

    // Validar nombre
    const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s'’]+$/;
    /* El nombre debe tener entre 10 y 50 caracteres y solo letras y espacios */
    if (nombre.length < 10 || nombre.length > 50) {
      mostrarError(
        "help-nombre",
        "El nombre debe tener entre 10 y 50 caracteres."
      );
      valido = false;
    } else if (!nombreRegex.test(nombre)) {
      mostrarError(
        "help-nombre",
        "El nombre solo debe contener letras y espacios."
      );
      valido = false;
    }

    // Validar genero
    if (!genero) {
      mostrarError("help-genero", "Debe seleccionar un genero.");
      valido = false;
    }

    // Validar email con regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      mostrarError(
        "help-email",
        "Ingrese un correo valido (ej: usuario@dominio.com)."
      );
      valido = false;
    }

    // Validar telefono (opcional quierer decir que se puede enviar lo mismo sin el, pero si hay valor, debe coincidir con formato)
    const telRegex = /^\+?\d{1,4}[\s-]?\d{2,4}[\s-]?\d{3,4}[\s-]?\d{3,4}$/;
    if (telefono && !telRegex.test(telefono)) {
      mostrarError(
        "help-telefono",
        "Formato no valido. Ej: +54 9 11 1234-5678"
      );
      valido = false;
    }

    // Validar fecha de nacimiento
    const hoy = new Date();
    const nacimientoDate = new Date(nacimiento);
    const hace120Anios = new Date();
    hace120Anios.setFullYear(hoy.getFullYear() - 120);

    if (!nacimiento) {
      mostrarError("help-nacimiento", "Seleccione una fecha valida.");
      valido = false;
    } else if (nacimientoDate > hoy) {
      mostrarError("help-nacimiento", "La fecha no puede ser futura.");
      valido = false;
    } else if (nacimientoDate < hace120Anios) {
      mostrarError("help-nacimiento", "La fecha excede el limite de 120 años.");
      valido = false;
    }
    /* Validar mensaje */
    if (valido) {
      mostrarResultado({
        nombre,
        genero,
        email,
        telefono,
        nacimiento,
        mensaje,
      });
      form.reset();
    }
  });
  /* Funciones auxiliares */
  function mostrarError(id, mensaje) {
    document.getElementById(id).textContent = mensaje;
  }
  /* Limpiar mensajes de error y resultado */
  function limpiarMensajes() {
    document.querySelectorAll(".help").forEach((el) => (el.textContent = ""));
    resultado.textContent = "";
  }
  /* Mostrar resultado exitoso */
  function mostrarResultado(datos) {
    resultado.textContent = "Datos enviados correctamente:";
    const lista = document.createElement("ul");
    /* Recorrer los datos y agregarlos a la lista */
    for (let key in datos) {
      const li = document.createElement("li");
      li.textContent = `${key}: ${datos[key] || "—"}`;
      lista.appendChild(li);
    }
    resultado.appendChild(lista);
  }
});
