document.addEventListener('DOMContentLoaded', () => {

    const videoPlayer = document.getElementById('libras-video');
    const videoPlaceholder = document.getElementById('video-placeholder');
    const checkpoints = document.querySelectorAll('.checkpoint');

    // Função para destacar o checkpoint ativo
    function destacarCheckpoint(pontoId) {
        checkpoints.forEach(cp => cp.classList.remove('checkpoint-active'));
        const checkpointAtivo = document.querySelector(`.checkpoint[data-ponto="${pontoId}"]`);
        if (checkpointAtivo) {
            checkpointAtivo.classList.add('checkpoint-active');
        }
    }

    // Função principal que toca o vídeo
    function tocarVideo(caminhoDoVideo) {
        if (videoPlayer && videoPlaceholder) {
            videoPlaceholder.style.display = 'none';
            videoPlayer.style.display = 'block';
            videoPlayer.src = caminhoDoVideo;
            videoPlayer.play();
        }
    }

    // Adiciona o evento de clique a cada checkpoint
    checkpoints.forEach(checkpoint => {
        checkpoint.addEventListener('click', function() {
            const pontoId = this.dataset.ponto;
            const videoFile = this.dataset.videoSrc;

            if (pontoId && videoFile) {
                // Destaca o ponto clicado
                destacarCheckpoint(pontoId);
                // Toca o vídeo correspondente
                tocarVideo(videoFile);

                // Gera e exibe o link direto no console para o QR Code
                const baseUrl = window.location.origin + window.location.pathname;
                const qrCodeUrl = `${baseUrl}?ponto=${pontoId}`;
                console.log(`Link para QR Code (${pontoId}): ${qrCodeUrl}`);
            }
        });
    });

    // --- LÓGICA DO "VOCÊ ESTÁ AQUI" (QR CODE) ---
    // Roda assim que a página carrega
    const params = new URLSearchParams(window.location.search);
    const pontoInicial = params.get('ponto');

    if (pontoInicial) {
        const videoInicial = `${pontoInicial}.mp4`; // Assume que o nome do vídeo é o mesmo do ponto
        destacarCheckpoint(pontoInicial);
        tocarVideo(videoInicial);
    }
});