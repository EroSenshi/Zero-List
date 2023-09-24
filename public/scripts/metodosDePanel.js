
document.addEventListener("DOMContentLoaded", async () => {

const idCurso = document.getElementById("cursoID");

// Función para eliminar un curso por su ID


async function eliminarCursoPorID(idCurso) {
    try {
      // Realiza la solicitud DELETE al servidor
      const response = await fetch(`/cursos/eliminar/${idCurso}`, {
        method: 'DELETE',
      });
  
      // Maneja la respuesta
      const data = await response.json();
  
      // Verifica si la eliminación fue exitosa
      if (data.message === 'Curso eliminado con éxito') {
        // Realiza alguna acción después de eliminar el curso, como recargar la página o actualizar la lista de cursos
        console.log('Curso eliminado con éxito');
      } else {
        console.error('Error al eliminar el curso:', data.error);
      }
    } catch (error) {
      console.error('Error al eliminar el curso:', error);
    }
  }
  

  document.getElementById("addCourse").addEventListener("click", () => {
    closeModal(); // Cierra el modal al hacer clic en "Cancelar"
  });

  
});