import React from 'react'
import { Dimensions, FlatList, Image, TouchableOpacity, PixelRatio } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { formatPhotoUri, getPhotoUri } from '../api/picsum'
import { width } from '../constants'

export default function PhotoGrid({ photos, numColumns, onEndReached }) {
  const size = width / numColumns

  const pixelPerfectSize = PixelRatio.getPixelSizeForLayoutSize(size)

  const navigation = useNavigation();

  return (
    <FlatList
      data={photos}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      onEndReached={onEndReached}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Details", {
            url: getPhotoUri(item.id),
          })}
        >
          <Image
            source={{
              width: size,
              height: size,
              uri: formatPhotoUri(item.id, pixelPerfectSize, pixelPerfectSize),
            }}
          />
        </TouchableOpacity>
      )}
    />
  )
}

