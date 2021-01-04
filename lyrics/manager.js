import { getAsync } from './httpConnector.js';
const _baseUrl = 'https://api.lyrics.ovh/';
const _apiVersion = 'v1';

async function getSongSuggestions(songName)
{     
    var endpoint = getSongSuggestionEndPoint(songName);
    let httpResponse = await getAsync(endpoint);
    displaySongsSuggestions(httpResponse);
    return httpResponse;
}
async function getSongLyrics(artistName,songName)
{     
    var endpoint = getLyricsEndPoint(artistName,songName);
    let httpResponse = await getAsync(endpoint);
    alert(httpResponse.lyrics);
}
async function getNext(endpoint)
{   
    var cors = 'https://cors-anywhere.herokuapp.com/'+ endpoint;
    let httpResponse = await getAsync(cors);
    displaySongsSuggestions(httpResponse);
    return httpResponse;
}

function displaySongsSuggestions(httpResponse){
    var songsData =  httpResponse.data;
    var searchInfo = document.getElementById("searchInfo");

    searchInfo.innerHTML = "Total Suggestion : " + httpResponse.total;
    updatePaginationInfo(httpResponse);
    var mainContainer = document.getElementById("songsList");
    mainContainer.innerHTML = '';
    //add song item with lyrics button.
    for (var i = 0; i < songsData.length; i++) {    
        var song = songsData[i];    
        var div = document.createElement("div");
        var btn = document.createElement("button");
        btn.innerHTML = "show lyrics";       
        btn.setAttribute("name", "songLyrics");
        btn.setAttribute("artist",  song.artist.name);
        btn.setAttribute("title", song.title);
        btn.addEventListener("click",function(e){
            getSongLyrics(song.artist.name,song.title);
        });
        div.innerHTML = 'Title: ' + song.title + '.<br/> Artist :' + song.artist.name+ '<br/>';
        div.appendChild(btn);
        mainContainer.appendChild(div);
      }
}

function updatePaginationInfo(httpResponse){
   
    var containerFooter = document.getElementById("paginationFooter"); 
   
    containerFooter.innerHTML = '';
    if(httpResponse.hasOwnProperty('prev'))
    {
        var btn = document.createElement("button");
        btn.innerHTML = "Previous";
        btn.setAttribute("id",'btnPrev');
        btn.addEventListener("click",function(e){
            getNext(httpResponse.prev);
        });
        btn.value =  httpResponse.prev;     
     
        containerFooter.appendChild(btn);
    }
    if(httpResponse.hasOwnProperty('next'))
    {
        var btn = document.createElement("button");
        btn.setAttribute("id",'btnNext');      
        btn.addEventListener("click",function(e){
            getNext(httpResponse.next);
        });
        btn.innerHTML = "Next";
        btn.value =  httpResponse.next;          
        containerFooter.appendChild(btn);
    }
}

function getLyricsEndPoint(artistName,songName)
{  
    const endpoint = _baseUrl + _apiVersion + '/' + artistName + "/" + songName;
    return endpoint;
}
function getSongSuggestionEndPoint(songName)
{
    const endpoint = _baseUrl + 'suggest/' + songName;
    return endpoint;
}

export {    
    getNext,
    getSongSuggestions, 
    getSongLyrics,
};


