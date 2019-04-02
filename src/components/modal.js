import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ClearIcon from '@material-ui/icons/Clear';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
    icon: {
        fontSize: '160px',
        textAlign: 'center',
        color: '#00bfa5'
    },
    iconContainer: {
        display: 'inline-block',
        cursor: 'pointer'
    },
    dialogTitle: {
        textAlign: 'center',
    }
});

class Modal extends Component {
    render() {
        const { open, classes } = this.props;
        return (
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle className={classes.dialogTitle} id="alert-dialog-title">{"Select your char"}</DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <div onClick={() => this.props.changeUserChar('x')} className={classes.iconContainer}><ClearIcon className={classes.icon} /></div>
                            <div onClick={() => this.props.changeUserChar('o')} className={classes.iconContainer}><RadioButtonUncheckedIcon className={classes.icon} /></div>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        )
    }
}

export default withStyles(styles)(Modal);
