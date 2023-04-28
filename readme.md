# Synopsis

![Rezidenc Logo](/readme_assets/rezidenc-light.png)

## A Team Loud Backspace Project

Living with roommates can often feel like a never-ending juggling act, with coordination and communication being a constant challenge. But fear not, our client Derek Steege has set out to revolutionize shared living by creating a one-stop-shop app that addresses all these pain points. With features like a dedicated roommate finder, reminders, calendars, and an eagle-eye dashboard for streamlined monitoring of your listings and current roommates, our innovative app promises to make communal living a breeze. To gauge the interest and need for his game-changing idea, Derek has partnered with Team Loud Backspace to bring his vision to life with a working prototype. Stay tuned for a game-changing solution that will simplify shared living like never before!

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
    "expo-blur": "~11.2.0",
    "expo-secure-store": "~11.3.0",
    "expo-status-bar": "~1.4.0",
    "react": "18.0.0",
    "react-dom": "18.0.0",
    "react-native": "0.69.6",
    "react-native-calendars": "^1.1294.0",
    "react-native-gesture-handler": "~2.5.0",
    "react-native-input-style": "^1.0.2",
    "react-native-paper": "^5.1.4",
    "react-native-reanimated": "^2.9.1",
    "react-native-safe-area-context": "4.3.1",
    "react-native-screens": "~3.15.0",
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

Refer to the package.json to install the appropriate dependencies, then open a terminal and `cd` into `react-native-app` and run the following:

```
npx expo start --web
```
Then, open a separate parallel terminal and `cd` into `backend-express-app` and run the following:
```
node server.js
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

### Project TODO

- [x] Prototype UI Layout - Base UI
- [x] Build MVP
- [x] Create data models for the different project features
- [x] Setup the Login Page Essentials
- [x] Setup a basic navigation system
- [x] Setup basic user schemas for mongodb
- [x] Revise Figma Layouts
- [x] Create a datamodel for houses
- [x] Fix small visuals of presentation day
- [x] Setup the basic layout for the reminders page
- [x] Pre-presentation QA
- [x] Create or import common content components based off of designs
- [x] Create or import a template for content pages
- [x] Revise and Review the mockups
- [x] Setup the express server
- [x] User Dashboard API
- [x] Rework the navigation system so that it is a common navigation system
- [x] Decide on backend service choice
- [x] User Dashboard UI + API integration
- [x] Setup the dashboard page UI for web and mobile
- [x] Setup the reminders system UI
- [x] Setup the User Profile UI
- [x] Setup the API for reminders for creating, editing, and deleting reminders
- [x] Setup the API for getting a list of user associated reminders
- [x] Setup an API for user reminder notifications
- [x] User Feel Quality check
- [x] Integrate user reminders list api with user reminder UI
- [x] Integrate user reminders CRUD api with reminder CRUD UI
- [x] Setup the UI layout for the calendar
- [x] Review/Revise the roommate finder UI
- [x] Setup the API for populating the calendar
- [x] Setup the API for adding roommates to a household
- [x] Review codebase for deployment prep
- [x] Integrate notifications with reminder frontend
- [x] Integrate calendar API with calendar frontend
- [x] Setup API for roommate filters
- [x] Integrate dashboard UI with existing API for other feature areas with regular refreshes
- [x] Integrate household add code api with roommate finder UI
- [x] Integrate roommate finder UI with roommate filter API
- [ ] Run a test deployment with existing code base pre-final deployment
- [ ] Final deployment

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

<details>
  <summary>Click to View</summary>
  <br>
  
  ![ERD](/readme_assets/Rezidenc_ERD.png)
  
</details>

## Testing & Deployment <b>(TODO)</b>
- Testing Section with links or descriptions of how to test
- Instructions to include how to download, setup to run/deploy 

<!--
### Pull Requests & Contribution Guidelines
-->

## Authors & Contributors

- Aaron O'Mary - [Email](mailto:aomary@csus.edu)
- John Kieren - [Email](mailto:jkieren@csus.edu)
- Kenneth Munk - [Website](https://www.kenmunk.com) - [Email](mailto:contact.me@kenmunk.com)
- Peter Abah - [Email](mailto:peterabah@csus.edu)
- Andriy Storozhuk - [Email](mailto:astorozhuk@csus.edu)
- Sahil Ram Jadhav - [Email](mailto:sahilramjadhav@csus.edu)
- Ryan Farruggia - [Website](http://rjfar.com) - [Email](mailto:rjfarruggia@csus.edu)
