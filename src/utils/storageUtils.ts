import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { storage, auth } from '../firebase';

export const uploadImageToStorage = async (base64String: string, path: string): Promise<string> => {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('User not authenticated');
    }

    // Ensure the path is scoped to the user
    const fullPath = `users/${user.uid}/${path}`;
    const storageRef = ref(storage, fullPath);

    // Assuming base64String is a data URL (e.g., "data:image/jpeg;base64,...")
    // If it's just the base64 data, use 'base64' instead of 'data_url'
    const format = base64String.startsWith('data:') ? 'data_url' : 'base64';

    try {
        const snapshot = await uploadString(storageRef, base64String, format);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error) {
        console.error('Error uploading image to Firebase Storage:', error);
        throw error;
    }
};
