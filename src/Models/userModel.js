const {Schema, model} = require("mongoose");
const bcrypt = require("bcrypt");


const validateEmail = function (email) {
    let re;
    re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const schema = new Schema({
    fullName: String,
    userName: String,
    email: {
        type: String,
        required:  true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        lowercase: true
    },
    avatar: String,
    nationality: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: String,
    OTP: String,
})

schema.pre("save", async function (next) {
    if (this.password)
        this.password = await bcrypt.hash(this.password, 10);
    if(this.OTP)
        this.OTP = await bcrypt.hash(this.OTP, 10)
    next();
});


schema.method("verifyPassword", async function (password) {
    return await bcrypt.compare(password, this.password);
});

schema.method("verifyOTP", async function(OTP){
    return await bcrypt.compare(OTP, this.OTP)
})


exports.userModel = model('user', schema)