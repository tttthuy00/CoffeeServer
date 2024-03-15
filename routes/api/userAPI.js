var express = require('express');
var router = express.Router();
const userController = require('../../components/user/UserController');


// http://localhost:3003/api/userAPI/getListUser
router.get('/getListUser', async (req, res) => {
    try {
        const user = await userController.getListUser();
        //console.log(user.nameUser);
        const returnData = {
            error: false,
            responseTimestamp: new Date(),
            statusCode: 200,
            data: {
                //    user: [{
                //     //idUser: user.idUser,
                //     nameUser: user.nameUser,
                //     email: user.email,
                //     phone: user.phone,
                //     avatar: user.avatar,
                //     address: user.address,
                //     password: user.password,
                //     role: user.role
                //    }]
                user: user
            }
        }
        return res.status(200).json({ error: false, returnData });
    } catch (error) {
        console.log('Get all error', error);
        return res.status(500).json({ error: true, user: null });
    }
});

//--------------------------LOGIN------------------------
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userController.login(email, password);
        if (user) {
            const returnData = {
                error: false,
                responseTimestamp: new Date(),
                statusCode: 200,
                data: {
                    user: user
                }
            };
            return res.status(200).json({ error: false, returnData });
        } else {
            return res.status(400).json({ error: true, user: null });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: true, user: null });
    }
});

//--------------------------REGISTER------------------------
// http://localhost:3003/api/userAPI/register

router.post('/register', async (req, res, next) => {
    try {
        const { email, password, nameUser } = req.body;
        const user = await userController.register(email, password, nameUser);
        if (user) {
            return res.status(200).json({ error: false, user: user });
        }
        return res.status(400).json({ error: true, user: null });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: true, user: null });
    }
})


module.exports = router;
