const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { mongodbIP } = process.env
const { Schema } = mongoose
const todos = require('./../../Shemas/todo')
const { delay } = require('./../../functions/delay')

router.get('/:lang/projects/todo/', async (req, res) => {
    let taskslist = []
    if (req.params.lang != 'pl' && req.params.lang != 'en') {
        return res.status(404).render('err')
    }
    await mongoose.connect(mongodbIP)
    const todo = await mongoose.model('todo', todos)
    await todo.find({}).exec(async (err, tasks) => {
        await tasks.forEach(async (task) => {
            await taskslist.push(task.task)
        })
    })
    await delay(2000)
    console.log(taskslist)
    const input = { lang: req.params.lang, list: taskslist }
    await res.render('todo/main', input)
})

router.post('/:lang/projects/todo/add', async (req, res) => {
    await mongoose.connect(mongodbIP)
    const todo = mongoose.model('todo', todos)
    await todo.create({ task: req.body.task })
    res.redirect('./')
})
module.exports = router
