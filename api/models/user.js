const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// Models
const Account = require('$models/account');
const Card = require('$models/card');
const Message = require('$models/message');
const Transfer = require('$models/transfer');

// Tools
const {passError} = require('$util/errors');

const userSchema = new mongoose.Schema(
   {
      email: {
         type: String,
         unique: true,
         required: true,
         trim: true,
         lowercase: true
      },
      password: {
         type: String,
         required: true,
         minlength: 5,
         trim: true
      },
      firstName: {
         type: String,
         required: true,
         minlength: 2
      },
      lastName: {
         type: String,
         required: true,
         minlength: 2
      },
      dateOfBirth: {
         type: Date,
         required: true
      },
      phone: {
         type: String,
         required: true,
         minlength: 2,
         maxlength: 20
      },
      picture: {
         type: String,
         required: true,
         minlength: 2
      },
      streetAddr: {
         type: String,
         required: true,
         minlength: 2
      },
      postcode: {
         type: String,
         required: true,
         minlength: 2
      },
      city: {
         type: String,
         required: true,
         minlength: 2
      },
      resetToken: {
         type: String
      },
      resetTokenExpiration: {
         type: Date
      }
   },
   {
      timestamps: true
   }
);

// Hash the plain text password before saving
userSchema.pre('save', async function(next) {
   const user = this;

   if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8);
   }

   next();
});

userSchema.pre('remove', async function(next) {
   const user = this;

   await Account.deleteMany({ owner: user._id });
   await Card.deleteMany({ owner: user._id });
   await Message.deleteMany({ sender: user._id, recipient: user._id });
   await Transfer.deleteMany({ sender: user._id, recipient: user._id });

   next();
});

// Get basic user's fields, delete sensitive fields
userSchema.methods.getBasic = async function() {
   const userObj = this.toObject();

   delete userObj.password;
   delete userObj.updatedAt;

   // Add stats like accounts and messages details
   try {
      const accsDetails = await this.getAccsDetails();
      const messagesCount = await this.getMessagesCount();

      userObj.stats = {
         accsDetails,
         messagesCount
      };

      return userObj;
   } catch (err) {
      passError(err);
   }
};

// Get accounts' count and balance
userSchema.methods.getAccsDetails = async function() {
   const userObj = this.toObject();

   try {
      const accsDetails = await Account.find({ owner: userObj._id });
      const balance = accsDetails.map(acc => acc.balance).reduce((a, b) => a + b);

      return {
         balance,
         count: accsDetails.length
      };
   } catch (err) {
      passError(err);
   }
};

// Get messages' count
userSchema.methods.getMessagesCount = async function() {
   const userObj = this.toObject();

   try {
      const messagesCount = await Message.countDocuments({ recipient: userObj._id });

      return messagesCount;
   } catch (err) {
      passError(err);
   }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
