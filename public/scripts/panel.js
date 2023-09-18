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
});
