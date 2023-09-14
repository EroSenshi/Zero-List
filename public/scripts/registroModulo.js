// registroModulo.js

import axios from 'axios';

// Función para registrar un usuario
async function registrarUsuario(nombre, usuario, password, confirm_password) {
  try {
    const response = await axios.post('/PHP/registro.php', {
      nombre,
      usuario,
      password,
      confirm_password,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Agrega un evento para manejar el envío del formulario
document.getElementById('registro-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const nombre = this.elements.nombre.value;
  const usuario = this.elements.usuario.value;
  const password = this.elements.password.value;
  const confirm_password = this.elements.confirm_password.value;

  try {
    // Llama a la función para registrar al usuario
    const respuesta = await registrarUsuario(nombre, usuario, password, confirm_password);

    // Aquí puedes manejar la respuesta del servidor si es necesario
    console.log(respuesta);
  } catch (error) {
    console.error(error);
    // Maneja los errores de manera adecuada
  }
});
