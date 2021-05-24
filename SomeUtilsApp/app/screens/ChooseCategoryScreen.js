import React, { useState } from "react";
import {
  LogBox,
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

function ChooseCategoryScreen(props) {
  const [categories, setCategories] = useState([
    { name: "waifu", id: "1" },
    { name: "neko", id: "2" },
    { name: "shinobu", id: "3" },
    { name: "megumin", id: "4" },
    { name: "bully", id: "5" },
    { name: "cuddle", id: "6" },
    { name: "cry", id: "7" },
    { name: "hug", id: "8" },
    { name: "awoo", id: "9" },
    { name: "kiss", id: "10" },
    { name: "lick", id: "11" },
    { name: "pat", id: "12" },
    { name: "smug", id: "13" },
    { name: "bonk", id: "14" },
    { name: "yeet", id: "15" },
    { name: "blush", id: "16" },
    { name: "smile", id: "17" },
    { name: "wave", id: "18" },
    { name: "highfive", id: "19" },
    { name: "handhold", id: "20" },
    { name: "nom", id: "21" },
    { name: "bite", id: "22" },
    { name: "glomp", id: "23" },
    { name: "slap", id: "24" },
    { name: "kill", id: "25" },
    { name: "happy", id: "26" },
    { name: "wink", id: "27" },
    { name: "poke", id: "28" },
    { name: "dance", id: "29" },
    { name: "cringe", id: "30" },
    { name: "blush", id: "31" },
  ]);

  const [apiLink, setAPILink] = useState("https://api.waifu.pics/sfw/");

  const someChanges = () => {
    setCategories([
      { name: "waifu", id: "1" },
      { name: "neko", id: "2" },
      { name: "trap", id: "3" },
      { name: "blowjob", id: "4" },
    ]);
    setAPILink("https://api.waifu.pics/nsfw/");
  };

  const pressBack = () => props.navigation.goBack();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Выберите категорию:</Text>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.scroll}>
          <View style={styles.scrollView}>
            <FlatList
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              data={categories}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.button}>
                  <Button
                    color="coral"
                    title={item.name}
                    onPress={() =>
                      props.navigation.navigate("ShowImages", {
                        categoryName: item.name,
                        link: apiLink,
                      })
                    }
                  />
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={someChanges}
        style={{
          position: "absolute",
          padding: 5,
          borderRadius: 30,
          top: 30,
          left: 15,
          width: "5%",
          height: "5%",
        }}
      ></TouchableOpacity>

      <TouchableOpacity
        onPress={pressBack}
        style={{
          backgroundColor: "white",
          position: "absolute",
          borderColor: "black",
          borderWidth: 1,
          padding: 5,
          borderRadius: 30,
          bottom: "5%",
          right: "5%",
        }}
      >
        <AntDesign name="back" size={40} color="dodgerblue" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    color: "orange",
    marginTop: 10,
    marginBottom: 10,
  },
  container: {
    backgroundColor: "dodgerblue",
    flex: 1,
  },
  label: {
    paddingTop: "20%",
    fontSize: 30,
    textAlign: "center",
    color: "white",
    // fontFamily:
  },
  scroll: {
    alignItems: "center",
  },
  scrollView: {
    width: "50%",
    margin: 20,
  },
});

export default ChooseCategoryScreen;
