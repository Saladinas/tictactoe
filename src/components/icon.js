import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

const styles = theme => ({
    smallerIcon: {
        fontSize: '140px',
        textAlign: 'center',
        color: '#00bfa5'
    },
});

class Icon extends Component {

    shouldComponentUpdate(nextProps) {
        if (nextProps.char !== this.props.char) {
            return true;
        }
        return false;
    }

    render() {
        const { char, classes } = this.props;

        if (char === null) {
            return null;
        }

        return char === 'x' ? <ClearIcon className={classes.smallerIcon} /> : <RadioButtonUncheckedIcon className={classes.smallerIcon} />
    }
}

export default withStyles(styles)(Icon);
