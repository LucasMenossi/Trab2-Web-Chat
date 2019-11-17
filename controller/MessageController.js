const mongoose = require("mongoose")
const Message = require("../model/Message")

class MessageController {
    
  async findAllMessages(req, res) {
    const messages = await Message.find()
    .and([
        { $or:[ {'send':req.params.user}, {'receiver':req.params.user} ]},
        { $or:[ {'send':req.params.friend}, {'receiver':req.params.friend} ]}
    ])
    .sort('time')
    return res.json(messages)
  }

  async store(req, res) {
    const messages = await Message.create({
        'send': req.params.user,
        'receiver': req.params.friend,
        'message': req.body.message,
        'video': req.body.video
        })
    return res.json(messages)
  }

}

module.exports = new MessageController()