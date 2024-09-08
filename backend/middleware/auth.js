const { getUser } = require("../service/auth");

const restrictToLoggedInOnly = (req,res,next) => {
    const userUuid = req.cookies?.uuid;
    if(!userUuid){
        return res.redirect("http://localhost:3000/admin/login");
    }
    const user = getUser(userUuid);
    if(!user){
        return res.redirect('http://localhost:3000/admin/login');
    }
    next();
}

module.exports = {
    restrictToLoggedInOnly
}