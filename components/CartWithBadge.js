import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { theme } from "../constants/theme";

const CartIconWithBadge = ({ size, color }) => {
  const cartItems = useSelector((state) => state.cart.cart);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <View style={{ width: 24, height: 24, margin: 5 }}>
      <Entypo name="shopping-cart" size={size} color={color} />
      {totalItems > 0 && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{totalItems}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    position: "absolute",
    right: -6,
    top: -3,
    backgroundColor: theme.colors.dark,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default CartIconWithBadge;
