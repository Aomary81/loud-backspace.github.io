import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View, Text, Platform} from 'react-native';

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ProfilePicture/>
      <StatusBar style="auto" />
      <Text style={styles.nameText}>{name}</Text>
    </View>
  );
}
export default ProfileScreen;

const ProfilePicture = (props) =>(
  <Image
      style={styles.profile}
      source={image}
      />
)

let image = {uri: 'https://picsum.photos/200'}
let name = 'Temporary Name'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecba82',
    alignItems: 'center',
  },
  profile:{
    width: 200,
    height: 200,
    top: 100,
    borderRadius: 200/2,
    borderWidth: 5,
    borderColor: '#81c14b'
  },
  nameText:{
    top: 120,
    fontSize: 30,
    padding: Platform.OS === 'web' ? 120 : 0
  }
});