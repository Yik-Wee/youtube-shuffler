import React from "react";
import { AppBar, Button, IconButton, Toolbar, TextField } from "@material-ui/core";
import { player } from '../playlist-handler/PlayerAPI';

interface TextFieldInterface extends HTMLElement {
  value?: string;
}

class SearchBar extends React.Component {

  onEnterKeyDown(e: any) {
    if (e.key === 'Enter') {
      const playlistId = e.target.value;
      console.log(playlistId);
      // // player.loadVideoById(playlistId);
    }
  }

  handleClick() {
    let textFieldComponent: TextFieldInterface | null = document.getElementById('search-playlist-id');
    const playlistId = textFieldComponent?.value;
    console.log(playlistId);
  }

  render() {
    return (
      <AppBar>
        <Toolbar>
          <IconButton color='inherit' aria-label='menu'></IconButton>
          <TextField
            id='search-playlist-id'
            variant='filled'
            color='secondary'
            onKeyPress={(e: any) => this.onEnterKeyDown(e)}
            placeholder='Enter Playlist ID'
          ></TextField>
          <Button
            color='inherit'
            variant='outlined'
            onClick={() => this.handleClick()}
          >
            Search
          </Button>
        </Toolbar>
      </AppBar>
    )
  }
}

export default SearchBar;