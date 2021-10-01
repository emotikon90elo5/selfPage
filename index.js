require('dotenv').config()
const { readdirSync } = require('fs')

const app = require('./settings')

for (const dir of readdirSync('./router/')) {
    const commands = readdirSync(`./router/${dir}/`).filter((file) =>
        file.endsWith('.js'),
    )
    for (const commandFile of commands) {
        app.use(require(`./router/${dir}/${commandFile}`))
    }
}

app.all('*', (req, res) => {
    res.status(404).render('err')
})
