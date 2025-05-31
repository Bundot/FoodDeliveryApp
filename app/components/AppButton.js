import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

function AppButton({title, onpress}) {
    return (
      <TouchableOpacity onPress={onpress}>
      <View style={styles.button}>
        <Text style={styles.text}>{title}</Text>
      </View>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  
  button: {
    backgroundColor: 'orange',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    // fontSize: 16,
  },
});


export default AppButton;