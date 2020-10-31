import React, { useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import api from '../services/api'
import { ImovelCard } from '../components'
import { useAuth } from '../contexts/auth'

import colors from '../constants/colors.json'

export default function Favorite() {
  const navigation = useNavigation()
  const { signed } = useAuth()

  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(false)

  const getFavorites = async () => {
    setLoading(true)

    await api
      .get('/user/favorites')
      .then(res => {
        setFavorites(res.data)
      })
      .catch(err => {
        console.error(err)
      })

    setLoading(false)
  }

  const onChangeFavorite = item => {
    // const newProperties = []
    // favorites.forEach(property => {
    //   if (property.id !== item.id) {
    //     newProperties.push(property)
    //   }
    // })
    // setFavorites(newProperties)
    navigation.reset({
      index: 0,
      routes: [{ name: 'Favoritos' }],
      key: 'Home'
    })
  }

  useEffect(() => {
    if (signed) {
      getFavorites()
    }
  }, [signed])

  if (!signed) {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text numberOfLiner={2} style={styles.title}>
          Favoritos
        </Text>
      </KeyboardAvoidingView>
    )
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text numberOfLiner={2} style={styles.title}>
        Favoritos
      </Text>

      <SafeAreaView style={styles.listContainer}>
        <FlatList
          data={favorites}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          onRefresh={() => getFavorites()}
          refreshing={loading}
          renderItem={({ item }) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('PropertyDetail', { item })}
              >
                <View>
                  <ImovelCard
                    item={item}
                    favorite={true}
                    onChangeFavorite={onChangeFavorite}
                  />
                </View>
              </TouchableWithoutFeedback>
            )
          }}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.platinum,
    paddingVertical: 10,
    paddingHorizontal: 30
  },

  title: {
    margin: 10,
    fontSize: 28,
    fontWeight: '600',
    color: colors.yellow,
    alignSelf: 'center'
  },

  listContainer: {
    flex: 1
  }
})
