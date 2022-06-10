import React from 'react';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    button: {
        backgroundColor: 'rgb(185 37 144) !important',
        color: '#fff !important',
        borderRadius: '0px !important',
    },
});

const ButtonIcon = ({ text }) => {
    const classes = useStyles();
    return (
        <Button
            className={classes.button}
            variant="contained"
            startIcon={<ShoppingCartIcon />}
        >
            {text}
        </Button>
    );
};

export default ButtonIcon;
