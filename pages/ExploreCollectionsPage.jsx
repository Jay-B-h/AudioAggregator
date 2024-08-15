import {useEffect, useState} from "react";
import {getAllCollections} from "../SQLUtils";
import {useParams} from "react-router-dom";
import {Button, FormField, Input, Link, Modal, Table, TextContent} from "@cloudscape-design/components";
import Container from "@cloudscape-design/components/container";

export default function ExploreCollectionsPage(){
    let {collectionID} = useParams();
    const [items, setItems] = useState([])
    const [showModal, setShowModal] = useState(false)
    // TODO update commented block to make the new request 
    useEffect(() => {
        getAllCollections().then((data)=>{
            console.log(data)
            setItems(data.items)
        })
    }, []);
    return(
        <Container header={<TextContent><h1>Explore Collections</h1></TextContent>}>
            <Table items={items} columnDefinitions={
                [
                    {
                        id: 'track',
                        header: 'Collection Name',
                        cell: item => <Link href={`collection/${item.CollectionID}`}>{item.Name}</Link>,
                    },
                ]
            }/>
        </Container>
    )
}