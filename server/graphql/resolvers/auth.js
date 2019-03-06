const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const { JWT_SECRET } = require('../../helpers/constants');

module.exports = {
    createUser: async args => {
        try {
            const userExist = await User.findOne({ name: args.userInput.name });
            if (userExist) {
                throw new Error('User exists already');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const user = new User({
                name: args.userInput.name,
                password: hashedPassword
            });
            const result = await user.save();

            const token = jwt.sign({ userId: result.id, name: result.name }, JWT_SECRET, { expiresIn: '1h' });

            return { userId: user.id, token: token, tokenExpiration: 1, name: user.name };
        } catch (err) {
            throw err;
        }
    },
    login: async ({ name, password }) => {
        try {
            const user = await User.findOne({ name: name });
            if (!user) {
                throw new Error('User does not exist!');
            }
            const isEqual = await bcrypt.compare(password, user.password);
            if (!isEqual) {
                throw new Error('Password is incorrect!');
            }
            const token = jwt.sign({ userId: user.id, name: user.name }, JWT_SECRET, { expiresIn: '1h' });

            return { userId: user.id, token: token, tokenExpiration: 1, name: user.name };
        } catch (err) {
            throw err;
        }
    }
};
