import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Image } from 'react-native';
import { launchCamera, launchImageLibrary, MediaType } from 'react-native-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export default function nickname() {
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState<string | null>(null); // Explicitly typing the state to allow null or string
  const [hasPermission, setHasPermission] = useState(false);

  // Request camera and photo permissions
  useEffect(() => {
    const checkPermissions = async () => {
      const cameraPermission = await request(PERMISSIONS.ANDROID.CAMERA);
      const storagePermission = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

      if (cameraPermission === RESULTS.GRANTED && storagePermission === RESULTS.GRANTED) {
        setHasPermission(true);
      } else {
        setHasPermission(false);
        alert('Permission denied. Please grant camera and storage permissions.');
      }
    };

    checkPermissions();
  }, []);

  const handleProfilePic = () => {
    if (!hasPermission) {
      alert('Permission to access camera or storage is required.');
      return;
    }

    const options = {
      mediaType: 'photo' as MediaType, // Ensure it's a valid MediaType
      includeBase64: false,
    };

    // Launch image picker
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else {
        if (response.assets && response.assets[0]?.uri) {
          setProfilePic(response.assets[0]?.uri); // Only set state if uri is available
        }
      }
    });
  };

  const handleCamera = () => {
    if (!hasPermission) {
      alert('Permission to access camera is required.');
      return;
    }

    const options = {
      mediaType: 'photo' as MediaType, // Ensure it's a valid MediaType
      includeBase64: false,
    };

    // Launch camera to take a photo
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.errorMessage) {
        console.error('Camera Error: ', response.errorMessage);
      } else {
        if (response.assets && response.assets[0]?.uri) {
          setProfilePic(response.assets[0]?.uri); // Only set state if uri is available
        }
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Username with Profile Picture</Text>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />

      {/* Profile Picture Display */}
      {profilePic && <Image source={{ uri: profilePic }} style={styles.profilePic} />}

      {/* Buttons to Set Profile Picture */}
      <Button title="Choose from Gallery" onPress={handleProfilePic} />
      <Button title="Take a Photo" onPress={handleCamera} />

      {/* Display Username */}
      <Text style={styles.usernameText}>{username ? `Username: ${username}` : 'No username set'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  usernameText: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
});
