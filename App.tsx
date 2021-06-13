/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { registerDependencies } from './src/di/module/app.module';
import { mainReducer } from './src/presentation/common/state';
import { LoginPage } from './src/presentation/login/login.page';
import { ProductPage } from './src/presentation/product/product.page';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashPage } from './src/presentation/splash/splash.page';
import { DetailPage } from './src/presentation/detail/detail.page';
import { ProductEntity } from './src/domain/product/entity';
import { CartPage } from './src/presentation/cart/cart.page';


registerDependencies();
const Stack = createStackNavigator();

export type TopNavigatorParamsList = {
  splash: undefined;
  product: undefined;
  cart: undefined;
  detail: ProductEntity
}


export const AuthenticatedApp = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="product">
          <Stack.Screen name="product" component={ProductPage} options={{ headerShown: false }} />
          <Stack.Screen name="detail" component={DetailPage} />
          <Stack.Screen name="cart" component={CartPage} />
        </Stack.Navigator>
    </NavigationContainer>
  )

}

export const UnauthenticatedApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={LoginPage} options={{headerShown: false}
      }/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const mainStore = createStore(mainReducer);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };



  return (
    <SafeAreaView style={[styles.root, backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Provider store={mainStore}>
        <SplashPage />
      </Provider>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})


export default App;
