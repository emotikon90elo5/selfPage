require('dotenv').config()

const app = require('./settings')
const panel = require('./router/panel')
const funshop = require('./router/projects/funshop')
const main = require('./router/main')
const pl = require('./router/projects/pl')

app.use(main)
app.use(panel)
app.use(funshop)
app.use(pl)

app.all('*', (req, res) => {
    res.status(404).render('err')
})
