const videoPlayer = document.getElementById('libras-video');
const videoPlaceholder = document.getElementById('video-placeholder');

function tocarVideo(caminhoDoVideo) {
  if (videoPlayer && videoPlaceholder) {
    // Esconde o texto e mostra o player de vídeo
    videoPlaceholder.style.display = 'none';
    videoPlayer.style.display = 'block';
    
    // Define o caminho e toca o vídeo
    videoPlayer.src = caminhoDoVideo;
    videoPlayer.play();
  }
}
const mapContainer = document.querySelector('.map-container');

// Função que será ativada ao clicar no mapa
function encontrarCoordenadas(event) {
    // Pega as dimensões do container do mapa
    const rect = mapContainer.getBoundingClientRect();

    // Calcula a posição do clique dentro do mapa
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Calcula a posição em porcentagem
    const leftPercent = (x / rect.width) * 100;
    const topPercent = (y / rect.height) * 100;

    // Exibe as coordenadas no console no formato exato que precisamos
    console.log(`style="top: ${topPercent.toFixed(2)}%; left: ${leftPercent.toFixed(2)}%;"`);
}

// Adiciona o "escutador" de cliques ao mapa
mapContainer.addEventListener('click', encontrarCoordenadas);

// --- FIM DO MODO CRIADOR ---