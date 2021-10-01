import { Button, makeStyles, Paper, Typography } from "@material-ui/core";
import { GitHub, NightsStayRounded, WbSunnyRounded } from "@material-ui/icons";
import { useState } from "react";

const useStyles = makeStyles({
    root: {
        paddingTop: '35vh',
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
    },
    option: {
        display: 'flex',
        alignItems: 'center',
        columnGap: '2ch',
    }
})

interface SettingsProps {
    darkMode: boolean;
    themeSetter(darkMode: boolean) : void;
}

const Settings: React.FC<SettingsProps> = ({ darkMode, themeSetter }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper style={{ padding: '1rem', overflowX: 'scroll' }}>
                <Typography variant="h2">Settings</Typography>
                <ThemeOptions className={classes.option} darkMode={darkMode} themeSetter={themeSetter} />
                <LocalStorageOptions className={classes.option} />
                <MyGithub className={classes.option} />
            </Paper>
        </div>
    )
}

interface OptProps {
    className: string | undefined;
}

interface ThemeOptProps extends OptProps {
    darkMode: boolean;
    themeSetter(darkMode: boolean): void;
}

const ThemeOptions: React.FC<ThemeOptProps> = ({ className, darkMode, themeSetter }) => {
    return (
        <div className={className}>
            <Typography variant="h6">
                Theme: {darkMode ? ' dark ' : ' light '}
            </Typography>
            <Button onClick={() => {
                localStorage.setItem("appTheme", !darkMode ? "dark" : "light");
                themeSetter(!darkMode);
            }}>
                {darkMode ? <NightsStayRounded color="primary" /> : <WbSunnyRounded color="secondary" />}
            </Button>
        </div>
    )
}

const LocalStorageOptions: React.FC<OptProps> = ({ className }) => {
    const [show, setShow] = useState(true);
    const [cleared, setCleared] = useState(false);

    return (
        <div>
            <div className={className}>
                <Typography variant="h6">localStorage:</Typography>
                <Button onClick={() => {
                    localStorage.clear();
                    setCleared(true);
                }}>Clear</Button>
                <Button onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</Button>
            </div>
            <pre style={{ overflowX: 'scroll' }}>
                { show ? (
                    cleared ? 'localStorage has been cleared' : JSON.stringify(localStorage, null, 4)
                ) : null }
            </pre>
        </div>
    )
}

const MyGithub: React.FC<OptProps> = ({ className }) => {
    return (
        <div className={className}>
            <Typography variant="h6">My github:</Typography>
            <a href="https://github.com/Yik-Wee?tab=repositories" target="blank"><GitHub /></a>
        </div>
    )
}

export default Settings;