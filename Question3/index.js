// Questão 3

/*
Tarefa: 
Implemente uma função formatarPreco que: 
• Receba um número e retorne uma string formatada no padrão brasileiro. 
• Utilize Intl.NumberFormat. 
• Depois, use essa função para formatar todos os preços do array abaixo: 
const precos = [50, 120, 250];
*/

function formatarPreco(preco) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(preco);
}


const precos = [50, 120, 250];
const precosFormatados = precos.map(formatarPreco);

console.log(precosFormatados); // Retorna os preços formatados: ["R$ 50,00", "R$ 120,00", "R$ 250,00"] 