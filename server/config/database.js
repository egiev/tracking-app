const mongoose = require('mongoose');
const { DATABASE_URI } = process.env;

exports.connect = () => {
  mongoose.connect(DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const con = mongoose.connection;
  con.on('error', (error) => console.error(error));
  con.once('open', () => {
    console.log('Successfully connected to DB');
  });
};
