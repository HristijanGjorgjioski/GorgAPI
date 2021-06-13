const express = require('express')

const app = express()

const authRoutes = require('./routes/Auth/authRouter')

const PORT = process.env.PORT || 8080

app.use(authRoutes())

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
