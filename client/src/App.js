import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
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
      nowPlaying: {name:'Not Checked', albumArt: ''},
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
        <a href='http://localhost:8888/login' > Login to Spotify </a>
        <div>
          Now Playing: {this.state.nowPlaying.name}
          my tracks: {this.state.topTracks}
        </div>
        <div>
        <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
      
      
      </div>

      { this.state.loggedIn &&
        <button onClick={() => {this.getNowPlaying(); this.getTopTracks()}}>
          Check Now Playing
        </button>
      }
      
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



export default App;
