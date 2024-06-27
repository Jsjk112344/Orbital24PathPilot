import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { RouteContext } from '../../context/RouteContext';
import { useNavigation } from '@react-navigation/native';

const SavedTrips = () => {
  const { trips } = useContext(RouteContext);
  const navigation = useNavigation();

  const handleSelectTrip = (trip) => {
    navigation.navigate('TripView', { trip });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectTrip(item)} style={styles.item}>
      <Text style={styles.title}>{item.name != "" ? item.name : "Unnamed Trip"}</Text>
      <Text>{new Date(item.date).toLocaleDateString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={trips}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default SavedTrips;
