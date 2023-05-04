# Synopsis

![Rezidenc Logo](/readme_assets/rezidenc-light.png)

## A Team Loud Backspace Project

Living with roommates can often feel like a never-ending juggling act, with coordination and communication being a constant challenge. But fear not, our client Derek Steege has set out to revolutionize shared living by creating a one-stop-shop app that addresses all these pain points. With features like a dedicated roommate finder, reminders, calendars, and an eagle-eye dashboard for streamlined monitoring of your listings and current roommates, our innovative app promises to make communal living a breeze. To gauge the interest and need for his game-changing idea, Derek has partnered with Team Loud Backspace to bring his vision to life with a working prototype. Stay tuned for a game-changing solution that will simplify shared living like never before!

## Supported Platforms

### Web

<details>
  <summary>Click for a demo!</summary>
  <br>
  
  ![Web Demo GIF](/readme_assets/demo.gif)
  
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

<img align="left" src="readme_assets/icons/mongodbicon.png" width="50" height="50" />
<img align="left" src="readme_assets/icons/expressjsicon.png" width="50" height="50" />
<img align="left" src="readme_assets/icons/reacticon.png" width="55" height="50" />
<img align="left" src="readme_assets/icons/nodejsicon.png" width="50" height="50" />
<img align="left" src="readme_assets/icons/jiraicon.png" width="50" height="50" />
<img align="left" src="readme_assets/icons/figmaicon.png" width="50" height="50" />
<img align="left" src="readme_assets/icons/lucidcharticon.png" width="50" height="50" />
<img align="left" src="readme_assets/icons/render-render.png" width="50" height="50" />
<br />
<br />
<br />

<details>
  <summary>View As A List</summary>
  <ul>
    <li>MongoDB</li>
    <li>ExpressJS</li>
    <li>React Native</li>
    <li>NodeJS</li>
    <li>Jira</li>
    <li>Figma</li>
    <li>Lucid Chart</li>
    <li>Render</li>
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
- [x] Run a test deployment with existing code base pre-final deployment
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
  ![End of Semester ERD](/readme_assets/Rezidenc--ERD--End_Of_Semester_Snap.png)
  
</details>

### Pull Requests & Contribution Guidelines

## Pull Requests
//Pending input from Peter/Andriy/Aaron on their approval process

## Contribution Guidelines
- Each member of the development team is to maintain their own access to the repository through github and request access if no access was found on their desired github account
- Members are required to fetch/pull from the origin of the project and update their work branch with with the current state of the main branch prior to committing to the project to mitigate any merge conflicts that might occur
- Members are all required to do development work in branches of the project origin and put in a pull request when submitting new work for evaluation
  - Some individuals have opted to continuously update the same branch while others have opted to create a new branch for each milestone that they've set either approach is commendable

## Testing & Deployment
### Testing Locally
- First, locate the `.env` file under `/react-native-app` and change `BACKEND_IP_PORT` to `http://localhost:3000`
- Finally, if you've changed databases you will need to update the `.env` file located in `/backend-express-app` with a new URI. Also, if the frontend is running on a different port (default is 19006) you will need to change this in same `.env` file located in `/backend-express-app`.
#### Login/Signup
- Create an account
- Sign in if you already have an account
#### Dashboard
- Join or create a household
  - When joining a household, an entry box
  - When creating a household, an entry box asking for a household name should appear. After entering a name, a new button should appear allowing you to create invite codes for your newly created household.
    - When creating an invite code, an 8 character code should be generated and displayed on screen. This code should expire after 24 hours and can no longer be used. The same code will continue to be displayed until the page is refreshed or if a household update is triggered.
  - When leaving a household, a modal should appear asking for confirmation (Yes or Cancel). If you are the last person in a household, leaving the household should delete it completely from the database as well as any associated reminders. If there is more than 1 person in a household and a member leaves you will be removed from the household members and the household variable in the user document will be set to `NULL`.
- Listings
  - If you have listings created, ensure that they show up on the dashboard under "Listings". You should also be able to click each listing and its information should pop up as a modal on screen.
  - Under Listings, on each listing there should be a trash can icon. When clicking this, it should ask for confirmation of deletion (Yes or Cancel). If you click Yes, after a moment it should disappear from display.
- Reminders
  - If you have reminders created, ensure that they show up on the dashboard under "Reminders". At the moment, reminders do not link to anything.
  - Under Reminders, on each reminder there should be a trash can icon. When clicking this, it should ask for confirmation of deletion (Yes or Cancel). If you click Yes, after a moment it should disappear from display.

#### Roommate Finder
- Search
  - When entering a ZIP Code the first 16 listings in the database that match it, those listings will be displayed. At the bottom of the page, when clicking the right arrow, the next 16 listings will be displayed. When clicking the left arrow, the previous 16 listings will be displayed. If there are less than 16 listings remaining, the right arrow should not appear. If there are less than 16 listings initially, the left arrow should not appear.
  - In the top left next to `"Search Results"`, the number of total listings in the database that match the ZIP Code should be displayed.
- Filter
  - If `Gender` is checked, all options will be unchecked. You can then specify which genders you would like to include in the available listings.
  - Under `Budget`, if no option is checked, the available listings will be ordered by default order according to the database.
    - If `(Low to High)` is checked, listings will be sorted by lowest rent price first.
    - If `(High to Low)` is checked, listings will be sorted by highest rent price first.
    - <b>Note:</b> Only one budget option is selectable at a time.
- Create Listing
  - When entering information, if saving the listing succeeds, you should get a confirmation on screen `"Your listing was created successfully!"`. After clicking `Return` you should then be redirected back to the dashboard where the listing you just created will be displayed at the bottom of your listings.

#### Calendar
- The current date should be highlighted blue.
- Any reminders set for the current date should appear on the bottom right.
- Clicking on a different date should change the border and unselect the previously selected day. The default is the current date.
  - This should display the reminders for the currently selected day and autofill the date entry box for reminder creation on the top right.
  - Creating and saving a reminder should automatically display the reminder at the bottom right.
- If you create a reminder and manually enter the date, it should create it for that date.
- After successful creation of a reminder, the reminder should also display on the Dashboard under `Reminders`. Reminders are sorted by earliest date first.

#### Account
- To check if your cookie/token is working properly, go to your web browser's settings and disable:
  -  Blocking cross-site tracking `(Safari)`
  -  Cross-site cookies `(Firefox)`
  -  "Do Not Track" `(Chrome)`.
- When first accessing the account page, your current information should be autofilled in the entry boxes on display. Editing or changing this information and saving it should update it in the database and display a success message `"Your account was updated successfully"`.
  - To double check, you can refresh the page and the new account details should be autofilled in the entry boxes.

#### Responsiveness/Resizing
- Navigation Tabs
  - Shrinking the page should cause the tabs to shrink in size where the text disappears and the icons remain.
  - The Rezidenc logo should also shrink to a smaller size.
- Dashboard
  - Shrinking the page should cause `Your Listings` and `Household` to disappear and `Reminders` will be shown by default. You can then select the blue tabs to move between each column.
- Finder
  - While shrinking the page, once the `Create Listing` button reaches the `Search` bar, the filter button should become a single icon button with no text. Once the `Create Listing` button reaches the `Search` bar again, the `Create Listing` button shrinks. If it reaches it for a third time, the page title and description will disappear. Eventually, the Create Listing button will be placed on top of the Search bar and Filter button. Each of these buttons will expand to fill the available screen width.
- Calendar
  - When shrinking the page, the create reminder form will disappear and the `Reminders` list at the bottom right is placed below the calendar. Using the blue tabs you should be able to create reminders and display the reminders list for the selected day.
- Account
  - N/A


### Deployment
- Frontend
  - Update the `.env` file in `/react-native-app` with the backend IP address by assigning it to `BACKEND_IP_PORT`.
  - Update the `HTTP` variable to `true`.
  - Select Add New Site
  - Then select Import an existing project
  - Connect your [Netlify](https://www.netlify.com/) account to your GitHub account.
  - Pick this repository or a fork of this repository
  - Set the owner of the site to your netlify team
  - Select the branch that you seek to deploy from
  - Set your base directory to the folder `react-native-app`
  - Set your build command to `npm run webbuild`
  - Sey your publish directory to `PortfolioWebsite/web-build`
  - Then hit deploy, brew some tea, and watch your site get built on netlify
  - *Any future commits will automatically be pulled and redeployed.*
  
- Backend
  - Assign the `IP` variable in the `.env` file located in `/backend-express-app` with your frontend IP address.
  - Connect your GitHub account to [Render](https://render.com).
  - Select a web service option.
  - Connect to your repository.
  - Select a unique name.
  - Select region and a branch.
  - Enter the root directory as `backend-express-app`.
  - Select your runtime. Should be `node`.
  - Set the build command to `npm install`.
  - Set the start command to `node server.js --clear`.
  - Select instance tier.
  - Click `Create Website`.
  - Should automatically deploy. A console will appear displaying the status of the deployment.
  - If everything is working properly, it should say `LIVE`.
  - If successful, a website link will be provided to you where the site is hosted and should display `"Hello, World"`.
  - The link provided is the IP you will want to use for your frontend `.env` file.
  - Lastly, select `connect` and then `outbound`. This will display all the static outbound IP addresses which you will need to whitelist in MongoDB.
  - Done!
  - *Any future commits will automatically be pulled and redeployed.*


<!--
-->

## Authors & Contributors

- Aaron O'Mary - [Email](mailto:aomary@csus.edu)
- John Kieren - [Email](mailto:jkieren@csus.edu)
- Kenneth Munk - [Website](https://www.kenmunk.com) - [Email](mailto:contact.me@kenmunk.com)
- Peter Abah - [Email](mailto:peterabah@csus.edu)
- Andriy Storozhuk - [Email](mailto:astorozhuk@csus.edu)
- Sahil Ram Jadhav - [Email](mailto:sahilramjadhav@csus.edu)
- Ryan Farruggia - [Website](http://rjfar.com) - [Email](mailto:rjfarruggia@csus.edu)
- Emanuel Tadeo - [Email](mailto:emanueltadeo@csus.edu)