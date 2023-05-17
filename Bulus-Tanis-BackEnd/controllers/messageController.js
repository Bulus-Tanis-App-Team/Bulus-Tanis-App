const Friends = require("../models/Friends");
const Message = require("../models/Message");
const User = require("../models/User");

exports.createMessage = async (req, res) => {
    try {
        //console.log(req.body);
        //Mesajı kontrol edin
        //kontrol-0 release sürümde sil - start        
        const userMail=req.userData.userMail;
        const friendMail=req.body.userMailGetMessage;

        const userMailSendMessage = await User.findOne({ userMail: userMail },{userPassword:0})
        const userMailGetMessage = await User.findOne({ userMail: friendMail },{userPassword:0})
        if (!userMailSendMessage) {
            res.send({
                "mesaj": `userMailSendMessage adresi veri tabanında yok: ${userMail}`
            });
            return;
        }
        if (!userMailGetMessage) {
            res.send({
                "mesaj": `userMailGetMessage adresi veri tabanında yok: ${friendMail}`
            });
            return;
        }
        //kontrol-0 release sürümde sil -end
        //kontrol-1 iki kullanıcı arkadaş mı - start
        const isFriend = await Friends.findOne({ userMail: userMail ,friendMail: friendMail });
        //console.log(isFriend);
        if(!isFriend){
            res.send({
                "mesaj": `Kullanıcılar arkadaş değil! Mesaj Gönderilemez!`
            });
            return;
        }
        //kontrol-1 iki kullanıcı arkadaş mı - end
        const message = await Message.create({
            userMailSendMessage: userMail,
            userMailGetMessage: friendMail,
            message: req.body.message,
        });
        res.status(201).json({
            "status": true,
            "mesaj": "Başarılı! Mesaj başarıyla oluşturuldu!",
            "message": {
                "userMailSendMessage": message.userMailSendMessage,
                "userMailGetMessage": message.userMailGetMessage,
                "message": message.message,
                "messageTime": message.messageTime
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            "status": false,
            "mesaj": "Sunucu hatası  messageController - createMessage"
        });
    }
};

exports.getMessages = async (req, res) => {
    try {
        //kontrol-0 release sürümde sil - start
        const userMailSendMessage=req.userData.userMail;
        const userMailGetMessage=req.body.userMailGetMessage;
        const userSendMessage = await User.findOne({ userMail: userMailSendMessage },{userPassword:0})
        const userGetMessage = await User.findOne({ userMail: userMailGetMessage },{userPassword:0})
        if (!userSendMessage) {
            res.send({
                "mesaj": `userMailSendMessage adresi veri tabanında yok: ${userMailSendMessage}`
            });
            return;
        }
        if (!userGetMessage) {
            res.send({
                "mesaj": `userMailGetMessage adresi veri tabanında yok: ${userMailGetMessage}`
            });
            return;
        }
        //kontrol-0 release sürümde sil -end
        const messages = await Message.find({ $or:[
            {$and: [{userMailSendMessage: userMailSendMessage }, { userMailGetMessage: userMailGetMessage }]},
            {$and: [{userMailSendMessage: userMailGetMessage }, { userMailGetMessage: userMailSendMessage }]},
           ]}).sort({date: 1}).limit(200).exec();
           res.status(201).json(messages);
        //console.log(messages);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            "status": false,
            "mesaj": "Sunucu hatası messageController - getMessages"
        });
    }
};