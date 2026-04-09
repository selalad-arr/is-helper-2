---
description: Deploy the IS Helper application to Firebase (hosting, Firestore rules/indexes, optional storage)
---

1. **Build the project**
   ```
   npm run build
   ```
   This compiles the source code and outputs the production files to the `dist` directory.

2. **Deploy to Firebase (Hosting + Firestore)**
   ```
   npx firebase deploy --only hosting,firestore
   ```
   - Hosting: uploads the contents of `dist` to Firebase Hosting.
   - Firestore: publishes `firestore.rules` and `firestore.indexes.json`.

3. **(Optional) Enable Firebase Storage**
   If your project uses Firebase Storage, you must enable it in the Firebase console before deployment:
   - Open the console: https://console.firebase.google.com/project/<YOUR_PROJECT_ID>/storage
   - Click **Get Started** and follow the prompts.
   - After enabling, you can include storage in the deployment:
     ```
     npx firebase deploy --only hosting,firestore,storage
     ```

4. **Verify deployment**
   - Open the hosting URL shown in the terminal (e.g., `https://<PROJECT_ID>.web.app`).
   - Ensure the app loads without errors.

5. **Commit and push** (optional)
   ```
   git add .
   git commit -m "Deploy latest version"
   git push origin main
   ```

**Notes**
- The `npm run dev` command runs a local development server; it is not needed for production deployment.
- If you encounter the error `Firebase Storage has not been set up`, follow step 3 to enable storage.
