const User = require("../models/User");
const Friends = require("../models/Friends");


exports.createFriends = async (req, res) => {
    try {
        const tempUserMail = req.body.userMail;
        const tempFriendMail = req.userData.userMail;
        const friendShipExist = await Friends.findOne(
            {
                $or: [
                    { $and: [{ userMail: tempUserMail }, { friendMail: tempFriendMail }] },
                    { $and: [{ userMail: tempFriendMail }, { friendMail: tempUserMail }] }
                ]
            });
        //console.log(friendShipExist);
        if (friendShipExist) {
            res.send({
                "status": false,
                "mesaj": `Arkadaşlık zaten var: ${tempUserMail} - ${tempFriendMail}`
            });
            return;
        }
        const friend1 = await Friends.create({ userMail: tempUserMail, friendMail: tempFriendMail });
        const friend2 = await Friends.create({ userMail: tempFriendMail, friendMail: tempUserMail });
        const newFriendInfo = await User.findOne({ userMail: tempUserMail },{userPassword:0});
        console.log(newFriendInfo);
        res.status(201).json({
            "status": true,
            "mesaj": "Başarılı! Arkadaşlık başarıyla oluşturuldu!",
            "userMail": friend1.userMail,
            "friendMail": friend1.friendMail,
            "friendInfo": newFriendInfo
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            "status": false,
            "mesaj": "Sunucu hatası  friendsController - createFriends"
        });
    }
}
exports.getFriends = async (req, res) => {
    try {
        //console.log(req.body);
        const friends = await Friends.find({ userMail: req.userData.userMail});
        let FriendsExtended = [];

        for (let i = 0; i < friends.length; i++) {
            const friend = friends[i];
            //console.log(friend);
            const temp = await User.findOne({ userMail: friend.friendMail },{userPassword:0});
            //console.log(temp);
            FriendsExtended.push(temp);
        }
        //console.log(FriendsExtended);
        res.status(201).json(FriendsExtended);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            "status": false,
            "mesaj": "Sunucu hatası  friendsController - getFriends"
        });
    }
};