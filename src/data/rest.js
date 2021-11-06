const API = {
  CORS_PROXY_DOMAIN: 'https://cors-anywhere.herokuapp.com/', // TODO: WTF
  DOMAIN: 'https://api.musixmatch.com/',
  PATH: 'ws/1.1',
  KEY: '3fb07e540d2703665988993a99813fee',
  SAFE_MAX_TRACKS_PAGE: 80,
  SAFE_MAX_ARTISTS_PAGE: 40,
}

const getRandomInteger = (max) => Math.floor(Math.random() * Math.floor(max) + 1) // TODO: move this

export const getRandomTrack = async (country = 'wx') => {
  await new Promise((resolve) => setTimeout(resolve, 250))
  return {
    track: {
      id: 123,
      name: 'ciao',
    },
    artist: {
      id: 321,
      name: 'oi',
    },
  }

  const page = getRandomInteger(API.SAFE_MAX_TRACKS_PAGE)
  const fetchOptions = {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Accept': 'application/json',
    },
  }
  const response = await fetch(`${API.CORS_PROXY_DOMAIN}${API.DOMAIN}${API.PATH}/chart.tracks.get?chart_name=hot&f_has_lyrics=1&page_size=1&page=${page}&country=${country}&apikey=${API.KEY}`, fetchOptions)
  if (!response.ok) {
    return null
  }

  const jsonResponse = (await response.json())?.message?.body
  if (!jsonResponse) {
    return null
  }

  const track = jsonResponse.track_list?.[0]?.track
  if (!track) {
    return null
  }

  return {
    track: {
      id: track.track_id,
      name: track.track_name,
    },
    artist: {
      id: track.artist_id,
      name: track.artist_name,
    },
  }
}

export const getRandomArtist = async (country = 'wx') => {
  await new Promise((resolve) => setTimeout(resolve, 250))
  return {
    artistId: 445,
    artistName: 'lop',
  }

  const page = getRandomInteger(API.SAFE_MAX_ARTISTS_PAGE)
  const fetchOptions = {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Accept': 'application/json',
    },
  }
  const response = await fetch(`${API.CORS_PROXY_DOMAIN}${API.DOMAIN}${API.PATH}/chart.artists.get?format=json&page_size=1&page=${page}&country=${country}&apikey=${API.KEY}`, fetchOptions)
  if (!response.ok) {
    return null
  }

  const jsonResponse = (await response.json())?.message?.body
  if (!jsonResponse) {
    return null
  }

  const artist = jsonResponse.artist_list?.[0]?.artist
  if (!artist) {
    return null
  }

  return {
    artistId: artist.artist_id,
    artistName: artist.artist_name,
  }
}

export const getTrackSnippet = async (trackId) => {
  await new Promise((resolve) => setTimeout(resolve, 250))
  return 'hera me from miles'

  if (!trackId) {
    return null
  }

  const fetchOptions = {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Accept': 'application/json',
    },
  }
  const response = await fetch(`${API.CORS_PROXY_DOMAIN}${API.DOMAIN}${API.PATH}/track.snippet.get?track_id=${trackId}&apikey=${API.KEY}`, fetchOptions)
  if (!response.ok) {
    return null
  }

  const jsonResponse = (await response.json())?.message?.body

  return jsonResponse?.snippet?.snippet_body ?? null
}
