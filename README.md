# HRnet's React conversion

New version of the HRnet application, converted in React application.
The HRnet application allows to create and view different employees in a dynamic table.


## How to Install and Run the Project in a dev mode

Open a terminal and go to the hr-net folder. 
The `npm install` command will allow you to install the dependencies.
The `npm start` command will allow to run the app in the development mode.

**Note about the mocked data**
The project has mocked data to simulate a employee list already created.
If you want to work with it, go to the "context.jsx file" into the "utils" folder and change the variable "isMockedData" from "false" at "true".
The "addEmployee" functionality isn't available is the "isMockedData" is true.


## How to Build the Project

The `npm run build` command will allow you to build the app for production to the `build` folder.
Then, `npm install -g serve` and `serve -s build` commands will allow you to run the built app.
