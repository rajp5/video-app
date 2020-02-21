const express =  require('express');
const router = express.Router();
const Joi = require('joi');

let genres = [
    {id:1, name:'Comedy'},
    {id:2, name:'Thriller'},
    {id:3, name:'Action'}
]

router.get('/', (req,res)=>{
    res.send(genres);
});

router.post('/', (req,res) => {
    let result = validateGenre(req.body);
    if(result.error) return res.status(400).send('Invalid Genre');
    const newGenre = {id: genres.length+1, name: req.body.name}
    genres.push(newGenre);
    res.send(newGenre);
});

router.get('/:id', (req,res) => {
    let genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('Genre Not Found');

    res.send(genre);
});

router.put('/:id', (req,res)=>{
    let genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('Genre Not Found');

    let result = validateGenre(req.body);
    if(result.error) return res.status(400).send('Invalid Genre');

    genre.name = req.body.name;
    res.send(genre);
});

router.delete('/:id', (req,res)=>{
    let genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('Genre Not Found');

    let index = genres.indexOf(genre)
    genres.splice(index,1);

    res.send(genre);
})

function validateGenre(genre){
    let schema = { name: Joi.string().min(3).required()
    
    };
    return Joi.validate(genre,schema)
}

module.exports = router;