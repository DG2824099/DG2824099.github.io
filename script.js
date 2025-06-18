// Seleciona os elementos da página
const botoes = document.querySelectorAll('.ponto-trilha');
const videoPlayer = document.getElementById('libras-video');
const fallbackMessage = document.getElementById('fallback-message');

// Adiciona o evento de clique para cada botão
botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        // Pega as informações do botão clicado
        const textoParaTraduzir = botao.dataset.text;
        const videoDeFallback = botao.dataset.fallbackVideo;

        // Limpa mensagens anteriores
        fallbackMessage.style.display = 'none';
        videoPlayer.style.display = 'block';

        // Tenta usar o tradutor online do VLibras primeiro
        if (window.VLibras && window.VLibras.widget) {
            console.log("Plugin VLibras encontrado! Usando tradução ao vivo.");
            window.VLibras.widget.translate(textoParaTraduzir);
        
        } else {
            // Se o plugin não estiver disponível, usa o vídeo local (Plano B)
            console.log("Plugin VLibras não encontrado. Usando vídeo de fallback.");
            fallbackMessage.style.display = 'block'; // Mostra a mensagem de fallback
            
            if (videoPlayer) {
                videoPlayer.src = videoDeFallback;
                videoPlayer.play();
            }
        }
    });
});
