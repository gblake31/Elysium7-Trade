import "expo-router/entry";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Link, Stack } from "expo-router";
import WelcomeScreen from "./screens/WelcomeScreen";

//const Stack = createNativeStackNavigator();

const App = () =>
{
    console.log("App");
    // check if user is logged in.
    // if not, send to welcome (login/signup) screen
    return (
        /* Use the `Screen` component to configure the layout. */
        // <Stack.Screen options={{ title: "Overview" }} />,
        /* Use the `Link` component to enable optimized client-side routing. */
        //<NavigationContainer>
        //    <Stack.Navigator initialRouteName="WelcomeScreen">
        //        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}/>
        <WelcomeScreen/>
            //</Stack.Navigator>
        //</NavigationContainer>
    );
    // if user is logged in, send to home
}

export default App