### 6. Google Tag Manager – Configuração Intermediária
Explique como você configuraria no GTM um evento add_to_cart que:

- É disparado quando o usuário clica em um botão "Adicionar ao Carrinho".
- Recebe do Data Layer as informações de ID, nome e preço do produto.
- Envia os dados para o GA4.

#### Resposta: 

Para configurar um add_to_cart no GTM, primeiramente é necessário preparar o data layer no site, considerando que o Data Layer já foi inicializado na aplicação, quando a pessoa clica em “Adicionar ao Carrinho”, eu mando os dados do produto (id, nome e preço) para o data layer, por exemplo:

```
dataLayer.push({
  event: 'add_to_cart',
  ecommerce: {
    items: [
      {
        item_id: '12345',
        item_name: 'Tênis de Corrida',
        price: 199.90
      }
    ]
  }
});
```
Depois, dentro do GTM, eu crio variáveis para pegar esses valores (item_id, item_name, price). Com essas variáveis consigo garantir que a tag do GA4 pegue os dados de forma dinâmica, sem que seja necessário alterar o código a todo momento
Em seguida, crio um trigger de evento add_to_cart, para ouvir esse evento sempre que ele aparecer no Data Layer. Ela age diferente das triggers que acionam com o clique de botão, pois ela só acionará quando os dados estiverem realmente disponíveis.
E então, eu monto uma tag no GA4, dou o nome de evento add_to_cart, passo os parâmetros usando as variáveis que criei, e coloco para disparar com o trigger do add_to_cart criada anteriormente
Por fim, com o preview modo do GTM eu consigo conferir se o evento está sendo disparada e as varíáveis estão corretas e no debug do GA4 verifico a chegada correta do dados, garantindo assim uma validação completa de todo o ciclo. 


### 7. Google Tag Manager – Data Layer
#### 1- Explique o que é o Data Layer e por que ele é importante.

Resposta: 

O Data Layer é um objeto JavaScript que funciona como uma camada de dados entre o site e o Google Tag Manager (GTM). Ele armazena informações sobre a página ou interações do usuário (como produto, preço, categoria, clique), em um formato que o GTM consegue ler.
O Data Layer é importante, pois garante que o GTM tenha acesso a dados estruturados e confiáveis de maneira centralizada, permitindo um rastreamento mais preciso. 

#### 2- Mostre como adicionar manualmente um evento login_sucesso ao Data Layer, incluindo o ID do usuário.

Ao fazer o login com sucesso o evento a ser adicionado, é conforme o apresentado abaixo. _'login_sucesso'_ indica o evento específico do GTM, _usuario.user_id_ guarda o id do usuário e _dataLayer.push()_ adiciona o objeto Data Layer quando o login é realizado.

```
dataLayer.push({
  event: 'login_sucesso',  
  usuario: {
    user_id: 'ana123'
  }
});
```

### 8. Resolução de Problemas
#### Cenário:
Você implementou um evento purchase no GTM, mas percebeu que em alguns casos o valor total está sendo enviado como ``.
#### • Quais seriam as possíveis causas?

- Evento pode ter sido disparado antes de ter sido completado todos os valores, o _ dataLayer.push_ do evento de _purchase_ pode estar sendo antes dos valores serem todos calculados
- Pode haver diferentes cenários na compra do produto, como descontos, promoções, cupons, que não estão prevendo cenários de carrinho zerados ou baixa em valores
- A configuração da variável pode está errada, pode haver diferentes caminhos de values a serem cobertos, como, _valueProduto1_, _value_total_, se não for pensado em todos pode ser pego o resultado vazio
- A tag do GA4 pode disparar no momento errado, mesmo que todos os valores estejam coerentes pelo fluxo do site pode haver um disparo antes do push do Data Layer

#### • Como você investigaria e corrigiria o problema?
- Utilizar o debug do GTM, simulando o evento de _purchase_ em diferentes contexto com de um produto, diferentes produtos, promoções, descontos e checar se o valor está no Data Layer. Caso identifique que a depender no cenário o _value_total_ não está sendo preenchido garantir que o push do Data Layer sempre envia um número vãlido, mesmo que zero, impedindo que eventos de promoções, ou especiais acabem por deixar o campo vazio. Pode-se então utilizar um fallback _total || 0_ para em caso de qualquer valor não válido ser entendido como zero.
- Garantir que para diferentes tipos de cenários de compra do produto o push do Data Layer está correto. Simular os diferentes fluxos possíveis pelo usuário até que se atinja o valor total e se todos esses fluxos estão vinculados a variável _value_total_, checando se todas as propriedades push estão presentes e corretas. Caso identificado erro pode-se criar variáveis fallback para casos onde o campo principal esteja vazio ou definir quais variáveis devem ser consideradas a depender do cenário.
- Garantir que o evento de purchase está sendo disparado após todos os calculos completados, utilizar o preview mode para checar quando o evento é disparado. Em caso de problemas retirar qualquer tipo de disparo da trigger baseado em carregamento de pages, porque podem disparar antes do push do Data Layer a depender do tipo de página

### 9. Boas Práticas
#### Liste 3 boas práticas que você considera essenciais ao implementar códigos de trackeamento em um site.

- Separação de código de rastreio e lógica do site: Evitar misturar cálculos do site com código de tracking. O site deve enviar apenas os dados prontos para o Data Layer e o GTM deve cuidar do disparo das tags.
- Evitar duplicidade e disparos em momentos errados: Garantir que os eventos sejam enviados uma única vez e após todos os cálculos serem realizados, para isso pode-se sempre usar o evento de trigger baseado no Data Layer, ao invés de cliques nas páginas ou carregamento
- Por fim, sempre testar os cenários antes de publicar: Pode-se usar o próprio preview do GTM ou debug do GA4, os testes auxiliam na prática anterior em garantir que o evento está sendo disparado após tudo completo, além de evitar dados errados, inconsistentes e vazios por meio da replicação de diferentes cenários

