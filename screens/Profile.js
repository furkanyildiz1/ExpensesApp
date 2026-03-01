import { View, Text, StyleSheet, Image, Button } from "react-native";
import { GlobalStyles } from '../constants/styles';

function Profile({ route }) {
    // Eğer login yapıldıktan sonra isim-soyisim parametre olarak geliyorsa "route.params" üzerinden alabilirsiniz.
    // Şimdilik örnek (dummy) veri kullanıyoruz:
    const userName = "Furkan Yıldız";

    // Keza profil fotoğrafı için de örnek bir URL veya yerel resim kullanabilirsiniz:
    const profileImageUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: profileImageUrl }}
                    style={styles.profileImage}
                />
            </View>
            <Text style={styles.nameText}>{userName}</Text>
            <Button title="SAVE" onPress={() => { }} />
        </View>
    );
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: GlobalStyles.colors.primary50,
    },
    imageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60, // Genişlik ve yüksekliğin tam yarısı (tam yuvarlak yapar)
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: GlobalStyles.colors.primary500,
        marginBottom: 20, // Fotoğraf ile altındaki isim arasında boşluk
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: 'white',
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary800,
    }
});