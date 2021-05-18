import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Text,
  Image,
  Dimensions,
  Linking,
  View,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { AntDesign } from "@expo/vector-icons";

const db = SQLite.openDatabase("recipesDatabase.db");

function FavoritesRecipesScreen(props) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    reloadDb();
  }, []);

  const reloadDb = () =>
    db.transaction((tx) => {
      // tx.executeSql("drop table recipes", []);
      tx.executeSql(
        "select * from recipes",
        [],
        (_, { rows }) => setRecipes(rows["_array"]),
        (_, { err }) => err
      );
    });

  const pressBack = () => props.navigation.goBack();

  const deleteRecipe = (url) => {
    db.transaction((tx) => {
      tx.executeSql(`delete from recipes where url = ?`, [url]);
    });
    reloadDb();
  };

  const openRecipe = (url) => {
    Linking.openURL(url);
  };

  return recipes.length === 0 ? (
    <SafeAreaView style={styles.container}>
      <View style={{ ...styles.item, flex: 0.1, justifyContent: "center" }}>
        <Text style={styles.label}>Здесь так пусто...</Text>
      </View>

      <TouchableOpacity
        onPress={pressBack}
        style={{
          backgroundColor: "white",
          position: "absolute",
          padding: 5,
          borderRadius: 30,
          bottom: 25,
          right: 10,
          borderColor: "black",
          borderWidth: 1,
        }}
      >
        <AntDesign name="back" size={40} color="dodgerblue" />
      </TouchableOpacity>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => openRecipe(item.url)}
                style={styles.item}
              >
                <Image style={styles.image} source={{ uri: item.image }} />
                <Text style={styles.notation}>
                  {item.dishType || "Не указано"} :{" "}
                  {item.cuisineType || "Не указано"}
                </Text>
                <Text style={styles.notation}>
                  {item.calories.toPrecision(6) + " calories" || "Не указано"}
                </Text>
                <Text style={styles.label}>{item.label}</Text>
                <Text style={styles.ingredients}>
                  {"➨ " + item.ingredientLines.replace(/,/g, "\n➨ ") ||
                    "Не указано"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => deleteRecipe(item.url)}
                style={{
                  backgroundColor: "white",
                  position: "absolute",
                  padding: 5,
                  borderRadius: 10,
                  top: 20,
                  right: 30,
                  borderColor: "black",
                  borderWidth: 2,
                }}
              >
                <AntDesign name="delete" size={50} color="dodgerblue" />
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <TouchableOpacity
        onPress={pressBack}
        style={{
          backgroundColor: "white",
          position: "absolute",
          padding: 5,
          borderRadius: 30,
          bottom: 25,
          right: 10,
          borderColor: "black",
          borderWidth: 1,
        }}
      >
        <AntDesign name="back" size={40} color="dodgerblue" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "dodgerblue",
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  item: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flex: 1,
    alignItems: "center",
  },
  label: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
    marginTop: 5,
  },
  notation: {
    fontSize: 12,
    textAlign: "center",
    color: "grey",
  },
  ingredients: {
    fontSize: 16,
    color: "black",
    textAlign: "left",
    marginHorizontal: 20,
  },
  image: {
    resizeMode: "cover",
    width: Dimensions.get("screen").width - 75,
    borderRadius: 20,
    height: 250,
  },
});

export default FavoritesRecipesScreen;
