document.addEventListener('DOMContentLoaded', () => {

    const videoPlayer = document.getElementById('libras-video');
    const videoPlaceholder = document.getElementById('video-placeholder');
    const checkpoints = document.querySelectorAll('.checkpoint');

    function destacarCheckpoint(pontoId) {
        checkpoints.forEach(cp => cp.classList.remove('checkpoint-active'));
        const checkpointAtivo = document.querySelector(`.checkpoint[data-ponto="${pontoId}"]`);
        if (checkpointAtivo) {
            checkpointAtivo.classList.add('checkpoint-active');
        }
    }

    function tocarVideo(caminhoDoVideo) {
        if (videoPlayer && videoPlaceholder) {
            videoPlaceholder.style.display = 'none';
            videoPlayer.style.display = 'block';
            videoPlayer.src = caminhoDoVideo;
            videoPlayer.play();
        }
    }

    checkpoints.forEach(checkpoint => {
        checkpoint.addEventListener('click', function(event) {
            // Garante que o clique no link de info não toque o vídeo
            if (event.target.closest('.info-link')) {
                return;
            }

            const pontoId = this.dataset.ponto;
            const videoFile = this.dataset.videoSrc;

            if (pontoId && videoFile) {
                destacarCheckpoint(pontoId);
                tocarVideo(videoFile);

                const baseUrl = window.location.origin + window.location.pathname.replace('index.html', '');
                const qrCodeUrl = `${baseUrl.replace('map.html', '')}map.html?ponto=${pontoId}`;
                console.log(`Link para QR Code (${pontoId}): ${qrCodeUrl}`);
            }
        });
    });

    const params = new URLSearchParams(window.location.search);
    const pontoInicial = params.get('ponto');

    if (pontoInicial) {
        const checkpointAtivo = document.querySelector(`.checkpoint[data-ponto="${pontoInicial}"]`);
        if (checkpointAtivo) {
            const videoParaTocar = checkpointAtivo.dataset.videoSrc;
            destacarCheckpoint(pontoInicial);
            tocarVideo(videoParaTocar);
        }
    }
});