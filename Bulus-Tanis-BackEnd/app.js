const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require('socket.io');
const jwt = require('jsonwebtoken');

const AuthRoute = require('./routes/authRoute');
const MessageRoute = require('./routes/messageRoute');
const FriendsRoute = require('./routes/friendsRoute');
const SearchRoute = require('./routes/searchRoute');
const mongoConfig = require('./app.config');
const { secureKey } = require('./app.config');
const User = require('./models/User');
const Friends = require('./models/Friends');

const app = express();
app.use(cors({
    origin: '*',
    methods: 'GET, POST',
    allowedHeaders: 'Content-Type, Authorization'
  }));

mongoose.set('strictQuery', false);// ileride mongo db güncellenince bu değer default false olucak
//gelcek güncellemede bu satır silinecek
//ileride sorun yaşmama için bu satır eklendi

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

    var decoded;
    var userData;
    var userMail;
    try {               
        decoded = jwt.verify(socket.handshake.query.token,secureKey);
        userData = decoded;
        userMail = userData.userMail;
    } catch (error) {
        console.log(error+" | connection main socket token err");
    }
    console.log('Bir kullanıcı bağlandı: '+socket.id + ' | mail: ' + userMail);
    users[userMail] = socket;

    socket.on('disconnect', () => {
        console.log('Bir kullanıcı ayrıldı.');
        delete users[userMail];
    });

    socket.on('sendMessage', async (data) => {
        console.log('xxxMail:'+data.userMailGetMessage + ' | mesaj: ' + data.message);
        var socketUserGetMessage = users[data.userMailGetMessage];
        // Sadece belirli kullanıcıya mesaj gönder
        if(socketUserGetMessage){
            //bu kullanıcı aktif, mesajı gönder
            //bu kullanıcı gerçekten arkadaşım olmayabilir sistemin güvenliğini atlatmış olabilirim.
            //bu yüzden veri tabanından kontrol etmeliyim.
            const isFriend = await Friends.findOne({ userMail: userMail ,friendMail: data.userMailGetMessage });
            if(isFriend){
                io.to(socketUserGetMessage.id).emit('getMessage', {userMailSendMessage:data.userMailSendMessage, message: data.message});
            }
            
        }
    });

    socket.on('updateAllFriendsList', async (data) => {
        //console.log('---updateAllFriendsList---');
        //console.log(data);
        var socketupdateAllFriendsList = users[data.friend.userMail];
        var decodedUser;
        var newFriend;
        try {               
            decodedUser = jwt.verify(data.token,secureKey);
            newFriend = decoded;
        } catch (error) {
            console.log(error+" | updateAllFriendsList socket token err");
        }        
        var user= await User.findOne({ userMail: newFriend.userMail },{userPassword:0});
        //console.log(user);
        if(socketupdateAllFriendsList){            
            io.to(socketupdateAllFriendsList.id).emit('handleUpdateAllFriendsList', user);
        }
        //console.log('handleUpdateAllFriendsList , user ifadesi gönderildi.');
        //console.log('---updateAllFriendsList---');
    });
});



const port = 3000;
server.listen(port, () => {
    console.log(`Server is live on port ${port}`);
});