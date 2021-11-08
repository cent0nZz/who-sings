# Who Sings?

Simple music quiz game that uses Musixmatch APIs.

## Description

A simple music quiz game that shows the user a snippet of a track and asks him to pick the right artist between 3 different choises. The game also supports local client persistance (using localStorage) for users and games stats. The app makes use of Musixmatch APIs for everything track/artist related.

## Getting Started

### Dependencies

* NodeJS >= 10
* Chrome (or any Chromium based browser, like the new Edge)/Firefox/Safari

### Installing

Simply running 'npm i' is enough to get all the necessary dependencies installed.

### Executing program

* Execute in development mode (with file watch): 'npm start'
* Execute in production mode (with generation of a single build): 'npm run build'
* Launch all tests: 'npm run test'

## Help

Due to Musixmatch APIs not sending CORS headers by default in the response, the app is forced to use a CORS reverse proxy (the free cors.bridged.cc in this case) to fetch data. If you encounter any 'fetch' related issues during execution it's most likely because the proxy server is having some sort of problem. In this occurrence please just try again, sorry for the inconvenience.