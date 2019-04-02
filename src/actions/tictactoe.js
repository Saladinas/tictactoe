export const MAKE_A_MOVE = 'MAKE_A_MOVE';
export const MAKE_A_CPU_MOVE = 'MAKE_A_CPU_MOVE';
export const UPDATE_WINNER_POSITIONS = 'UPDATE_WINNER_POSITIONS';
export const UNDO = 'UNDO';
export const REPLAY = 'REPLAY';
export const USER_TURN = 'USER_TURN';
export const CHANGE_USER_CHAR = 'CHANGE_USER_CHAR';

export const makeAMove = (position, char) => dispatch => {
    dispatch({
        type: MAKE_A_MOVE,
        payload: {
            position,
            char
        }
    })
}

export const makeACPUMove = (position) => dispatch => {
    dispatch({
        type: MAKE_A_CPU_MOVE,
        payload: {
            position,
        }
    })
}

export const updateWinnerPositions = (positions) => dispatch => {
    dispatch({
        type: UPDATE_WINNER_POSITIONS,
        payload: {
            positions,
        }
    })
}

export const undoLastMove = () => dispatch => {
    dispatch({
        type: UNDO,
    })
}

export const replay = () => dispatch => {
    dispatch({
        type: REPLAY,
    })
}

export const userTurn = () => dispatch => {
    dispatch({
        type: USER_TURN,
    })
}

export const changeUserChar = (userChar, isUserTurn) => dispatch => {
    dispatch({
        type: CHANGE_USER_CHAR,
        payload: {
            userChar,
            isUserTurn
        }
    })
}
