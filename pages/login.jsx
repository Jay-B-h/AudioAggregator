import * as React from "react";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import {Button, Form, FormField, Input, Link, SpaceBetween, TextContent} from "@cloudscape-design/components";
import {useState} from "react";
import {loginUser} from "../SQLUtils";
import {useLocalStorage} from "@uidotdev/usehooks";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const navigate = useNavigate()
    const [userID, setUserID] = useLocalStorage('userID', '')
    const [collectionID, setCollectionID] = useLocalStorage('collectionID', '')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorText, setErrorText] = useState('')
    const handleSubmit = () => {
        loginUser(username, password).then(({userID,collectionID}) => {
            console.log(userID,collectionID)
            setUserID(userID)
            setCollectionID(collectionID)
            navigate(`/collection/${collectionID}`)
        }).catch(()=>{
            setErrorText('invalid password')
        })
    }
    return (
        <Container>
            <Form
                actions={
                    <SpaceBetween direction="horizontal" size="xs">
                        <Button formAction="none" variant="link">
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => handleSubmit()}>Submit</Button>
                    </SpaceBetween>
                }
            >
                <SpaceBetween direction="vertical" size="l">
                    <FormField label="username">
                        <Input value={username} onChange={({detail}) => setUsername(detail.value)}/>
                    </FormField>
                    <FormField errorText={errorText} label="password">
                        <Input value={password} onChange={({detail}) => setPassword(detail.value)} type={"password"}/>
                    </FormField>
                    <TextContent>Don't have an account? <Link href={'/signup'}>Sign up</Link></TextContent>
                </SpaceBetween>
            </Form>
        </Container>
    )
}
