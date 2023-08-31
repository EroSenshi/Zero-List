const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await axios.post('/login', { username, password });
    console.log(response.data); // Aquí puedes manejar la respuesta del servidor
  } catch (error) {
    console.error(error);
  }
});