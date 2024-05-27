import {
    View,
    Text,
    Pressable,
    Image,
    TextInput,
    FlatList,
    ListRenderItem,
  } from 'react-native';
  import React, { Component } from 'react';
  import { styled } from 'nativewind';
  import { getDatabase, ref, onValue } from 'firebase/database';
  import { SafeAreaView } from 'react-native-safe-area-context';
  
  const StyledPressable = styled(Pressable);
  const StyledText = styled(Text);
  const StyledImage = styled(Image);
  const StyledInput = styled(TextInput, {
    props: {
      placeholderTextColor: 'color',
    },
  });
  
  interface User {
    id: string;
    name: string;
    profile_picture: string;
  }
  
  interface HomeProps {
    navigation: any;
  }
  
  interface HomeState {
    data: User[];
  }
  
  class HomeScreen extends Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
      super(props);
      this.state = {
        data: [],
      };
    }
  
    componentDidMount() {
      const db = getDatabase();
      const starCountRef = ref(db, 'users/');
      onValue(starCountRef, (snapshot) => {
        const dataFromSnapshot = snapshot.val();
        if (dataFromSnapshot) {
          const dataArray = Object.keys(dataFromSnapshot).map((key) => ({
            id: key,
            ...dataFromSnapshot[key],
          }));
          this.setState({ data: dataArray });
        } else {
          this.setState({ data: [] });
        }
      });
    }
  
    renderItem: ListRenderItem<User> = ({ item }) => (
      <Itemadded name={item.name} ImageUrl={item.profile_picture} />
    );
  
    render() {
      const { navigation } = this.props;
      const { data } = this.state;
  
      return (
        <SafeAreaView>
          <View>
            <StyledPressable
              onPress={() => {
                navigation.navigate('AddItem');
              }}
              className="flex border-2 bg-blue-500 mt-2 p-5 rounded-full mx-10"
            >
              <Text>Add TODO</Text>
            </StyledPressable>
  
            <FlatList
              data={data}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        </SafeAreaView>
      );
    }
  }
  
  interface ItemAddedProps {
    name: string;
    ImageUrl: string;
  }
  
  class Itemadded extends Component<ItemAddedProps> {
    render() {
      const { name, ImageUrl } = this.props;
  
      return (
        <View>
          <View className="flex flex-row">
            <View className="w-12 h-12 bg-red-500 rounded-full overflow-hidden">
              <StyledImage
                style={{ width: 50, height: 50 }}
                source={{ uri: ImageUrl }}
              />
            </View>
            <View className="ml-4">
              <Text>{name}</Text>
            </View>
          </View>
        </View>
      );
    }
  }
  
  export default HomeScreen;
  