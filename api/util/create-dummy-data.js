const faker = require('faker');
const chalk = require('chalk');
const _ = require('lodash');

const mongoose = require('mongoose');

// Models
const Account = require('$models/account');
const User = require('$models/user');
const Card = require('$models/card');
const Message = require('$models/message');
const Transfer = require('$models/transfer');
const Stat = require('$models/stat');

// Create a user

// For each user
// Create 1-2 accounts, 1-3 cards, add 1-5 messages, add 1-10 transfers with random data
const getDefaultUserData = () => {
    return {
        value: faker.internet.email(),
        password: '12345',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        dateOfBirth: faker.date.between('1960-01-01', '2000-12-31'),
        phone: faker.phone.phoneNumberFormat(1),
        picture: faker.internet.avatar(),
        streetAddr: faker.address.streetAddress(),
        postcode: faker.address.zipCode(),
        city: faker.address.city()
    };
};

const createUser = () => {
    const user = new User({ ...getDefaultUserData() });

    return user.save();
};

const createControlledUser = () => {
    const user = new User({
        ...getDefaultUserData(),
        value: 'email@example.com'
    });

    return user.save();
};

// Accounts
const createAccount = user => {
    const account = new Account({
        type: faker.random.arrayElement(['basic', 'premium']),
        owner: user._id,
        isActive: faker.datatype.boolean(),
        sortcode: faker.finance.mask(6, false, false),
        number: faker.finance.mask(8, false, false),
        currency: faker.finance.currencyCode(),
        balance: faker.finance.amount(1, 10000, 2)
    });

    return account.save();
};

// Cards
const createCard = (user, accountId) => {
    const card = new Card({
        owner: user._id,
        accountId,
        isActive: faker.datatype.boolean(),
        number: faker.finance.mask(16, false, false),
        pin: faker.finance.mask(4, false, false),
        expiresMonth: faker.datatype.number({ min: 1, max: 12 }),
        expiresYear: faker.datatype.number({ min: 2020, max: 2030 }),
        dailyOnlineLimit: faker.datatype.number({ min: 1, max: 10000 }),
        dailyWithdrawalLimit: faker.datatype.number({ min: 1, max: 10000 }),
        monthlyOnlineLimit: faker.datatype.number({ min: 1, max: 10000 }),
        monthlyWithdrawalLimit: faker.datatype.number({ min: 1, max: 10000 })
    });

    return card.save();
};

// Transfers
const createTransfer = (user, sourceAccountId) => {
    const transfer = new Transfer({
        type: faker.random.arrayElement(['normal', 'turbo']),
        payeeName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        date: faker.date.between('2020-01-01', '2020-12-31'),
        amount: faker.finance.amount(1, 2500, 2),
        status: faker.random.arrayElement(['planned', 'done']),
        reference: faker.lorem.words(3).substring(0, 20),
        sourceAccountId,
        sender: user._id,
        recipient: mongoose.Types.ObjectId()
    });

    return transfer.save();
};

// Messages
const createMessage = user => {
    const message = new Message({
        title: faker.lorem.words(5),
        sentDate: faker.date.between('2020-01-01', '2020-12-31'),
        recipient: user._id,
        content: faker.lorem.paragraph(),
        isRead: faker.datatype.boolean()
    });

    return message.save();
};

// Statistics
const createStats = accountId => {
    const stats = new Stat({
        accountId,
        name: faker.date.recent(_.random(1, 60, false)),
        // Date is NOW or 1-60 days before
        date: faker.date.recent(_.random(1, 60, false)),
        income: faker.finance.amount(100, 5000, 2),
        expenses: faker.finance.amount(100, 5000, 2)
    });

    return stats.save();
};

// Generate data
const generateData = user => {
    // Accounts
    _.times(_.random(2, 3, false), async () => {
        try {
            const account = await createAccount(user);
            const accId = account._id;

            // Cards
            _.times(_.random(1, 2, false), async () => {
                try {
                    await createCard(user, accId);
                } catch (e) {
                    console.log(e);
                }
            });

            // Transfers
            _.times(_.random(6, 10, false), async () => {
                try {
                    await createTransfer(user, accId);
                } catch (e) {
                    console.log(e);
                }
            });

            // Stats
            _.times(_.random(8, 12, false), async () => {
                try {
                    await createStats(accId);
                } catch (e) {
                    console.log(e);
                }
            });
        } catch (e) {
            console.log(e);
        }
    });

    // Messages
    _.times(_.random(3, 5, false), async () => {
        try {
            await createMessage(user);
        } catch (e) {
            console.log(e);
        }
    });
};

const createDummyData =  async () => {
    console.log('%s Creating dummy data', chalk.green('???'));

    try {
        // Create controlled user
        const countUsers = await User.countDocuments();

        if (!countUsers) {
            const controlledUser = await createControlledUser();

            generateData(controlledUser);
        }

        // // Create 5 other users
        if (countUsers < 20) {
            _.times(5, async () => {
                let user = await createUser();

                generateData(user);
            });
        }else{
            console.log('%s Dummy data are already overloaded!', chalk.yellowBright('???'));
        }


        return true;
    } catch (e) {
        console.log(e);
        return e;
    }
};

module.exports = createDummyData;
