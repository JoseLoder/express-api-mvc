import { movieModel } from '../models/movie.js'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class movieController {
  static async getAll (req, res) {
    const { genre } = req.query
    const movies = await movieModel.getAll({ genre })
    res.status(200).json(movies)
  }

  static async getById (req, res) {
    const { id } = req.params
    const movie = await movieModel.getById({ id })
    if (movie) return res.status(200).json(movie)
    res.status(404).json({ error: 'Movie not found' })
  }

  static async create (req, res) {
    const validated = validateMovie(req.body)
    if (validated.error) return res.status(400).json(validated.error)
    const newMovie = await movieModel.create(validated.data)
    res.status(201).json(newMovie)
  }

  static async update (req, res) {
    // Validación de los datos
    const result = validatePartialMovie(req.body)
    if (!result.success) { // other way to validate
      return res.status(400).json(result.error)
    }
    const { id } = req.params
    const updatedMovie = await movieModel.update({ id, data: result.data })

    // Retornar la película actualizada
    updatedMovie ? res.status(200).json(updatedMovie) : res.status(404).json({ error: 'Movie not found' })
  }

  static async delete (req, res) {
    const { id } = req.params
    const deleted = await movieModel.delete({ id })
    deleted ? res.status(200).send('The movie has been removed') : res.status(404).json({ error: 'Movie not found' })
  }
}
