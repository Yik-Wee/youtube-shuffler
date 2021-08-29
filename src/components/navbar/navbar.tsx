import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles, MenuItem, Paper } from '@material-ui/core';
import { SettingsRounded, LibraryMusicOutlined, FolderOpenOutlined } from '@material-ui/icons';
import Search from './search';

const useStyles = makeStyles({
    root: {
        // backgroundColor: (options.isDarkMode ? '#181818' : '#fff'),
        color: 'white',
        height: '15vh',
        width: '100vw',
        position: 'fixed',
        zIndex: 2,
    },
    nav: {
        padding: 0,
        // margin: 0,
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
    // const appTheme = localStorage.getItem("appTheme");
    const bgColor = darkMode ? "#181818" : "#8899A6";

    return (
        <Paper className={classes.root} square={true} style={{ backgroundColor: bgColor }}>
            <div className={classes.nav}>
                <Search history={useHistory()}/>
                <div className={classes.items}>
                    <MenuItem className={classes.item} component={Link} to="/playlist">
                        <LibraryMusicOutlined />
                    </MenuItem>
                    <MenuItem className={classes.item} component={Link} to="/mix">
                        <FolderOpenOutlined />
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