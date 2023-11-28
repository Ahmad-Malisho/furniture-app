//import liraries
import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  Text,
} from "react-native";
import styles from "./search.style";
import { Feather, Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import SearchTile from "../components/products/SearchTile";

// create a component
const Search = () => {
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://192.168.100.51:3000/api/products/search/${searchKey}`
      );
      setSearchResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Failed to get product", error);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Ionicons name="camera-outline" size={24} style={styles.searchIcon} />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchKey}
            onChangeText={setSearchKey}
            placeholder="What are you looking for?"
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() => handleSearch()}
          >
            <Feather
              name="search"
              size={SIZES.xLarge}
              color={COLORS.offwhite}
            />
          </TouchableOpacity>
        </View>
      </View>
      {searchResults === 0 ? (
        <View style={{ flex: 1 }}>
          <Image
            source={require("../assets/images/Pose23.png")}
            style={styles.searchImage}
          />
        </View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <SearchTile item={item}/>}
          style={{marginHorizontal: 12}}
        />
      )}
    </SafeAreaView>
  );
};

//make this component available to the app
export default Search;
