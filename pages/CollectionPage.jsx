import {useEffect, useState} from "react";
import {getCollection, getCollectionUser} from "../SQLUtils";
import {useParams} from "react-router-dom";
import {Button, FormField, Input, Link, Modal, Table, TextContent} from "@cloudscape-design/components";
import Container from "@cloudscape-design/components/container";
import CreatePlaylistModal from "../components/CreatePlaylistModal";
import {useLocalStorage} from "@uidotdev/usehooks";

export default function CollectionPage(){
    let {collectionID} = useParams();
    const [name, setName] = useState('')
    const [items, setItems] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [userID,] = useLocalStorage('userID','');

    useEffect(() => {
        getCollection(collectionID).then((data)=>{
            setName(data.name)
            setItems(data.items)
        });
        getCollectionUser(collectionID).then((data) => {
            console.log(userID);
            console.log(data);
            if (userID !== data ) {
                setButtonDisabled(true);
            }
        });
    }, []);
    return(
        <Container header={<TextContent><h1>{name}</h1></TextContent>}>
            <Table items={items} columnDefinitions={[{
                id: 'name',
                header: 'name',
                cell: item => <Link href={`/playlist/${item.PlaylistID}`}>{item.PlaylistName}</Link>,
                sortingField: 'name'
            }]}/>
            <Button variant={"primary"} disabled={buttonDisabled} onClick={()=>{
                setShowModal(true)
            }}>New Playlist</Button>
            <CreatePlaylistModal open={showModal} setOpen={setShowModal} collectionID={collectionID}/>
        </Container>
    )
}
