import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

const ClinicDetails = ({ navigation, route }) => {
  const { clinicName, clinic_id } = route.params;
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch doctor data
  const fetchDoctors = async () => {
    console.log('Fetching doctors for clinic_id:', clinic_id);
    setLoading(true);
    setError(null); // Reset error
    try {
      const response = await axios.post(
        'https://developersdumka.in/ourmarket/get_doctor_info.php',
        { clinic_id: clinic_id },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log('API response:', response.data);

      if (response.data.status === 'success') {
        setDoctors(response.data.doctors);
      } else {
        setError(response.data.message || 'An unexpected error occurred');
      }
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setError('Failed to load doctors. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Call fetchDoctors when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchDoctors();
    }, [clinic_id])
  );

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddDoctor = () => {
    navigation.navigate('DoctorInfo', {
      clinic_id: clinic_id, // Pass data here
    });
  };

  // Handler to navigate to the DoctorDetails screen
  const handleDoctorSelect = (doctor) => {
    navigation.navigate('UpdateDoctorInfo', {
      doctorData: doctor, // Pass the selected doctor data
    });
  };

  // Render a single doctor item
  const renderDoctor = ({ item }) => (
    <TouchableOpacity
      style={styles.doctorItem}
      onPress={() => handleDoctorSelect(item)} // Call the handler with the doctor data
    >
      <Image source={{ uri: item.doctor_image }} style={styles.doctorImage} />
      <View style={styles.doctorInfo}>
        <Text style={styles.doctorName}>{item.doctor_name}</Text>
        <Text style={styles.doctorSpec}>Specialist: {item.doctor_spec}</Text>
        <Text style={styles.doctorExp}>Experience: {item.doctor_exp} years</Text>
        <Text style={styles.doctorSpec}>{item.degree}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Clinic Details</Text>
      <Text style={styles.clinicName}>Clinic Name: {clinicName}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="blue" style={styles.loading} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={doctors}
          renderItem={renderDoctor}
          keyExtractor={(item) => item.doctor_id.toString()}
        />
      )}
      <TouchableOpacity onPress={handleAddDoctor} style={styles.button}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Add Doctor</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  backButton: {
    height: 40,
    width: 40,
    backgroundColor: 'black',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 40,
    width: '50%',
    backgroundColor: 'black',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    left: '25%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  clinicName: {
    fontSize: 18,
    marginBottom: 20,
  },
  doctorItem: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    height: 90,
  },
  doctorImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    margin: 10,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  doctorSpec: {
    fontSize: 16,
    color: '#555',
  },
  doctorExp: {
    fontSize: 14,
    color: '#777',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  loading: {
    marginTop: 20,
  },
});

export default ClinicDetails;
