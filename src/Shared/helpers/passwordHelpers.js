exports.generatePassword = () => {
    let length = 8,
        charset = "abcdefghjklmnopqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ23456789",
        retVal = "";
    let i = 0, n = charset.length;
    for (; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}