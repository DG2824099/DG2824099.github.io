// --- VERSÃO DE DEBUG DO SCRIPT.JS ---
// O objetivo é imprimir mensagens no console para entendermos onde o código está parando.

console.log("Debug: O arquivo script.js começou a ser executado.");

document.addEventListener('DOMContentLoaded', () => {

    console.log("Debug: O evento DOMContentLoaded foi disparado. O HTML está carregado.");

    // Seleciona todos os botões da trilha
    const buttons = document.querySelectorAll('.ponto-trilha');
    
    // Verifica se os botões foram encontrados
    if (buttons.length > 0) {
        console.log(`Debug: ${buttons.length} botões com a classe '.ponto-trilha' foram encontrados.`);
    } else {
        console.error("Debug: ERRO CRÍTICO - Nenhum botão com a classe '.ponto-trilha' foi encontrado. Verifique o HTML.");
        return; // Para a execução se não houver botões
    }

    // Função que será chamada quando um botão for clicado
    const handleTranslationClick = (event) => {
        console.log("Debug: Um botão foi clicado!");

        // Pega o texto do atributo 'data-text' do botão que foi clicado
        const textToTranslate = event.currentTarget.dataset.text;
        console.log(`Debug: Texto para traduzir: "${textToTranslate}"`);

        // Verifica se o texto não está vazio
        if (textToTranslate) {
            // Codifica o texto para ser usado em uma URL (substitui espaços por %20, etc.)
            const encodedText = encodeURIComponent(textToTranslate);
            
            // Monta a URL do Player Web do VLibras
            const vlibrasPlayerUrl = `https://www.vlibras.gov.br/player.html?video=${encodedText}`;
            console.log(`Debug: URL final que será aberta: ${vlibrasPlayerUrl}`);
            
            // Abre a URL em uma nova aba do navegador
            // AVISO: O seu navegador pode bloquear esta ação como um pop-up.
            // Verifique se um ícone de pop-up bloqueado aparece na barra de endereço.
            const newWindow = window.open(vlibrasPlayerUrl, '_blank');
            
            if (newWindow) {
                console.log("Debug: A nova janela foi aberta com sucesso.");
            } else {
                console.error("Debug: ERRO - O navegador bloqueou a abertura da nova janela (pop-up). Por favor, permita pop-ups para este site.");
                alert("O seu navegador bloqueou a abertura da janela. Por favor, permita pop-ups para este site e tente novamente.");
            }
            
        } else {
            console.error("Debug: O botão clicado não possui texto no atributo 'data-text'.");
        }
    };

    // Adiciona o 'escutador' de clique a cada um dos botões
    buttons.forEach((button, index) => {
        console.log(`Debug: Adicionando o listener de clique ao botão #${index + 1}.`);
        button.addEventListener('click', handleTranslationClick);
    });

    console.log("Debug: Script finalizado. Todos os listeners de clique foram adicionados.");
});
