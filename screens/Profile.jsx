//import liraries
import React, { useState, useEffect } from "react";
import { View, Image, Text, Alert } from "react-native";
import styles from "./profile.style";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, MaterialCommunityIcons, SimpleLineIcons} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// create a component
const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() =>{
    checkExistingUser();
  },[]);

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem('id')
    const useId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(useId);

      if(currentUser !== null){
        const parsedData = JSON.parse(currentUser)
        setUserData(parsedData)
        setUserLogin(true)
      }else{
        navigation.navigate('Login')
      }
    } catch (error) {
      console.log("Error retrieving the data: ", error);
    }
  };

  const userLogout = async ()=>{
    const id = await AsyncStorage.getItem('id')
    const useId = `user${JSON.parse(id)}`;

    try {
      await AsyncStorage.multiRemove([useId, 'id']);
      navigation.replace('Bottom Navigation')
    } catch (error) {
      console.log("Error logging out the user: ", error)
    }
  };

  const logout = () => {
    Alert.alert(
        "Logout",
        "Are you sure you want to log out?",
        [
            {
                text: "Cancel", onPress: () => console.log("cancel pressed")
            },
            {
                text: "Continue", onPress: () => userLogout()
            },
            {defaultIndex: 1}
        ]
    )
  }

  const clearCache = () => {
    Alert.alert(
        "Clear Cache",
        "Are you sure you want to delete all saved data on your device?",
        [
            {
                text: "Cancel", onPress: () => console.log("cancel pressed")
            },
            {
                text: "Continue", onPress: () => console.log("cancel pressed")
            },
            {defaultIndex: 1}
        ]
    )
  }

  const deleteAccount = () => {
    Alert.alert(
        "Delete Account",
        "Are you sure you want to delete account?",
        [
            {
                text: "Cancel", onPress: () => console.log("cancel pressed")
            },
            {
                text: "Continue", onPress: () => console.log("cancel pressed")
            },
            {defaultIndex: 1}
        ]
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.gray} />
        <View style={{ width: "100%" }}>
          <Image
            source={require("../assets/images/space.jpg")}
            style={styles.cover}
          />
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={require("../assets/images/profile.jpeg")}
            style={styles.profile}
          />
          <Text style={styles.name}>
            {userLogin === true ? "Ahmad" : "Please login into your account"}
          </Text>
          {userLogin === false ? (
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <View style={styles.loginBtn}>
                <Text style={styles.menuText}>L O G I N </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.loginBtn}>
              <Text style={styles.menuText}>malisho.ahmad@gmail.com </Text>
            </View>
          )}

          {userLogin === false ? (
            <View></View>
          ) : (
            <View style={styles.menuWrapper}>
              <TouchableOpacity onPress={() => navigation.navigate('Favourites')}>
                <View style={styles.menuItem(0.2)}>
                    <MaterialCommunityIcons
                    name="heart-outline" 
                    size={24}
                    color={COLORS.primary}
                    />
                    <Text style={styles.menuText}>Favorites</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
                <View style={styles.menuItem(0.2)}>
                    <MaterialCommunityIcons
                    name="truck-delivery-outline" 
                    size={24}
                    color={COLORS.primary}
                    />
                    <Text style={styles.menuText}>Orders</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <View style={styles.menuItem(0.2)}>
                    <SimpleLineIcons
                    name="bag" 
                    size={24}
                    color={COLORS.primary}
                    />
                    <Text style={styles.menuText}>Cart</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => clearCache()}>
                <View style={styles.menuItem(0.2)}>
                    <MaterialCommunityIcons
                    name="cached" 
                    size={24}
                    color={COLORS.primary}
                    />
                    <Text style={styles.menuText}>Clear Cache</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteAccount()}>
                <View style={styles.menuItem(0.2)}>
                    <AntDesign
                    name="deleteuser" 
                    size={24}
                    color={COLORS.primary}
                    />
                    <Text style={styles.menuText}>Delete Account</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => logout()}>
                <View style={styles.menuItem(0.2)}>
                    <AntDesign
                    name="logout" 
                    size={24}
                    color={COLORS.primary}
                    />
                    <Text style={styles.menuText}>Logout</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

//make this component available to the app
export default Profile;
