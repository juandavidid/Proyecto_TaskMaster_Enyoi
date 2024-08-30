const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const tasksController = require('../controllers/tasksController');
const auth = require('../middleware/auth');

// Manage Tasks
// api/tasks

//Create a task
router.post('/',
    auth,
    [
        check('taskname', 'El nombre de la tarea es obligatorio').trim().isLength({ min: 1 }),
        check('projectId', 'El proyecto de la tarea es obligatorio').trim().isLength({ min: 1 })
    ],
    tasksController.createTask);
// LISTA DE TAREAS POR ID DEL PROYECTO    
router.get('/:projectId',
    auth,
    tasksController.listTasks);

// ACTUALIZA LAS TAREA  nombre y estado de la tarea    
/*
router.put('/:id',
    auth,
    [
        check('taskname', 'Debe suministrar el nombre de la tarea o su estatus').if(check('statusTask').not().exists()).trim().isLength({ min: 1 }),
        check('statusTask', 'Debe suministrar el nombre de la tarea o su estatus').if(check('taskname').not().exists()).trim().isBoolean(),
        // Validar que 'state' debe ser una cadena no vacía si se proporciona
        check('state', 'El estado de la tarea es obligatorio y debe ser una cadena no vacía')
            .optional()
            .trim()
            .isLength({ min: 1 }),

        // Validar que 'projectId' debe ser un ID de MongoDB válido si se proporciona
        check('projectId', 'El ID del proyecto debe ser un ID válido de MongoDB')
            .optional()
            .isMongoId(),
    ],
    tasksController.updateTask);
*/
router.put('/:id',
    auth,
    [
        check('taskname', 'El nombre de la tarea debe ser una cadena no vacía')
            .optional()
            .trim()
            .isLength({ min: 1 }),
        check('statusTask', 'El estado de la tarea debe ser un valor booleano')
            .optional()
            .isBoolean(),
        check('state', 'El estado de la tarea debe ser una cadena no vacía')
            .optional()
            .trim()
            .isLength({ min: 1 }),
        check('projectId', 'El ID del proyecto debe ser un ID válido de MongoDB')
            .optional()
            .isMongoId(),
    ],
    tasksController.updateTask
);

// ELIMINA LA TAREA POR ID
router.delete('/:id',
    auth,
    tasksController.deleteTask);

module.exports = router;