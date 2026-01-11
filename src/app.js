const express = require('express')
const authRoutes = require('./routes/auth.routes')
const ticketRoutes = require('./routes/ticket.routes')

const app = express()

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/tickets', ticketRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Support Ticket API running' })
})

module.exports = app

