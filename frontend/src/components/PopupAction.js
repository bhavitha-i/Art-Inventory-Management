import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';
import { Button } from '@mui/material';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5),
        width: "50%"

    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))

export default function PopupAction(props) {

    const { title, children, openActionPopup, setOpenActionPopup } = props;
    console.log(props, "-- prop")
    const classes = useStyles();

    

    return (
        <Dialog open={openActionPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Button
                        color="secondary"
                        onClick={()=>{props.setOpenActionPopup(false)}}>
                        <CloseIcon />
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}