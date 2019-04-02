import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { makeACPUMove, undoLastMove, changeUserChar, userTurn, updateWinnerPositions } from './actions/tictactoe';
import Modal from './components/modal';
import Cell from './components/cell';
import Header from './components/header';
import { flipACoin, isEmpty, getCPUChar } from './helpers'

const styles = theme => ({
  icon: {
    fontSize: '140px',
    color: '#00bfa5',
    cursor: 'pointer',
  },
  root: {
    textAlign: 'center',
    backgroundColor: '#1976d2',
    minHeight: '100vh',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  }
});

const winCombinations = [
  // All combinations to win
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Row
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Column
  [2, 4, 6], [0, 4, 8], // Diagonal
]

class App extends Component {

  changeUserChar = (userChar) => {
    this.props.changeUserChar(userChar, true);
  }

  // Comparing inline board values by positions
  sameSymbolsInline(positions) {
    const { boardState } = this.props;
    if (boardState[positions[0]] === boardState[positions[1]] &&
      boardState[positions[1]] === boardState[positions[2]] &&
      !isEmpty(boardState[positions[0]])) {
      return true;
    }

    return false;
  }

  checkWinner() {
    let hasWinner = false;

    winCombinations.forEach((positions) => {
      if (this.sameSymbolsInline(positions)) {
        this.props.updateWinnerPositions(positions);
        hasWinner = true;
      }
    });

    return hasWinner;
  }

  checkDraw() {
    const { boardState } = this.props;
    let isDraw = true;

    boardState.forEach((cellValue) => {
      if (isEmpty(cellValue)) {
        isDraw = false;
      }
    });

    return isDraw;
  };

  undoLastMove() {
    const { isUserTurn } = this.props;

    if (isUserTurn) {
      this.props.undoLastMove();
    }
  }

  whoStarts() {
    if (flipACoin()) {
      this.props.userTurn();
    } else if (flipACoin()) {
      this.props.changeUserChar('x', false);
    } else {
      this.props.changeUserChar('o', false);
    }
  }

  hasTwo(charToCheck) {
    const { boardState } = this.props;

    let nextPosition = null;

    winCombinations.forEach((positions) => {
      if (boardState[positions[0]] === boardState[positions[1]] &&
        charToCheck === boardState[positions[0]] && isEmpty(boardState[positions[2]])) {
        nextPosition = positions[2];
      } if (boardState[positions[0]] === boardState[positions[2]] &&
        charToCheck === boardState[positions[0]] && isEmpty(boardState[positions[1]])) {
        nextPosition = positions[1];
      } else if (boardState[positions[1]] === boardState[positions[2]] &&
        charToCheck === boardState[positions[1]] && isEmpty(boardState[positions[0]])) {
        nextPosition = positions[0];
      }
    });

    return nextPosition;
  }

  makeACPUMove() {
    const { boardState, userChar } = this.props;
    const CPUChar = getCPUChar(userChar);

    // Check if CPU can win within next move
    let nextPosition = this.hasTwo(CPUChar);
    if (nextPosition === null) {
      // Check if user can win within next move. If he does - do not let this happen
      nextPosition = this.hasTwo(userChar);
      if (nextPosition === null) {
        if (isEmpty(boardState[4])) {
          // If center is empty - put the char there
          nextPosition = 4;
        } else {
          boardState.forEach((cellValue, index) => {
            if (isEmpty(cellValue) && index % 2 === 0) {
              nextPosition = index;
            }
          })

          if (nextPosition === null) {
            boardState.forEach((cellValue, index) => {
              if (isEmpty(cellValue)) {
                nextPosition = index;
              }
            })
          }
        }
      }
    }

    this.props.makeACPUMove(nextPosition);
  }

  render() {
    const { classes, userChar, isUserTurn, winnerPositions, boardState } = this.props;

    // If there are no winner yet
    let isDraw = false;
    if (!winnerPositions.length) {
      const hasWinner = this.checkWinner();
      if (!hasWinner) {
        isDraw = this.checkDraw();
      }
      if (!isDraw) {
        if (isUserTurn === null) {
          this.whoStarts();
        }

        if (isUserTurn === false) {
          setTimeout(() => this.makeACPUMove(), 1000);
        }
      }
    }

    return (
      <div className={classes.root}>
        <Modal open={Boolean(isUserTurn && !userChar)} changeUserChar={this.changeUserChar} />
        <Header isDraw={isDraw} />
        <Grid container>
          {boardState.map((value, index) => {
            const lessOpacity = winnerPositions.length && !winnerPositions.includes(index);
            return <Cell lessOpacity={lessOpacity} key={index} index={index} value={value} />
          })}
        </Grid>
      </div >
    );
  }
}

const mapStateToProps = state => ({
  ...state.tictactoeReducer
})

const mapDispatchToProps = dispatch => ({
  makeACPUMove: (position, char) => dispatch(makeACPUMove(position, char)),
  undoLastMove: () => dispatch(undoLastMove()),
  changeUserChar: (userChar, isUserTurn) => dispatch(changeUserChar(userChar, isUserTurn)),
  userTurn: () => dispatch(userTurn()),
  updateWinnerPositions: (positions) => dispatch(updateWinnerPositions(positions)),
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App));
