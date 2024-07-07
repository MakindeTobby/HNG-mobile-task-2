import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { hp, wp } from "../helpers/common";
import { theme } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";

const ProductCard = ({ item }) => {
  const navigation = useNavigation();
  const price = item.current_price?.[0]?.NGN[0] ?? "N/A";
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Details", { ...item })}
    >
      <View style={styles.product}>
        <View style={styles.imgCont}>
          <Image
            resizeMode="cover"
            style={styles.imageUrl}
            source={{
              uri: `https://api.timbu.cloud/images/${item?.photos[1]?.url}`,
            }}
          />
        </View>
        <View style={styles.header}>
          <Text
            style={styles.productName}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.name}
          </Text>
        </View>
        <View style={{ paddingVertical: 2 }}>
          <Text
            style={{
              fontWeight: theme.fontWeights.bold,
              fontSize: hp(2),
              textAlign: "center",
            }}
          >
            ₦{price}
          </Text>
        </View>

        {/* <View className="pt-2 flex-col items-start">
        <TouchableOpacity
          style={styles.buttonStyle}
          //   onPress={() => addToCheckout(item)}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View> */}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  header: {
    paddingVertical: hp(1),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: wp(2),
  },
  productName: {
    marginTop: 4,
    fontSize: hp(2),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.8),
  },
  productPrice: {
    fontSize: hp(2),
    color: theme.colors.primary,
    paddingHorizontal: 10,
  },
  imgCont: {
    backgroundColor: theme.colors.neutral(0.1),
    width: "100%",
    height: hp(25),
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    borderCurve: "continuous",
    overflow: "hidden",
  },
  product: {
    flex: 1,
    marginHorizontal: 8,
    marginBottom: wp(1),
    color: "#fff",
  },
  imageUrl: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  buttonStyle: {
    //  className="px-5 py-2 rounded-full  "
    backgroundColor: theme.colors.primary,
    color: "#fff",
    paddingHorizontal: wp(2),
    paddingVertical: hp(1.2),
    borderRadius: theme.radius.xs,
    borderCurve: "continuous",
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: hp(1.6),
    fontWeight: theme.fontWeights.bold,
  },
});
