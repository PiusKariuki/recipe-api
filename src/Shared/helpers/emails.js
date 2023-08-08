const AWS = require("aws-sdk");
require("dotenv").config();


/**
 * AWS SES CONFIG
 */
const sesConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'eu-north-1'
}


const awsSES = new AWS.SES(sesConfig)

exports.sendOTP= ({recipientEmail, otp})=>{
    const params= {
        Source: process.env.AWS_SENDER_EMAIL,
        Destination: {
            ToAddresses: [
                recipientEmail
            ]
        },
        ReplyToAddresses:[],
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `<h1>Welcome to Vonnie!</h1><p>Here is your OTP.</p><h4><b>${otp}</b></h4>`
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'OTP'
            }
        }
    }

    return awsSES.sendEmail(params).promise()
}



exports.registrationEmail= ({recipientEmail, newPassword, otp})=>{
    const params= {
        Source: process.env.AWS_SENDER_EMAIL,
        Destination: {
            ToAddresses: [
                recipientEmail
            ]
        },
        ReplyToAddresses:[],
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `<h1>Welcome to Vonnie!</h1><p>Your new password is <b>${newPassword}</b></p><p>Your OTP is</p><h4><b>${otp}</b></h4>`
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Registration successful'
            }
        }
    }

    return awsSES.sendEmail(params).promise()
}

exports.sendNewPassword= ({recipientEmail, newPassword})=>{
    const params= {
        Source: process.env.AWS_SENDER_EMAIL,
        Destination: {
            ToAddresses: [
                recipientEmail
            ]
        },
        ReplyToAddresses:[],
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `<h1>Welcome to Vonnie!</h1><p>Your new password is </p><h4><b>${newPassword}</b</h4>`
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Password recovery'
            }
        }
    }

    return awsSES.sendEmail(params).promise()
}