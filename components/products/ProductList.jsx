import React from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { COLORS, SIZES } from "../../constants";
import ProductCardView from "./ProductCardView";
import styles from "./productList.style";
import useFetch from "../../hook/useFetch";

const ProductList = () => {
  const { data, isLoading, error } = useFetch();

  if (isLoading) {
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
    </View>;
  }
  return(
    <View style={styles.container}>
      <FlatList
      data = {data}
      numColumns={2}
      renderItem={({item}) => (<ProductCardView item={item}/>)}
      contentContainerStyle={styles.container}
      ItemSeparatorComponent={()=><View style={styles.separator}/>}
      />
        
    </View>
  )
};

export default ProductList;
