import Session from "../models/session.model.js";

// utils
import getTranscript from "../utils/getTranscript.js";
import getResponse from "../utils/getResponse.js";

export const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find();

    return res.status(200).json({ sessions });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

export const getSession = async (req, res) => {
  try {
    const { id } = req.params;

    const session = await Session.findById(id);

    if (!session) return res.status(404).json({message : "session not found"})

    return res.status(200).json({ session });

  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

export const launchSession = async(req, res) => {
    try {

       const {videoUrl} = req.body

       if (!videoUrl) return res.status(500).json({message : "Video URL missing"})

       const session = new Session({videoUrl : videoUrl})

       session.save()

      return res.status(201).json({message : "Session launched succesfully", session})
        
    } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
    }
}

export const deleteSession = async(req, res) => {
    try {

        const {id} = req.params

        const session = await Session.findByIdAndDelete(id)

        if (!session) return res.status(404).json({message : "session not found"})

        return res.status(200).json({message : "Session delete succesfully"})
        
    } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
    }
}

// ask question and get answer controller

export const askQuestion = async(req, res) => {
    try {

        const {id} = req.params

        const {userInput} = req.body

        if (!userInput) return res.status(500).json({message : "user input is required"})

        // find the session from id

        const session = await Session.findById(id)

        if (!session) return res.status(200).json({message : "session not found"})

        // get the video transcript

        const transcript = await getTranscript(session.videoUrl)

        // Feed the transcript and user Input

        const aiResponse = await getResponse(userInput, transcript, session.chats)

        // Get the Answer

        // update the chat

        session.chats.push(
            { sender: "user", message: userInput },
            { sender: "assistant", message: aiResponse.message }
          );

        await session.save();

        return res.status(200).json({session : session, response : aiResponse})
        
    } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
    }
}