require('dotenv').config();
const Models = require('../../models');
const User = Models.users;
exports.checkUser = async (req, res, next) => {
    try {
        let role = req.user.role;
        let user = await User.findOne({where:{email:req.user.email}});
        
        if(role != 'user' || !user){
           
            return res.status(401).send({ status:'Error', errors:[{message: 'This not your permission'}]});
        }
        else{
          
            next();
        }
    }
    catch (err) {
        		return res.status(401).send({status:'Error', errors:[{ message: 'Invalid '}]});
        	}
};
