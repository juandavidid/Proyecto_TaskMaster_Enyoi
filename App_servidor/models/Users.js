const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    nameuser: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    createDate: {
        type: Date,
        default: Date.now()
    },
    active: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    profilePhoto: {
        type: Buffer, // Campo para almacenar la imagen como datos binarios
    },
    profilePhotoType: {
        type: String, // Campo para almacenar el tipo MIME de la imagen (por ejemplo, 'image/jpeg')
    },
    city: {
        type: String,  // Campo para almacenar la ciudad del usuario
        trim: true
    },
    phone: {
        type: String,  // Campo para almacenar el teléfono
        trim: true
    },
    profession: {
        type: String,  // Campo para almacenar la profesión
        trim: true
    }

});

module.exports = mongoose.model('Users', UserSchema);