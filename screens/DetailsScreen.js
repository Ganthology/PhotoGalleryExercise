import React from 'react';
import {
  Image,
  View,
  StyleSheet,
} from 'react-native';
import { width, height } from '../constants';

export function DetailsScreen({route}) {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})