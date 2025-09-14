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

Ou seja, para adicionar o evento no GTM é necessário:
- Crio uma variável, por exemplo, _User ID_ que irá receber o dado de _usuario.user_id_;
- Defino o evento acionador:  _'login_sucesso'_
- E então crio a tag do evento _login_sucesso_, e então a tag GA4 envia o evento _login_sucesso_ para o GA4 junto com o id do usuário
