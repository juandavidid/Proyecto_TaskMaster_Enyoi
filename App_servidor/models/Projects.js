const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    projname: {
        type: String,
        require: true,
        trim: true
    },
    description: { // Nuevo campo de descripción
        type: String,
        trim: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    createDate: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Projects', ProjectSchema);