import { Stack } from "expo-router";

const Layout = () => 
{
    return <Stack
      initialRouteName="home"
      screenOptions={{
        title: "",
        headerStyle: {
          backgroundColor: "#51684a",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShadowVisible: false
      }}
    />
}

export default Layout;