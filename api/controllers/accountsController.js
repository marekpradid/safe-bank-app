// Models
const Account = require('$models/account');

// Utilities
const { throwError, passError } = require('$util/errors');

// App

// Get all my accounts
exports.getUserAccounts = async (req, res, next) => {
   try {
      // const user = await req.user.getBasic();
      let accounts = await Account.find({ owner: req.user._id }).lean();

      if (!accounts) {
         throwError('No accounts found', 422);
      }

      res.status(200).json(accounts);
   } catch (err) {
      passError(err, next);
   }
};

// Get single account
exports.getAccountDetails = async (req, res, next) => {
   try {
      let account = await Account.findOne({ _id: req.params.id}).lean();

      if (!account) {
         throwError('No account found', 422);
      }

      res.status(200).json(account);
   } catch (err) {
      passError(err, next);
   }
};
