const express = require('express');
const { randomUUID } = require("crypto");

const app = express();

//informando para o express que um dos tipos de arquivos que ele irá aceitar, será json
app.use(express.json())

/*
//assim como o http puro, criamos uma requisição e enviamos a resposta do acesso
app.get('/primeira-rota', (request, response) => {
    return response.json({
        message:'Acessou a primeira rota com nodemon',
    });
    //utilizar o nodemon que é um event listener para atualizar o servidor automaticamente com qualquer alteração. Criamos um script 'dev' no package.json e para que ele seja executado, rodamos 'npm run dev' no terminal
});*/

//criando a aplicação de criação de produto

const products = [];
/**
 * POST => inserir um dado
 * GET => buscar um ou mais dados
 * PUT => Alterar um dado
 * DELETE => remover um dado
 */

/**
 * Body => sempre que eu quiser enviar dados para a minha aplicação (utilizado com post e put) no corpo da requisição irão as informações
 * Params => /products/id-do-item (o que vem na URL, parâmetros de rota, são parametros obrigatórios)
 * Query => /products?id=#&value=# (o que vem na query, fazem parte da rota, mas não são obrigatório)
 */

//rota de post para inserir um dado
app.post('/products', (request, response) => {
    //nome e preço
    const { name, price } = request.body;
    //cria um objeto para dar um push direto no objeto
    const product = {
        name,
        price,
        id: randomUUID(),
    };
    products.push(product);
    //dá um return com o objeto que geramos
    return response.json(product);
});

//criar a rota de listar o que está cadastrado
app.get('/products', (request, response) => {
    return response.json(products);
});

//criar rota de busca pelo ID
app.get('/products/:id', (request, response) => {
    //indica que irá pegar o id da url
    const { id } = request.params;
    //percorre os produtos para checar se o id é igual ao da busca
    const product = products.find((product) => product.id === id );
    //retorna com o produto encontrado
    return response.json(product);
});

//alterar um produto
app.put('/products/:id', (request, response) => {
    const { id } = request.params;
    //recebe os dados que irá alterar além do id do objeto
    const { name, price } = request.body;
    //encontrar dentro do array qual o objeto que quer alterar. Iremos utilizar a forma de encontrar o index q o produto se encontra
    const productIndex = products.findIndex(product => product.id === id);
    //com o index encontrado, alteramos o produto nesta posição com as informações passadas aqui
    products[productIndex] = {
        ...products[productIndex], //pega tudo o que tiver dentro do product index, porém, sobrescreve o nome e o preço
        name,
        price
    }
    return response.json({ message: 'Produto alterado com sucesso' });
})

//removendo itens
app.delete('/products/:id', (request, response) => {
    const { id } = request.params;
    const productIndex = products.findIndex(product => product.id === id);
    //após buscar o id, pega esse produto e remove uma posição do index, removendo exatamente esse item encontrado
    products.splice(productIndex, 1);
    return response.json({ message: 'Produto removido com sucesso' });
})

app.listen(4002, () => console.log('Servidor está rodando na porta 4002'));