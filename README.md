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

### Postgres Database Setup

Create a postgres database in your localhost and add a table with (id (integer), lat(numeric), lng(numeric), speed(numeric), timestamp(time with zone), units(cheracter varying)) as column name and data type.

### Backend Setup

Create a ".env" file inside Backend folder and add your Postgres Database informations

```
DATABASE_HOSTNAME ="[HOST]"
DATABASE_PORT ="[PORT]"
DATABASE_PASSWORD ="[PASSWORD]"
DATABASE_NAME ="[DB_NAME]"
DATABASE_USERNAME ="[USERNAME]"
```

#### In terminal

```
$ cd Backend
$ npm install
$ node index.js
```

### Frontend Setup

Create a ".env" file inside Frontend folder and add your goole api key

```
REACT_APP_GOOGLE_API_KEY="[Your_API_Key]"
```

#### In terminal

```
$ cd Frontend
$ npm install
$ npm start
```
