import {Button, FormField, Input, Modal, TextContent} from "@cloudscape-design/components";
import {useState} from "react";
import {useLocalStorage} from "@uidotdev/usehooks";
import {createPlaylist} from "../SQLUtils";
import {useNavigate} from "react-router-dom";

export default function CreatePlaylistModal({open,setOpen,collectionID}){
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [userID,setUserID] = useLocalStorage('userID',null)
    return <Modal visible={open} onDismiss={()=>setOpen(false)}>
        <TextContent>
            <h1>New Playlist</h1>
        </TextContent>
        <FormField label={'Name'}>
            <Input value={name} onChange={({detail})=>setName(detail.value)} /></FormField>
        <Button variant={"primary"} onClick={()=>{
            createPlaylist(userID, name,collectionID).then(res=>navigate(`/playlist/${res}`))
        }}>Create</Button>
    </Modal>
}
