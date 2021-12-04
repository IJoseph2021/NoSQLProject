const mongoose = require('mongoose');
const Schema = mongoose.Schema


const authorSchema = new Schema({
    first_name:{
        type: String,
        required: true,
        trim: true,
    },
    last_name:{
        type: String,
        required: true,
        trim: true,
    },
    employment:{
        type: Array,
        required: false,
    }

})

const authors = mongoose.model('authors', authorSchema)
module.exports = authors;