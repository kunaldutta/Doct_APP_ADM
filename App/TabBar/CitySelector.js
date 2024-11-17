import React, { useState, useEffect } from 'react';
import { Modal, View, FlatList, TouchableOpacity, Text, StyleSheet, Button, Alert } from 'react-native';

const CitySelector = ({ isVisible, onClose, onSelect, state }) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (isVisible && state) {
      fetchCities(state);  // Fetch cities based on selected state
    }
  }, [isVisible, state]);

  // Fetch cities based on the state
  const fetchCities = async (state) => {
    try {
      const response = await fetch(`https://developersdumka.in/ourmarket/get_clinic_city.php?state=${state}`);
      const result = await response.json();
      if (response.ok && result.status === 'success') {
        if (result.cities && result.cities.length > 0) {
          setCities(result.cities);
        } else {
          setCities([]);
          Alert.alert('No cities found', 'No cities are available for the selected state.');
        }
      } else {
        Alert.alert('Error', 'Failed to fetch cities');
      }
    } catch (error) {
      setCities([]);
      Alert.alert('Error', 'Could not fetch cities');
    }
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Select City</Text>
          {/* Display a message if no cities are available */}
          {cities.length === 0 ? (
            <Text style={styles.noCitiesText}>No cities available</Text>
          ) : (
            <FlatList
              data={cities}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => onSelect(item)} style={styles.cityItem}>
                  <Text style={styles.cityText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          )}
          <Button title="Close" onPress={onClose} style={styles.closeButton} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noCitiesText: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
  },
  cityItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cityText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
  },
});

export default CitySelector;
