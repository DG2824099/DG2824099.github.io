// Seleciona os elementos importantes da página
const botoes = document.querySelectorAll('.ponto-trilha');
const videoPlayer = document.getElementById('libras-video');
const statusText = document.getElementById('status');
const avatarContainer = document.getElementById('avatar-container');

// URL da API
const API_URL = "https://api.vlibras.gov.br/translate?text=";

// Função para buscar e exibir o vídeo
async function fetchLibrasVideo(text) {
    try {
        // Mostra uma mensagem de carregamento
        statusText.style.display = 'block';
        videoPlayer.style.display = 'none';
        statusText.textContent = `Carregando tradução para "${text}"...`;

        // Faz a chamada para a API
        const response = await fetch(API_URL + encodeURIComponent(text));
        
        if (!response.ok) {
            throw new Error('Falha ao buscar tradução.');
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
