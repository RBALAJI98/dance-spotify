import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
import { Button } from 'reactstrap';



const spotifyApi = new SpotifyWebApi();


class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if(token){
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      searched: false,
      topTracks : []
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  


  render() {
    return (

      


      <div className="App">

      
        {!this.state.loggedIn &&
        <div style={centered}>
       
          <Button  href="http://localhost:8888/login" color="success" onClickcolor="success" size="lg">Login with Spotify</Button>
        
        </div>
        }

      
          
       
      
        {this.state.searched &&
        <div>
                    my tracks: {this.state.topTracks}
        </div>
        }
        

      <div style={centered}>
      { this.state.loggedIn &&
        <Button onClick={() => {this.getTopTracks(); this.setState({searched: true})}}>
          Check Now Playing
        </Button>
      }
      </div>
      
      </div>
    );
  }

  

  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: { 
              name: response.item.name, 
              albumArt: response.item.album.images[0].url
            }
        });
      })
  }

  getTopTracks(){
    var tempTracks = [];
    spotifyApi.getMyTopTracks()
    .then((response) => {
      
      var items = response.items.map(function(track){ tempTracks.push(track.name + " ");} );

     

      this.setState({
        topTracks: tempTracks
      });
    })

    console.log(tempTracks);
  }

  

  
}


const centered = {
  position: "absolute", /* or absolute */
  top: "50%" ,
  right: "45%" ,
  
}

const background={

  color: "red",
}


export default App;


