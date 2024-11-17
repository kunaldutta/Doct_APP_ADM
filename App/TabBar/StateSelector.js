// StateSelector.js
import React, { useState, useEffect } from 'react';
import { Modal, View, FlatList, TouchableOpacity, Text, StyleSheet, Button, Alert } from 'react-native';

const StateSelector = ({ isVisible, onClose, onSelect }) => {
  const [states, setStates] = useState([]);

  useEffect(() => {
    if (isVisible) {
      fetchStates();
    }
  }, [isVisible]);

  const fetchStates = async () => {
    try {
      const response = await fetch('https://developersdumka.in/ourmarket/get_clinic_states.php');
      const result = await response.json();
      if (response.ok && result.status === 'success') {
        setStates(result.states);
      } else {
        Alert.alert('Error', 'Failed to fetch states');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not fetch states');
    }
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <FlatList
            data={states}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onSelect(item)} style={styles.stateItem}>
                <Text style={styles.stateText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <Button title="Close" onPress={onClose} />
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
  stateItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  stateText: {
    fontSize: 16,
  },
});

export default StateSelector;
