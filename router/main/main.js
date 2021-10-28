const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { mongodbIP } = process.env
const { delay } = require('./../../functions/delay')

router.get('/:lang/', async (req, res) => {
    if (req.params.lang != 'pl' && req.params.lang != 'en') {
        return res.status(400).render('err')
    }
    await mongoose.connect(mongodbIP).then(async () => {
        const joins = await mongoose.connection.db.collection('joins')

        await joins.findOneAndUpdate(
            { link: `/${req.params.lang}/` },
            {
                $inc: {
                    joins: 1,
                },
            },
            { new: true },
        )
        await joins.findOneAndUpdate(
            { link: '/:lang/' },
            {
                $inc: {
                    joins: 1,
                },
            },
            { new: true },
        )
    })

    let input = {
        lang: req.params.lang,
        logined: req.session.loggedin,
        username: req.session.username,
    }
    await mongoose.connect(mongodbIP).then(async () => {
        const joins = await mongoose.connection.db.collection('joins')
        await joins.find({ link: '/:lang/' }).toArray((err, result) => {
            Object.assign(input, { all: result[0].joins })
        })
        await joins
            .find({ link: `/${req.params.lang}/` })
            .toArray((err, result) => {
                Object.assign(input, { langJoins: result[0].joins })
            })
    })
    await delay(150)
    res.render('main/index', input)
})

router.get('/', (req, res) => {
    res.redirect('/en')
})
module.exports = router
