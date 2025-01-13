# Any-Share: A Secure File-Sharing Platform

This repository contains a **full-stack file-sharing application** built with Next.js (App Router), React, Firebase (Firestore + Storage), Tailwind CSS, and Clerk (for user authentication). It enables users to:

- Upload files to Firebase Storage
- Securely store metadata in Firestore
- Optionally protect files with passwords
- Generate short URLs for file sharing
- Send share links via email
- View and manage uploaded files in a user dashboard

Below is a comprehensive guide on how this project is structured, how to set it up (including Firebase configuration), and how to run it locally.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Firebase Setup](#firebase-setup)
5. [Environment Variables](#environment-variables)
6. [Installation & Running Locally](#installation--running-locally)
7. [File-Sharing Flow](#file-sharing-flow)
8. [Firestore Security Rules](#firestore-security-rules)
9. [Deployment](#deployment)
10. [License](#license)

---

## Features

1. **User Authentication**: Leveraging [Clerk](https://clerk.com/) for user sign-up, sign-in, and session management.
2. **Secure File Upload**: Users can upload files to Firebase Storage; file metadata (size, type, name, etc.) is saved in Firestore.
3. **Optional Password Protection**: Users can apply a password to a file. Recipients must know the password to access the file.
4. **Short URLs**: Each file can generate a short URL for easy sharing, e.g. `http://localhost:3000/f/docId`.
5. **Email Sharing**: Share links via email to recipients.
6. **Dashboard**: A user can see all their files, along with file details and a link to view or share them.

---

## Tech Stack

- **Next.js (App Router)**: Server Components, Routing, and overall frontend framework.
- **React**: Client-side components and hooks for handling state and UI.
- **Firebase**:
  - **Firestore**: NoSQL database to store file metadata.
  - **Storage**: To store the actual file contents.
- **Clerk**: Authentication and user management (email/password, social login, etc.).
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Email** (optional): For building and sending beautiful email templates.

---

## Project Structure

A condensed look at key folders and files:

```
any-share/
├─ app/
│  ├─ page.js // Landing or home page
│  ├─ globals.css // Global CSS with Tailwind directives
│  ├─ (dashboard)/ // Contains dashboard-related routes
│  │  ├─ files/ // Display all user-uploaded files
│  │  └─ file-preview/ // Preview and share individual files
│  ├─ f/ // Short URL handler
│  │  └─ [fileId]/page.js // Redirect logic for short URLs
├─ components/ // Reusable React components
├─ firebaseConfig.js // Firebase initialization
├─ .env.local // Environment variables (not committed)
├─ README.md // This file
└─ …
```

### Notable Files

- **`/app/short/[shortUrl]/page.js`**  
  Handles short URL redirection by fetching the stored long URL from Firestore (or via an API) and redirecting.

- **`/app/(dashboard)/files/_components/FileList.js`**  
  Shows a table of the user’s files, with options to view or share each file.

- **`firebaseConfig.js`**  
  Contains Firebase initialization logic using credentials from environment variables.

- **`Firestore Rules`**  
  Configurable in your Firebase console or `firestore.rules` file (see [Firestore Security Rules](#firestore-security-rules)).

---

## Firebase Setup

1. **Create a Firebase Project**  
   Go to [Firebase Console](https://console.firebase.google.com/) and create a new project (or use an existing one).

2. **Enable Firestore**

   - In your Firebase project, navigate to **Build > Firestore**.
   - Choose “Start in test mode” if you’re just testing locally (or set proper rules for production).

3. **Enable Storage**

   - In your Firebase project, go to **Build > Storage**.
   - Create a Storage bucket (default is fine).
   - Set the security rules as needed (test mode or restricted mode).

4. **Obtain Firebase Config**  
   Go to **Project Settings > General** and find your “Web apps” section.  
   Copy the configuration (apiKey, authDomain, projectId, storageBucket, etc.).

5. **Configure in `firebaseConfig.js`**

   ```js
   // firebaseConfig.js
   import { initializeApp } from "firebase/app";
   import { getFirestore } from "firebase/firestore";
   import { getStorage } from "firebase/storage";

   const firebaseConfig = {
     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
     measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
   };

   const app = initializeApp(firebaseConfig);
   const db = getFirestore(app);
   const storage = getStorage(app);

   export { app, db, storage };
   ```

Environment Variables

Create a file named .env.local (or use .env) in the root of your project. Make sure never to commit this file to version control.

Below is an example of what you might include:

```
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID

# Clerk environment variables

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY=YOUR_CLERK_SECRET_KEY


# Domain

NEXT_PUBLIC_DOMAIN=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Optional Resend API key for sending emails

RESEND_API_KEY=YOUR_RESEND_API_KEY

    Note: NEXT_PUBLIC_ prefix indicates these variables can be exposed on the client side. Sensitive keys (like CLERK_SECRET_KEY) should not have a NEXT_PUBLIC_ prefix, but may still reside in .env.local.
```

## Installation & Running Locally

### 1. Clone the Repository

```bash
git clone https://github.com/raj978/any-share.git
cd any-share
```

### 2. Install Dependencies

```bash
npm install
```

**or**

```bash
yarn
```

### 3. Add Environment Variables

Create a `.env.local` file in the project root and fill in the variables.

### 4. Run the Development Server

```bash
npm run dev
```

**or**

```bash
yarn dev
```

- Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### 5. Build & Start (Production)

```bash
npm run build
npm run start
```

This compiles the project for production and then starts it.

## File-Sharing Flow

### 1. User Sign-In

- The user signs in via Clerk.

### 2. File Upload

- The user selects a file to upload.
- The file is uploaded to Firebase Storage; metadata is saved in Firestore (`uploadedFile` collection).

### 3. Optional Password Protection

- The user can set a password for the file; it will be stored in the `uploadedFile` document.

### 4. Short URL

- A short URL (e.g., [http://localhost:3000/f/docId](http://localhost:3000/f/docId)) is generated and saved under the document’s `shortUrl` field.

### 5. Sharing & Email

- The user can share the short URL or send it by email.
- The recipient visits the short URL and (if applicable) enters the password to access the file.

## Firestore Security Rules

### Example Development Rules

While developing locally, you may allow all reads/writes in Firestore:

```plaintext
rules_version = '2';
service cloud.firestore {
    match /databases/{database}/documents {
        match /uploadedFile/{document=**} {
            allow read, write: if true;
        }
    }
}
```

**Warning:** Use this only in development or testing. For production, tighten rules.

### Production Rules Example

If you want only the user who owns a file to read/write it, you can do something like:

```plaintext
rules_version = '2';
service cloud.firestore {
    match /databases/{database}/documents {
        match /uploadedFile/{document=**} {
            allow read, write: if request.auth != null
                && request.auth.token.email == resource.data.userEmail;
        }
    }
}
```

**Note:** This assumes you’re using Firebase Auth and storing the user’s email in the document. If you’re using Clerk, you’d have to create a custom token or relax these rules, because Firestore’s `request.auth.token.email` typically comes from Firebase Auth, not Clerk.

## Deployment

### 1. Vercel

- Easiest route for Next.js.
- Set environment variables in your Vercel project settings.
- Deploy directly from GitHub or local CLI.

### 2. Firebase Hosting

- Possible if you have a custom server setup or are using the Next.js Firebase hosting integration.

### 3. Other Platforms

- You can deploy on AWS Amplify, Netlify, or any environment supporting Node.js + Next.js.

**Remember to set your production environment variables in whichever platform you deploy to.**

## License

This project is licensed under the MIT License. Feel free to modify and distribute.
