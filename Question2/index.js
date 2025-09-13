// Questão 2

const pedido = { 
 id: 987, 
 cliente: { nome: "João Silva", email: "joao@email.com" }, 
 itens: [ 
   { nome: "Camiseta", preco: 50 }, 
   { nome: "Calça", preco: 120 } 
 ], 
 status: "pago" 
};

/*
Função resumirPedido que retorne um novo objeto contendo: 
{ 
 id: 987, 
 total: 170, 
 quantidadeItens: 2 
}*/

function resumirPedido(pedido){

  // Calcula o valor total dos itens no pedido
    const valorTotal = pedido.itens.reduce((soma, item) => soma + item.preco, 0);

   return {
        id: pedido.id,
        total: valorTotal,
        quantidadeItens: pedido.itens.length
    };}

// console.log(resumirPedido(pedido)); 