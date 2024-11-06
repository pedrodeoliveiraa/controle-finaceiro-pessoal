document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Pegando os valores de nome de usuário e senha
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Definindo o usuário e senha esperados
    const correctUsername = 'pedro';  // Exemplo de nome de usuário
    const correctPassword = '562182';    // Exemplo de senha

    // Validando o login
    if (username === correctUsername && password === correctPassword) {
        // Login bem-sucedido, redireciona para a página do sistema
        window.location.href = 'index.html';  // Substitua com o nome da sua página principal
    } else {
        // Login falhou, exibe a mensagem de erro
        document.getElementById('error-message').innerText = 'Usuário ou senha inválidos!';
    }
});
