import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ToastAndroid,
  Text,
  Image,
  Dimensions,
  Linking,
  View,
} from "react-native";
// import Constants from "expo-constants";
import * as Manifest from "../../app.json";
import * as SQLite from "expo-sqlite";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const db = SQLite.openDatabase("recipesDatabase.db");

function RecipesScreen(props) {
  //   const app_id = Constants.manifest.extra.edamam.app_id;
  //   const app_key = Constants.manifest.extra.edamam.app_key;
  const app_id = Manifest.default.expo.extra.edamam.app_id;
  const app_key = Manifest.default.expo.extra.edamam.app_key;
  const [recipesFrom, setRecipesFrom] = useState(0);
  const [recipesTo, setRecipesTo] = useState(100);
  const [recipes, setRecipes] = useState([]);
  const [id, setId] = useState(0);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists recipes (id integer primary key not null, calories real, cuisineType text, dishType text, image text, ingredientLines text, label text, url text);"
      );
    });

    const requestURL =
      `https://api.edamam.com/search?app_id=${app_id}&app_key=${app_key}&from=${recipesFrom}&to=${recipesTo}&q=` +
      props.navigation.getParam("query");
    let isMounted = true;
    if (fetching && isMounted) {
      axios.get(requestURL).then((response) => {
        const unhandledRecipes = response.data;
        // console.log(unhandledRecipes);
        var curId = id;
        setRecipes(
          recipes.concat(
            unhandledRecipes.hits.map((item) => {
              curId += 1;
              console.log(curId);
              return {
                id: curId.toString(),
                label: item.recipe.label,
                image: item.recipe.image,
                ingredientLines: item.recipe.ingredientLines,
                calories: item.recipe.calories,
                cuisineType: item.recipe.cuisineType,
                dishType: item.recipe.dishType,
                url: item.recipe.url,
              };
            })
          )
        );
        setId(curId);
        setFetching(false);
        // console.log(recipesFrom, recipesTo);
      });
    }
    return () => {
      isMounted = false;
    };
  }, [fetching]);

  const updateFetching = () => {
    var oldRecipesTo = recipesTo;
    setRecipesFrom(oldRecipesTo);
    setRecipesTo(oldRecipesTo + 100);
    // console.log(recipesFrom, recipesTo);
    setFetching(true);
  };

  const openRecipe = (url) => {
    Linking.openURL(url);
  };

  const pressBack = () => props.navigation.goBack();

  const addFavoriteToDb = (item) => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from recipes where url = ?`,
        [item.url],
        (_, { rows }) => {
          if (rows.length > 0) {
            ToastAndroid.show("Этот рецепт уже добавлен!", 2);
          } else {
            tx.executeSql(
              "insert into recipes (calories, cuisineType, dishType, image, ingredientLines, label, url) values (?, ?, ?, ?, ?, ?, ?)",
              [
                item.calories.toString(),
                typeof item.cuisineType != "undefined"
                  ? item.cuisineType.toString()
                  : "Не указано",
                typeof item.dishType != "undefined"
                  ? item.dishType.toString()
                  : "Не указано",
                item.image,
                item.ingredientLines.toString(),
                item.label,
                item.url,
              ],
              () => ToastAndroid.show("Success!", 2),
              () => ToastAndroid.show("Error!", 2)
            );
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={recipes}
        onEndReachedThreshold={0.2}
        onEndReached={updateFetching}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          // console.log(item);
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
                  {"➨ " + item.ingredientLines.join("\n➨ ") || "Не указано"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => addFavoriteToDb(item)}
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
                <Ionicons
                  name="ios-bookmark-outline"
                  size={50}
                  color="dodgerblue"
                />
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

export default RecipesScreen;
