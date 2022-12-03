# Synopsis
![Rezidenc Logo](/readme_assets/logos/rezidenc-logo-dark.png)
#### A Team Loud Backspace Project

Living with roommates can be a headache, especially when coordinating things like reminders, calendars, documents, communications with the property owner/manager/operator and each other. Derek Steege seeks to address these issues by packaging a master solution to all these problems into a single app that makes living arrangements with others easier. To test the demand and desire for his idea, Derek Steege accepted help from Team Loud Backspace to build out a working prototype for such an app.

## Supported Platforms

### Web

<details>
  <summary>Click for a demo!</summary>
  <br>
  
  ![Web Demo GIF](/readme_assets/loudbackspaceweb.gif)
  
</details>

### Android

<details>
  <summary>Click for a demo!</summary>
  <br>
  
  ![Mobile Demo GIF](/readme_assets/loudbackspacemobile.gif)
  
</details>


## Project Structure

1. React Native App
2. Express App Backend
3. MongoDB Database
4. Node Server Environment

# Environment Setup & Deployment

## Project Dependencies
```
  "dependencies": {
    "@expo/webpack-config": "^0.17.0",
    "@react-native-masked-view/masked-view": "0.2.7",
    "@react-navigation/bottom-tabs": "^6.4.0",
    "@react-navigation/drawer": "^6.5.0",
    "@react-navigation/native": "^6.0.13",
    "@react-navigation/native-stack": "^6.9.1",
    "expo": "~46.0.16",
    "expo-status-bar": "~1.4.0",
    "react": "18.0.0",
    "react-dom": "18.0.0",
    "react-native": "0.69.6",
    "react-native-paper": "^5.0.0-rc.9",
    "react-native-reanimated": "^2.9.1",
    "react-native-vector-icons": "^9.2.0",
    "react-native-web": "~0.18.7",
    "react-navigation": "^4.4.4",
    "yarn": "^1.22.19"
  },
  "devDependencies": {
    "@babel/core": "^7.12.9",
    "babel-plugin-module-resolver": "^4.1.0"
  },
```

## Development Server Launch Sequence
Install Node.js and run the following commands:
```
npm install expo expo-cli react-native
npx expo install react-dom react-native-web @expi/webpack-config
```
Refer to the package.json to install the appropriate dependencies
Then run the command
```
npx expo start --web
```

## Powered By
<img align="left" src="/readme_assets/icons/mongodbicon.png" width="50" height="50" />
<img align="left" src="/readme_assets/icons/expressjsicon.png" width="50" height="50" />
<img align="left" src="/readme_assets/icons/reacticon.png" width="50" height="50" />
<img align="left" src="/readme_assets/icons/nodejsicon.png" width="50" height="50" />
<img align="left" src="/readme_assets/icons/jiraicon.png" width="50" height="50" />
<img align="left" src="/readme_assets/icons/figmaicon.png" width="50" height="50" />
<img align="left" src="/readme_assets/icons/lucidcharticon.png" width="50" height="50" />
<br />
<br />
<br />

<details>
  <summary>View As A List</summary>
  <br>
  <ul>
    <li>MongoDB</li>
    <li>ExpressJS</li>
    <li>React Native</li>
    <li>NodeJS</li>
    <li>Jira</li>
    <li>Figma</li>
    <li>Lucid Chart</li>
  </ul>
  
</details>

## Project Development

## Project TODO

- [x] Prototype UI Layout - Base UI
- [x] Build MVP
- [x] Create data models for the different project features
- [ ] \(WIP)Setup the Login Page Essentials
- [x] Setup a basic navigation system
- [ ] \(WIP)Setup basic user schemas for mongodb
- [x] Revise Figma Layouts
- [x] Create a datamodel for houses
- [x] Fix small visuals of presentation day
- [ ] \(WIP)Setup the basic layout for the reminders page
- [X] \(QA)Pre-presentation QA
- [ ] Create or import common content components based off of designs
- [ ] Create or import a template for content pages
- [ ] Revise and Review the mockups
- [ ] Setup the express server
- [ ] User Dashboard API
- [ ] Rework the navigation system so that it is a common navigation system
- [ ] Decide on backend service choice
- [ ] User Dashboard UI + API integration
- [ ] Setup the dashboard page UI for web and mobile
- [ ] Setup the reminders system UI
- [ ] Setup the User Profile UI
- [ ] Setup the API for reminders for creating, editing, and deleting reminders
- [ ] Setup the API for getting a list of user associated reminders
- [ ] Setup an API for user reminder notifications
- [ ] User Feel Quality check
- [ ] Integrate user reminders list api with user reminder UI
- [ ] Integrate user reminders CRUD api with reminder CRUD UI
- [ ] Setup the UI layout for the calendar
- [ ] Review/Revise the roommate finder UI
- [ ] Setup the API for populating the calendar
- [ ] Setup the API for adding roommates to a household
- [ ] Review codebase for deployment prep
- [ ] Integrate notifications with reminder frontend
- [ ] Integrate calendar API with calendar frontend
- [ ] Setup API for roommate filters
- [ ] Integrate dashboard UI with existing API for other feature areas with regular refreshes
- [ ] Integrate household add code api with roommate finder UI
- [ ] \(QA)Run a test deployment with existing code base pre-final deployment
- [ ] Integrate roommate finder UI with roommate filter API
- [ ] Final deployment

## Low Priority Tasks
- [ ] Setup UI Layout for Chat
- [ ] Setup Chat API
- [ ] Integrate chat UI with chat API
- [ ] Roommate finder roommate application UI layout setup
- [ ] Roommate finder roommate application API setup
- [ ] Integrate roommate application API with roommate application UI

## Project Timeline

<details>
  <summary>Click to View</summary>
  <br>
  
  ![Rezidenc Roadmap](/readme_assets/rezidenc--roadmap.png)
  
</details>

## Development Process

### Proposed User Flow
<details>
  <summary>Click to View</summary>
  <br>
  
  ![User Flow](/readme_assets/LoudBackspace--UserFlow--JohnKieren.png)
  
</details>


### Project Entity Diagram

### Testing
All testing was done as functional testing during development at this time.  More to come.

<!--
### Pull Requests & Contribution Guidelines
-->

## Authors & Contributors
- Aaron O'Mary
- John Kieren - [Email](mailto:jkieren@csus.edu)
- Kenneth Munk - [Website](https://www.kenmunk.com) - [Email](mailto:contact.me@kenmunk.com)
- Peter Abah
- Andriy Storozhuk
- Sahil Ram Jadhav
- Ryan Farruggia - [Website](http://rjfar.com) - [Email](mailto:rjfarruggia@csus.edu)
