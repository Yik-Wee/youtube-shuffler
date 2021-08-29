import { HashRouter, Route, Switch } from 'react-router-dom';
import NowPlayingBar from './components/foot/NowPlayingBar';
import NavBar from './components/navbar/navbar'
import Home from './pages/Home';
import Playlist from './pages/Playlist'
import Settings from './pages/Settings';
import PageNotFound from './pages/PageNotFound';
import Mix from './pages/Mix';
import Search from './pages/Search/Search';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, CssBaseline, Theme } from '@material-ui/core';
import { useState } from 'react';
import { player } from './components/helpers/PlayerAPI';
import PlaylistObj from './components/helpers/Playlist';

function App() {
    console.log(player);
    
    // TODO
    // const defaultPlaylist = new PlaylistObj([{
    //     id: '', title: '', channel: '', thumbnail: ''
    // }]);
    // const [playlist, setPlaylist] = useState(defaultPlaylist);

    const curTheme = localStorage.getItem("appTheme");
    const [darkMode, setDarkMode] = useState(curTheme === "dark");

    const theme: Theme = createMuiTheme({
        palette: {
            type: darkMode ? 'dark' : 'light'
        },
    })

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <HashRouter>
            <NavBar  darkMode={darkMode} />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/playlist' component={Playlist} />
                    <Route exact path='/mix' component={Mix} />
                    <Route exact path='/settings' component={() => <Settings darkMode={darkMode} themeSetter={setDarkMode} />} />
                    <Route exact path='/search' component={() => <Search darkMode={darkMode} />} />
                    <Route component={PageNotFound} />
                </Switch>
            </HashRouter>
            <NowPlayingBar darkMode={darkMode} />
        </ThemeProvider>
    );
}

export default App;
