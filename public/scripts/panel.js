document.addEventListener('DOMContentLoaded', () => {
    cargarCursos();

    function cargarCursos() {
        // Realiza una solicitud al servidor para obtener la lista de cursos
        axios.get('/cursos') // Utiliza la ruta definida en tu servidor Node.js
            .then(response => {
                const cursos = response.data;
                const cursosContainer = document.getElementById('cursos-container');

                cursos.forEach(curso => {
                    const cursoDiv = document.createElement('div');
                    cursoDiv.classList.add('curso');
                    cursoDiv.innerHTML = `
                        <h3>${curso.nombreDeCurso}</h3>
                        <p>ID: ${curso.id}</p>
                    `;

                    cursoDiv.addEventListener('click', () => {
                        // Redirecciona al usuario a la página de listas con el ID del curso
                        window.location.href = `/listas.html?id=${curso.id}`; // Cambia a listas.html
                    });

                    if (cursosContainer) { // Verifica si cursosContainer existe
                        cursosContainer.appendChild(cursoDiv);
                    } else {
                        console.error('Elemento cursos-container no encontrado en el DOM.');
                    }
                });
            })
            .catch(error => {
                console.error('Error al cargar cursos:', error);
            });
    }

    //cerrar sesion
    const cerrarSesionButton = document.getElementById('cerrar-sesion-button');

    cerrarSesionButton.addEventListener('click', () => {
        // Realiza una solicitud al servidor para cerrar la sesión del usuario
        fetch('/auth/cerrar-sesion', {
            method: 'GET',
        })
            .then((response) => response.text())
            .then((data) => {
                if (data === 'Sesión cerrada exitosamente') {
                    // Redirige al usuario al inicio de sesión
                    window.location.href = '/auth/inicio-sesion';
                } else {
                    console.error('Error al cerrar sesión');
                }
            })
            .catch((error) => {
                console.error('Error al cerrar sesión:', error);
            });
    });

    // Función para obtener el tipo de usuario y configurar los botones
    function obtenerTipoDeUsuario() {
        // Realiza una solicitud al servidor para obtener el tipo de usuario
        axios.get('/usuario/tipo-usuario') // Utiliza la ruta definida en tu servidor Node.js
            .then(response => {
                const tipoDeUsuario = response.data.tipoDeUsuario;
                // Lógica para mostrar u ocultar botones según el tipo de usuario
                const addCourseButton = document.getElementById('addCourse');
                const editCourseButton = document.getElementById('editCourse');
                const deleteCourseButton = document.getElementById('deleteCourse');
                const enterCourseButton = document.getElementById('enterCourse');

                if (tipoDeUsuario == 0) { // Usuario tipo 0 (profesor/preceptor)
                    addCourseButton.style.display = 'block';
                    editCourseButton.style.display = 'block';
                    deleteCourseButton.style.display = 'block';
                    enterCourseButton.style.display = 'block'; // Oculta el botón "Entrar a curso" para tipo 0
                } else if (tipoDeUsuario == 1) { // Usuario tipo 1 (alumno)
                    addCourseButton.style.display = 'none';
                    editCourseButton.style.display = 'none';
                    deleteCourseButton.style.display = 'none';
                    enterCourseButton.style.display = 'block'; // Muestra solo el botón "Entrar a curso" para tipo 1
                }
                console.log(tipoDeUsuario);
            })
            .catch(error => {
                console.error('Error al obtener el tipo de usuario:', error);
            });
    }

    // Obtener y configurar el tipo de usuario al cargar la página
    obtenerTipoDeUsuario();
});
