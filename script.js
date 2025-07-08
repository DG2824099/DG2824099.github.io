// --- VERSÃO FINAL E CORRIGIDA ---

const videoPlayer = document.getElementById('libras-video');
const videoPlaceholder = document.getElementById('video-placeholder');

// 1. FUNÇÃO PRINCIPAL QUE TOCA O VÍDEO
function tocarVideo(caminhoDoVideo) {
  // Garante que o caminho não comece com 'videos/' se não for necessário
  // (Este código funciona mesmo que você decida voltar a usar a pasta 'videos' no futuro)
  const finalPath = caminhoDoVideo.startsWith('videos/') ? caminhoDoVideo : caminhoDoVideo;

  if (videoPlayer && videoPlaceholder) {
    videoPlaceholder.style.display = 'none';
    videoPlayer.style.display = 'block';
    videoPlayer.src = finalPath;
    videoPlayer.play();
  }
}

// 2. LÓGICA DE CLIQUE E QR CODE
document.addEventListener('DOMContentLoaded', () => {
    const checkpoints = document.querySelectorAll('.checkpoint');

    checkpoints.forEach(checkpoint => {
        checkpoint.addEventListener('click', function() {
            // Pega o caminho do vídeo do atributo 'data-video-src'
            const videoFile = this.dataset.videoSrc;

            if (videoFile) {
                // Toca o vídeo na página
                tocarVideo(videoFile);

                // Gera e exibe o link direto no console para o QR Code
                const baseUrl = 'https://dg2824099.github.io/';
                const videoUrl = `${baseUrl}${videoFile}`;
                console.log(`Link para o QR Code (${videoFile}): ${videoUrl}`);
            } else {
                console.error("Checkpoint não possui o atributo 'data-video-src' com o nome do vídeo.");
            }
        });
    });
});