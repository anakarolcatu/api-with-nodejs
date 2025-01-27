const http = require('http');

//http simples sem framework
http.createServer((request, response) => {
    //envia a resposta com o código 200 (de sucesso) e indica que será devolvido em um arquivo json
    response.writeHead(200, { 'Content-Type': 'application/json' });

    //direciona a roda de acordo com a url 
    if(request.url ==='/produto') {
        response.end(JSON.stringify({
            message: 'Roda de produto'
        }));
    }

    if(request.url ==='/usuario') {
        response.end(JSON.stringify({
            message: 'Roda de usuários'
        }));
    }
    //devolve a resposta em arquivo json(rota geral)
    response.end(JSON.stringify({
        message: 'Hello World!'
    }));
}).listen(4001, () => console.log('O servidor está rodando na porta 4001'));