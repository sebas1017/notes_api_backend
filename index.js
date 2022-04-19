let notes =[{
  "id":1,
  "content": "Me tengo que suscribir a lambda coding en youtube",
  "date":"2021-04-15T17:30:31.098Z",
  "important":true
},
{
  "id":2,
  "content": "Me tengo que suscribir a lambda coding en youtube",
  "date":"2021-04-15T17:30:31.098Z",
  "important":true
}
]
const express = require("express")
const cors = require("cors")
const app = express()

const logger = require("./loggerMiddleware")
app.use(cors())
app.use(express.json())
app.use(logger)




app.get("/", (request, response)  => {
  response.send("<h1>API NOTES</h1>")
})


app.get("/api/notes", (request, response)=> {
  response.json(notes)
})


app.get("/api/notes/:id", (request, response)=> {
  const id   = Number(request.params.id) 
  const note = notes.find(note => note.id == id)
  if (note){
    response.json(note)
  }else{
    response.status(404).end()
  }

})


app.delete("/api/notes/:id", (request, response)=> {
  const id   = Number(request.params.id) 
  notes = notes.filter(note => note.id != id)
  response.status(204).end()

})

app.post("/api/notes", (request, response)=> {
  const note   = request.body
  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)
  const newNote = {
    id: maxId + 1 ,
    content: note.content,
    important: typeof note.important != "undefined" ? note.important: false,
    date: new Date().toISOString()
  }
  notes =  notes.concat(newNote)
  response.status(201).json(newNote)
})

app.use((request,response)=>{
  response.status(404).json({
    error: "Not Found"
  })
})
const PORT = 3001

app.listen(PORT, () => {
  console.log(`app listen on port ${PORT}`)
})
