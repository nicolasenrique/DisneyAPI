const path = require("path");
let db = require("../database/models");
const Op = db.Sequelize.Op;

const controlMovies = {
    list: async (req, res, next) =>  {
        try {
        const movies = await db.Movie.findAll({attributes: ['title', 'image', 'creation_date']});
        
        return res.status(200).json({
            success: true,
            count: movies.length,
            data: movies
        })
        } catch(err) {
        return res.status(500).json({
        success: false,
        error: 'Server Error'
        })
        }
    },
    store: async (req,res, next) =>  {
        try {
        const movie = await  db.Movie.create({
            image:req.body.image,
            title: req.body.title,
            creation_date:Date(),
            rating:req.body.rating,
            genre_id:req.body.genre_id,
        })
        return res.status(201).json({
            success: true,
            data: movie            
        });
        } 
            catch(err) {
            return res.status(500).json({
            success: false,
            error: 'Server Error'
            })            
        }
    },
    update: async (req, res, next) => {
        try {
            const movie = await db.Movie.update(
                (req.body),
                {where: {id_movie: req.params.id}
        });

        if(!movie)  {
            return res.status(404).json({
                success: false,
                error: 'No movie found'
            });
        }    

        return res.status(201).json({
            success: true,
            data: {}
        });
        } 
        catch(err) {
        return res.status(500).json({
        success: false,
        error: 'Server Error'
        })            
        }
    },
  delete: async (req, res, next) => {
    try{
        const movie = await db.Movie.findByPk(req.params.id);

        if(!movie)  {
            return res.status(404).json({
                success: false,
                error: 'No movie found'
            });
        }    
        await movie.destroy();

        return res.status(200).json({
            success: true,
            data:{}
        });
        }   
        catch (err){
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
        }
  },
    detail: async (req, res, next) => {
        try{
            const movie = await db.Movie.findByPk(req.params.id,
                {include:[{association: "characters" }]}
                );
            
                if(!movie)  {
                return res.status(404).json({
                    success: false,
                    error: 'No movie found'
                });
                }    
            
            return res.status(200).json({
                success: true,
                data: movie
            })
            } catch(err) {
            return res.status(500).json({
            success: false,
            error: 'Server Error'
            })
        }
    },
    search: async (req, res, next) => {     
        
        try {
            // const order = await (req.query.order)
            // const orderString = await JSON.parse(order)
            // console.log(orderString)

            const movies = await db.Movie
            .findAll({
                include: [
                    {association: "genre" }, 
                ],
                where: {
                  [Op.or]: [
                    {title:     { [Op.like]: '%' + req.query.name + '%' }},
                    {genre_id:  { [Op.like]: '%' + req.query.genre + '%' }}
                  ]
              },
                order:
                    [["id_movie", "DESC"]]

            })
            
            return res.status(200).json({
                success: true,
                count: movies.length,
                data: movies
            })
            } catch(err) {
            return res.status(500).json({
            success: false,
            error: 'Server Error'
            })
            } 
    }
    

}

module.exports = controlMovies