import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';

type LoginPageProps = {

}

export const LoginPage: React.FC<LoginPageProps> = (props) => {
    const dispatch = useDispatch();

    const onSignInPressed = async () => {
        try {
            GoogleSignin.configure({
                // scopes: [],
                webClientId: "297833717421-qv91o34vft4jc64ni6mdrms7jlfsnp3u.apps.googleusercontent.com"
            })
            const { idToken } = await GoogleSignin.signIn();

            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            await auth().signInWithCredential(googleCredential).catch((error) => {
                console.log(error)
            });
        } catch (e) {
            console.log(e)
        }



    }

    const authStateChanged = (user: any) => {
        //just set true for now
        dispatch({ type: "SET_USER" })
    }

    React.useEffect(() => {
        // auth().onAuthStateChanged
        // const subscriber = auth().onAuthStateChanged(authStateChanged);
        // return subscriber; // unsubscribe on unmount
    }, [])


    return (
        <View style={styles.content}>
            <Image style={styles.image} resizeMode="cover" source={{ uri: "https://images-platform.99static.com/JlRok7x9eORhrnYpdZ0TYXPkJkY=/380x9:1115x744/500x500/top/smart/99designs-contests-attachments/94/94486/attachment_94486850" }} />
            <Text style={styles.desc}>Nikmati pengalaman berbelanja yang mudah, cepat dan murah!</Text>
            <GoogleSigninButton style={styles.signInButton} onPress={onSignInPressed} />
        </View>

    )
}


const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    image: {
        width: 100,
        height: 100
    },
    desc: {
        marginHorizontal: 16,
        fontSize: 13.5,
        color: 'grey',
        marginTop: 16,
        textAlign: 'center'
    },
    signInButton: {
        marginTop: 16
    }
})