const {userType} = require("../Types/userType");
const {GraphQLNonNull, GraphQLString} = require("graphql");
const {generatePassword} = require("../../Shared/helpers/passwordHelpers");
const {userModel} = require("../../Models/userModel");
const {registrationEmail} = require("../../Shared/helpers/emails");
const {hash} = require("bcrypt");


exports.register = {
    type: userType,
    args: {
        fullName: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: new GraphQLNonNull(GraphQLString)},
        userName: {type: new GraphQLNonNull(GraphQLString)},
        avatar: {type: GraphQLString},
        nationality: {type: new GraphQLNonNull(GraphQLString)},
    },
    async resolve(parent, args) {
        try {
            const otp = Math.floor(1000 + Math.random() * 9000)

            const newPassword = generatePassword()

            const newDoc = new userModel({
                fullName: args.fullName,
                email: args.email,
                phoneNumber: args.phoneNumber,
                gender: args.gender,
                dob: args.dob,
                OTP: otp,
                password: newPassword
            })

            const savedDoc = await newDoc.save()

            await registrationEmail({recipientEmail: savedDoc?.email, newPassword, otp})
            return savedDoc
        } catch (e) {
            if (e?.code === 11000)
                return new Error("This email is already registered")
            return e
        }
    }
}

exports.newPassword = {
    type: userType,
    args: {
        email: {type: new GraphQLNonNull(GraphQLString)},
        oldPassword: {type: new GraphQLNonNull(GraphQLString)},
        newPassword: {type: new GraphQLNonNull(GraphQLString)},
    },
    async resolve(parent, args) {
        try {
            const user = await userModel.findOne({email: args.email})

            /**
             * Invalid email
             */
            if (!user)
                return new Error(`This email doesn't exist`)

            const verifyPassword = user.verifyPassword(args.oldPassword)

            /**
             * Invalid password
             */
            if (!verifyPassword)
                return new Error('Invalid password.')

            /**
             * Correct password and email
             */
            return await userModel.findOneAndUpdate({email: args.email}, {
                password: hash(args.newPassword, 10)
            }, {
                new: true
            })

        } catch (e) {
            return e
        }
    }
}



exports.recoverPassword = {
    type: userType,
    args: {
        email: {type: new GraphQLNonNull(GraphQLString)},
    },
    async resolve(parent, args) {
        try {
            const user = await userModel.findOne({email: args.email})

            /**
             * Invalid email
             */
            if (!user)
                return new Error(`This email doesn't exist`)


            const newPassword = generatePassword()
            const encryptedPassword = await hash(newPassword, 10)
            /**
             * Correct password and email
             */
            const newUser = await userModel.findOneAndUpdate({email: args.email}, {
                password: encryptedPassword
            }, {
                new: true
            });

            await sendNewPassword({recipientEmail: newUser.email, newPassword})

            return newUser
        } catch (e) {
            return e
        }

    }
}