// Questão 5

/*
Cenário: 
Você recebeu um array de eventos de usuários e precisa saber quantos eventos de cada 
tipo ocorreram. 
const eventos = [ 
{ tipo: "click" }, 
{ tipo: "scroll" }, 
{ tipo: "click" }, 
{ tipo: "page_view" }, 
{ tipo: "click" } 
]; 
 
Tarefa: 
Escreva uma função  que retorne: { click: 3, scroll: 1, page_view: 1 }
*/

const eventos = [
  { tipo: "click" },
  { tipo: "scroll" },
  { tipo: "click" },
  { tipo: "page_view" },
  { tipo: "click" }
];

function contarEventos(eventos) {
  return eventos.reduce((quantidadeEventos, evento) => {
    quantidadeEventos[evento.tipo] = (quantidadeEventos[evento.tipo] || 0) + 1; // Incrementa o contador para o tipo de evento, se não existir, inicializa com 0
    return quantidadeEventos; 
  }, {});
}

const resultado = contarEventos(eventos);
console.log(resultado);