import { View, Text, Pressable, Image, TextInput } from 'react-native';
import React, { Component } from 'react';
import { styled } from 'nativewind';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { FirebaseStorage, auth } from '../../Firebase/Firebase';
import { getDatabase, set, ref as ref1 } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledInput = styled(TextInput, {
  props: {
    placeholderTextColor: 'color',
  },
});

interface AddItemProps {
  navigation: any;
}

interface AddItemState {
  image: string | null;
  name: string | null;
}

class AddItem extends Component<AddItemProps, AddItemState> {
  constructor(props: AddItemProps) {
    super(props);
    this.state = {
      image: null,
      name: null,
    };
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      this.setState({ image: result.assets[0].uri });
    }
  };

  UploadData = async (uri: string | null) => {
    if (!uri) return;

    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = auth.currentUser?.uid;

    if (!filename) {
      console.error('No user is currently logged in.');
      return;
    }

    const storageRef = ref(getStorage(), `images/${filename}`);

    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      getDownloadURL(ref(getStorage(), `images/${filename}`)).then((url) => {
        console.log('url is ' + url);
        this.saveImageUrlToDatabase(url, this.state.name);
      });
    });
  };

  saveImageUrlToDatabase = (downloadURL: string, name1: string | null) => {
    if (!name1) return;

    console.log('name is ' + name1);
    const db = getDatabase();
    set(ref1(db, 'users/' + name1), {
      name: name1,
      profile_picture: downloadURL,
    }).then(() => {
      this.props.navigation.reset({
        index: 0,
        routes: [
          {
            name: 'MainPage',
          },
        ],
      });
    });
  };

  handleNameChange = (value: string) => {
    console.log('value is ' + value);
    this.setState({ name: value });
  };

  render() {
    const { image, name } = this.state;

    return (
      <SafeAreaView>
        <View className="mx-10">
          <Text>Input name</Text>
          <StyledInput
            onChangeText={this.handleNameChange}
            className="border-2 pl-2"
          />

          <View className="w-48 h-48 bg-red-500 rounded-full overflow-hidden">
            <StyledImage
              style={{ width: 190, height: 190 }}
              source={
                image
                  ? { uri: image }
                  : require('../../assets/img/costume-best-animation-movies-the-boss-baby-baby-wallpaper-preview.jpg')
              }
            />
          </View>

          <View>
            <StyledPressable
              onPress={this.pickImage}
              className="bg-blue-500 p-5 mx-10 rounded-full mt-5"
            >
              <Text className="text-center">Upload Image</Text>
            </StyledPressable>
          </View>
          <View>
            <StyledPressable
              onPress={() => {
                this.UploadData(image);
              }}
              className="bg-blue-500 p-5 mx-10 rounded-full mt-5"
            >
              <Text className="text-center">Add item</Text>
            </StyledPressable>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default AddItem;
