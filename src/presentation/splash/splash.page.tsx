import React from 'react';
import { AuthenticatedApp, UnauthenticatedApp } from '../../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState } from '../common/state/global.state';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

interface SplashPageProps {}

export const SplashPage : React.FC<SplashPageProps> = (props) => {
    const dispatch = useDispatch()
    const globalState = useSelector<GlobalState, any>((state: any) => state.globalStateReducer)

    const storeData = async (value: string) => {
        try {
          await AsyncStorage.setItem('user', JSON.stringify(value))
        } catch (e) {
            console.log(e)
        }
    }


    const clear = async () => {
        try {
          await AsyncStorage.clear()
        } catch (e) {
            console.log(e)
        }
    }


    const getData = async () => {
        try{
            const value = await AsyncStorage.getItem('user')
            return value
        }catch(e){
            console.log(e)
            return null
        }

    }

    const checkIsLoggedIn = async () => {
        GoogleSignin.configure({
            scopes: [],
            webClientId: "297833717421-qv91o34vft4jc64ni6mdrms7jlfsnp3u.apps.googleusercontent.com"
        })
        const v = await getData()
        const temp = v !== null
        if(temp){
            dispatch({ type: "SET_AUTH"})
        }else{
            await clear()
            dispatch({ type: "CLEAR_AUTH"})
        }

    }
 
    
    const authStateChanged = async (user: any) => {
        if(user != null){
            storeData(user)
            dispatch({ type: "SET_AUTH" })
        }else{
            await clear()
            dispatch({ type: "CLEAR_AUTH" })
        }

    }

    

    React.useEffect(() => {
        checkIsLoggedIn()
        const subscriber = auth().onAuthStateChanged(authStateChanged);
        return subscriber;
    }, [])

    return (
        globalState.isAuthenticated ? <AuthenticatedApp/> : <UnauthenticatedApp/>    

    );
}