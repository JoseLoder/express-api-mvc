import { randomUUID } from 'node:crypto'
// import movies from './movies.json' with {type: 'json'} Maybe in the future
import fs from 'node:fs'
const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

export class movieModel {
  static async getAll ({ genre }) {
    if (genre) {
      // filter() retorna un nuevo array con los elementos que cumplan la condición del callback
      const filteredMovies = movies.filter(
        // some() retorna true si al menos un elemento cumple la condición del callback
        (movie) => movie.genre.some(
          // Mientras que el genero de la pelicula sea igual al genero requerido
          (g) => g.toLowerCase() === genre.toLowerCase()
        )
      )
      return filteredMovies
    }
    return movies
  }

  static async getById ({ id }) {
    const movie = movies.find(movie => movie.id === id)
    return movie
  }

  static async create (movie) {
    const newMovie = {
      id: randomUUID(),
      ...movie
    }
    // Esto no es REST ya que no se guarda en memoria
    movies.push(newMovie)
    return newMovie
  }

  static async update ({ id, data }) {
    // Buscar la película

    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false

    // Actualizar la película
    const updatedMovie = {
      ...movies[movieIndex],
      ...data
    }
    movies[movieIndex] = updatedMovie
    return movies[movieIndex]
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false
    movies.splice(movieIndex, 1)
    return true
  }
}
