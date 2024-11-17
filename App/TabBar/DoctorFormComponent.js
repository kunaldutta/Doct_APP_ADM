import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const DoctorFormComponent = () => {
  const [city, setCity] = useState('');
  const [clinic, setClinic] = useState('');
  const [state, setState] = useState('');
  const [contact, setContact] = useState('');

  const navigation = useNavigation();

  const handleSubmit = async () => {
    // Validate input fields
    if (!city || !clinic || !state || !contact) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const formData = { city, clinic, state, contact };

    try {
      const response = await fetch('https://developersdumka.in/ourmarket/submit_clinic.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Success RES:', result.data);
        console.log('Success:', result.message);
        Alert.alert('Success', result.message, [
          {
            text: 'OK',
            onPress: () => {
              // Navigate to another screen
              navigation.navigate('DoctorInfo', {
                clinic_id: result.data.clinic_id, // Pass data here
              });// Replace with your target screen's name
            },
          },
        ]);
        setCity('');
        setClinic('');
        setState('');
        setContact('');
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>City Name</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
        />

        <Text style={styles.label}>Clinic / Hospital Name</Text>
        <TextInput
          style={styles.input}
          value={clinic}
          onChangeText={setClinic}
        />

        <Text style={styles.label}>State Name</Text>
        <TextInput
          style={styles.input}
          value={state}
          onChangeText={setState}
        />

        <Text style={styles.label}>Contact Detail</Text>
        <TextInput
          style={styles.input}
          value={contact}
          onChangeText={setContact}
        />

        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 20,
  },
  backButton: {
    height: 40,
    width: 40,
    backgroundColor: 'black',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    marginTop: 150,
    width: '80%',
  },
  label: {
    marginVertical: 10,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default DoctorFormComponent;
