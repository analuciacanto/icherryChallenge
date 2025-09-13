// Questão 4

/*
Tarefa: 
Implemente uma função assíncrona que: 
1. Faça uma requisição para https://dolarapi.com/v1/cotacao/usd 
2. Retorne apenas o valor de compra do dólar em relação ao real (campo "compra"). 
3. Trate erros de forma adequada, exibindo uma mensagem amigável caso a 
requisição falhe. Simule um erro de execução.   
*/

async function obterValorDolar() {
    try {    
        // Simulação de erro de requisição
        throw new Error('Erro simulado de execução');
        
        // Requisição GET para a api
        const response = await fetch('https://dolarapi.com/v1/cotacao/usd');
        if (!response.ok) {
            throw new Error('Falha na requisição. Status: ' + response.status);
        }

        const data = await response.json();
        return data.compra; // Retorna o valor de compra do dólar

    } catch (error) {
        console.error('Ocorreu um erro ao obter o valor do dólar:', error.message);
        return null;
    }
}


// Chamando a função assíncrona e exibindo o resultado
obterValorDolar().then(valor => {
    if (valor !== null) {
        console.log('Valor de compra do dólar:', valor);
    } else {
        console.log('Não foi possível obter o valor do dólar.');
    }
});     

