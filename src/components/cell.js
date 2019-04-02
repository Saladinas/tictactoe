import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { makeAMove } from '../actions/tictactoe';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { isEmpty } from '../helpers'
import Icon from './icon'

const styles = theme => ({
    paper: {
        cursor: 'pointer',
        margin: 20,
        height: 140,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    lessOpacity: {
        opacity: 0.2,
    },
    smallerIcon: {
        fontSize: '140px',
        textAlign: 'center',
        color: '#00bfa5'
    },
});

class Cell extends Component {

    getIcon(char) {
        const { smallerIcon } = this.props.classes;

        if (char === null) {
            return null;
        }

        return char === 'x' ? <ClearIcon className={smallerIcon} /> : <RadioButtonUncheckedIcon className={smallerIcon} />
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.value !== this.props.value || nextProps.lessOpacity !== this.props.lessOpacity) {
            return true;
        }
        return false;
    }

    changeValue = (position) => {
        const { userChar, isUserTurn, winnerPositions, boardState } = this.props;
        
        if (isUserTurn && !winnerPositions.length && isEmpty(boardState[position])) {
            this.props.makeAMove(position, userChar);
        }
    }

    render() {
        const { classes, value, index, lessOpacity } = this.props;

        return (
            <Grid item xs={4}>
                <Paper onClick={() => this.changeValue(index)} className={classes.paper}>
                    <Typography variant="h5" component="h3" className={lessOpacity ? classes.lessOpacity : null}>
                        {isEmpty(value) ? null : <Icon char={value} />}
                    </Typography>
                </Paper>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    ...state.tictactoeReducer
})

const mapDispatchToProps = dispatch => ({
    makeAMove: (position, char) => dispatch(makeAMove(position, char)),
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Cell));