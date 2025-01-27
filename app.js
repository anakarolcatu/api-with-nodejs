const express = require('express');

const app = express();

//assim como o http puro, criamos uma requisição e enviamos a resposta do acesso
app.get('/primeira-rota', (request, response) => {
    return response.json({
        message:'Acessou a primeira rota',
    });
});

app.listen(4002, () => console.log('Servidor está rodando na porta 4002'));