# Workout Buddy

## Project setup

```
git clone https://github.com/brianyamasaki/WorkoutBuddyVue
cd WorkoutBuddyVue
npm install
```

You will need to create a `.env.local` file with the appropriate data from your firebase instance. The file should basically look like the following, except you'll fill it out with the correct data from Firebase's Cloud Storage.

```
VUE_APP_FIREBASE_API_KEY=""
VUE_APP_FIREBASE_AUTH_DOMAIN=""
VUE_APP_FIREBASE_DATABASE_URL=""
VUE_APP_FIREBASE_PROJECT_ID=""
VUE_APP_FIREBASE_STORAGE_BUCKET=""
VUE_APP_FIREBASE_MESSAGING_SENDER_ID=""
VUE_APP_FIREBASE_APP_ID=""
```

### Compiles and hot-reloads for development

To start the development server that include hot module loading.

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

This project created with the Vue2 Command Line Interface.

See [Configuration Reference](https://cli.vuejs.org/config/).

## Features

### Ideas

- allow manual and automatic sorting of workout items
- allow aerobic vs. weight items
- allow saving of adjustments for weight machines
- different workouts per day of week
- calendar to record workouts completed
- integration with calendar apps
- hide the description until the user explicitly wants it
- add check marks to completed exercises and gray them out
- add personal goals section
- add history dates to workouts

### Issues

Currently we treat editing and saving workouts and exercises within the workouts differently.

- Adding/Deleting workouts happen immediately and don't require hitting the Save button. This is because we update the database immediately with all changes as soon as the user adds/deletes workouts. Note that you can't edit anything about the workout from this page after adding it.
- Adding/changing anything within a workout requires hitting the Save button. This is because I don't want to update the database for every keystroke change to the workout. We get charged for reads and writes from the database. Much cheaper to write to the database when the user is done with changes.

## Authentication

We currently use the Firebase Email/password authentication provider. At some point, we can use OAuth from other providers if needed. Since security is probably not too high of an issue, users can log in once and never log out again.

## How Workouts are organized

- Users can have a list of Workouts
- Workouts consist of a title, a description, and a list of exercises
- Exercises consist of a description, sets, reps and weight

### Database Organization

We created a database organization based on the workout scheme described above. Currently, when a person creates and account, they create a USER document. That USER contains a collection of WORKOUTs
