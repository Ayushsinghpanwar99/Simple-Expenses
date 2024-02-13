const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    type:{
        type:'String'
    },
    addfriend:{
        type:'String'
    },
    name:{
        type:'String'
    },
    date:{
        type:'String'
    },
    currency:{
        type:'String'
    },
    amount:{
        type:'String'
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User 