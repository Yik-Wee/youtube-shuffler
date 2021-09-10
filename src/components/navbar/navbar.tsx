import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createMuiTheme, CssBaseline, makeStyles, MenuItem, Paper, Switch, ThemeProvider, Button } from '@material-ui/core';
import { SettingsRounded, LibraryMusicOutlined, QueueMusicRounded, NightsStayRounded, WbSunnyRounded } from '@material-ui/icons';
import SearchPlaylist from './search';

const useStyles = makeStyles({
    root: {
        color: 'white',
        height: '10vh',
        width: '100vw',
        position: 'fixed',
        zIndex: 2
    },
    nav: {
        padding: 0,
        marginLeft: '5%',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    items: {
        marginRight: '5%',
        width: '50%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        width: '15vw',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

interface NavBarProps {
    darkMode: boolean;
    themeSetter: Function;
}

const NavBar: React.FC<NavBarProps> = ({ darkMode, themeSetter }) => {
    const classes = useStyles();
    const bgColor = darkMode ? "#181818" : "#8899A6";

    return (
        <Paper className={classes.root} square={true} style={{ backgroundColor: bgColor }}>
            <div className={classes.nav}>
                <SearchPlaylist history={useHistory()} />
                <div className={classes.items}>
                    <MenuItem className={classes.item} component={Link} to="/saved-playlists">
                        <LibraryMusicOutlined />
                    </MenuItem>
                    <MenuItem className={classes.item} component={Link} to="/queue">
                        <QueueMusicRounded />
                    </MenuItem>
                    <MenuItem className={classes.item} onClick={() => {
                        localStorage.setItem("appTheme", !darkMode ? "dark" : "light");
                        themeSetter(!darkMode);
                    }}>
                        <Button>
                            {darkMode ? <NightsStayRounded color="primary" /> : <WbSunnyRounded color="secondary" />}
                        </Button>
                    </MenuItem>
                </div>
            </div>
        </Paper>
    )
}

export default NavBar;