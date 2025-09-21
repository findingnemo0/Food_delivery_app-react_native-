import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";
import { CreateUserPrams , SignInParams } from "@/type";
import SignIn from "@/app/(auth)/sign-in";

export const appwriteConfig ={
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    platform: "com.echo.foodordering",
    databaseId: '68cfdaf1002dd88823c9',
    userCollecionId: 'user'
}
export const client = new Client();
client
    .setendpoint(appwriteConfig.endpoint)
    .setproject(appwriteConfig.projectId)
    .setplatform(appwriteConfig.platform)

export const account = new Account(client);
export const databaseId = new Databases(client);
const avatars = new Avatars(client);

export const createUser = async({email, password ,name}: CreateUserPrams) =>{
    try{
         const newAccount = await account.create(ID.unique(), email, password , name);
         if(!newAccount) throw Error;

         await SignInUser({email, password});
    } catch(e){
        throw new Error(e as string);
    }
}

export const SignInUser = async({email, password}: SignInParams) =>{
    
}