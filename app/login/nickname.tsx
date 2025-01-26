import { LinearGradient } from 'expo-linear-gradient';
import colors from '@/constants/color';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const NicknameScreen = () => {
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleImagePick = async () => {
    Alert.alert(
      'Select Image',
      'Choose an option to select a profile picture',
      [
        {
          text: 'Camera',
          onPress: async () => {
            const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
            if (!cameraPermission.granted) {
              Alert.alert('Permission required', 'We need access to your camera to take a picture');
              return;
            }

            const result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });

            if (!result.canceled && result.assets && result.assets[0].uri) {
              saveProfileImage(result.assets[0].uri);
            }
          },
        },
        {
          text: 'Gallery',
          onPress: async () => {
            const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!galleryPermission.granted) {
              Alert.alert('Permission required', 'We need access to your photos to select a profile picture');
              return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });

            if (!result.canceled && result.assets && result.assets[0].uri) {
              saveProfileImage(result.assets[0].uri);
            }
          },
        },
      ]
    );
  };

  const saveProfileImage = async (uri: string) => {
    setProfileImage(uri);
    try {
      await FileSystem.writeAsStringAsync(
        FileSystem.documentDirectory + 'config.json',
        JSON.stringify({ profileImage: uri })
      );
    } catch (error) {
      console.error('Error saving profile image URI:', error);
    }
  };

  const handleUsernameChange = (text: string) => {
    setUsername(text);
    setError('');
  };

 const handleSubmit = () => {
  if (!username.trim()) {
    setError('Username is required');
    return;
  }
  router.push('/login/backup');
};

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Chatterly</Text>

      <TouchableOpacity onPress={handleImagePick} style={styles.dpContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.dpImage} />
        ) : (
          <View style={styles.iconContainer}>
            <Text style={styles.cameraIcon}>📷</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        style={[styles.input, error && styles.errorInput]}
        placeholder="Enter your username"
        placeholderTextColor={colors.secondary}
        value={username}
        onChangeText={handleUsernameChange}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <LinearGradient colors={['#4CAF50', '#8BC34A']} style={styles.optbox}>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.textbox}>Submit</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    color: colors.primary,
    textAlign: 'center',
    fontFamily: 'bold',
    marginBottom: 30,
  },
  dpContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  dpImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    fontSize: 40,
    color: 'white',
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 18,
    color: colors.text,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  optbox: {
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 5,
  },
  textbox: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'bold',
  },
});

export default NicknameScreen;