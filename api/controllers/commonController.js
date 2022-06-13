// Models
const User = require('$models/user');

// Utilities
const { throwError, passError } = require('$util/errors');

// App

// Get users count
exports.countUsers = async (req, res, next) => {
   try {
      const usersCount = await User.countDocuments();

      res.status(200).json({ data: usersCount });
   } catch (err) {
      passError(err, next);
   }
};
