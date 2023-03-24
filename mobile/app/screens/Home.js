import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

function Home(props) {
    return (
        <SafeAreaView style={styles.home}>
            <Text>Website Home Page</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create
({
    home:
    {
        flex: 1,
        backgroundColor: '#51684a',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
    }
})

export default Home;