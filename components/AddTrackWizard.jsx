import * as React from "react";
import Wizard from "@cloudscape-design/components/wizard";
import RadioGroup from "@cloudscape-design/components/radio-group";
import SpaceBetween from "@cloudscape-design/components/space-between";
import {useState} from "react";
import Container from "@cloudscape-design/components/container";
import {FormField, Input, Modal} from "@cloudscape-design/components";
import {updateTrack, getTrack} from "../SQLUtils";

export default function AddTrackWizard({open,setOpen,playlistID}) {
    const [
        activeStepIndex,
        setActiveStepIndex
    ] = React.useState(0);

    //figure out how to store and set parameters
    const [trackName, setTrackName] = useState('')
    const [artistName, setArtistName] = useState('')
    const [SpotifyURL, setSpotifyURL] = useState(null)
    const [YouTubeURL, setYouTubeURL] = useState(null)
    const [AppleMusicURL, setAppleMusicURL] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    const [tempData,setTempData] = useState(null)
    const handleTrackInput = (event) => {
      setTrackName(event.detail.value);
    }

    const handleArtistInput = (event) => {
      setArtistName(event.detail.value);
    }

    const handleSpotifyURLInput = (event) => {
        setSpotifyURL(event.detail.value);
    }

    const handleYouTubeURLInput = (event) => {
        setYouTubeURL(event.detail.value);
    }

    const handleAppleMusicURLInput = (event) => {
        setAppleMusicURL(event.detail.value);
    }

    return (
        <Modal  visible={open} onDismiss={()=>setOpen(false)}>
            <Wizard
                i18nStrings={{
                    stepNumberLabel: stepNumber =>
                        `Step ${stepNumber}`,
                    collapsedStepsLabel: (stepNumber, stepsCount) =>
                        `Step ${stepNumber} of ${stepsCount}`,
                    skipToButtonLabel: (step, stepNumber) =>
                        `Skip to ${step.title}`,
                    navigationAriaLabel: "Steps",
                    cancelButton: "Cancel",
                    previousButton: "Previous",
                    nextButton: "Next",
                    submitButton: "Finish",
                    optional: "optional"
                }}
                onNavigate = {async({ detail }) => {
                    //check the database with the name and artist
                    //if it exists, populate the fields on the next step with the link and link type
                    //if doesnt exist leave the fields blank and let them populate it
                    //set a flag or something to tell if the song was found or not
                        //if you get to here, data for the song was found
                        //search the database for the link type and link and populate the stuff for step 2t
                    setIsLoading(true);
                    let tempData = await getTrack(trackName, artistName)
                    setTempData(tempData);
                    console.log(tempData);

                    if((tempData.SpotifyURL != null)) {
                        setSpotifyURL(tempData.SpotifyURL);
                    }
                    else {
                        setSpotifyURL(null);
                    }

                    if((tempData.YouTubeURL !== null)) {
                        setYouTubeURL(tempData.YouTubeURL);
                    }
                    else {
                        setYouTubeURL(null);
                    }

                    if((tempData.AppleMusicURL !== null)) {
                        setAppleMusicURL(tempData.AppleMusicURL);
                    }
                    else {
                        setAppleMusicURL(null);
                    }
                    setIsLoading(false);
                    setActiveStepIndex(detail.requestedStepIndex)
                  }
                }
                //help
                onSubmit = {async({ detail }) => {
                    setIsLoading(true);
                    await updateTrack(playlistID, tempData.TrackID, SpotifyURL, YouTubeURL, AppleMusicURL);
                    setTempData(null);
                    setTrackName(null);
                    setArtistName(null);
                    setSpotifyURL(null);
                    setYouTubeURL(null);
                    setAppleMusicURL(null);
                    setIsLoading(false);
                    setOpen(false);
                    setActiveStepIndex(0);

                }
              }
                isLoadingNextStep={isLoading}
                activeStepIndex={activeStepIndex}
                steps={[
                    {
                        title: "Add Track",
                        content: (
                            <Container>
                                <SpaceBetween direction="vertical" size="l">
                                    <FormField label="Title">
                                        <Input value={trackName} onChange={handleTrackInput}/>
                                    </FormField>
                                    <FormField label="Artist">
                                        <Input value={artistName} onChange={handleArtistInput}/>
                                    </FormField>
                                </SpaceBetween>
                            </Container>
                        )
                    },
                    {
                        title: "Add Track",
                        content: (
                            <Container>
                                <SpaceBetween direction="vertical" size="l">
                                    <FormField label="Title">
                                        <Input value={trackName} onChange={handleTrackInput} disabled/>
                                    </FormField>
                                    <FormField label="Artist">
                                        <Input value={artistName} onChange={handleArtistInput} disabled/>
                                    </FormField>
                                    <FormField label="Spotify URL">
                                        <Input value={SpotifyURL} onChange={handleSpotifyURLInput}/>
                                    </FormField>
                                    <FormField label="YouTube URL">
                                        <Input value={YouTubeURL} onChange={handleYouTubeURLInput}/>
                                    </FormField>
                                    <FormField label="Apple Music URL">
                                        <Input value={AppleMusicURL} onChange={handleAppleMusicURLInput}/>
                                    </FormField>
                                </SpaceBetween>
                            </Container>
                        ),
                        isOptional: false
                    }
                ]}
              />
            </Modal>
    );

}
