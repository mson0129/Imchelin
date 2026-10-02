# Imchelin

## Abstract

Inchelin makes you save time to consider what food to eat.

## Firebase services

The application in `src/public` uses the Firebase browser SDK. Firebase Hosting,
Authentication, database, Firestore, and Storage configuration remains in `src`.

There are no implemented Cloud Functions or Functions configuration in
`src/firebase.json`. The unused Functions starter directory was removed to avoid
retaining an obsolete Node.js 8 dependency tree. If server-side functions are
added, initialize a new Functions project with a supported runtime and current
dependencies, and configure and test it before deployment.
