const videoPlayer = document.getElementById('libras-video');
const videoPlaceholder = document.getElementById('video-placeholder');

function tocarVideo(caminhoDoVideo) {
  if (videoPlayer && videoPlaceholder) {
    // Esconde o texto inicial "Selecione um checkpoint..."
    videoPlaceholder.style.display = 'none';
    
    // Mostra o player de vídeo
    videoPlayer.style.display = 'block';
    
    // Define o caminho do vídeo e o inicia
    videoPlayer.src = guapuruvu.mp4.mp4;
    videoPlayer.play();
  }
}