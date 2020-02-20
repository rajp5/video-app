const express = require('express');
const app = express();
const Joi = require('joi');
app.use(express.json())
let genres = [
    {id:1, name:'Comedy'},
    {id:2, name:'Thriller'},
    {id:3, name:'Action'}
]
app.get('/', (req,res)=>{
    res.send("Genre Homepage")
})
app.get('/api/genres', (req,res)=>{
    res.send(genres);
});

app.post('/api/genres', (req,res) => {
    let result = validateGenre(req.body);
    if(result.error) return res.status(400).send('Invalid Genre');
    const newGenre = {id: genres.length+1, name: req.body.name}
    genres.push(newGenre);
    res.send(newGenre);
});

app.get('/api/genre/:id', (req,res) => {
    
})

function validateGenre(genre){
    let schema = { name: Joi.string().min(3).required()
    
    };
    return Joi.validate(genre,schema)
}


let port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on ${port}`))