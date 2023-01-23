# Tracking International Space Station Application

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [Deployed Version](#deployed-version)

### General info

This project is to create a small app that is tracking the position of the International Space Station in Google maps or similar. This application pulls data from the ISS API, saves the data into postgres database, and then visualizes the position of the ISS on a map.

### Technologies

Project is created with:

- ReactJS
- NodeJS (Express.js)
- Postgresql

### Setup

To run this project locally, these steps should be followed:

#### Postgres Database Setup

Create a postgres database in your localhost and add a table(iss) with (id (integer), lat(numeric), lng(numeric), speed(numeric), timestamp(time with zone), units(cheracter varying)) as column name and data type.
Create a `.env` file inside Backend folder, then add your Postgres Database informations

```
DATABASE_HOSTNAME ="[HOST]"
DATABASE_PORT ="[PORT]"
DATABASE_PASSWORD ="[PASSWORD]"
DATABASE_NAME ="[DB_NAME]"
DATABASE_USERNAME ="[USERNAME]"
```

#### Backend Setup

##### In terminal

Backend listens to the port 8000

```
$ cd Backend
$ npm install
$ node index.js
```

#### Frontend Setup

Create a `.env` file inside Frontend folder and add your goole api key

```
REACT_APP_GOOGLE_API_KEY="[Your_API_Key]"
```

##### In terminal

```
$ cd Frontend
$ npm install
$ npm start
```

Frontend listens to the port 3000

### Deployed Version

Deployed version of the application can be found at this link -
