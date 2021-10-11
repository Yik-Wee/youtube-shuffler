# YouTube shuffler
### YouTube's shuffle feature on playlists breaks for large playlists, so I decided to make my own
### demo here: https://Yik-Wee.github.io/youtube-shuffler

## How to use
1. Make sure your YouTube Playlist is public or unlisted, otherwise it won't appear
2. Input YouTube Playlist ID or URL into the search bar and click search or enter
3. Click on the Playlist, shuffle and play it

## Running it locally
1. Install TypeScript (and node) if you haven't already
2. Change directory into whichever directory you will clone the repo to
    ```sh
    mkdir youtube-shuffler
    cd ./youtube-shuffler
    ```
3. Clone the repo
    ```sh
    git clone https://github.com/Yik-Wee/youtube-shuffler.git .
    ```
4. Run `npm install` to install all required packages from `package.json`
    ```sh
    npm install
    ```
5. Add a `.env` file in the root folder and set `REACT_ENV_API_KEY` to your [YouTube API key](https://developers.google.com/youtube/v3/getting-started)
   - `.env`:
        ```.env
        REACT_APP_API_KEY=<API_KEY>
        ```
6. run `npm start` to start the server
    ```sh
    npm start
    ```
### And you're done. Now you can shuffle & spaghettify your playlists locally, just like what i've done to my code :moyai:
