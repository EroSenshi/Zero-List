  
  document.addEventListener("DOMContentLoaded", async () => {
  
  // Agregar un controlador de eventos al formulario
  document.getElementById('agregarCursoForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Evitar la acción predeterminada de enviar el formulario

    // Obtener los datos del formulario
    const nombreCurso = document.getElementById('nombreCurso').value;

    // Realizar la solicitud AJAX para agregar el curso (puedes utilizar fetch o axios)
    // Aquí puedes agregar la lógica para enviar los datos al servidor
    // Por ejemplo, utilizando axios:
    axios.post('/cursos/agregar', { nombreCurso })
      .then((response) => {
        // Limpiar el formulario
        document.getElementById('nombreCurso').value = '';

        // Actualizar la página
        location.reload();
      })
      .catch((error) => {
        console.error('Error al agregar el curso:', error);
        // Manejar errores aquí si es necesario
      });
  });

});