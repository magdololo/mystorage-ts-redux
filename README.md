# My storage
> Application that allows collecting and managing information about your home storeroom content, like groceries, household chemicals etc. Anyone can register in service and create own storeroom that later can be shared with others.
> Live demo [_here_](https://www.mystorage.ovh.com). 

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Usage](#usage)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)
* [Contact](#contact)
<!-- * [License](#license) -->


## General Information
- Provide general information about your project here.
- What problem does it (intend to) solve?
- What is the purpose of your project?
- Why did you undertake it?
<!-- You don't have to answer all the questions - just the ones relevant to your project. -->


## Technologies Used
- Created with Creat React App
- React
- Redux toolkit
- Firebase
- - Firestore
- - Storage
- - Hosting
- - Cloud Functions
- Tailwind
- StyledComponents
- i18next


## Features
List the ready features here:
- Creating user accounts using email/password and social accounts (supported by firebase)/
- Categories management - create your own product categories, upload your own image if default ones are not enough.
- Products management - interface made to support quick product quantity changes, information about epired products
- Sharing storage with others - invite or got invited to share storage with other, great to have household storeroom manage by whole family
- Get notifications when something changes by others or expiry date is near


## Screenshots
![Example screenshot](./img/screenshot.png)
(./screenshots/screenshot_categories.png)
(./screenshots/screenshot_products_in_category.png)
(./screenshots/screenshot_shares.png)
<!-- If you have screenshots you'd like to share, include them here. -->


## Setup
You can take all the files of this site and run them just on your computer as if it were live online, only it's just on your machine.
Requirements

    Node.js
    firebase-tools
    Git

If you have installed GitHub Desktop, Git was also installed automatically.

To copy the repository's files from here onto your computer and to view and serve those files locally, at your computer's command line type:

git clone https://github.com/magdololo/mystorage-ts-redux
cd mystorage-ts-redux

`npm install` to install all req'd dependencies

`npm start` to start the local server (this project uses create-react-app)

Open http://localhost:3000 in your browser


## Project Status
Project is: _in progress_ / _complete_ / _no longer being worked on_. If you are no longer working on it, provide reasons why.
- In Progess
- - Migration from Tailwind to Styled Components
- - Covering system actions with notifications
- Completed



## Room for Improvement
Room for improvement:
- Listen to the server data changes
- Data caching

To do:
- Other social media login providers
- Suppport other development platforms such us Supabase



## Contact
Created by magdololo - feel free to contact me!


