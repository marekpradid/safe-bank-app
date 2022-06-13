const { throwError } = require('$util/errors');

exports.checkUpdatesValid = (req = {}, allowedUpdates = []) => {
   const updates = Object.keys(req.body);
   const isValidOperation = updates.every(update => allowedUpdates.includes(update));

   if (!isValidOperation) {
      throwError('Invalid updates', 400);
   }

   return;
};

exports.applyUpdates = (req, user) => {
   Object.keys(req.body).forEach(param => user[param] = req.body[param]);
};
