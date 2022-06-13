// Models
const User = require('$models/user');

// Utilities
const {throwError, passError} = require('$util/errors');
const {checkUpdatesValid, applyUpdates} = require('$util/updates');

// App

// Get myself
exports.getUser = async (req, res, next) => {
    try {
        const user = await req.user.getBasic();

        res.status(200).json(user);
    } catch (err) {
        passError(err, next);
    }
};

// Update myself
exports.updateUser = async (req, res, next) => {
    try {
        const updates = ['password', 'email', 'phone'];

        // Let the validator check it
        checkUpdatesValid(req, updates);

        let user = await User.findOne({_id: req.params.id});
        applyUpdates(req, user);

        await user.save();

        res.status(201).json({message: 'User has been updated'});
    } catch (err) {
        passError(err, next);
    }
};
