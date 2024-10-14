import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const receiveMessages = asyncHandler(async (req, res) => {
  try {
    const { id: userChattingId } = req.params;

    const loggedId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: {
        $all: [loggedId, userChattingId],
      },
    }).populate("messages");

    if (!conversation) res.status(200).json([]);

    const messages = conversation?.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in the receiveMessages Controller");
    res.status(500).json(`Internal Server error : ${error}`);
  }
});

const sendMessage = asyncHandler(async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { message } = req.body;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });
    console.log("convo:", conversation);
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

    console.log(newMessage);

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);
    console.log("SOCKET ID OF receiver", receiverSocketId);
    if (receiverSocketId) {
      console.log("Inside");
      io.to(receiverSocketId).emit("newMessage", newMessage);
      console.log(
        `Message sent to ${receiverId} via socket ${receiverSocketId}`
      );
    }

    res.status(201).json(newMessage);
    
    //   console.log("Params id: ", receiverId);
  } catch (error) {
    console.log("Error in the sendMessage Controller");
    res.status(500).json(`Internal Server error : ${error}`);
  }
});
export { receiveMessages, sendMessage };
