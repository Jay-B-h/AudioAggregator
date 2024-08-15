import {Button, FormField, Input, Modal, TextContent} from "@cloudscape-design/components";
import {useState} from "react";
import {useLocalStorage} from "@uidotdev/usehooks";
import {createPlaylistEntry, searchTracks} from "../SQLUtils";
import {useNavigate} from "react-router-dom";

export default function CreatePlaylistEntryModal({open,playlistID,onDismiss}){
    const navigate = useNavigate()
    const [trackName, setTrackName] = useState('')
    const [userID,setUserID] = useLocalStorage('userID',null)
    return <Modal visible={open} onDismiss={onDismiss}>
        <TextContent>
            <h1>New Playlist Entry</h1>
        </TextContent>
        {/* <FormField label={'Name'}> */}
            {/* <Input value={trackName} onChange={({name})=>searchTracks(name.value)} /></FormField> */}
        <Button variant={"primary"} onClick={()=>{
            createPlaylistEntry(playlistID, trackName).then(res=>navigate(`/playlistentry/${res}`))
        }}>Create</Button>
    </Modal>
}
