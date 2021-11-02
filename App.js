import React, { useEffect, useReducer, useCallback } from 'react'
import { ActivityIndicator, StyleSheet, Text, View, Image, Dimensions} from 'react-native'

import { getList } from './api/picsum'
import { actionCreators, initialState, reducer } from './reducers/photos'
import PhotoGrid from './components/PhotoGrid'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { width, height } from './constants'

export function GalleryScreen({navigation}) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { photos, nextPage, loading, error } = state

  const fetchPhotos = useCallback(async () => {
    dispatch(actionCreators.loading())

    try {
      const nextPhotos = await getList(nextPage)
      dispatch(actionCreators.success(nextPhotos, nextPage))
    } catch (e) {
      dispatch(actionCreators.failure())
    }
  }, [nextPage])

  const onPress = (photoUrl) => {
    navigation.navigate("Details", {
      url: photoUrl,
    })
  }

  useEffect(() => {
    fetchPhotos()
  }, [])

  // We'll show an error only if the first page fails to load
  if (photos.length === 0) {
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={true} />
        </View>
      )
    }

    if (error) {
      return (
        <View style={styles.container}>
          <Text>Failed to load photos!</Text>
        </View>
      )
    }
  }

  return <PhotoGrid numColumns={3} photos={photos} onEndReached={fetchPhotos}/>
}

function DetailsScreen({route}) {
  const { screenWidth, screenHeight } = Dimensions.get('window')

  return (
    <View style={styles.container}>
      <Image
        source={{
          width: width,
          height: height/2,
          uri: route.params.url,
        }}
      />
    </View>
  )
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Gallery" component={GalleryScreen}/>
        <Stack.Screen name="Details" component={DetailsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

