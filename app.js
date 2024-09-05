import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middleware/cors.js'

const PORT = process.env.PORT || 1234
const app = express()
app.disable('x-powered-by')

// Middlewares
app.use(json())
app.use(corsMiddleware)

// Endpoint to movies
app.use('/movies', moviesRouter)

// Not found
app.use((req, res) => {
  res.status(404).json({ error: 'Not found, soorry!' })
})

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`)
})
