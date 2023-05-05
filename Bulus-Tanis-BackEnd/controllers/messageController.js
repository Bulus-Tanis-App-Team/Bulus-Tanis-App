const Message = require("../models/Message");
const User = require("../models/User");

exports.createMessage = async (req, res) => {
    try {
        console.log(req.body);
        //Mesajı kontrol edin
        //kontrol-0 release sürümde sil - start
        const userMailSendMessage = await User.findOne({ userMail: req.body.userMailSendMessage })
        const userMailGetMessage = await User.findOne({ userMail: req.body.userMailGetMessage })
        if (!userMailSendMessage) {
            res.send({
                "mesaj": `userMailSendMessage adresi veri tabanında yok: ${req.body.userMailSendMessage}`
            });
            return;
        }
        if (!userMailGetMessage) {
            res.send({
                "mesaj": `userMailGetMessage adresi veri tabanında yok: ${req.body.userMailGetMessage}`
            });
            return;
        }
        //kontrol-0 release sürümde sil -end
        const message = await Message.create(req.body);
        res.status(201).json({
            "status": true,
            "mesaj": "Başarılı! Kullanıcı başarıyla oluşturuldu!",
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
        const userMailSendMessage = await User.findOne({ userMail: req.body.userMailSendMessage })
        const userMailGetMessage = await User.findOne({ userMail: req.body.userMailGetMessage })
        if (!userMailSendMessage) {
            res.send({
                "mesaj": `userMailSendMessage adresi veri tabanında yok: ${req.body.userMailSendMessage}`
            });
            return;
        }
        if (!userMailGetMessage) {
            res.send({
                "mesaj": `userMailGetMessage adresi veri tabanında yok: ${req.body.userMailGetMessage}`
            });
            return;
        }
        //kontrol-0 release sürümde sil -end
        const messages = await Message.find({ $or:[
            {$and: [{userMailSendMessage: req.body.userMailSendMessage }, { userMailGetMessage: req.body.userMailGetMessage }]},
            {$and: [{userMailSendMessage: req.body.userMailGetMessage }, { userMailGetMessage: req.body.userMailSendMessage }]},
           ]}).sort({date: 1}).limit(200).exec();
           res.status(201).json(messages);
        console.log(messages);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            "status": false,
            "mesaj": "Sunucu hatası messageController - getMessages"
        });
    }
};