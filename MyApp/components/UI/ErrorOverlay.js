import { View, StyleSheet, Text, Button } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

function ErrorOverlay({ message, onConfirm }) {
    return (
        <View style={styles.container} >
            <Text style={styles.message} >Error occurred!</Text>
            <Text style={styles.message} >{message}</Text>
            <Button onPress={onConfirm} title="Okay" color="white"></Button>
        </View>
    )

}

export default ErrorOverlay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    message: {
        fontSize: 16,
        color: 'white',
        marginBottom: 8,
    }
})