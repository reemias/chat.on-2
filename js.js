document.addEventListener('DOMContentLoaded', (event) => {
    const inputMensagem = document.getElementById('inputMensagem');
    const botaoEnviar = document.getElementById('botaoEnviar');
    const mensagensContainer = document.querySelector('.mensagens');

    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
        const mensagem = JSON.parse(event.data);
        const mensagemDiv = document.createElement('div');
        mensagemDiv.classList.add('mensagem___cliente');
        mensagemDiv.innerHTML = `<span class="nome-outro">${mensagem.name}</span> ${mensagem.text}`;
        mensagensContainer.appendChild(mensagemDiv);
    };

    botaoEnviar.addEventListener('click', () => {
        const mensagem = {
            name: 'Usuário', // Você pode substituir isso pelo nome do usuário real
            text: inputMensagem.value
        };
        ws.send(JSON.stringify(mensagem));

        const mensagemDiv = document.createElement('div');
        mensagemDiv.classList.add('mensagen___self');
        mensagemDiv.textContent = mensagem.text;
        mensagensContainer.appendChild(mensagemDiv);

        inputMensagem.value = ''; // Limpa o input após enviar a mensagem
    });
});
