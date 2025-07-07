// O evento 'DOMContentLoaded' espera todo o HTML ser carregado antes de executar o script.
document.addEventListener('DOMContentLoaded', () => {
    
    const botoes = document.querySelectorAll('.ponto-trilha');
    const errorMessage = document.getElementById('error-message');

    // Função que será chamada quando um botão for clicado
    function handleTranslateClick(event) {
        // Pega o texto do atributo 'data-text' do botão que foi clicado
        const textoParaTraduzir = event.currentTarget.dataset.text;

        // Verifica se o widget do VLibras realmente está disponível antes de usar
        if (window.VLibras && window.VLibras.widget) {
            window.VLibras.widget.translate(textoParaTraduzir);
        } else {
            // Este alerta só apareceria se algo muito estranho acontecesse
            alert("O tradutor de LIBRAS parou de funcionar. Por favor, recarregue a página.");
        }
    }

    // Função para verificar repetidamente se o Widget do VLibras carregou
    function checkWidget(attemptsLeft) {
        // Se o widget carregou, ótimo! Adicionamos a função de clique aos botões.
        if (window.VLibras && window.VLibras.widget) {
            console.log("Widget do VLibras carregado com sucesso. Botões ativados.");
            botoes.forEach(botao => {
                botao.addEventListener('click', handleTranslateClick);
            });
            return; // Para de verificar
        }

        // Se tentamos 10 vezes (por 5 segundos) e não carregou, desistimos.
        if (attemptsLeft <= 0) {
            console.error("Falha ao carregar o widget do VLibras após várias tentativas.");
            if (errorMessage) {
                errorMessage.style.display = 'block'; // Mostra a mensagem de erro na página
            }
            return;
        }

        // Se ainda não carregou, espera meio segundo e tenta de novo.
        setTimeout(() => checkWidget(attemptsLeft - 1), 500);
    }

    // Inicia a verificação do widget, tentando 10 vezes.
    checkWidget(10);
});