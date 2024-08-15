import {useEffect, useState} from "react";
import {getPlaylist, getPlaylistUser, getUserCollectionID} from "../SQLUtils";
import {useParams} from "react-router-dom";
import {Button, Table, TextContent} from "@cloudscape-design/components";
import Container from "@cloudscape-design/components/container";
import {useLocalStorage} from "@uidotdev/usehooks";
import AddTrackWizard from "../components/AddTrackWizard";
import DeletePlaylistModal from "../components/DeletePlaylistModal";
import {columnDefinitions, TracksTable} from "./TracksPage";

export default function PlaylistPage(){
    const {playlistID} = useParams();
    const [name, setName] = useState('');
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [userID,] = useLocalStorage('userID','');
    const [collectionID,] = useLocalStorage('collectionID','');

    useEffect(() => {
        console.log(playlistID)
        getPlaylist(playlistID).then((data) => {
            console.log(data);
            if(data) {
                setName(data.name);
                setItems(data.items);
            }
        });
        getPlaylistUser(playlistID).then((data) => {
            console.log(userID);
            console.log(data);
            if (userID !== data ) {
                setButtonDisabled(true);
            }
        });
    }, [playlistID]);
    useEffect(()=>{
        if (!showModal){
            getPlaylist(playlistID).then((data) => {
                console.log(data);
                if (data) {
                    setName(data.name);
                    setItems(data.items);
                }
            });
        }
    },[showModal])

    return(
        <Container header={<TextContent><h1>{name}</h1></TextContent>}>
            <TracksTable tracks={items}/>
            <Button variant={"primary"} disabled={buttonDisabled} onClick={()=>{
                setShowModal(true)
            }}>Add Track</Button>
            <AddTrackWizard open={showModal} setOpen={setShowModal} playlistID={playlistID} />
            <Button variant={"primary"} disabled={buttonDisabled} onClick={()=>{
                setShowDeleteModal(true);
            }}>Delete Playlist</Button>
            <DeletePlaylistModal open={showDeleteModal} setOpen={setShowDeleteModal} PlaylistID={playlistID} CollectionID={collectionID}/>
        </Container>
    )
}
