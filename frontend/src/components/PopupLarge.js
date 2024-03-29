import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';
import { Button } from '@mui/material';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5),
        maxWidth: "80%",
        width: "80%"
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))

export default function PopupLarge(props) {

    const { title, children, openPopup, setOpenPopup } = props;
    console.log(props, "-- prop")
    const classes = useStyles();

    

    return (
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Button
                        color="secondary"
                        onClick={()=>{props.setOpenPopup(false)}}>
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