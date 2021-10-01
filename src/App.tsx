import { HashRouter, Route, Switch } from 'react-router-dom';
import NowPlayingBar from './components/NowPlayingBar';
import NavBar from './components/navbar/navbar';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { Home, PageNotFound, SearchPlaylist, Settings, VideoQueue } from './pages';
import React from 'react';

interface AppStateProps {
    darkMode: boolean;
}

class App extends React.Component<{}, AppStateProps> {
    constructor(props: any) {
        super(props);

        this.state = {
            darkMode: localStorage.getItem("appTheme")?.toLowerCase() === "dark",
        }
    }

    setDarkMode(darkMode: boolean) {
        this.setState({
            darkMode: darkMode,
        });
    }

    render() {
        const theme = createMuiTheme({
            palette: {
                type: this.state.darkMode ? 'dark' : 'light',
            },
            typography: {
                fontFamily: "Ubuntu, sans-serif",
            }
        });

        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <HashRouter>
                    <NavBar darkMode={this.state.darkMode} />
                    <NowPlayingBar />
                    <Switch>
                        <Route exact path='/' >
                            <Home darkMode={this.state.darkMode} />
                        </Route>
                        <Route exact path='/playlist/:id'>
                            <SearchPlaylist darkMode={this.state.darkMode} />
                        </Route>
                        <Route exact path='/queue'>
                            <VideoQueue darkMode={this.state.darkMode} />
                        </Route>
                        <Route exact path='/settings'>
                            <Settings darkMode={this.state.darkMode} themeSetter={this.setDarkMode.bind(this)} />
                        </Route>
                        <Route component={PageNotFound} />
                    </Switch>
                </HashRouter>
            </ThemeProvider>
        )
    }
}

export default App;