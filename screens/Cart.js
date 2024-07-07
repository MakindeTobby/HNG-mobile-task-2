import React from "react";
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  Text,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CartCard from "../components/CartCard";
import { hp } from "../helpers/common";
import { theme } from "../constants/theme";
import { clearCart } from "../store/Slices/CartSlice";
import { useNavigation } from "@react-navigation/native";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cart);

  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSubmitOrder = () => {
    // Your order submission logic
    // For example, an API call to submit the order
    // If the order submission is successful:
    navigation.navigate("Complete");
    dispatch(clearCart());
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop }]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My Cart</Text>
        </View>
      </View>
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View>
            <Image
              style={styles.cartCont}
              source={require("../assets/images/cart.png")}
            />
          </View>
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <CartCard item={item} />}
          />

          <View>
            <Pressable style={styles.startButton} onPress={handleSubmitOrder}>
              <Text style={styles.startText}>SUBMIT ORDER</Text>
            </Pressable>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  title: {
    fontSize: hp(3),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.9),
    marginHorizontal: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#4B5563",
  },

  contentBox: {
    flex: 1,
    marginLeft: 10,
  },
  itemImage: {
    height: 56,
    width: 56,
    borderRadius: 10,
  },
  itemTitle: {
    fontWeight: "bold",
    color: "#4B5563",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginVertical: 5,
  },
  quantityButton: {
    paddingVertical: 1,
    paddingHorizontal: 6,
    borderRadius: 5,
    backgroundColor: theme.colors.dark,
    marginHorizontal: 1,
  },
  header: {
    paddingVertical: hp(0.8),
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButtonText: {
    color: "white",
    fontSize: 15,
  },
  itemQuantity: {
    fontWeight: "bold",
    fontSize: 16,
  },
  itemPrice: {
    fontWeight: "600",
    fontSize: 16,
  },
  removeButton: {
    position: "absolute",
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    bottom: 0,
    right: 0,
  },
  removeButtonText: {
    color: "white",
  },
  startButton: {
    marginBottom: 5,
    marginHorizontal: 10,
    backgroundColor: theme.colors.primary,
    padding: 15,
    paddingHorizontal: 90,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
  },
  startText: {
    color: theme.colors.white,
    fontSize: hp(2),
    letterSpacing: 1,
    alignSelf: "center",
  },
  cartCont: {
    width: 100,
    height: 100,
  },
});
