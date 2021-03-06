const express = require('express');
const router = express.Router();

const filmes = [
    { 
        id: 1, 
        tipo:'Action',
        filmes: [
            { id: 1, nome: '007' },
            { id: 2, nome: 'Titanic'},
        ]
     },
     {
        id: 2, 
        tipo:'Terror',
        filmes: [
            { id: 1, nome: 'Bruxa de Blair' },
            { id: 2, nome: 'Jason'},
        ]
     },
     {
        id: 3, 
        tipo:'Romance',
        filmes: [
            { id: 1, nome: 'Viver Feliz' },
            { id: 2, nome: 'Sonho Lindo'},
        ]
     }
    ];
    
    const filtraFilmes = {};
    
  const courses = [
      {
      id: 1,
      name: 'C#'
     },
     {
     id: 2,
     name: 'Angular'
     }
]
    
    router.get('/api/tipo', (req, res)=> {
        res.send(filmes);
    });
        
    router.get('/api/tipo/:tipo', (req, res) => {
        //res.send(req.params); 
       filmes.filter(f => {
            if (f.tipo === req.params.tipo) {
                this.filtraFilmes = f;
            }
        });
        console.log('Filtrado fora: ', this.filtraFilmes);
        if (this.filtraFilmes !== undefined) {
            res.send(this.filtraFilmes); 
        } else {
            console.log('Nao existe');
            res.send('Nao existe este tipo de fil'); 
        }
    
      });

      router.get('/', (req, res) => {
        res.send(courses);
      });
    
      router.post('/', (req, res) => {
            res.send(req.body);
      });
    
      router.post('/api/tipo', (req, res) => {
        const { error } = validandoFilme(req.body);
        if(error)  return res.status(400).send(error.details[0].message);
    
                const existe = filmes.find(f => f.tipo === req.body.tipo);
    
                if (existe) {
                    console.log('Existe');
                    res.send(req.body)
                } else {
                    console.log(' N Existe');
                    filme = {
                        id: filmes.length + 1,
                        tipo: req.body.tipo,
                        filmes: [{
                            id: req.body.filmes[0].id,
                            nome: req.body.filmes[0].nome
                        }
                    ]
                    };
                    filmes.push(filme);
                    res.send(filme)
                }
      });
    
    function validandoFilme(req) {
        const scheme = {
            tipo: Joi.string().min(3).max(30).required()
        }
        return Joi.validate(req.body, scheme)
    }
    
module.exports = router;