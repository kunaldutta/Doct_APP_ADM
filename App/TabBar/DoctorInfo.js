import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Alert, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';

const DoctorInfo = ({ navigation, route }) => {
  const { clinic_id } = route.params;
  const { doctorData } = route.params;
  console.log('doctorData',doctorData);
  const [doctorName, setDoctorName] = useState('');
  const [doctorExp, setDoctorExp] = useState('');
  const [doctorSpec, setDoctorSpec] = useState('');
  const [doctorDegree, setDoctorDegree] = useState('');
  const [doctorImage, setDoctorImage] = useState(null);
  const [allFieldError, setAllFieldError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const defaultImage = require('../assets/doct.png');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        Alert.alert('Image selection canceled');
      } else if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
      } else {
        setDoctorImage(response.assets[0]);
      }
    });
  };

  const handleSubmit = async () => {
    if (!doctorName || !doctorExp || !doctorSpec || !doctorImage || !doctorDegree) {
      setAllFieldError(true);
      Alert.alert('Please fill in all fields and select an image.');
      return;
    }

    setIsLoading(true); // Start loading

    const formData = new FormData();
    formData.append('clinic_id', clinic_id);
    formData.append('doctor_name', doctorName);
    formData.append('doctor_exp', doctorExp);
    formData.append('doctor_spec', doctorSpec);
    formData.append('doctor_degree', doctorDegree);
    formData.append('doctor_image', {
      uri: doctorImage.uri,
      type: doctorImage.type,
      name: doctorImage.fileName,
    });

    try {
      const response = await axios.post('https://developersdumka.in/ourmarket/submit_doctor_info.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Alert.alert('Success', response.data.message);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };


  // Using useFocusEffect directly without useCallback
  useFocusEffect(() => {
    // This effect will run whenever the screen is focused.
  // Return a cleanup function (optional) that will run when the screen is unfocused.
    return () => {
      console.log('Screen unfocused!');
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <View style={{ left: '1%', width: '80%', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Provide Doctor Detail</Text>
        </View>
      </View>
      <View style={{ padding: 20, flexDirection: 'column' }}>
        <TextInput
          style={styles.input}
          placeholder="Doctor Name"
          value={doctorName}
          onChangeText={setDoctorName}
        />
        {allFieldError && doctorName.length === 0 && <Text style={styles.label}>Enter Name</Text>}
        <TextInput
          style={styles.input}
          placeholder="Doctor Experience"
          value={doctorExp}
          onChangeText={setDoctorExp}
        />
        {allFieldError && doctorExp.length === 0 && <Text style={styles.label}>Enter Experience</Text>}
        <TextInput
          style={styles.input}
          placeholder="Doctor Specialization"
          value={doctorSpec}
          onChangeText={setDoctorSpec}
        />
        {allFieldError && doctorSpec.length === 0 && <Text style={styles.label}>Enter Specialization</Text>}
        <TextInput
          style={styles.input}
          placeholder="Doctor's Degree"
          value={doctorDegree}
          onChangeText={setDoctorDegree}
        />
        {allFieldError && doctorDegree.length === 0 && <Text style={styles.label}>Enter Specialization</Text>}
      </View>
      <Image source={doctorImage?.uri ? { uri: doctorImage.uri } : defaultImage} style={styles.image} />
      {allFieldError && !doctorImage?.uri && <Text style={[styles.label, { left: '40%', top: 10 }]}>Select Image</Text>}
      <View style={{ top: 50 }}>
        {console.log('doctorImage', doctorImage)}
        <Button title="Select Image" onPress={handleSelectImage} />
        <View style={{ marginVertical: 10 }}>
          {isLoading ? (
            <ActivityIndicator size="large" color="black" />
          ) : (
            <Button title= "Submit" onPress={ handleSubmit } />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 20,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    width: '100%',
    paddingHorizontal: 10,
  },
  backButton: {
    height: 40,
    width: 40,
    backgroundColor: 'black',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    top: 50,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginBottom: 10,
    borderRadius: 5,
    height: 40,
  },
  image: {
    width: '30%',
    height: '15%',
    marginTop: 40,
    left: '35%',
  },
  label: {
    top: 40,
    fontSize: 12,
    color: 'red',
  },
});

export default DoctorInfo;
