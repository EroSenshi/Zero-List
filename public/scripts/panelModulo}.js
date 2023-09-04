const cursosContainer = document.getElementById('cursos-container');

axios.get('/cursos')
  .then(response => {
    const cursos = response.data;
    cursos.forEach(curso => {
      const section = document.createElement('section');
      section.className = 'container';
      
      const form = document.createElement('form');
      form.action = 'listas.html'; // Cambia a la ruta correcta
      form.method = 'post';
      
      const div = document.createElement('div');
      div.className = 'tarjeta';
      
      const h3 = document.createElement('h3');
      h3.textContent = curso.nombreCurso;
      
      const p = document.createElement('p');
      p.textContent = 'ID: ' + curso.id;
      
      const hiddenInput = document.createElement('input');
      hiddenInput.type = 'hidden';
      hiddenInput.name = 'curso_id';
      hiddenInput.value = curso.id;
      
      const inputVer = document.createElement('input');
      inputVer.type = 'submit';
      inputVer.id = 'ver';
      inputVer.value = 'Ver detalles';
      
      div.appendChild(h3);
      div.appendChild(p);
      form.appendChild(div);
      form.appendChild(hiddenInput);
      form.appendChild(inputVer);
      section.appendChild(form);
      cursosContainer.appendChild(section);
    });
  })
  .catch(error => {
    console.error(error);
  });
