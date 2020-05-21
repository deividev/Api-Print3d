
const mongoose = require('mongoose');

mongoose.connect(
    mongoUri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    OnDBReady
).then(db => console.log('Database is connected'))
.catch(err => console.log(err));
mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    