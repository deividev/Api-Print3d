
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/print3d', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));