import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Medicine = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hello, Med Screen!</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center', // Centers vertically
      alignItems: 'center', // Centers horizontally
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  });

export default Medicine;