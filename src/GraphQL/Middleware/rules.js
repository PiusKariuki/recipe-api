const {rule} = require("graphql-shield");
const {verifyToken} = require("../../Shared/helpers/token");
const {userModel} = require("../../Models/userModel");

exports.isAuthorized = rule({cache: 'contextual'})(
    async (parent, args, ctx, info) => {
        const authorization = ctx.rawHeaders.find((item) =>
            item.includes('Bearer')
        );

        if (!authorization) return false;
        const token = authorization.replace('Bearer', '').trim();

        const email = verifyToken(token);
        try {
            await userModel.findOne({email});
            return true;
        } catch (error) {
            return false;
        }
    }
);