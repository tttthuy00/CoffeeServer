const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
    idUser: { type: ObjectId },
    nameUser: { type: String },
    email: { type: String },
    phone: { type: String },
    avatar: { type: String },
    address: { type: String },
    password: { type: String },
    role: { type: Number, default: 1 },
    // 1: user, 100: admin
    createAt: { type: Date, default: new Date() },
    updateAt: { type: Date, default: new Date() }
});


module.exports = mongoose.models.user || mongoose.model('user', userSchema);
