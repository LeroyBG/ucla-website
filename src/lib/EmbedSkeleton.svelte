<script>
export let SERVER_URL;
export let CLIENT_ID;
export let REDIRECT_URI;

import LightUpBorder from "$lib/LightUpBorder.svelte";

// Handle top-level state
let userAuthorized = false
let componentErrorState = false
let loadingState = false
let unconfigured = !(SERVER_URL && CLIENT_ID && REDIRECT_URI)


let colorfulLoadingState = false

// handle edge case where user has disabled localStorage
// store auth token as a non-persistent local variable
let localStorageEnabled = false
let access_token = null
let token_expiry = null

const search_params = new URLSearchParams({ // Need to change redirect URI for deployment
  client_id: CLIENT_ID,
  response_type: "code",
  redirect_uri: REDIRECT_URI,
  scope: "playlist-read-private playlist-modify-private playlist-modify-public"
})
let spotify_auth_link = `https://accounts.spotify.com/authorize?${search_params.toString()}`

let spotifyGreen = '#1ab44a';
$: stripColor = loadingState ? 'lightgrey' : spotifyGreen
let numLayers = 15;
let active;

let userSpotifyPlaylistLinkInput = "";
let finalSpotifyPlaylistLink = "";

// Regex for validating spotify URIs and stuff
let patterns = [
  /^spotify:[a-z]+:[a-z0-9]+$/im, // Spotify URI
  /^[a-z0-9]+$/im, // Spotify ID
  /^https:\/\/open.spotify.com\/[a-z]+\/[a-z0-9?=/]+$/im // Spotify URL
]

// TODO: modify code that uses localStorage.get('item') to first check that local storage is enabled
const store_token = (token) => {
  try {
    localStorage.setItem('Spotify_access_token', token)
    localStorage.setItem('Spotify_token_expiration', (Date.now() + 3500 * 1000).toString() )
  } catch (err) {
    localStorageEnabled = false
    access_token = token
    token_expiry = Date.now() + 3500 
  }
}

// Returns an object with {access_token, token_expiration}
// access_token can be null if the token isn't found
const get_token_and_expiry = () => {
  console.log('Checking for tokens')
  const retrieved_token = localStorage.getItem('Spotify_access_token') ?? access_token
  const token_expiration = parseInt(localStorage.getItem('Spotify_token_expiration')) ?? token_expiry
  console.log('heres what i got:', retrieved_token, token_expiration)
  return { retrieved_token, token_expiration }
}

// Get an access token from a code
// Returns null if the code is invalid
const get_token_from_code = async (code) => {
  try {
    const res = await fetch(`${SERVER_URL}/authorize?code=${code}`)
    const data = await res.json()
    if (res.ok) {
      return data["access_token"]
    }
    return null
  } catch (err) {
    return null
  }
}

const refresh_token = async (old_token) => {
  // Quick fix:
  localStorage.removeItem('Spotify_access_token')
  localStorage.removeItem('Spotify_token_expiration')
  userAuthorized = false
  componentErrorState = false
  loadingState = false

  // * * * * * DON'T DELETE BELOW * * * * * 
  // try {
  //   const res = await fetch(`${SERVER_URL}/refresh_token`, {
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       "expired_token": old_token
  //     })
  //   })
  //   if (res.ok) {
  //     const data = await res.json()
  //     store_token(data["access_token"])
  //   } else {
  //     // Try the whole process again
  //     userAuthorized = false
  //     componentErrorState = false
  //     loadingState = false
  //   }
  // } catch (err) {
  //   // Try the whole process again
  //   userAuthorized = false
  //   componentErrorState = false
  //   loadingState = false
  // }
}
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const handleComponentRender = async () => {
  console.log('mounting')
  loadingState = true
  // 2 main variables to consider when component mounts
  // 1. Whether the user has a token in localStorage
  // 2. Whether the user has a code in the url
  // If neither, then we need to request a code

  // First, check for an unexpired token in localStorage
  const { retrieved_token, token_expiration } =  get_token_and_expiry()
  console.log('token:', retrieved_token)
  if (retrieved_token && token_expiration) { // We've got a token and expiration in local storage
    if (token_expiration > (Date.now())) {
      console.log('We got a (hopefully) valid token!')
      // We have an unexpired token
      // This token COULD be invalid but only if the user is messing around with localStorage
      loadingState = false
      componentErrorState = false
      userAuthorized = true
    } else { // Token is expired
      console.log('that token is expired')
      // Need to get a new token
      refresh_token(retrieved_token)
      return
    }
    return
  }
  // Now check to see if there's a code in the URL
  let url = new URL(window.location.href)
  let searchParams = new URLSearchParams(url.search)
  if (searchParams.has('code')) {
    // Check if the code is valid by trying to exchange it for an auth_token
    const token = await get_token_from_code(searchParams.get('code'))
    console.log('just got a token from our code', token)
    if (token) {
      userAuthorized = true
      componentErrorState = false
      loadingState = false
      store_token(token)
    } else {
      userAuthorized = false
      componentErrorState = false
      loadingState = false
    }
    return
  }
  // If we don't have a code in the url and no auth token in localStorage, reset / do nothing
  userAuthorized = false
  componentErrorState = false
  loadingState = false
}

handleComponentRender() 


let handlePlaylistLinkSubmit = async (submission) => {
  colorfulLoadingState = true
  let matched = false
  for (const p of patterns) {
    if (submission.match(p)) {
      matched = true
      console.log(p)
      break
    }
  }
  if (!matched) {
    console.log("hello")
    colorfulLoadingState = false
    return false
  }
  try {
    const { retrieved_token } = get_token_and_expiry()
    const res = await fetch(`${SERVER_URL}/samples?playlist_id=${submission}`, {
      headers: {
        "Authorization": retrieved_token
      }
    })
    if (res.ok) {
      const data = await res.json()
      console.log('final playlist link:', data["playlist_uri"])
      finalSpotifyPlaylistLink = data["playlist_uri"]

    } else {
      componentErrorState = true
    }
  } catch (err) {
    // TODO: more advanced error handling??
    componentErrorState = true
  }
  colorfulLoadingState = false
}    

$: console.log("Colorful", colorfulLoadingState)

</script>

<div id="main">
  <LightUpBorder
  layersLeft={numLayers - 1}
  totalLayers={numLayers}
  marginSize={'2px'}
  defaultColor={stripColor}
  active={loadingState || colorfulLoadingState || active}
  ticker={0}
  period={colorfulLoadingState ? 1000 : 750}
  parent={true}
  reversed={loadingState}
  colorful={colorfulLoadingState}
  >
    <div id="inner-container">
      <h1>Skeleton</h1>
      {#if unconfigured}
      <p style="color: red;">Didn't receive all props or received bad props.</p>
      {:else if userAuthorized}
        {#if !finalSpotifyPlaylistLink}
          {#if colorfulLoadingState}
            <p>Cooking up a playlist just for you.</p>
          {:else}
            <form id="playlist-uri-form">
              <label id="playlist-input-prompt">Enter playlist link</label>
              <input id="playlist-uri-input"
              disabled={colorfulLoadingState}
              bind:value={userSpotifyPlaylistLinkInput} 
              type="text">
              <button type="submit"
              on:click|preventDefault={(e)=>{handlePlaylistLinkSubmit(userSpotifyPlaylistLinkInput)}}
              >GO</button>
            </form>
          {/if}
          
        {:else}
          <p>Your new playlist is in your library.<br>
            <a id="final-playlist-link"
              href={finalSpotifyPlaylistLink}
              on:mouseover={() => {active = true}}
              on:focus={()=>{active = true}}
              on:mouseout={()=>{active = false}}
              on:blur={()=>{active = false}}
              >Here</a>'s
            the link, if you insist :).
          </p>
          <div class="flex-container"> <!-- Literally just to center this button -->
            <button 
              id="new-playlist-button"
              on:click={() => {
              finalSpotifyPlaylistLink = ""
              userSpotifyPlaylistLinkInput = ""
              }}
              >new playlist</button>
          </div>
        {/if}
      {:else}
      <p><a
        href={loadingState ? null : spotify_auth_link}
        style={`color: ${stripColor};`}
        id="spotify-login-link"
        on:mouseover={() => {active = true}}
        on:focus={()=>{active = true}}
        on:mouseout={()=>{active = false}}
        on:blur={()=>{active = false}}
        >Sign in with Spotify</a> to use this app.</p>
      {/if}
      <!-- <h3>[Debug] State information</h3>
      <p>Authorized: {userAuthorized}, Loading: {loadingState}, Error: {componentErrorState}</p>
    </div> -->
  </LightUpBorder>
</div>

<style>
#main {
  font-family:Arial, Helvetica, sans-serif;
}
#spotify-login-link {
  font-weight: bolder;
  text-decoration: none;
}
#final-playlist-link {
  font-weight: bolder;
  text-decoration: none;
  color: #1ab44a;
}
#inner-container {
  width: 300px;
  margin: auto;
}
#playlist-uri-form {
  display: block;
  margin-bottom: 5px;
}
#playlist-input-prompt {
  display: block;
}
#playlist-uri-input {
  margin-top: 5px;
  color: darkgreen;
}
#new-playlist-button {
  margin: 0 auto;
}
.flex-container {
  justify-content: center;
  align-items: center;
}
</style>