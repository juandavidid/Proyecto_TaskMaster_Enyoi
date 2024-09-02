const mongoose = require('mongoose');

const TasksSchema = mongoose.Schema({
    taskname: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    priority: {
        type: String,
        enum: ['Alta', 'Media', 'Baja'],
        default: 'Media'
    },
    statusTask: {
        type: Boolean,
        default: false
    },
    state: {
        type: String,
        enum: ['Pendiente', 'En progreso', 'Completado'],
        default: 'Pendiente'
    },
    createDate: {
        type: Date,
        default: Date.now()
    },
    dueDate: {  // Nuevo campo para fecha de entrega o vencimiento
        type: Date,
        required: false  // Puedes cambiar a 'true' si quieres que sea obligatorio
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects'
    }
});

module.exports = mongoose.model('Tasks', TasksSchema);