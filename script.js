function traduzir(texto) {
  // Tenta fazer a tradução
  const tentarTraducao = () => {
    if (window.VLibras && window.VLibras.widget) {
      window.VLibras.widget.translate(texto);
    } else {
      // Se ainda não estiver pronto, mostra um erro e um alerta ao usuário.
      console.error("O widget do VLibras ainda não está pronto após a espera.");
      alert("O tradutor de LIBRAS não carregou. Por favor, recarregue a página e tente novamente.");
    }
  };

  // Verifica se o widget já está pronto quando o botão é clicado.
  if (window.VLibras && window.VLibras.widget) {
    // Se sim, traduz imediatamente.
    tentarTraducao();
  } else {
    // Se não, espera 500 milissegundos (meio segundo) e tenta de novo.
    // Isso dá tempo para o script do VLibras terminar de carregar.
    setTimeout(tentarTraducao, 500);
  }
}
