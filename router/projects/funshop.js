const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { mongodbIP } = process.env

router.get('/:lang/projects/funshop/', async (req, res) => {
    if (req.params.lang != 'pl' && req.params.lang != 'en') {
        return res.status(404).render('err')
    }

    await mongoose.connect(mongodbIP).then(async () => {
        const joins = await mongoose.connection.db.collection('joins')

        await joins.findOneAndUpdate(
            { link: `/${req.params.lang}/projects/funshop/` },
            {
                $inc: {
                    joins: 1,
                },
            },
            { new: true },
        )
        await joins.findOneAndUpdate(
            { link: '/:lang/projects/funshop/' },
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
        await joins
            .find({ link: '/:lang/projects/funshop/' })
            .toArray((err, result) => {
                Object.assign(input, { all: result[0].joins })
            })
        await joins
            .find({ link: `/${req.params.lang}/projects/funshop/` })
            .toArray((err, result) => {
                Object.assign(input, { langJoins: result[0].joins })
            })
    })
    res.render('funshop/funshop', input)
})
module.exports = router
