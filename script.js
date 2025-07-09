document.addEventListener('DOMContentLoaded', () => {

    const videoPlayer = document.getElementById('libras-video');
    const videoPlaceholder = document.getElementById('video-placeholder');
    const checkpoints = document.querySelectorAll('.checkpoint');

    // Variável para guardar o nosso "cronômetro"
    

    // Função para destacar o checkpoint TEMPORARIAMENTE
    function destacarCheckpoint(pontoId) {
        // Cancela qualquer cronômetro anterior se o usuário clicar rápido em outro ponto
        

        // Remove o destaque de todos os outros pontos imediatamente
        checkpoints.forEach(cp => cp.classList.remove('checkpoint-active'));

        // Encontra o novo checkpoint para ativar
        const checkpointAtivo = document.querySelector(`.checkpoint[data-ponto="${pontoId}"]`);
        
        if (checkpointAtivo) {
            // Adiciona a classe que mostra o pulso e a mensagem "Você está aqui"
            checkpointAtivo.classList.add('checkpoint-active');

            // Inicia um novo cronômetro para remover o destaque depois de 5 segundos
             // 5000 milissegundos = 5 segundos
        }
    }

    // Função principal que toca o vídeo (continua a mesma)
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
                destacarCheckpoint(pontoId);
// Toca o vídeo correspondente
                tocarVideo(videoFile);

                // Gera o link para o QR Code no console
                const baseUrl = window.location.origin + window.location.pathname.replace('index.html', '');
                const qrCodeUrl = `${baseUrl.replace('map.html', '')}map.html?ponto=${pontoId}`;
                console.log(`Link para QR Code (${pontoId}): ${qrCodeUrl}`);
            }
        });
    });

    // Lógica do QR CODE (continua a mesma)
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