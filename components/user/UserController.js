const UserService = require('./UserService');


const getListUser = async () => {
    try {
        return await UserService.getListUser();
    } catch (error) {
        console.log(error);
    }
};

const login = async (email, password) => {
    return await UserService.login(email, password);
};

const register = async (email, password, nameUser) => {
    return await UserService.register(email, password, nameUser);
}


module.exports = { getListUser, register, login };