import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Icon from './icon';
import ReplayIcon from '@material-ui/icons/Replay';
import UndoIcon from '@material-ui/icons/Undo';
import Tooltip from '@material-ui/core/Tooltip';
import { undoLastMove, replay } from '../actions/tictactoe';

const styles = theme => ({
    icon: {
        fontSize: '140px',
        color: '#00bfa5',
        cursor: 'pointer',
    },
    smallerIcon: {
        fontSize: '140px',
        textAlign: 'center',
        color: '#00bfa5'
    },
    matchId: {
        color: '#00bfa5',
        fontWeight: 700,
    }
});

class Header extends Component {

    getMessage(isDraw) {
        const { winnerPositions, boardState, userChar, isUserTurn } = this.props;

        if (isDraw) {
            return 'Draw!'
        };

        if (winnerPositions.length) {
            return boardState[winnerPositions[0]] === userChar ? "You won! Congratulations." : "You lost but don't worry!";
        }

        return isUserTurn ? "Your turn" : "CPU turn";
    }

    render() {
        const { classes, userChar, matchId, isDraw } = this.props;
        console.log('a');
        return (
            <Grid container
                spacing={0}
                direction="row"
                alignItems="center"
                justify="center">
                <Grid item xs={4}>
                    <Tooltip title="Undo last move" placement="top">
                        <UndoIcon onClick={() => this.props.undoLastMove()} className={classes.icon} />
                    </Tooltip>
                    <Tooltip title="Replay" placement="top">
                        <ReplayIcon onClick={() => this.props.replay()} className={classes.icon} />
                    </Tooltip>
                </Grid>
                <Grid item xs={4}>
                    <Icon char={userChar} />
                    {<div>{this.getMessage(isDraw)}</div>}
                </Grid>
                <Grid item xs={4}>
                    <div>Match ID:</div>
                    <span className={classes.matchId}>{matchId}</span>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    ...state.tictactoeReducer
})

const mapDispatchToProps = dispatch => ({
    undoLastMove: () => dispatch(undoLastMove()),
    replay: () => dispatch(replay()),
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Header));