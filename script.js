document.addEventListener('DOMContentLoaded', () => {

    const videoPlayer = document.getElementById('libras-video');
    const videoPlaceholder = document.getElementById('video-placeholder');
    const checkpoints = document.querySelectorAll('.checkpoint');

    // Variável para guardar o nosso "cronômetro" da mensagem
    let labelTimer;

    // Função para destacar o checkpoint
    function destacarCheckpoint(pontoId) {
        // Cancela qualquer cronômetro anterior para a mensagem não sumir antes da hora
        clearTimeout(labelTimer);

        // Remove o destaque (pulso e label) de todos os outros pontos
        checkpoints.forEach(cp => {
            cp.classList.remove('checkpoint-active', 'show-label');
        });

        // Encontra o novo checkpoint para ativar
        const checkpointAtivo = document.querySelector(`.checkpoint[data-ponto="${pontoId}"]`);
        
        if (checkpointAtivo) {
            // Adiciona a classe do pulso (que será permanente até o próximo clique)
            checkpointAtivo.classList.add('checkpoint-active');
            
            // Adiciona a classe que mostra a mensagem
            checkpointAtivo.classList.add('show-label');

            // Inicia um novo cronômetro para remover APENAS a classe da mensagem depois de 5 segundos
            labelTimer = setTimeout(() => {
                checkpointAtivo.classList.remove('show-label');
            }, 5000); // 5000 milissegundos = 5 segundos
        }
    }

    // Função principal que toca o vídeo (não muda)
    function tocarVideo(caminhoDoVideo) {
        if (videoPlayer && videoPlaceholder) {
            videoPlaceholder.style.display = 'none';
            videoPlayer.style.display = 'block';
            videoPlayer.src = caminhoDoVideo;
            videoPlayer.play();
        }
    }

    // Adiciona o evento de clique a cada checkpoint (não muda)
    checkpoints.forEach(checkpoint => {
        checkpoint.addEventListener('click', function(event) {
            if (event.target.closest('.info-link')) return;
            
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

    // Lógica do QR CODE (não muda)
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