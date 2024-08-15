import {Button, Form, FormField, Input, Link, SpaceBetween, TextContent} from "@cloudscape-design/components";
import Container from "@cloudscape-design/components/container";
import * as React from "react";
import {useState} from "react";
import {useLocalStorage} from "@uidotdev/usehooks";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {addUser} from "../SQLUtils";

export default function Signup() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [userID,setUserID] = useLocalStorage('userID','')
    const [collectionID, setCollectionID] = useLocalStorage('collectionID', '')
    const [userError,setUserError] = useState('')
    const handleSubmit = () => {
        if (password !== confirmPassword) {
            setError("Passwords don't match")
            return
        } else {
            setError('')
        }
        addUser(username,email,password).then(({userID,collectionID})=>{
            setUserID(userID)
            setCollectionID(collectionID)
            console.log(`collection/${collectionID}`)
            navigate(`/collection/${collectionID}`)
        }).catch((error)=>
            setUserError('A user with this username or email already exists')
        )
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
                    <FormField errorText={userError} label="username">
                        <Input value={username} onChange={({detail}) => setUsername(detail.value)}/>
                    </FormField>
                    <FormField errorText={userError} label="email">
                        <Input value={email} onChange={({detail}) => setEmail(detail.value)}/>
                    </FormField>
                    <FormField label="password">
                        <Input value={password} onChange={({detail}) => setPassword(detail.value)} type={"password"}/>
                    </FormField>
                    <FormField label="confirm password" errorText={error}>
                        <Input value={confirmPassword} onChange={({detail}) => setConfirmPassword(detail.value)}
                               type={"password"}/>
                    </FormField>
                    <TextContent>Already have an account? <Link href={'/username'}>Login</Link></TextContent>
                </SpaceBetween>
            </Form>
        </Container>
    );
}
