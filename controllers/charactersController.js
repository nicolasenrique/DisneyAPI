const path = require("path");
let db = require("../database/models");

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
        const character = await  db.Character.create(req.body)
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
            const updatedCharacter = await db.Character.update(
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
        }   catch (err){
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
          }
  }
}

module.exports = controlCharacters