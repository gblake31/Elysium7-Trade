import "expo-router/entry";
import { View } from "react-native";
import { Link, Stack } from "expo-router";
import WelcomeScreen from "./screens/WelcomeScreen";

export default function Home() {
    // check if user is logged in.
    // if not, send to welcome (login/signup) screen
    return (
        /* Use the `Screen` component to configure the layout. */
        // <Stack.Screen options={{ title: "Overview" }} />,
        /* Use the `Link` component to enable optimized client-side routing. */
        <WelcomeScreen />
    );
    // if user is logged in, send to home
}