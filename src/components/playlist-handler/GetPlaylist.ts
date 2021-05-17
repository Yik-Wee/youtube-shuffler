var retData: object;
const apiKey = process.env.REACT_APP_API_KEY;

interface Playlist {
  nextPageToken?: string;
  items?: any;
  snippet?: any;
  resourceId?: any[];
  videoId?: string;
  thumbnails?: string[];
}

// HTTP request to get playlist items, converts to object and returns it
async function getPage(url: string, pageToken: string | undefined) {
  if (pageToken) url += `&pageToken=${pageToken}`;

  await fetch(url, { method: 'GET' })
    .then(res => {
      return res.json();
    })
    .then(data => {
      retData = data;
    })
    .catch(err => console.log(err));

  return retData;
}

async function getPlaylist(playlistId: string) {

  let [ids, titles, channels, thumbnails]: string[][] = [[], [], [], []];
  let playlistData: Playlist;
  let nextPageToken: string | undefined = '';
  const url: string = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5000&playlistId=${playlistId}&key=${apiKey}`;

  do {
    playlistData = await getPage(url, nextPageToken); // get playlist data
    
    nextPageToken = playlistData.nextPageToken;
    
    let playlistItems = playlistData['items'];
    console.log(playlistData);

    playlistItems.map((item: Playlist) => {
      // adding main data to arrays
      const snippet = item.snippet;
      const id = snippet.resourceId.videoId;
      const thumbnail = snippet.thumbnails.medium;

      ids.push(id);
      titles.push(snippet['title']);
      channels.push(snippet['videoOwnerChannelTitle']);
      thumbnail ? thumbnails.push(thumbnail['url']) : null;

      return undefined
    });
  } while (nextPageToken !== undefined) // stop when last page
  
  return [ids, titles, channels, thumbnails];
}

export default getPlaylist;