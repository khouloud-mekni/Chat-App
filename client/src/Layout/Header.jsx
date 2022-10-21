import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

import { authenticationService } from '../Services/authenticationService';
import history from '../Utilities/history';
import logo from './logo.png';
import "../Layout/Header.css"

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        background: 'linear-gradient(45deg, #edeae6 30%, #ff5833d3 40%)',
        borderRadius: 3,
    },
    title: {
        flexGrow: 1,
        display: 'flex',
    },
    userDropdown: {
        fontFamily:'cursive',
        fontWeight: 700,
        marginLeft: theme.spacing(2),
        padding: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            marginLeft: 'auto',
        },
    },
}));



const Header = () => {
    const [currentUser] = useState(authenticationService.currentUserValue);
    const [anchorEl, setAnchorEl] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleDropClose = () => {
        setDropdownOpen(false);
        setAnchorEl(null);
    };

    const handleDropOpen = event => {
        setDropdownOpen(true);
        setAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        authenticationService.logout();
        history.push('/');
    };

    const arrowIcon = () => {
        if (dropdownOpen) {
            return <ArrowDropUpIcon />;
        }
        return <ArrowDropDownIcon />;
    };

    const classes = useStyles();

    return (

        <div className={classes.root} >
            <AppBar position="static" className= {classes.root}>
                <Toolbar>
                    <Link href="/" className={classes.title}>
                        <img src={logo} alt="Logo" className='logo' />
                    </Link>
                    <div className='chatAP'>Chat App</div>
                    <Button
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={handleDropOpen}
                        className={classes.userDropdown}
                        color='inherit'
                        
                    >
                        {currentUser.name}
                        {arrowIcon()}
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleDropClose}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
