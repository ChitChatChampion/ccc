import CSCLanding from './csc/CSCLanding';
import CSCRoom from './csc/CSCRoom';

export const gameModeDict = {
  csc: {
    name: 'Conversation Starter Cards',
    description: 'CSC Description here',
    instructions: 'Haiya why need instructions why so weak?',
    imgPath: 'csc.jpg',
    view: CSCLanding,
    room: CSCRoom
  }
};

export const gameModeList = Object.entries(gameModeDict).map(([k, v]) => ({...v, abbreviation: k}));