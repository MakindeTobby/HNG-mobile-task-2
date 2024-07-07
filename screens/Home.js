import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { apiCall } from "../api";
import { getColumnCount, hp, wp } from "../helpers/common";
import { theme } from "../constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const scrollRef = useRef(null);
  const handleScrollUp = () => {
    scrollRef.current?.scrollToOffset({
      offset: 0,
      animated: true,
    });
  };

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    let res = await apiCall();
    if (res?.data) {
      setProducts([...products, ...res?.data?.items]);
      setIsLoading(false);
      //   if (append) {
      //     setImages([...images, ...res.data.hits]);
      //   } else setImages([...res.data.hits]);
      //   setIsLoading(false);
    }
  };
  const numColumns = getColumnCount();

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.loadingContainer, paddingTop]}>
        <ActivityIndicator size="large" color={theme.colors.neutral(0.9)} />
      </SafeAreaView>
    );
  }
  return (
    <View style={[styles.container, { paddingTop }]}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.header}>
        <Pressable onPress={handleScrollUp}>
          <View style={styles.smallCircle}>
            <Image
              style={styles.imageUrl}
              source={require("../assets/images/menu.png")}
              resizeMode="cover"
            />
          </View>
        </Pressable>
        <View style={styles.smallCircle}>
          <Image
            style={styles.imageUrl}
            source={require("../assets/images/user.png")}
            resizeMode="cover"
          />
        </View>
      </View>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>New Arrivals</Text>
        </View>
        {/* {checkoutItems.length > 0 && (
          <View style={styles.smallCircle}>
            <Text style={{ color: "white" }}>{checkoutItems.length}</Text>
          </View>
        )} */}
      </View>

      <FlatList
        scrollEventThrottle={5}
        ref={scrollRef}
        contentContainerStyle={{ gap: 15 }}
        data={products}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ProductCard item={item} />}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        key={numColumns} // Force a re-render when numColumns changes
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(2),
  },
  header: {
    paddingVertical: hp(1),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: wp(2),
  },

  title: {
    fontSize: hp(3),
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.neutral(0.9),
  },
  smallCircle: {
    width: 40,
    height: 40,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "100%",
    backgroundColor: theme.colors.black,
    overflow: "hidden",
  },

  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.neutral(0.02),
    backgroundColor: theme.colors.white,
    padding: 6,
    paddingLeft: 10,
    borderRadius: theme.radius.xs,
  },
  searchIcon: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    borderRadius: theme.radius.sm,
    paddingVertical: 10,
    fontSize: hp(5),
  },
  imageUrl: {
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    padding: 8,
    borderRadius: theme.radius.sm,
  },

  row: {
    flex: 1,
    justifyContent: "space-around",
  },

  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  elevation: {
    elevation: 20,
    shadowColor: "#ddd",
  },
});
