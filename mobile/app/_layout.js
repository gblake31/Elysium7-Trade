import { Stack } from "expo-router";

const Layout = () => 
{
    return <Stack
      initialRouteName="home"
      screenOptions={{
        title: "",
        headerStyle: {
          backgroundColor: "#234423",
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