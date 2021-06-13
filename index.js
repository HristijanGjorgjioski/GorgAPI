const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

const authRoutes = require('./routes/Auth/authRouter')

app.use(authRoutes)

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

const PORT = process.env.PORT || 8080
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://admin:KmeVxFd5g2UpCTH@cluster0.u2uu1.mongodb.net/API?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`))

mongoose.set('useFindAndModify', false)
