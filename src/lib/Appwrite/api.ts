import { ID, Query } from 'appwrite'
import { INewUser } from "../../types";
import { account, appwriteConfig, avatars, databases } from './config';

export async function createUserAccount(user: INewUser) {
    try {
      const newAccount = await account.create(
        ID.unique(),
        user.email,
        user.password,
        user.name
      );
  
      if (!newAccount) throw Error;
  
      const avatarUrl = avatars.getInitials(user.name);
  
      const newUser = await saveUserToDB({
        accountId: newAccount.$id,
        name: newAccount.name,
        email: newAccount.email,
        username: user.username,
        imageUrl: avatarUrl,
      });
  
      return newUser;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

export async function saveUserToDB(user: {
    accountId: string;
    email: string;
    name: string;
    imageUrl: URL;
    username?: string;
  }) {
    try {
      const newUser = await databases.createDocument(
        appwriteConfig.dbId,
        appwriteConfig.usersColId,
        ID.unique(),
        user
      );
  
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }
  

export async function signInAccount(user: {
    email: string, password: string
}) {

    try {
        console.log(user)
        const session = await account.createEmailPasswordSession(user.email, user.password)
        console.log(await account.get())
        return session;
    } catch (error) {
        console.log(error)
    }
}

export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();
        if (!currentAccount)
            throw Error


        const currentUser = await databases.listDocuments(appwriteConfig.dbId, appwriteConfig.usersColId, [Query.equal('accountId', currentAccount.$id)])
        if (!currentUser)
            throw Error

        return currentUser.documents[0];
    }
    catch (error) {
        console.log(error)
    }
}