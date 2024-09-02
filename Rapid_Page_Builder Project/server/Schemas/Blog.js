const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    title: {
        type: mongoose.SchemaTypes.String,
        required : true,
    },
    subText : {
        type: mongoose.SchemaTypes.String,
        required : true
    },
    body : {
        type : mongoose.SchemaTypes.String,
        required : true
    },
    url : {
        type: mongoose.SchemaTypes.String,
        required : true
    },
    author : {
        type : mongoose.SchemaTypes.String,
        required : false
    },
    showAuthor : {
        type : mongoose.SchemaTypes.Boolean,
        required : true
    },
    blogStatus : {
        type : mongoose.SchemaTypes.String,
        enum : ['Draft', 'Published', 'Scheduled'],
        default : 'Draft'
    },
    owner : {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    createdAt :{
        type: mongoose.SchemaTypes.Date,
        default : new Date()
    }
})

module.exports = mongoose.model("Blog", BlogSchema);