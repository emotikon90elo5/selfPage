const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { mongodbIP } = process.env

router.get('/:lang/projects/pl/', (req, res) => {
    if (req.params.lang != 'pl' && req.params.lang != 'en') {
        return res.status(404).render('err')
    }
    const { lang } = req.params
    if (lang == 'en') return res.render('pl/en')
    res.render('pl/main')
})

module.exports = router
