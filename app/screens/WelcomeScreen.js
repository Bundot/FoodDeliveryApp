import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet, Image, View, Text } from 'react-native';

function WelcomeScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Main"); // Correct screen name
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground style={styles.img} source={require('../img/bkg.jpg')}>
      <View style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end"
      }}>
        <Image source={require('../img/dlv3.png')} />
        <Text style={{
          fontSize: 30,
          fontWeight: 'bold',
          color: 'brown',
          fontStyle: 'italic'
        }}>
         Instant Meals
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  img: {
    flex: 1,
    paddingBottom: "15%"
  },
});

export default WelcomeScreen;
