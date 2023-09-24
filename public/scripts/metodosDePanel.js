document.addEventListener("DOMContentLoaded", async () => {
  const idCurso = document.getElementById("cursoID");

  // Función para eliminar un curso por su ID

  async function agregarCurso(nombreCurso, idUsuario) {
    try {
      // Realiza una solicitud POST al servidor para agregar el curso
      const response = await fetch("/cursos/agregar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombreCurso, idUsuario }),
      });

      // Maneja la respuesta
      const data = await response.json();

      if (data.message === "Curso agregado con éxito") {
        // Curso agregado exitosamente, realiza alguna acción necesaria
        console.log("Curso agregado con éxito");
      } else {
        // Maneja el error de acuerdo a tus necesidades
        console.error("Error al agregar el curso:", data.error);
      }
    } catch (error) {
      console.error("Error al agregar el curso:", error);
    }
  }

  async function entrarACurso(idCurso) {
    try {
      // Realiza una solicitud POST al servidor para entrar al curso
      const response = await fetch("/cursos/entrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idCurso }),
      });

      // Maneja la respuesta
      const data = await response.json();

      if (data.message === "Curso ingresado con éxito") {
        // Curso ingresado exitosamente, realiza alguna acción necesaria
        console.log("Curso ingresado con éxito");
      } else {
        // Maneja el error de acuerdo a tus necesidades
        console.error("Error al entrar al curso:", data.error);
      }
    } catch (error) {
      console.error("Error al entrar al curso:", error);
    }
  }

  async function editarCursoPorID(idCurso, nuevoNombre) {
    try {
      // Realiza una solicitud PUT al servidor para editar el curso
      const response = await fetch(`/cursos/editar/${idCurso}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nuevoNombre }),
      });

      // Maneja la respuesta
      const data = await response.json();

      if (data.message === "Curso editado con éxito") {
        // Curso editado exitosamente, realiza alguna acción necesaria
        console.log("Curso editado con éxito");
      } else {
        // Maneja el error de acuerdo a tus necesidades
        console.error("Error al editar el curso:", data.error);
      }
    } catch (error) {
      console.error("Error al editar el curso:", error);
    }
  }

  async function eliminarCursoPorID(idCurso) {
    try {
      // Realiza la solicitud DELETE al servidor
      const response = await fetch(`/cursos/eliminar/${idCurso}`, {
        method: "DELETE",
      });

      // Maneja la respuesta
      const data = await response.json();

      // Verifica si la eliminación fue exitosa
      if (data.message === "Curso eliminado con éxito") {
        // Realiza alguna acción después de eliminar el curso, como recargar la página o actualizar la lista de cursos
        console.log("Curso eliminado con éxito");
      } else {
        console.error("Error al eliminar el curso:", data.error);
      }
    } catch (error) {
      console.error("Error al eliminar el curso:", error);
    }
  }

  document.getElementById("addCourse").addEventListener("click", () => {
    closeModal(); // Cierra el modal al hacer clic en "Cancelar"
  });
});
