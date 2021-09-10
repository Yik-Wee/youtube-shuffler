import { createMuiTheme, CssBaseline, makeStyles, ThemeProvider } from "@material-ui/core";
import { Paper, Switch, Typography } from '@material-ui/core';
import { useState } from "react";

const useStyles = makeStyles({
    root: {
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '15vh',
    },
    settingsOptions: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    }
});

type SettingsProps = {
    darkMode: boolean;
    themeSetter: Function;
}

const Settings: React.FC<SettingsProps> = ({ darkMode, themeSetter }) => {
    const classes = useStyles();

    const [cacheData, setCacheData] = useState(true);
    const theme = createMuiTheme({
        palette: {
            type: darkMode ? 'dark' : 'light',
        },
    });

    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Paper style={{ marginBottom: '2vh', padding: '1rem' }}>
                    <Typography variant="h2">Settings</Typography>
                </Paper>
                <Paper className={classes.settingsOptions}>
                    <Switch 
                        checked={darkMode} 
                        onChange={() => {
                                localStorage.setItem("appTheme", !darkMode ? "dark" : "light");
                                themeSetter(!darkMode);
                            }
                        }
                    />
                    <Typography variant="overline">
                        {darkMode ? 'Dark Theme Enabled' : 'Light Theme Enabled'}
                    </Typography>
                </Paper>
                <Paper className={classes.settingsOptions}>
                    <Switch 
                        checked={cacheData}
                        onChange={() => { setCacheData(!cacheData); }}  // ? currently does nothing
                    />
                    <Typography variant="overline">
                        Cache Data
                    </Typography>
                </Paper>
            </ThemeProvider>
        </div>
    );
}

export default Settings;