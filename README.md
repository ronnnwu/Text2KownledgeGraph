The project was created by Ron Wu. For a POC purpose to showcase 
that any text can be parsed into a sematic graph and thus can be consumed in a knowledge graph. Once the knowledge graph is built one can used for searching, analyzing or building chatbot.

## Overview

The projects consists of two parts:

### Fontend

The frontend uses React + D3 for plotting the knowledge graph.<br />

Runs the frontend in the development mode.<br />
`cd` to frontend folder, 

- Run npm install
- Adding the proxy by modifying line 17 of Home.js file from ROOT = ''  to ROOT = localhost:8080
- Then run npm start or yarn start


This will start the frontend. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Backend

The backend is purely JAVA: Springboot + StanfordNLP, so that it is production ready.

To run the backend.<br/>

`cd` to backend folder, 

- Run ./mvnw spring-boot:run

This will start the backend. Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

### Create a production build
 
- remove proxy by modifying line 17 of `Home.js` file under the frontend/src to ROOT = '' 
- Then cd to frontend folder, run npm run build . This will create a production build for the frontend
- Copy everything in the build folder to backend/src/main/resources/static/. This allows Springboot to host the static web content.
- Then cd to backend folder,  run ./mvnw package -DskipTests to create a single JAR build (about 300MB) 
- Then deploy to the any Cloud. Notice it requires 2GB heap space to run.


 