require('dotenv').config()

const app = require('./app')
const connectDB = require('./config/db')

const start = async () => {
  try {
    await connectDB()
    const PORT = process.env.PORT || 8000
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

start()
