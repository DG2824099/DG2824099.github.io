// Aguarda o DOM (a estrutura da página) ser completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    
    // Seleciona os elementos da página
    const botoes = document.querySelectorAll('.ponto-trilha');
    const avatarPlaceholder = document.getElementById('avatar-placeholder');
    const errorMessage = document.getElementById('error-message');

    // Função que será chamada quando um botão for clicado
    function handleButtonClick(event) {
        const botao = event.currentTarget;
        const textoParaTraduzir = botao.dataset.text;

        // Verifica se o widget do VLibras está disponível
        if (window.VLibras && window.VLibras.widget) {
            window.VLibras.widget.translate(textoParaTraduzir);
        } else {
            console.error('O widget do VLibras não está pronto ou falhou ao carregar.');
            // Se o widget não funcionar, não faz nada (a mensagem de erro global já estará visível)
        }
    }

    // Função para verificar se o Widget do VLibras carregou
    function verificarWidgetVLibras() {
        if (window.VLibras && window.VLibras.widget) {
            // Sucesso! O widget carregou.
            console.log('Widget do VLibras carregado com sucesso.');
            if (avatarPlaceholder) {
                avatarPlaceholder.textContent = 'Selecione um item acima para traduzir.';
            }
            // Adiciona o evento de clique a cada botão
            botoes.forEach(botao => {
                botao.addEventListener('click', handleButtonClick);
            });
        } else {
            // Falha! Mostra a mensagem de erro e esconde o placeholder
            console.error('Falha ao carregar o widget do VLibras.');
            if (errorMessage) {
                errorMessage.style.display = 'block';
            }
            if (avatarPlaceholder) {
                avatarPlaceholder.style.display = 'none';
            }
        }
    }

    // Tenta verificar o widget após um pequeno atraso (2 segundos) para dar tempo de carregar
    setTimeout(verificarWidgetVLibras, 2000);

});