import { Account, Avatars, Client, Databases, ID, Query ,Storage } from "react-native-appwrite";
import { CreateUserPrams , SignInParams } from "@/type";
import SignIn from "@/app/(auth)/sign-in";
import { User } from "@/type";
import { GetMenuParams } from "@/type";


export const appwriteConfig ={
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID ,
    platform: "com.echo.foodordering",
    databaseId: "68cfdaf1002dd88823c9",
    bucketId : "68d3e6aa000256118586",
    userCollecionId: "user",
    categoriesCollectionId: 'categories',
    menuCollectionId: 'menu',
    customizationsCollectionId: 'customizations',
    menuCustomizationCollectionId: 'menu_customizations',
};

export const client = new Client();
client
    .setEndpoint(appwriteConfig.endpoint!)
    .setProject(appwriteConfig.projectId!)
    // .setPlatform(appwriteConfig.platform!)

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

export const createUser = async({email, password ,name}: CreateUserPrams) =>{
    try{
         const newAccount = await account.create(ID.unique(), email, password , name);
         if(!newAccount) throw Error("failed to create account");

         await SignInUser({email, password});

         const avatarUrl = avatars.getInitialsURL(name);

         return await databases.createDocument(
           appwriteConfig.databaseId,
           appwriteConfig.userCollecionId,
           ID.unique(),
           { 
            email,
            name,
            accountId:newAccount.$id,
            avatar:avatarUrl
            }
         );

     } catch(e){
        throw new Error(e as string);
    }
}

export const SignInUser = async({email, password}: SignInParams) =>{
    try{
        const Session = await account.createEmailPasswordSession(email, password);
    } catch (e){
            throw new Error (e as string);
    }
}

export const getCurrentuser = async (): Promise<User | null> => {
  try {
    const currentAccount = await account.get();

    const currentUser = await databases.listDocuments<User>(
      appwriteConfig.databaseId,
      appwriteConfig.userCollecionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    return currentUser.documents.length > 0 ? currentUser.documents[0] : null;
  } catch (e) {
    console.log("getCurrentuser error:", e);
    return null;
  }
};


export const getMenu = async({category, query}:GetMenuParams) =>{
  try{
    const queries: string[] = [];

    if (category) queries.push(Query.equal('categories',category));
    if (query) queries.push(Query.search('name',query));

    const menus =await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      queries,
    );

    return menus.documents;
  } catch (e){
    throw new Error (e as string);
  }
};


export const getCategories = async() =>{
  try{
    const categories = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId,
    )
  } catch (e){
    throw new Error (e as string);
  }
}