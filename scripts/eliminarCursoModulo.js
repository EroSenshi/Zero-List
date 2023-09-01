document.addEventListener('DOMContentLoaded', function () {
    const eliminarCursoButton = document.getElementById('eliminar-curso');
  
    eliminarCursoButton.addEventListener('click', function () {
      const id = prompt('Ingresa el ID del curso a eliminar:');
  
      if (id) { // Verificar si se ingresó un valor
        if (confirm('¿Estás seguro de que quieres eliminar este curso?')) {
          // Realizar la solicitud POST al servidor utilizando Axios
          axios.post('/eliminar_curso', { id })
            .then(function (response) {
              if (response.data === 'success') {
                // Recargar la página o realizar otras acciones según tu lógica
                location.reload();
              }
            })
            .catch(function (error) {
              console.error(error);
              // Manejar errores según tu lógica
            });
        }
      }
    });
  });
  