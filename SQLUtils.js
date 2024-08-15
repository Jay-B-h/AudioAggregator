import axios from "axios";

const client = axios.create({
    baseURL: 'http://localhost:8080', headers: {
        'Content-Type': 'application/json'
    }
})

const hashPassword = (password) => {
    const prime = 19;
    let newPassword = ''
    for(let i=0;i<password.length;i++){
        newPassword += (password[i]^Math.pow(prime,i))
    }
    return newPassword;
}

export const searchTracks = (trackName, artistName) => {
    return client.get(`/track`, {trackName, artistName}).then((data) => data).catch((error) => console.log(error));
}

export const addUser = (username, email, password) => {
    return client.post(`/register`, {
            username, email, password
        }
    ).then((response) => ({
        userID:response.data.userID,
        collectionID:response.data.collectionID
    })).catch((err) => console.log(err))
}

export const loginUser = (username, password) => {
    console.log('logging in')
    return client.post(`/login`, {username, password}).then((response)=>{
        console.log(response.data)
        return response.data;
    }).catch((err) => console.log(err))
}
export const getCollection = (collectionID) => {
    return client.get(`/collection/${collectionID}`).then(({data}) => data).catch((err) => console.log(err))
}

export const getPlaylist = (playlistID) => {
    return client.get(`/playlist/${playlistID}`).then(({data}) => data).catch((err) => console.log(err))
}

export const createPlaylist = (userID,name,collectionID) =>{
    return client.post(`/playlists`,{userID,name,collectionID}).then(({data})=>data)
}

export const getAllTracks = () => {
    return client.get('/tracks').then((response) => {
        return response.data;
    })
}

export const getAllCollections = () => {
    return client.get('/exploreCollections').then((response) => {
        return response.data;
    })
}

export const createPlaylistEntry = (playlistID, trackID) => {
    return client.post(`/playlistentry`, {playlistID, trackID}).then((data) => data).catch((error) => console.log(error));
}

export const getTrack = (trackName, artistName) => {
    const params = new URLSearchParams();
    params.append('trackName', trackName);
    params.append('artistName', artistName);
    return client.get(`/track?${params}`).then((response) => response.data).catch((error) => console.log(error));
}

//needs updated/fixed(maybe)
//figure out whats going on with the endpoint stuff
export const updateTrack = (PlaylistID, TrackID, SpotifyURL, YouTubeURL, AppleMusicURL) => {
    return client.post(`/track`, {PlaylistID, TrackID, SpotifyURL, YouTubeURL, AppleMusicURL}).then((data) => data).catch((error) => console.log(error));
}

export const getPlaylistUser = (playlistID) => {
    return client.get(`/playlistuser/${playlistID}` ).then(({data}) => data.userID).catch((err) => console.log(err));
}

export const getCollectionUser = (collectionID) => {
    return client.get(`/collectionuser/${collectionID}` ).then(({data}) => data.userID).catch((err) => console.log(err));
}

export const deletePlaylist = (PlaylistID) => {
    return client.delete(`/deletePlaylist?PlaylistID=${PlaylistID}`).then((data) => data).catch((error) => console.log(error));
}

export const getUserCollectionID = (UserID) => {
    return client.get(`/getUserCollectionID`, {UserID}).then(({data}) => data.CollectionID).catch((error) => console.log(error));
}
