const mongoose = require('mongoose')

const DBConnect = () => mongoose.connect("mongodb://127.0.0.1:27017/Rapid_Page_Builder")
.then(()=>console.log('Connected to mongodb'))
.catch((err)=>console.log(err))

module.exports = DBConnect;

