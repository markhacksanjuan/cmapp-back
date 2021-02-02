const express = require('express')
const router = express.Router()
const Client = require('../models/client.model')


router.post('/new', (req, res, next) => {
    const { name, lastName, email, company } = req.body
    const newClient = { name, lastName, email, company }
    Client.create(newClient)
        .then(createdClient => {
            res.send(createdClient)
        })
        .catch(err => {
            console.error(err)
        })
})
router.get('/all', (req, res, next) => {
    Client.find({})
        .then(clients => {
            res.status(200).send(clients)
        })
        .catch(err => {
            console.error(err)
        })
})
router.get('/one/:id', (req, res, next) => {
    const clientId = req.params.id
    Client.findById({ _id: clientId})
        .then(client => {
            res.status(200).send(client)
        })
        .catch(err => {
            console.error(err)
        })
})
router.post('/one/:id/edit', (req, res, next) => {
    const clientId = req.params.id
    const { name, lastName, email, company } = req.body
    const editedClient = { name, lastName, email, company }
    Client.findByIdAndUpdate({ _id: clientId }, editedClient)
        .then(() => {
            res.status(200).send(editedClient)
        })
        .catch(err => {
            console.error(err)
        })
})
router.post('/one/:id/delete', (req, res, next) => {
    const clientId = req.params.id
    Client.findByIdAndRemove({ _id: clientId })
        .then(result => {
            res.status(200)
        })
        .catch(err => {
            console.error(err)
        })
})

module.exports = router