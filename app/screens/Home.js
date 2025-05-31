import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import { useCart } from './../context/CartContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../firebase'; 

const MenuItem = ({ item, onAdd }) => (
  <View style={styles.card}>
    <Image source={{ uri: item.image }} style={styles.image} />
    <View>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>₦{item.price}</Text>
      <Text style={styles.Description}>{item.Description}</Text>
      <AppButton title="Add To Cart" onpress={() => onAdd(item)} />
    </View>
  </View>
);

function Home() {
  const { addToCart } = useCart();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'MenuItems'));
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMenuItems(items);
        console.log(items);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ff6600" />
      </View>
    );
  }

  return (
    <ImageBackground blurRadius={10} style={styles.img} source={require('../img/bkg.jpg')}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MenuItem item={item} onAdd={addToCart} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, flex: 1 },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.67)',
    borderRadius: 50,
    padding: 16,
    marginVertical: 10,
    alignItems: 'center',
  },
  image: { width: 200, height: 120, borderRadius: 8, marginBottom: 10 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  price: { fontSize: 16, color: '#555', marginBottom: 10 },
  img: { flex: 1 },
});

export default Home;
