import {Button, Modal, TextContent} from "@cloudscape-design/components";
import { deletePlaylist } from "../SQLUtils";
import {useNavigate} from "react-router-dom";

export default function DeletePlaylistModal({open, setOpen, PlaylistID, CollectionID}){
    const navigate = useNavigate();
    return <Modal visible={open} onDismiss={()=>setOpen(false)}>
        <TextContent>
            <h1>Are you sure you want to delete this playlist?</h1>
        </TextContent>
        <Button variant={"primary"} onClick={()=>{
            setOpen(false);
        }}>No</Button>
        <Button variant={"primary"} onClick={()=>{
            deletePlaylist(PlaylistID).then(res=>navigate(`/collection/${CollectionID}`));
            setOpen(false);
        }}>Yes</Button>
    </Modal>
}