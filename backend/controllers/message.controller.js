import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

const receiveMessages = async (req, res) => {};
const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { message } = req.body;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });
    console.log(conversation);
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    await Promise.all([conversation.save(), newMessage.save()]);

    console.log(newMessage);
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    res.status(201).json(newMessage);
    //   console.log("Params id: ", receiverId);
  } catch (error) {
    console.log("Error in the sendMessage Controller");
    res.status(500).json(`Internal Server error : ${error}`);
  }
};
export { receiveMessages, sendMessage };
