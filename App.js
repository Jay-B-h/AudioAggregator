import logo from './logo.svg';
import './App.css';
import {Navigate, Routes} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
import CollectionPage from "./pages/CollectionPage";
import TracksPage from "./pages/TracksPage";
import Login from "./pages/login";
import {useEffect} from "react";
import {AppLayout, SideNavigation} from "@cloudscape-design/components";
import Signup from "./pages/signup";
import PlaylistPage from "./pages/PlaylistPage";
import ExploreCollectionsPage from "./pages/ExploreCollectionsPage";
import {useLocalStorage} from "@uidotdev/usehooks";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
const queryClient = new QueryClient()
function App(){
    const [userID, setUserID] = useLocalStorage('userID', '')
    const [collectionID, setCollectionID] = useLocalStorage('collectionID', '')
    useEffect(() => {
        document.getElementsByTagName('body')[0].setAttribute('class','awsui-visual-refresh awsui-dark-mode')
    }, []);
  return (<QueryClientProvider client={queryClient}><AppLayout navigation={<SideNavigation

      items={[{
          text:'Your Collection',
          type:'link',
          href:`/collection/${collectionID}`
      },{
          text:'All Tracks',
          type:'link',
          href:`/tracks`
      },{
            text:'Explore Collections',
            type:'link',
            href:'/exploreCollections'       
      }]}
      />} toolsHide content={
          <BrowserRouter>
              <Routes>
                  <Route path={"/login"} element={<Login />} />
                  <Route path={"/signup"} element={<Signup />} />
                  <Route path={"/tracks"} element={<TracksPage />} />
                  <Route path={"/collection/:collectionID"}  element={<CollectionPage/>} />
                  <Route path={"/exploreCollections"}  element={<ExploreCollectionsPage/>} />
                  <Route path={"/playlist/:playlistID"}  element={<PlaylistPage/>} />
                  <Route path={"/*"} element={<Navigate replace to={'/login'} />} />
              </Routes>
          </BrowserRouter>
      }>
  </AppLayout></QueryClientProvider>
  );
}

export default App;
