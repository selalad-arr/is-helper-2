const admin = require('firebase-admin');
const serviceAccount = require('./service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function checkDocs() {
  const collections = ['user_chapters', 'user_projects', 'user_progress', 'user_reports'];
  for (const collName of collections) {
    console.log(`--- Collection: ${collName} ---`);
    const snapshot = await db.collection(collName).limit(1).get();
    if (snapshot.empty) {
      console.log('Empty');
      continue;
    }
    snapshot.forEach(doc => {
      console.log(`Document ID: ${doc.id}`);
      console.log('Fields:', Object.keys(doc.data()));
      // If it has subcollections (like user_chapters/id/chapters)
      if (collName === 'user_chapters') {
          db.collection(collName).doc(doc.id).collection('chapters').limit(1).get().then(subSnap => {
              subSnap.forEach(subDoc => {
                  console.log(`  SubDoc (chapters) ID: ${subDoc.id}`);
                  console.log('  SubFields:', Object.keys(subDoc.data()));
              });
          });
      }
    });
  }
}

checkDocs();
