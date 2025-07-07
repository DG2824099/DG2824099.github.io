// --- VERSÃO FINAL E COMPLETA ---

// Seleciona os elementos da página que a função vai usar
const videoPlayer = document.getElementById('libras-video');
const videoPlaceholder = document.getElementById('video-placeholder');

// Função principal que toca o vídeo na tela
function tocarVideo(caminhoDoVideo) {
  // Gera e exibe o link direto do vídeo no console para o QR Code
  const baseUrl = 'https://dg2824099.github.io/';
  const urlCompleta = `${baseUrl}${caminhoDoVideo}`;
  console.log(`Link para QR Code: ${urlCompleta}`);

  // Toca o vídeo na página
  if (videoPlayer && videoPlaceholder) {
    videoPlaceholder.style.display = 'none'; // Esconde o texto "Selecione um checkpoint..."
    videoPlayer.style.display = 'block';     // Mostra o elemento de vídeo
    
    videoPlayer.src = caminhoDoVideo;        // Define a fonte do vídeo e o inicia
    videoPlayer.play();
  }
}