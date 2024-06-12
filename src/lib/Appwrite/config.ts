import { Client, Account, Databases, Storage, Avatars } from 'appwrite';

export const appwriteConfig = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    url: import.meta.env.VITE_APPWRITE_URL,
    dbId: import.meta.env.VITE_APPWRITE_DB_ID,
    storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    postColId: import.meta.env.VITE_APPWRITE_POSTS_COL_ID,
    usersColId: import.meta.env.VITE_APPWRITE_USERS_COL_ID,
    savesColId: import.meta.env.VITE_APPWRITE_SAVES_COL_ID,
}

export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);


account.get().then(response => {
    console.log('User is logged in', response);
}, error => {
    console.log('User is not logged in', error);
});


