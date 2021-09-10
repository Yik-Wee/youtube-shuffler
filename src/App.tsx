import { HashRouter, Route, Switch } from 'react-router-dom';
import NowPlayingBar from './components/foot/NowPlayingBar';
import NavBar from './components/navbar/navbar'
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import SearchPlaylist from './pages/SearchPlaylist/SearchPlaylist';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, CssBaseline, Theme } from '@material-ui/core';
import Playlist, { setCurPlaylist } from './components/helpers/Playlist';
import VideoQueue from './pages/VideoQueue';
import React from 'react';
// import PlaylistCard from './pages/SearchPlaylist/PlaylistCard';

class App extends React.Component<{}, { darkMode: boolean, shouldUpdate: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = {
            darkMode: true,
            shouldUpdate: true
        }
    }

    setDarkMode(darkMode: boolean) {
        this.setState({
            darkMode: darkMode,
            shouldUpdate: true
        });
    }

    render() {
        const theme: Theme = createMuiTheme({
            palette: {
                type: this.state.darkMode ? 'dark' : 'light'
            },
        })

        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <HashRouter>
                    <NavBar darkMode={this.state.darkMode} themeSetter={this.setDarkMode.bind(this)} />
                    <NowPlayingBar />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/playlist'
                            component={() =>
                                <SearchPlaylist
                                    darkMode={this.state.darkMode}
                                    setCurPlaylist={(p: Playlist) => setCurPlaylist(p)}
                                />
                                // <PlaylistCard />
                            }
                        />
                        <Route exact path='/queue' component={() => <VideoQueue />} />
                        <Route component={PageNotFound} />
                    </Switch>
                </HashRouter>
            </ThemeProvider>
        )
    }
}

export default App;
