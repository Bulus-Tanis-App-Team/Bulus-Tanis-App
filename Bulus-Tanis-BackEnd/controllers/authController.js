const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secureKey} = require('../app.config');

exports.createUser = async (req, res) => {
    try {
        console.log(req.body);
        //Kullanıcının zaten var olup olmadığını kontrol edin
        const userExist = await User.findOne({ userMail: req.body.userMail })
        if (userExist) {
            res.send({
                "mesaj": `Başarısız! Kullanıcı, ${userExist.userMail} adresi ile zaten var!`
            });
            return;
        }
        const user = await User.create(req.body);
        res.status(201).json({
            "mesaj": "Başarılı! Kullanıcı başarıyla oluşturuldu!",
            "user": {
                "userName": user.userName,
                "userMail": user.userMail
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            "baslik": "Hata!",
            "mesaj": "Sunucu hatası"
        });
    }
};

exports.loginUser = async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.findOne({ userMail: req.body.userMail });
        if (user) {
            const cmp = await bcrypt.compare(req.body.userPassword, user.userPassword);
            if (cmp) {
                const token = jwt.sign({
                    userMail: user.userMail
                }, secureKey, { expiresIn: '1h' })
                res.send({
                    "mesaj": "Auth Success",
                    "token": token,
                    "user": {
                        "userName": user.userName,
                        "userMail": user.userMail
                    }
                });
            } else {
                res.send({ "baslik": "Başarısız", "mesaj": "Yanlış e-posta veya şifre" });
            }
        } else {
            res.send({ "baslik": "Başarısız", "mesaj": "Yanlış e-posta veya şifre" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            "baslik": "Hata!",
            "mesaj": "Sunucu hatası"
        });
    }
};

/* 
Bu JWToken testi için yazılmış bir fonksiyon.
*/
exports.test = async (req, res) => {
    res.status(201).send({ message: req.userData.userMail + " - AuthComplate" })
}