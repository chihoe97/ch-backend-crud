'use strict'

import { Router } from 'express';
import handler from './handlers/catfactsHandler.js';
const router = Router();

router.get(
  '/fromSource',
  async (req, res, next) => {
    try {
        // Call handler to response with data
        let list = await handler.getListFromAPI();
        res.send(list);
    } catch (err) {
        next(err);
    }
  }
)

router.get(
    '/get',
    async (req, res, next) => {
        try {
            // Call handler to response with data
            let fact = await handler.getFact();
            res.send(fact);
        } catch (err) {
            next(err);
        }
    }
)

router.post(
    '/create',
    async (req, res, next) => {
        try {
            // Call handler to response with data
            if (req.body && req.body.desc) {
                let fact;
                // if body is object array
                if (req.body.desc.length && typeof req.body.desc === "object") {
                    for (let i=0; i<req.body.desc.length; i++) {
                        // Double up single quote for desc with single quote to allow DB string to process
                        let desc = req.body.desc[i].replace(/'/g, "''");
                        fact = await handler.createFact(desc);
                    }
                } else {
                    fact = await handler.createFact(req.body.desc);
                }
                res.send(fact);
            } else {
                res.status(400);
                res.send({
                    error: "Bad Data"
                });
            }
        } catch (err) {
            next(err);
        }
    }
)

router.post(
    '/update',
    async (req, res, next) => {
        try {
            // Call handler to response with data
            if (req.body && req.body.desc && req.body.newDesc) {
                let fact = await handler.updateFact(req.body.desc, req.body.newDesc);
                res.send(fact);
            } else {
                res.status(400);
                res.send({
                    error: "Bad Data"
                });
            }
        } catch (err) {
            next(err);
        }
    }
)

router.post(
    '/delete',
    async (req, res, next) => {
        try {
            // Call handler to response with data
            if (req.body && req.body.desc) {
                let fact = await handler.deleteFact(req.body.desc);
                res.send(fact);
            } else {
                res.status(400);
                res.send({
                    error: "Bad Data"
                });
            }
        } catch (err) {
            next(err);
        }
    }
)

export default router;