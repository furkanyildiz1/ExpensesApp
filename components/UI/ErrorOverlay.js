import { View, StyleSheet, Text, Button } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import Button from './Button';

function ErrorOverlay({message, onConfirm}) {
    return (
        <View style={styles.container} >
            <Text style={styles.message} >Error occurred!</Text>
            <Text style={styles.message} >{message}</Text>
            <Button onPress={onConfirm} >Okay</Button>
        </View>
    )

}

export default ErrorOverlay;

const styles = StyleSheet.create({
    continer : {
        flex: 1,
        justifyContent: 'center',
        alıgnItems:'center',
        padding:24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    message : {
        fontSize: 16,
        color: 'white',
        marginBottom: 8,
    }
})