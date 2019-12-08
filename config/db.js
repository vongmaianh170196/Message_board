const mongoose = require('mongoose');
const config = require('config');
const db_uri = config.get('uri');

const connectDb = async () => {
    try {
        await mongoose.connect(db_uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true   
        });
        console.log('Sucessfully connected to mongoDb...')
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
};

module.exports = connectDb;