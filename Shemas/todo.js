const mongoose = require('mongoose')
const { Schema } = mongoose

const todos = new Schema(
    {
        task: String,
        date: { type: Date, default: Date.now },
    },
    { collection: 'todo' },
)

module.exports = todos
