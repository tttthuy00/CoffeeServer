const userModel = require('./UserModel');
const bcrypt = require('bcryptjs');

const getListUser = async() =>{
    try {
        return await userModel.find();
    } catch (error) {
        console.log(">>>>>>>>>Fail", error);
        throw error;
    }
};

const login = async(email, password) =>{
    try {
        const user = await userModel.findOne({email: email});
        if (user){
            const result = bcrypt.compareSync(password, user.password);
            return result ? user : false;
        }
    } catch (error) {
        console.log('Login error: ',error);
    }
    return false;
};

const register = async (email, password, nameUser) => {
    try {
        // users.push({
        //     _id: Date.now().toString,
        //     email: email,
        //     password: password,
        //     name : name
        // })
        // kiểm tra email đã tồn tại trong database chưa
        const user = await userModel.findOne({ email: email });
        console.log(user);
        if (user) return false;
        // thêm mới user vào database
        // mã hóa password
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        const newUser = { email, password : hash, nameUser, role:1 };
        const u = new userModel(newUser);
        await u.save();
        return true;
    } catch (error) {
        console.error('Register error', error);
    }
    return false;
   // console.log(users);
}



module.exports ={getListUser, register, login};