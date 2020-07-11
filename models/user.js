const mongoose = require('mongoose')
const imgSchema = new mongoose.Schema({
    imgname: {
        type: String,
        required: true
    }
})

mongoose.model("Multer", imgSchema)