import { View, Text, StyleSheet, Button } from 'react-native';
import Product from '../components/Product';
import { useRouter } from "expo-router";

function Home(props) {
    const router = useRouter();
    return (
        <View style={styles.home}>
            <Text style={styles.title}>Website Home Page</Text>
            <Product itemName={'Keyboard'} price={5} />
            <Product itemName={'Mouse'} price={10} />
            <Button 
                title='Manage Account'
                onPress={() => router.replace('./AccountManagement')} 
            />
        </View>
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
    },
    title: 
    {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
        position: 'absolute',
        top: '33%',
        alignItems: 'center'
    }
})

export default Home;