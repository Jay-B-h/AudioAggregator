import {useEffect, useState} from "react";
import {getAllTracks} from "../SQLUtils";
import {useParams} from "react-router-dom";
import {
    Button,
    CollectionPreferences,
    Link,
    Pagination,
    Table,
    TextContent,
    TextFilter
} from "@cloudscape-design/components";
import Container from "@cloudscape-design/components/container";
import AddTrackWizard from "../components/AddTrackWizard";
import {useCollection} from "@cloudscape-design/collection-hooks";

export function getMatchesCountText(count) {
    return count === 1 ? `1 match` : `${count} matches`;
}
export function TracksTable({tracks}){
    const [preferences, setPreferences] = useState({
        pageSize: 10,
        visibleContent: columnDefinitions.map(def => def.id)
    });
    const {items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps} = useCollection(
        tracks,
        {
            filtering: {
                empty: <TextContent>No Matches</TextContent>,
                filteringFunction: (item,filteringText) => ((filteringText==='' || JSON.stringify(item).includes(filteringText)) &&((preferences.visibleContent.includes('spotifyLink') && item.SpotifyURL) || (preferences.visibleContent.includes('appleMusicLink') && item.AppleMusicURL) || (preferences.visibleContent.includes('youtubeLink') && item.YouTubeURL))),
                noMatch: (
                    <TextContent>No Matches</TextContent>
                ),
            },
            pagination: {pageSize: preferences.pageSize},
            sorting: {},
            selection: {},
        }
    );
    useEffect(() => {
        console.log(preferences.visibleContent)
    }, [preferences])

    return <Table columnDefinitions={columnDefinitions} preferences={
        <CollectionPreferences
            {...collectionPreferencesProps}
            preferences={preferences}
            onConfirm={({detail}) => setPreferences(detail)}
        />
    }
           visibleColumns={preferences.visibleContent}
           items={items}
           pagination={<Pagination {...paginationProps} ariaLabels={paginationLabels}/>}
           filter={
               <TextFilter
                   {...filterProps}
                   countText={getMatchesCountText(filteredItemsCount)}
                   filteringAriaLabel="Filter instances"
               />
           }
    />
}
export const columnDefinitions = [
    {
        id: 'track',
        header: 'Track',
        cell: item => <div>{item.TrackName}</div>,
        // sortingField: 'name' This adds the little dropdown arrow
    },
    {
        id: 'artist',
        header: 'Artist',
        cell: item => <div>{item.ArtistName}</div>,
    },
    {
        id: 'spotifyLink',
        header: 'Spotify',
        // ternary operator prevents null links from being presented to the user
        cell: item => <Link href={`${item.SpotifyURL}`} target="_blank">{item.SpotifyURL ? "Spotify Link" : ""}</Link>,
    },
    {
        id: 'youtubeLink',
        header: 'YouTube',
        cell: item => <Link href={`${item.YouTubeURL}`} target="_blank">{item.YouTubeURL ? "YouTube Link" : ""}</Link>,
    },
    {
        id: 'appleMusicLink',
        header: 'Apple Music',
        cell: item => <Link href={`${item.AppleMusicURL}`}
                            target="_blank">{item.AppleMusicURL ? "Apple Music Link" : ""}</Link>,
    },
]

export const paginationLabels = {
    nextPageLabel: 'Next page',
    pageLabel: pageNumber => `Go to page ${pageNumber}`,
    previousPageLabel: 'Previous page',
};

const visibleContentPreference = {
    title: 'Select visible content',
    options: [
        {
            label: 'Main properties',
            options: columnDefinitions.map(({id, header}) => ({
                id, label: header, editable: !['track', 'artist'].includes(id),
                movable: true
            })),
        },
    ],
};
export const collectionPreferencesProps = {
    visibleContentPreference,
    cancelLabel: 'Cancel',
    confirmLabel: 'Confirm',
    title: 'Preferences',
};
export default function TracksPage() {
    const [tracks, setTracks] = useState([])

    // TODO update commented block to make the new request
    useEffect(() => {
        getAllTracks().then((data) => {
            console.log(data)
            setTracks(data.items)
        })
    }, []);
    return (
        <Container header={<TextContent><h1>All Tracks</h1></TextContent>}>
            <TracksTable tracks={tracks}/>
        </Container>
    )
}
