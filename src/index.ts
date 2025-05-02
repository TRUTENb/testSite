import express from "express"
const app = express()
const port = 3001

const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

const dataBase = {animals: [
        {id: 1, title: "bear"},
        {id: 2, title: "rabbit"},
        {id: 3, title: "cat"},
        {id: 4, title: "dog"},
        {id: 5, title: "wolf"},
    ]}

app.get('/home/dataBase', (req, res) => {
    const foundAnimals= dataBase.animals
        .filter(c => c.title.indexOf(req.query.title as string) > -1 )
    res.json(foundAnimals)
})


app.get('/home/:title', (req, res) => {
    const found = [
        {id: 1, title: "odin"},
        {id: 2, title: "dva"},
        {id: 3, title: "tri"},
        {id: 4, title: "chetiri"},
        {id: 5, title: "piatb"},
    ].find(c => c.title === req.params.title);

    if (!found){
        res.sendStatus(404)
        return
    }
    res.json(found?.id)
})

app.post('/home/dataBase', (req, res) => {

    if (!req.body.title){
        res.sendStatus(400)
        return;
    }

    const addAnimals = {
        id: +(new Date()),
        title: req.body.title
    }
    dataBase.animals.push(addAnimals)
    res.status(201).json(addAnimals)
})

app.delete('/home/dataBase/:id', (req, res) => {
    dataBase.animals = dataBase.animals.filter(c => c.id !== +req.params.id)

    res.sendStatus(204)
})

app.put('/home/dataBase/:id', (req, res) => {
    if (!req.body.title){
        res.sendStatus(400)
        return;
    }

    const foundAniamls = dataBase.animals.find(c => c.id === +req.params.id);

    if (!foundAniamls){
        res.sendStatus(404)
        return
    }

    foundAniamls.title = req.body.title

    res.sendStatus(204)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})