const Organisation = require("../models/organisations.model")


const handleCreateOrganisation = async (req, res) => {
    const { name } =  req.body;
    try {
        const newOrganisation = await Organisation.create({
            name: name
        })

        res.status(200).json({
            message: "User Create Successfully"
        })
        
    } catch (error) {

        console.log(error)
        res.status(500).json({
            message: "Something wrong happened while creating organisation"
        })
        
    }

}

module.exports = { handleCreateOrganisation }