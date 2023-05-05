const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const AuthRoute = require('./routes/authRoute');
const MessageRoute = require('./routes/messageRoute');
const FriendsRoute = require('./routes/friendsRoute');
const SearchRoute = require('./routes/searchRoute');

const mongoConfig = require('./app.config')
const app = express();
app.use(cors());

mongoose.connect(mongoConfig.connectionString).then(() => {
    console.log("db connected");
}).catch(err => { console.log(err); });

app.use(express.json());

app.get('/', (req, res) => { res.json({ message: "welcome" }) })
app.use('/auth', AuthRoute);
app.use('/message', MessageRoute);
app.use('/friends', FriendsRoute);
app.use('/search', SearchRoute);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is live on port ${port}`);
});