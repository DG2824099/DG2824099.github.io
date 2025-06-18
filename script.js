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
