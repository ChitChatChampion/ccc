import CSCLanding from './csc/CSCLanding';
import CSCRoom from './csc/CSCRoom';
import BBLanding from './bb/BBLanding';
import BBRoom from './bb/BBRoom';

export const gameModeDict = {
  csc: {
    name: 'Conversation Starter Cards',
    description: 'Elevate your conversations with our Online ChatGPT-Powered Conversation Starter Cards! Dive into fascinating questions, fun challenges, and engaging prompts. Ignite connections and make every chat memorable!',
    instructions: 'Playing the game is a breeze! Participants take turns drawing a card and reading the question or challenge aloud. Everyone in the group then responds or completes the task, sharing their thoughts, stories, or actions. Feel free to keep it lighthearted and fun, and encourage open and honest sharing. Rotate to the next player and repeat for a delightful and engaging experience!',
    createInstructions: "Creating your game is easy! Just define the purpose, describe your group, and specify participant familiarity. We'll craft a tailored icebreaker for your unique needs!",
    imgPath: 'csc.jpg',
    view: CSCLanding,
    room: CSCRoom
  },
  bb: {
    name: 'Burning Bridges',
    description: "Ready for a thrilling ride? Try 'Burning Bridges'! It's an activity that stirs up lively conversations with AI prompts that might even challenge friendships. Dive in and see if your bonds can withstand the heat!",
    instructions: "Playing 'Burning Bridges' is a breeze! Just pick an AI-generated prompt, share your thoughts on it, and engage in open conversations. Remember, it's all in good fun, even if it tests your friendships!",
    createInstructions: "Creating your game is easy! Just define the purpose, describe your group, and specify participant familiarity. We'll craft a tailored icebreaker for your unique needs!",
    imgPath: 'bb.jpg',
    view: BBLanding,
    room: BBRoom
  }
};

export const gameModeList = Object.entries(gameModeDict).map(([k, v]) => ({...v, abbreviation: k}));