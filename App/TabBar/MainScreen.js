import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import CitySelector from './CitySelector';
import StateSelector from './StateSelector';

const MainScreen = ({ navigation }) => {
  const [isCitySelectorVisible, setCitySelectorVisible] = useState(false);
  const [isStateSelectorVisible, setStateSelectorVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch clinics based on selected city and state
  const fetchClinics = async () => {
    if (!selectedCity || !selectedState) {
      Alert.alert('Error', 'Please select both city and state.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://developersdumka.in/ourmarket/get_clinics.php?state=${selectedState}&city=${selectedCity}`
      );
      const result = await response.json();
      console.log('Success:', result);
      if (response.ok && result.status === 'success') {
        setClinics(result.clinics);
      } else {
        Alert.alert('Error', 'Failed to fetch clinics');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not fetch clinics');
    } finally {
      setLoading(false);
    }
  };

  // Trigger clinic fetch when both state and city are selected
  useEffect(() => {
    if (selectedState && selectedCity) {
      fetchClinics();
    }
  }, [selectedState, selectedCity]);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setCitySelectorVisible(false);
  };

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setStateSelectorVisible(false);
  };
  const handleClinicSelect = (clinicName, clinic_id) => {
    // Navigate to the "ClinicDetails" screen and pass the clinic name as a parameter
    navigation.navigate('ClinicDetails', { clinicName, clinic_id });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select City and State</Text>

      <Button title="Select City" onPress={() => setCitySelectorVisible(true)} />
      {selectedCity ? <Text>Selected City: {selectedCity}</Text> : null}

      <Button title="Select State" onPress={() => setStateSelectorVisible(true)} />
      {selectedState ? <Text>Selected State: {selectedState}</Text> : null}

      <CitySelector
        isVisible={isCitySelectorVisible}
        onClose={() => setCitySelectorVisible(false)}
        onSelect={handleCitySelect}
        state={selectedState}
      />

      <StateSelector
        isVisible={isStateSelectorVisible}
        onClose={() => setStateSelectorVisible(false)}
        onSelect={handleStateSelect}
      />
      <Button
        title="Go to Doctor Form"
        onPress={() => navigation.navigate('DoctorForm')}
      />
      {loading ? (
        <Text>Loading Clinics...</Text>
      ) : (
        <>
          {clinics.length > 0 ? (
            <FlatList
              data={clinics}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleClinicSelect(item.clinic_name, item.clinic_id)}>
                <View style={styles.clinicItem}>
                  <Text style={styles.clinicName}>{item.clinic_name}</Text>
                  <Text>Clinic Contact: {item.clinic_contact}</Text>
                </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text>No clinics found for the selected city and state.</Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  clinicItem: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  clinicName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MainScreen;
