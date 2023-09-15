import ConversationStarterCards from './ConversationStarterCards';

export const gameModeDict = {
  csc: {
    name: 'Conversation Starter Cards',
    description: 'Lorem ipsum',
    imgPath: 'csc.jpg',
    view: ConversationStarterCards
  }
};

export const gameModeList = Object.entries(gameModeDict).map(([k, v]) => ({...v, abbreviation: k}));