const { getUser } = require("../service/auth");

const restrictToLoggedInOnly = (req,res,next) => {
    const userUuid = req.cookies?.uuid;
    const LOGIN_URL = "http://localhost:3000/admin/login"; 
    if(!userUuid){
        return res.redirect(LOGIN_URL);
    }
    const user = getUser(userUuid);
    if(!user){
        return res.redirect(LOGIN_URL);
    }
    next();
}
 
module.exports = {
    restrictToLoggedInOnly
}