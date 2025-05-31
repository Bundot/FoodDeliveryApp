import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  StyleSheet,
  ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import { useCart } from '../context/CartContext';

function Cart({navigation}) {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [promoCode, setPromoCode] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 3.5 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + tax + deliveryFee;

  return (
    <ImageBackground blurRadius={10} style={styles.img} source={require('../img/bkg.jpg')}>
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>

      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text>Your cart is empty.</Text>
          <AppButton title="Browse Menu" onpress={() => navigation.navigate('Home') } />
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={typeof item.image === 'string' ? { uri: item.image } : item.image} style={styles.image} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>₦{item.price.toFixed(2)}</Text>
                  <View style={styles.controls}>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
                      <Text style={styles.button}>-</Text>
                    </TouchableOpacity>
                    <Text>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
                      <Text style={styles.button}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                      <Text style={styles.remove}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.totalItem}>Item Total: ₦{(item.price * item.quantity).toFixed(2)}</Text>
                </View>
              </View>
            )}
          />

          <View style={styles.summary}>
            <TextInput
              style={styles.promoInput}
              placeholder="Promo Code"
              value={promoCode}
              onChangeText={setPromoCode}
            />
            <Text>Subtotal: ₦{subtotal.toFixed(2)}</Text>
            <Text>Tax (8%): ₦{tax.toFixed(2)}</Text>
            <Text>Delivery: ₦{deliveryFee.toFixed(2)}</Text>
            <Text style={styles.total}>Total: ₦{total.toFixed(2)}</Text>
            <AppButton title={"Proceed to Checkout"} onpress={() => Alert.alert('Order placed!')} />
          </View>
        </>
      )}
    </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20},
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  emptyCart: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.67)',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  image: { width: 80, height: 80, borderRadius: 10 },
  name: { fontSize: 16, fontWeight: 'bold' },
  price: { color: '#666', marginVertical: 4 },
  controls: { flexDirection: 'row', alignItems: 'center', marginVertical: 4, gap: 10 },
  button: { fontSize: 20, width: 30, textAlign: 'center', borderWidth: 1, borderRadius: 5 },
  remove: { color: 'red', marginLeft: 10 },
  totalItem: { fontSize: 14, fontWeight: '600', marginTop: 4 },
  summary: { marginTop: 20, paddingTop: 10, borderColor: '#ddd', backgroundColor: 'rgba(255, 255, 255, 0.67)', padding: 10,
    borderRadius: 10,
    marginBottom: 10, },
  total: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  promoInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10 },
  img: { flex: 1 },
});

export default Cart;
