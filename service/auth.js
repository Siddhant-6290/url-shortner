// this is for stateful
// const sessionIdToUserMap= new Map();

const jwt=require("jsonwebtoken");
const secret="Sk@123"; 


// function setUser(id,user){

//     sessionIdToUserMap.set(id,user);
// }

// function getUser(id){
//     return sessionIdToUserMap.get(id);
// }


// payload
function setUser(user){
    return jwt.sign({
        _id:user._id,
        email:user.email,

    },secret);
}

// function getUser(token){
//     if (!token) return null;
//     return jwt.verify(token, secret);
// }
function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        console.error('JWT verification error:', err);
        return null;  // Return null if the token is invalid
    }
}



module.exports={
    setUser,
    getUser,
};