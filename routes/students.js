'use strict'

import { Router } from 'express';
import handler from './handlers/studentsHandler.js';
const router = Router();

router.post(
    '/register',
     async (req, res, next) => {
        try {
            // Call handler to response with data
            if (req.body && req.body.teacher && (req.body.students && req.body.students.length)) {
                let result = await handler.registerStudents(req.body.teacher, req.body.students);
                res.send({status: "success", message: result});
            } else {
                res.status(400);
                res.send({
                    error: "Bad Request"
                });
            }
        } catch (err) {
            if (err && err.errno && err.errno === 1062) {
                res.send("Duplicate student entry");
            } else {
                res.send({message: "Failed to register", error: err});
            }
        }
    }
)

router.get(
    '/commonstudents',
     async (req, res, next) => {
        try {
            // Call handler to response with data
            if (req && req.query && req.query.teacher) {
                let result = await handler.getCommonStudents(req.query.teacher);
                res.send({students: result});
            } else {
                res.status(400);
                res.send({
                    error: "Bad Request"
                });
            }
        } catch (err) {
            res.send({message: "Failed to retrieve list", error: err});
        }
    }
)

router.post(
    '/suspend',
     async (req, res, next) => {
        try {
            // Call handler to response with data
            if (req.body && req.body.student) {
                let result = await handler.suspendStudent(req.body.student);
                res.send({status: "success", message: result});
            } else {
                res.status(400);
                res.send({
                    error: "Bad Request"
                });
            }
        } catch (err) {
            res.send({message: "Failed to update student status", error: err});
        }
    }
)

router.post(
    '/retrievefornotifications',
     async (req, res, next) => {
        try {
            // Call handler to response with data
            if (req.body && req.body.teacher && req.body.notification) {
                let result = await handler.retrieveStudentForNoti(req.body.teacher, req.body.notification);
                res.send({recipients: result});
            } else {
                res.status(400);
                res.send({
                    error: "Bad Request"
                });
            }
        } catch (err) {
            res.send({message: "Failed to retrieve students", error: err});
        }
    }
)

export default router;