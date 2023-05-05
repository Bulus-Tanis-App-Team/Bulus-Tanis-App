const User = require("../models/User");

exports.searchUser = async (req, res) => {
    try {
        console.log(req.body);
        if(req.body.searchingCountry && req.body.searchingCity && req.body.searchingDistrict && req.body.searchingNeighbourhood){
            const users = await User.find({$and:[
                {userCountry:req.body.searchingCountry},
                {userCity:req.body.searchingCity},
                {userDistrict:req.body.searchingDistrict},
                {userNeighbourhood:req.body.searchingNeighbourhood}]});
            res.status(201).json(users);
            return;
        }else if(req.body.searchingCountry && req.body.searchingCity && req.body.searchingDistrict){            
            const users = await User.find({$and:[
                {userCountry:req.body.searchingCountry}
                ,{userCity:req.body.searchingCity}
                ,{userDistrict:req.body.searchingDistrict}]});
            //console.log(users);
            res.status(201).json(users);
            return;
        }else if(req.body.searchingCountry && req.body.searchingCity){
            const users = await User.find({$and:[
                {userCountry:req.body.searchingCountry},
                {userCity:req.body.searchingCity}]});            
            //console.log(users);
            res.status(201).json(users);
        }else if(req.body.searchingCountry){
            const users = await User.find({country:req.body.searchingCountry});
            res.status(201).json(users);
        }else{
            res.send({
                "status": false,
                "mesaj": `Arama kriterleri boş olamaz!`
            });
        }
        // const friends = await Friends.find({userMail:req.body.userMail});
        // res.status(201).json(friends);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            "status": false,
            "mesaj": "Sunucu hatası  searchController - searchUser"
        });
    }
};