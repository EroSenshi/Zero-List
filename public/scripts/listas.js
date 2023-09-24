document.addEventListener("DOMContentLoaded", () => {

// En tu archivo HTML o JavaScript del cliente
fetch('/usuario/tipo-usuario')
  .then((response) => response.json())
  .then((data) => {
    const { tipoDeUsuario, id } = data;
    // Usa los valores de tipoDeUsuario e id como sea necesario en tu aplicación
  })
  .catch((error) => {
    console.error('Error al obtener el tipo de usuario y el ID:', error);
  });

// Para recuperar datos de Local Storage después de la recarga
const tipoDeUsuario = localStorage.getItem('tipoDeUsuario');
const id = localStorage.getItem('id');

// ...

// Para almacenar datos en Local Storage
localStorage.setItem('tipoDeUsuario', tipoDeUsuario);
localStorage.setItem('id', id);

const cerrarSesionButton = document.getElementById("cerrar-sesion-button");
cerrarSesionButton.addEventListener("click", () => {
  // Elimina el tipo de usuario del almacenamiento local
  localStorage.removeItem("tipoDeUsuario");

  fetch("/auth/cerrar-sesion", {
    method: "GET",
  })
    .then((response) => response.text())
    .then((data) => {
      if (data === "Sesión cerrada exitosamente") {
        window.location.href = "/auth/inicio-sesion";
      } else {
        console.error("Error al cerrar sesión");
      }
    })
    .catch((error) => {
      console.error("Error al cerrar sesión:", error);
    });
});

});