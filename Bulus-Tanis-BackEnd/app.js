const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require('socket.io');

const AuthRoute = require('./routes/authRoute');
const MessageRoute = require('./routes/messageRoute');
const FriendsRoute = require('./routes/friendsRoute');
const SearchRoute = require('./routes/searchRoute');
const mongoConfig = require('./app.config');

const app = express();
app.use(cors({
    origin: '*',
    methods: 'GET, POST',
    allowedHeaders: 'Content-Type, Authorization'
  }));

mongoose.connect(mongoConfig.connectionString).then(() => {
    console.log("db connected");
}).catch(err => { console.log(err); });

app.use(express.json());

app.get('/', (req, res) => { res.json({ message: "welcome" }) })
app.use('/auth', AuthRoute);
app.use('/message', MessageRoute);
app.use('/friends', FriendsRoute);
app.use('/search', SearchRoute);

const server = require('http').createServer(app);
const io = socket(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
});

const users = {};
io.on('connection', (socket) => {

    console.log('Bir kullanıcı bağlandı: '+socket.id + ' | mail: ' + socket.handshake.query.userMail);
    const userMail= socket.handshake.query.userMail;
    users[userMail] = socket;

    socket.on('disconnect', () => {
        console.log('Bir kullanıcı ayrıldı.');
        delete users[userMail];
    });

    socket.on('sendMessage', (data) => {
        console.log('xxxMail:'+data.userMailGetMessage + ' | mesaj: ' + data.message);
        var socketUserGetMessage = users[data.userMailGetMessage];
        // Sadece belirli kullanıcıya mesaj gönder
        io.to(socketUserGetMessage.id).emit('getMessage', data.message);
    });
});



const port = 3000;
server.listen(port, () => {
    console.log(`Server is live on port ${port}`);
});