// TODO: make action.types as constants so can reuse in reducer and actions
import { randomString } from '../helpers';

const initialState = {
  matchId: randomString(), //string, identifies the current match, required
  boardState: [
    "-", "-", "-", // first row of the game board, positions 0, 1, 2
    "-", "-", "-", // second row of the game board, positions 3, 4, 5
    "-", "-", "-" // third row of the game board, positions 6, 7, 8
  ], // array of chars ( one of ['o','x','-']), required
  lastMove: {
    char: "", // char one of ['o','x'], required
    position: "" // number from 0 to 8, required 
  }, // object, represents the next move of the player, required only on input
  lastCPUMove: {
    char: "", // char one of ['o','x'], required
    position: "" // number from 0 to 8, required 
  }, // object, represents the next move of the player, required only on input
  winnerPositions: [],
  userChar: null,
  isUserTurn: null,
  // "customField1": "customValue1", // any format, optional for the developer
  // "customField2": "customValue1", // any format, optional for the developer
  // "customField3": "customValue1" // any format, optional for the developer
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'MAKE_A_MOVE':
      const updatedBoard = state.boardState.map((item, index) => {
        if (index !== action.payload.position) {
          // This isn't the item we care about - keep it as-is
          return item
        }
        return state.userChar;
      });

      return {
        ...state,
        lastMove: action.payload,
        boardState: updatedBoard,
        isUserTurn: false,
      }
    case 'MAKE_A_CPU_MOVE':
      const newBoard = state.boardState.map((item, index) => {
        if (index !== action.payload.position) {
          // This isn't the item we care about - keep it as-is
          return item
        }
        return state.userChar !== 'x' ? 'x' : 'o';
      });

      return {
        ...state,
        lastCPUMove: {
          char: state.userChar !== 'x' ? 'x' : 'o',
          position: action.payload.position
        },
        boardState: newBoard,
        isUserTurn: true,
      }
    case 'UPDATE_WINNER_POSITIONS':
      return {
        ...state,
        winnerPositions: action.payload.positions,
        isUserTurn: true,
      }
    case 'UNDO':
    console.log(state.lastMove.position);
    console.log(state.lastCPUMove.position);
      const previousBoard = state.boardState.map((item, index) => {
        if (index !== state.lastMove.position && index !== state.lastCPUMove.position) {
          // This isn't the item we care about - keep it as-is
          return item
        }
        console.log('test');
        return '-';
      });
      return {
        ...state,
        boardState: previousBoard
      }
    case 'CHANGE_USER_CHAR':
      return {
        ...state,
        userChar: action.payload.userChar,
        isUserTurn: action.payload.isUserTurn,
      }
    case 'USER_TURN':
      return {
        ...state,
        isUserTurn: true,
      }
    case 'REPLAY':
      return initialState;
    default:
      return state
  }
}