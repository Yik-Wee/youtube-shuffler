import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles, MenuItem, Paper } from '@material-ui/core';
import { HomeRounded, QueueMusicRounded, SettingsRounded } from '@material-ui/icons';
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
}

const NavBar: React.FC<NavBarProps> = ({ darkMode }) => {
    const classes = useStyles();
    const bgColor = darkMode ? "#181818" : "#8899A6";

    return (
        <Paper className={classes.root} square={true} style={{ backgroundColor: bgColor }}>
            <div className={classes.nav}>
                <SearchPlaylist history={useHistory()} />
                <div className={classes.items}>
                    <MenuItem className={classes.item} component={Link} to="/">
                        <HomeRounded />
                    </MenuItem>
                    <MenuItem className={classes.item} component={Link} to="/queue">
                        <QueueMusicRounded />
                    </MenuItem>
                    <MenuItem className={classes.item} component={Link} to="/settings">
                        <SettingsRounded />
                    </MenuItem>
                </div>
            </div>
        </Paper>
    )
}

export default NavBar;