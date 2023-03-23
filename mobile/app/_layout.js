import { Stack } from "expo-router";

const Layout = () => 
{
    return <Stack
      initialRouteName="home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#374c37",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    />
}

export default Layout;