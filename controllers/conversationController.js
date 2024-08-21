const { Conversationbot } = require("../models/models");
const { Op } = require('sequelize')

class ConversationController {

    //создать беседу
    async newConversation(req, res) {        
        try {
            console.log(req.body)
            const {senderId, receiverId} = req.body

            //найти беседу
            const exist = await Conversationbot.findOne({
                where: { 
                    members: {
                        [Op.contains]: [senderId]
                    } 
                },
            }) 
            if (exist && exist.length !== 0) {
                return res.status(200).json(`conversation already exist`);
            }

            await Conversationbot.create({
                members: [senderId, receiverId],
                bot: 1
            }) 
            return res.status(200).json(`coversation saved sucessfully`)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    
    async getConversation(req, res) {  
        try {
            const chatId = req.params.id
    
            const conversation = await Conversationbot.findOne({
                where: {
                    members: {
                        [Op.contains]: [chatId]
                    }
                },
            })
            return res.status(200).json(conversation);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getConversations(req, res) {  
        try {   
            const conversations = await Conversationbot.findAll({
                order: [
                    ['id', 'DESC'],
                ],
            })
            return res.status(200).json(conversations);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = new ConversationController()