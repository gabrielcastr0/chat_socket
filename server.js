const express = require('express'); //* Exportando o express.
const path = require('path'); //* Exportando o path.

const app = express(); //* Criando app do express.
const server = require('http').createServer(app); //* Informando o protocolo que vai ser usado no app criado pelo nosso express (acima);
const io = require('socket.io')(server); //* Informando o protocolo do websocket.

app.use(express.static(path.join(__dirname, 'public'))); //* Pasta onde vão ficar os arquivos front-end do chat.
app.set('views', path.join(__dirname, 'public')); //* Pasta onde vão ficar os arquivos de view.
app.engine('html', require('ejs').renderFile); //* Definindo a extensão que vai ser usada nos arquivos front (.html).
app.set('view engine', 'html');

app.use('/', (req, res) => { 
    res.render('index.html'); //* Definindo para que index.html seja o primeiro arquivo acessado caso não for informado nada.
});

let messages = []; //* Serve para armazenar as mensagens dentro de uma array.


io.on('connection', socket => { //* Definindo o que será feito toda vez que um novo usuário conectar ao socket.
    console.log(`Socket conectado: ${socket.id}`);

    socket.emit('previousMessages', messages); //* Envia todas as mensagens anteriores logo após executar o chat.

    socket.on('sendMessage', data => { //* Recebendo as mensagens enviadas pelo front-end no back-end.
        messages.push(data); //* Utilizar a variável "messages" para pegar as mensagens armazenadas.
        socket.broadcast.emit('receivedMessage', data); //* Serve para enviar as mensagens para todos os usuários conectados.
    })
})

server.listen(3000); //* Definindo qual porta (3000) será ouvida pelo servidor.





