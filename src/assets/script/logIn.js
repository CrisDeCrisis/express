const logInForm = document.querySelector('#formularioRegistro');
const url = 'http://localhost:3000/login';

logInForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(logInForm);
    const data = {
        email: formData.get('email'),
        password: formData.get('password')
    };
    const response = await logIn(data);
    console.log(response);
});

const logIn = async (data) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

logIn();

console.log('LogIn');