const path = require("path");
let db = require("../database/models");
const Op = db.Sequelize.Op;

const controlCharacters = {
    list: async (req, res, next) =>  {
        try {
        const characters = await db.Character.findAll({attributes: ['name', 'image']});
        
        return res.status(200).json({
            success: true,
            count: characters.length,
            data: characters
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
        const character = await  db.Character.create({
            name:req.body.name,
            image: req.body.image,
            age:req.body.age,
            weight:req.body.weight,
            history:req.body.history,
            movie_id:req.body.id_movie
        })
        return res.status(201).json({
            success: true,
            data: character            
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
            const character = await db.Character.update(
                (req.body),
                {where: {id_character: req.params.id}
        });
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
        const character = await db.Character.findByPk(req.params.id);

        if(!character)  {
            return res.status(404).json({
                success: false,
                error: 'No character found'
            });
        }    
        await character.destroy();

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
            const character = await db.Character.findByPk(req.params.id,
                {include:[{association: "movies" }]}
                );
            return res.status(200).json({
                success: true,
                data: character
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
            const characters = await db.Character
            .findAll({
                include:[{association: "movies"
             }],
                where: {
                    [Op.or]: [
                      {name:     { [Op.like]: '%' + req.query.name + '%' }},
                      {age:  { [Op.like]: '%' + req.query.age + '%' }},
                    //   {id_movie:  { [Op.like]: '%' + req.query.idMovie + '%' }},
                    ]
                } 
        })
            
            return res.status(200).json({
                success: true,
                count: characters.length,
                data: characters
            })
            } catch(err) {
            return res.status(500).json({
            success: false,
            error: 'Server Error'
            })
            } 
    }
    

}

module.exports = controlCharacters