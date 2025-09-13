import { formatarData } from '../Utils/index.js';

// Captura cliques nos botões
document.addEventListener('click', (evento) => {

  // Verifica se o elemento clicado tem a classe adicionar-carrinho
  if (evento.target.classList.contains('adicionar-carrinho')) {
    // Pega dados do botão clicado
    const botaoClicado = evento.target;
    
    const id = botaoClicado.dataset.id;       // ID do produto (armazenado no atributo data-id do botão) 
    const nome = botaoClicado.dataset.nome;   // Nome do produto (armazenado no atributo data-nome) 

    // Captura a hora do clique
    const dataAtual = new Date();
    const horaClique = formatarData(dataAtual); // Hora do clique no formato YYYY-MM-DD HH:mm:ss

    const clique = { id, nome, horaClique };

    console.log(clique);
  }
});
