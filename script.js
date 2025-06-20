// --- VERSÃO FINAL E LIMPA DO SCRIPT.JS ---

// O evento 'DOMContentLoaded' espera todo o HTML ser carregado antes de executar o script.
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona todos os botões com a classe '.ponto-trilha'
    const buttons = document.querySelectorAll('.ponto-trilha');

    // Função que será chamada quando um botão for clicado
    const handleTranslationClick = (event) => {
        // Pega o texto do atributo 'data-text' do botão que foi clicado
        const textToTranslate = event.currentTarget.dataset.text;

        // Verifica se o texto existe antes de prosseguir
        if (textToTranslate) {
            // Codifica o texto para que ele possa ser usado em uma URL
            const encodedText = encodeURIComponent(textToTranslate);
            
            // Monta a URL completa do Player Web do VLibras
            const vlibrasPlayerUrl = `https://www.vlibras.gov.br/player.html?video=${encodedText}`;
            
            // Abre a URL em uma nova aba do navegador
            const newWindow = window.open(vlibrasPlayerUrl, '_blank');

            // Adiciona uma verificação para o caso de o navegador bloquear o pop-up
            if (!newWindow) {
                alert("O seu navegador bloqueou a abertura da janela. Por favor, permita pop-ups para este site e tente novamente.");
            }
            
        } else {
            // Loga um erro no console se o botão não tiver o atributo data-text
            console.error("O botão clicado não possui texto no atributo 'data-text'.");
        }
    };

    // Adiciona o 'escutador' de clique a cada um dos botões encontrados na página
    buttons.forEach(button => {
        button.addEventListener('click', handleTranslationClick);
    });
});