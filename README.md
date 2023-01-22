# TrackingISSAPP

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)

## General info

This project is to create a small app that is tracking the position of the International Space Station in Google maps or similar.

## Technologies

Project is created with:

- ReactJS
- NodeJS
- Postgresql

## Setup

To run this project, install it locally using npm:

### Frontend Setup

Create a ".env" file inside Frontend folder and add your goole api key

```
REACT_APP_GOOGLE_API_KEY="[Your_API_Key]"
```

```
$ cd Frontend
$ npm install
$ npm start
```

### Backend Setup

```
$ cd Backend
$ npm install
$ node index.js
```
