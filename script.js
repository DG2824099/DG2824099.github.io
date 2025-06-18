// Seleciona os elementos importantes da página
const botoes = document.querySelectorAll('.ponto-trilha');
const videoPlayer = document.getElementById('libras-video');
const statusText = document.getElementById('status');
const avatarContainer = document.getElementById('avatar-container');

// URL da API
const API_URL = "https://corsproxy.io/?https%3A%2F%2Fapi.vlibras.gov.br%2Ftranslate%3Ftext%3D";

// Função para buscar e exibir o vídeo
async function fetchLibrasVideo(text) {
    try {
        // Mostra uma mensagem de carregamento
        statusText.style.display = 'block';
        videoPlayer.style.display = 'none';
        statusText.textContent = `Carregando tradução...`;

        // A URL agora é fixa, sem o texto nela
        const API_ENDPOINT = 'https://corsproxy.io/?https%3A%2F%2Fapi.vlibras.gov.br%2Ftranslate';

        // Faz a chamada para a API usando o método POST
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text }) // Envia o texto no corpo da requisição
        });

        if (!response.ok) {
            // Agora podemos ver o status exato do erro!
            throw new Error(`Falha na tradução. Status: ${response.status}`);
        }

        const data = await response.json();
        const videoUrl = data.links[0].href;

        // Esconde o texto de status e mostra o player de vídeo
        statusText.style.display = 'none';
        videoPlayer.style.display = 'block';

        // Define a URL do vídeo no player e inicia a reprodução
        videoPlayer.src = videoUrl;
        videoPlayer.play();

    } catch (error) {
        statusText.textContent = 'Erro ao carregar o vídeo. Tente novamente.';
        console.error("Erro:", error);
    }
}

// Adiciona um "ouvinte" de clique para cada botão
botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        const textoParaTraduzir = botao.getAttribute('data-text');
        fetchLibrasVideo(textoParaTraduzir);
    });
});
