import cors from 'cors'
import express from 'express'
import path from 'path'

const __dirname = import.meta.dirname

const PORT = 3000;
const app = express()

app.use(express.static('src'))
app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
})