const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { mongodbIP } = process.env
const { delay } = require('./../../functions/delay')

router.get('/:lang/panel', async (req, res) => {
    let logined = req.session.loggedin
    let html = `<link rel="stylesheet" href="/css/table.css"><table>`
    if (!logined) return res.redirect(`/${req.params.lang}/panel/log`)
    console.log(html)
    await mongoose.connect(mongodbIP).then(async () => {
        const joins = await mongoose.connection.db.collection('joins')
        joins
            .find()
            .sort({ joins: 'desc' })
            .toArray((err, result) => {
                for (let i = 0; i < result.length; i++) {
                    html =html +`<tr> <td> ${result[i].link} </td><td> ${result[i].joins}</td></tr>`
                }
            })
    })
    console.log(`$------------------------------$`)
    console.log(html)
    await delay(100)
    html = html +`<link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
    <link href="https://fonts.googleapis.com/css2?family=Poppins&amp;display=swap" rel="stylesheet" />`
    console.log(html)
    res.send(html)
})

router.get('/:lang/panel/log', (req, res) => {
    const input = {
        lang: req.params.lang,
    }
    res.render('panel/login', input)
})

router.post('/:lang/panel/login', async function (req, res) {
    let { username, password } = req.body

    await mongoose
        .connect(mongodbIP)
        .then(async () => {
            await mongoose.connection.db
                .collection('logins')
                .find()
                .toArray((err, result) => {
                    if (username && password) {
                        for (let i = 0; i < result.length; i++) {
                            console.log(result[i].useraname)
                            console.log(username)
                            console.log(username == result[i].useraname)
                            if (username == result[i].useraname) {
                                if (password == result[i].password) {
                                    req.session.loggedin = true
                                    req.session.username = username
                                }
                            }
                        }
                    }
                    res.redirect(`/${req.params.lang}/panel`)
                })
        })
        .catch((err) => console.log(err.message))
})
module.exports = router
