import express from 'express'
import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.urlencoded({ extended: true })) 
app.use(express.json())  

mongoose.connect('mongodb://carlos:54321@ContMongo:27017/miapp?authSource=admin')

const Persona = mongoose.model('Persona', new mongoose.Schema({
  nombre: String,
  edad: Number,
}))

app.get('/', async (_req, res) => {
  const personas = await Persona.find()

  fs.readFile(path.join(__dirname, 'views', 'index.html'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error al leer el archivo HTML')
    }

    const personasHTML = personas.map(persona => `
      <tr>
        <td>${persona.nombre}</td>
        <td>${persona.edad}</td>
      </tr>
    `).join('')

    const html = data.replace('{{personas}}', personasHTML)

    res.send(html)
  })
})

app.get('/crear', (_req, res) => {
  fs.readFile(path.join(__dirname, 'views', 'crear.html'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error al leer el archivo HTML')
    }
    res.send(data)  
  })
})

app.post('/crear', async (req, res) => {
  const { nombre, edad } = req.body
  await Persona.create({ nombre, edad })
  res.redirect('/')  
})

app.listen(3000, () => console.log('Escuchando en el puerto 3000'))
