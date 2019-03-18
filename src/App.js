import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { makeAMove, makeACPUMove, undoLastMove, changeUserChar, userTurn, replay, updateWinnerPositions } from './actions/tictactoe';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { flipACoin } from './helpers'

import './App.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  // paper: {
  //   height: 100,
  //   width: '80%',
  // },
  paper: {
    cursor: 'pointer',
    // padding: 60,
    margin: 20,
    height: 140,
    // padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  selectionPaper: {
    textAlign: 'center',
    padding: '12px'
    // minWidth: '100%',
  },
  lessOpacity: {
    opacity: 0.2,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  icon: {
    fontSize: '160px',
    textAlign: 'center',
    color: '#3fb0ac'
  },
  smallerIcon: {
    fontSize: '140px',
    textAlign: 'center',
    color: '#3fb0ac'
  },
  iconContainer: {
    display: 'inline-block',
    cursor: 'pointer'
  }
});

class App extends Component {

  changeUserChar = (userChar) => {
    this.props.changeUserChar(userChar, true);
  }

  changeValue = (position) => {
    const { userChar, isUserTurn, winnerPositions } = this.props;
    if (isUserTurn && !winnerPositions.length) {
      if (this.isEmpty(position)) {
        this.props.makeAMove(position, userChar);
      }
    }
  }

  isEmpty(position) {
    return this.props.boardState[position] === '-';
  }

  componentWillMount() {
    this.whoStarts();
  }

  getIcon(char) {
    const { classes } = this.props;

    return char === 'x' ? <ClearIcon className={classes.smallerIcon} /> : <RadioButtonUncheckedIcon className={classes.smallerIcon} />
  }

  // Comparing board values by positions
  sameSymbols(p1, p2, p3) {
    const { boardState, userChar } = this.props;

    if (boardState[p1] === boardState[p2] && boardState[p2] === boardState[p3] && !this.isEmpty(p1)) {
      this.props.updateWinnerPositions([p1, p2, p3]);
    }
  }

  checkWinner() {
    this.sameSymbols(0, 1, 2) || this.sameSymbols(3, 4, 5) || this.sameSymbols(6, 7, 8) || // Row
      this.sameSymbols(0, 3, 6) || this.sameSymbols(1, 4, 7) || this.sameSymbols(2, 5, 8) || // Column
      this.sameSymbols(2, 4, 6) || this.sameSymbols(0, 4, 8) // Diagonal
  }

  replay() {
    this.props.replay();
    this.whoStarts();
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

  getMessage() {
    const { winnerPositions, boardState, userChar } = this.props;

    return boardState[winnerPositions[0]] === userChar ? "You won! Congratulations." : "You lost but don't worry!";
  }

  hasTwo() {
    const { boardState, userChar } = this.props;

    // TODO: make function which iterates through board
    if (boardState[0] === boardState[1] && boardState[0] === userChar && this.isEmpty(2)) {
      return 2;
    }

    // No 
    return null;
  }

  makeACPUMove() {
    // TODO: check if CPU can win with next move

    // TODO: Check if User has filled two out of three elements so don't let him to win
    let nextPosition = this.hasTwo();

    if (!nextPosition) {
      if (this.isEmpty(4)) {
        // If center is empty - put the char there
        nextPosition = 4;
      }
    }

    this.props.makeACPUMove(4);
    // this.props.makeACPUMove(nextPosition);
  }

  render() {
    const { classes, userChar, isUserTurn, winnerPositions, boardState } = this.props;
    console.log(this.props);
    if (isUserTurn === null) {
      return null;
    }

    if (!winnerPositions.length) {
      this.checkWinner();
    }

    if (!isUserTurn) {
      setTimeout(() => this.makeACPUMove(), 1000);
    }

    if (isUserTurn && !userChar) {
      return (
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
          <Grid item xs={3}>
            <Paper className={classes.selectionPaper}>
              <Typography variant="display2">Select your char</Typography>
              <div onClick={() => this.changeUserChar('x')} className={classes.iconContainer}><ClearIcon className={classes.icon} /></div>
              <div onClick={() => this.changeUserChar('o')} className={classes.iconContainer}><RadioButtonUncheckedIcon className={classes.icon} /></div>
            </Paper >
          </Grid>

        </Grid>
      )
    }
    return (
      <div className="App">
        <div className="App-header">
          <Grid container
            spacing={0}
            direction="row"
            alignItems="center"
            justify="center">
            <Grid item xs={4}>
              {this.props.matchId}
              {isUserTurn ? <div><Button onClick={() => this.props.undoLastMove()}>Undo last move</Button></div> : null}
              <div><Button onClick={() => this.replay()}>Replay</Button></div>
              {/* {hasWinner ? <div><Button onClick={() => this.props.replay()}>Replay</Button></div> : null} */}
              {!winnerPositions.length ? <div>{isUserTurn ? "Your turn" : "CPU turn"}</div> : null}
            </Grid>
            <Grid item xs={4}>
              <Typography variant="display2">{this.getIcon(userChar)}</Typography>
              {winnerPositions.length ? <div>{this.getMessage()}</div> : null}
            </Grid>
            <Grid item xs={4}>
            </Grid>


            <Grid container>
              {boardState.map((value, key) => {
                return (
                  <Grid item xs={4}>
                    <Paper onClick={() => this.changeValue(key)} className={classes.paper}>
                      <Typography variant="h5" component="h3" className={winnerPositions.length && !winnerPositions.includes(key) ? classes.lessOpacity : null}>
                        {this.isEmpty(key) ? null : this.getIcon(value)}
                      </Typography>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </div>
      </div >
    );
  }
}

const mapStateToProps = state => ({
  ...state.tictactoeReducer
})

const mapDispatchToProps = dispatch => ({
  makeACPUMove: (position, char) => dispatch(makeACPUMove(position, char)),
  makeAMove: (position, char) => dispatch(makeAMove(position, char)),
  undoLastMove: () => dispatch(undoLastMove()),
  replay: () => dispatch(replay()),
  changeUserChar: (userChar, isUserTurn) => dispatch(changeUserChar(userChar, isUserTurn)),
  userTurn: () => dispatch(userTurn()),
  updateWinnerPositions: (positions) => dispatch(updateWinnerPositions(positions)),
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App));
