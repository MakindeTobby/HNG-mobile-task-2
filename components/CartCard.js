import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../store/Slices/CartSlice";
import { hp } from "../helpers/common";
import { theme } from "../constants/theme";
import { FontAwesome } from "@expo/vector-icons";

const CartCard = ({ item }) => {
  const dispatch = useDispatch();
  const price = item.current_price?.[0]?.NGN[0] ?? "N/A";
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => handleRemove(item.id)}
        style={styles.removeButton}
      >
        <Text style={styles.removeButtonText}>x</Text>
      </TouchableOpacity>
      <Image
        style={styles.itemImage}
        source={{
          uri: `https://api.timbu.cloud/images/${item?.photos[0]?.url}`,
        }}
      />

      <View style={styles.contentBox}>
        <Text style={styles.itemTitle} numberOfLines={1} ellipsizeMode="tail">
          {item.name}
        </Text>
        {/* <View style={styles.header}>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <Text>x{item.quantity}</Text>
      </View> */}
        <View style={[styles.counterCont]}>
          <Text
            style={{
              fontSize: hp(2),
              fontWeight: "bold",
            }}
          >
            ₦{price * item.quantity}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Pressable
              style={[styles.sizeButton, { backgroundColor: "#f0f0f0" }]}
              onPress={() => handleDecrease(item.id)}
            >
              <FontAwesome name="minus" size={13} />
            </Pressable>
            <Text style={styles.sizeText}>{item.quantity}</Text>
            <Pressable
              style={[styles.sizeButton, { backgroundColor: "#f0f0f0" }]}
              onPress={() => handleIncrease(item.id)}
            >
              <FontAwesome name="plus" size={13} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  title: {
    fontSize: hp(3),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.9),
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
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "relative",
  },
  contentBox: {
    flex: 1,
    marginLeft: 10,
  },
  itemImage: {
    height: 70,
    width: 58,
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
    borderTopEndRadius: theme.radius.md,
    backgroundColor: theme.colors.primary,
    top: 0,
    right: 0,
  },
  removeButtonText: {
    color: "white",
  },
  startButton: {
    marginBottom: 5,
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
  counterCont: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sizeButton: {
    width: 43,
    height: 43,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  sizeText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
