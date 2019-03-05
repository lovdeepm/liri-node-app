require("dotenv").config();
var keys = require("./keys");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require('moment');
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var movieName = process.argv.slice(3).join(" ");
var songName = process.argv.slice(3).join(' ')
var bandName = process.argv.slice(3).join(" ");


if (command === 'concert-this') {
    concert(bandName);
}
else if ( command === 'spotify-this-song') {
    spotifyThis(songName);
}
else if ( command === 'movie-this') {
    omdbMovie(movieName);
}
else if ( command === 'do-what-it-says') {
        doWhat()
};

// Spotify function and call for api

function spotifyThis(songName) {
    if (songName.length === 0) {
        songName = 'The Sign'
    }
    spotify
    .search({ type: 'track', query: songName })
    .then(function(response) {
      console.log('=====================Spotify Results ========================');
    for (var i = 0; i < 5; i++) {
        var spotifyResults =
        '\n Artist(s) = ' + response.tracks.items[i].artists[0].name +
        '\n Song Name = ' + response.tracks.items[i].name +
        '\n Preview URL: = ' + response.tracks.items[i].preview_url +
        '\n Album Name = ' + response.tracks.items[i].album.name 
        

        console.log(spotifyResults);
    }

    })
    .catch(function(err) {
      console.log(err);
    });
}

//  OMDB //
function omdbMovie(movieName) {
    if( !movieName){
        movieName = 'Mr Nobody'
    }
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";


axios.get(queryUrl).then(
  function(response) {
    console.log("========================Movie Search Results===========================")
    console.log("\n Title: " + response.data.Title);
    console.log("\n Release Year: " + response.data.Released);
    console.log("\n IMDB Rating: " + response.data.Ratings[0].Value);
    console.log("\n Rotten Tomatoes: " + response.data.Ratings[1].Value);
    console.log("\n Production Country: " + response.data.Country);
    console.log("\n Language of Movie: " + response.data.Language);
    console.log("\n Plot of Movie: " + response.data.Plot);
    console.log("\n Actors in Movie: " + response.data.Actors);

    
  }
);

}


function concert(bandName) {



    var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";


axios.get(queryUrl).then(
  function(response) {
      
      for( var i = 0; i < 5; i++) {
    var time = response.data[i].datetime
    console.log('\n Venue Name: ' + response.data[i].venue.name);
    console.log('\n Venue Location: ' + response.data[i].venue.city, response.data[i].venue.country);
    console.log('\n Date of Event: ' + moment(time).format('MM/DD/YYYY'));
      }
})
}



function doWhat() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
        var whatever = data.split(',')
        var command = whatever[0];
        var song = whatever[1].replace('"','');
        console.log(command,song);
        if (command === 'concert-this') {
            concert(bandName);
        }
        else if ( command === 'spotify-this-song') {
            spotifyThis(songName);
        }
        else if ( command === 'movie-this') {
            omdbMovie(movieName);
        }
        else if ( command === 'do-what-it-says') {
                doWhat()
        };
})}