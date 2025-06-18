// Esta função será chamada pelos botões no HTML
function traduzir(texto) {
  // Verifica se o widget do VLibras está pronto na página
  if (window.VLibras && window.VLibras.widget) {
    // Pede ao widget para traduzir o texto fornecido
    window.VLibras.widget.translate(texto);
  } else {
    // Se o widget não carregou, avisa no console
    console.error("O widget do VLibras não foi encontrado ou não está pronto.");
  }
}
