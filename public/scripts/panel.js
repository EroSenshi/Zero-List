document.addEventListener("DOMContentLoaded", async () => {
    // Función para obtener el tipo de usuario y configurar los botones
    async function obtenerTipoDeUsuario() {
      try {
        // Intenta obtener el tipo de usuario desde el almacenamiento local
        const tipoDeUsuario = localStorage.getItem("tipoDeUsuario");
  
        if (tipoDeUsuario !== null) {
          console.log("Tipo de usuario (desde localStorage):", tipoDeUsuario);
          configurarBotones(Number(tipoDeUsuario)); // Convierte a número
        } else {
          // Realiza una solicitud al servidor para obtener el tipo de usuario
          const response = await axios.get("/usuario/tipo-usuario");
          const tipoDeUsuario = response.data.tipoDeUsuario;
          console.log("Tipo de usuario (desde el servidor):", tipoDeUsuario);
  
          // Almacena el tipo de usuario en el almacenamiento local
          localStorage.setItem("tipoDeUsuario", tipoDeUsuario);
  
          // Configura los botones
          configurarBotones(tipoDeUsuario);
        }
      } catch (error) {
        console.error("Error al obtener el tipo de usuario:", error);
      }
    }
  
    // Función para configurar los botones según el tipo de usuario
    function configurarBotones(tipoDeUsuario) {
      const addCourseButton = document.getElementById("addCourse");
      const editarCursoButtons = document.querySelectorAll(".editar-curso-button");
      const eliminarCursoButtons = document.querySelectorAll(".eliminar-curso-button");
  
      if (tipoDeUsuario == 0) {
        // Usuario tipo 0 (profesor/preceptor)
        addCourseButton.style.display = "block";
        editarCursoButtons.forEach((button) => {
          button.style.display = "block";
        });
        eliminarCursoButtons.forEach((button) => {
          button.style.display = "block";
        });
      } else {
        // Usuario tipo 1 (alumno)
        addCourseButton.style.display = "none";
        editarCursoButtons.forEach((button) => {
          button.style.display = "none";
        });
        eliminarCursoButtons.forEach((button) => {
          button.style.display = "none";
        });
      }
    }
  
    // Cargar cursos una vez obtenido el tipo de usuario
    async function cargarCursos() {
      try {
        const response = await axios.get("/cursos");
        const cursos = response.data;
        const cursosContainer = document.getElementById("cursos-container");
  
        // Limpiar el contenido existente en el contenedor de cursos
        cursosContainer.innerHTML = "";
  
        cursos.forEach((curso) => {
          const cursoDiv = document.createElement("div");
          cursoDiv.classList.add("curso");
          cursoDiv.innerHTML = `
            <h3>${curso.nombreDeCurso}</h3>
            <p>ID: ${curso.id}</p>
          `;
  
          const editarCursoButton = document.createElement("button");
          editarCursoButton.textContent = "Editar Curso";
          editarCursoButton.classList.add("editar-curso-button");
          editarCursoButton.addEventListener("click", (e) => {
            e.stopPropagation(); // Evita la propagación del evento de clic al div padre
            document.getElementById("editarCursoModal").style.display = "block";
          });
  
          const eliminarCursoButton = document.createElement("button");
          eliminarCursoButton.textContent = "Eliminar Curso";
          eliminarCursoButton.classList.add("eliminar-curso-button");
          eliminarCursoButton.addEventListener("click", (e) => {
            e.stopPropagation(); // Evita la propagación del evento de clic al div padre
            const nombreCursoAEliminar = curso.nombreDeCurso;
            document.getElementById("nombreCursoAEliminar").textContent = nombreCursoAEliminar;
            document.getElementById("eliminarCursoModal").style.display = "block";
          });
  
          cursoDiv.appendChild(editarCursoButton);
          cursoDiv.appendChild(eliminarCursoButton);
  
          cursoDiv.addEventListener("click", () => {
            window.location.href = `/listas.html?id=${curso.id}`;
          });
  
          cursosContainer.appendChild(cursoDiv);
        });
      } catch (error) {
        console.error("Error al cargar cursos:", error);
      }
    }
  
    // Función para cerrar cualquier modal
    function closeModal() {
      const modals = document.querySelectorAll(".modal");
      modals.forEach((modal) => {
        modal.style.display = "none";
      });
    }
  
    // Cargar cursos una vez obtenido el tipo de usuario
    await cargarCursos();
  
    // Obtener y configurar el tipo de usuario al cargar la página
    await obtenerTipoDeUsuario();
  
    // Resto de tu código...
  
    // Limpiar el almacenamiento local al hacer clic en cerrar sesión
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
  
    document.getElementById("cancelarEditarCurso").addEventListener("click", () => {
      closeModal(); // Cierra el modal al hacer clic en "Cancelar"
    });
  
    document.getElementById("cancelarEliminarCurso").addEventListener("click", () => {
      closeModal(); // Cierra el modal al hacer clic en "Cancelar"
    });
  
    // Abre el modal de agregar curso al hacer clic en el botón "Agregar curso" del header
    const agregarCursoButton = document.getElementById("addCourse");
    agregarCursoButton.addEventListener("click", () => {
      document.getElementById("agregarCursoModal").style.display = "block";
    });
  
    // Cierra el modal de agregar curso al hacer clic en el botón "Cancelar"
    document.getElementById("cancelarAgregarCurso").addEventListener("click", () => {
      closeModal(); // Cierra el modal al hacer clic en "Cancelar"
    });
  
    // ... Tu código existente ...
  });
  