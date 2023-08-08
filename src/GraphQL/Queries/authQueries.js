const {userType} = require("../Types/userType");
const {GraphQLString} = require("graphql");
const {userModel} = require("../../Models/userModel");
const {generateOTP} = require("../../Shared/helpers/OTPHelpers");
const bcrypt = require("bcrypt");


exports.login = {
    type: userType,
    args: {
        email: {type: GraphQLString},
        password: {type: GraphQLString}
    },
    async resolve(parent, args) {
        try {
            let user = await userModel.findOne({
                email: args?.email?.toLowerCase()
            });

            if (!user) return new Error('This email is not registered');

            const verified = await user?.verifyPassword(args.password);

            if (!verified) return new Error('Invalid password');

            const newOTP = generateOTP()
            const newSignedOTP = await bcrypt.hash(String(newOTP), 10)

            /**
             * update the user object with a new OTP
             */
            const updatedUser = await userModel.findByIdAndUpdate(user?._id, {
                OTP: newSignedOTP
            }, {
                new: true
            })

            await sendOTP({recipientEmail: updatedUser?.email, otp: newOTP})

            return updatedUser
        } catch (e) {
            return e
        }
    }
}