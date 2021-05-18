import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import { AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";
import IngredientsForAutocomplete from "../data/Ingredients.json";

function ChooseIngredientsScreen(props) {
  const [query, setQuery] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientId, setIngredientId] = useState(0);
  const [finalIngredients, setFinalIngredients] = useState([]);

  const updateIngridients = (newQuery) => {
    var limit = 7;
    var newIngredients = IngredientsForAutocomplete.filter((item) => {
      if (
        item.substr(0, newQuery.length).toLowerCase() === newQuery.toLowerCase()
      ) {
        limit -= 1;
        return limit > 0;
      }

      return false;
    });
    var curId = ingredientId;
    setIngredients(
      newIngredients.map((item) => {
        curId += 1;
        return { name: item, id: curId.toString() };
      })
    );
    setIngredientId(curId);
    setQuery(newQuery);
  };

  const addFinalIngredient = (item) => {
    if (item.name === "") {
      ToastAndroid.show("Строка пуста!", 2);
      return;
    }

    if (
      finalIngredients.filter((fItem) => fItem.name === item.name).length !== 0
    ) {
      ToastAndroid.show("Ингредиент уже добавлен!", 2);
      return;
    }

    setIngredients([]);
    for (var i = 0; i < finalIngredients.length; i++) {
      if (finalIngredients[i].id === item.id) return;
    }
    setFinalIngredients([
      ...finalIngredients,
      { name: item.name, id: item.id.toString() },
    ]);
    setQuery("");
  };

  const deleteFinalIngredient = (item) => {
    setFinalIngredients(
      finalIngredients.filter((curItem) => curItem.id !== item)
    );
  };

  const pressBack = () => props.navigation.goBack();

  const showFavorites = () =>
    props.navigation.navigate("FavoritesRecipesScreen");

  const showRecipes = () => {
    if (finalIngredients.length > 0)
      props.navigation.navigate("RecipesScreen", {
        query: finalIngredients.map((item) => item.name).join(","),
      });
    else ToastAndroid.show("Нет ингридиентов!", 2);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.autocompleteContainer}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          data={ingredients}
          value={query}
          onChangeText={updateIngridients}
          placeholder="Введите название ингредиента сюда"
          flatListProps={{
            keyExtractor: (item) => item.id.toString(),
            renderItem: ({ item, i }) => (
              <TouchableOpacity onPress={() => addFinalIngredient(item)}>
                <Text style={{ fontSize: 15 }}>{item.name}</Text>
              </TouchableOpacity>
            ),
          }}
        />
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          scrollEnabled={true}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          data={
            finalIngredients.length > 0
              ? finalIngredients
              : [{ name: "Тут будут ваши ингредиенты", id: "1" }]
          }
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.buttonArea}
              onPress={() => deleteFinalIngredient(item.id)}
            >
              <View>
                <Text>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          addFinalIngredient({ name: query, id: ingredientId.toString() });
          setIngredientId(ingredientId + 1);
        }}
        style={{
          backgroundColor: "white",
          position: "absolute",
          padding: 5,
          borderRadius: 30,
          top: 40,
          right: 10,
          borderColor: "black",
          borderWidth: 1,
        }}
      >
        <AntDesign name="pluscircleo" size={40} color="dodgerblue" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={showRecipes}
        style={{
          backgroundColor: "white",
          position: "absolute",
          padding: 5,
          borderRadius: 30,
          bottom: 175,
          right: 10,
          borderColor: "black",
          borderWidth: 1,
        }}
      >
        <AntDesign name="playcircleo" size={40} color="dodgerblue" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={showFavorites}
        style={{
          backgroundColor: "white",
          position: "absolute",
          padding: 10,
          borderRadius: 30,
          bottom: 100,
          right: 10,
          borderColor: "black",
          borderWidth: 1,
        }}
      >
        <AntDesign name="book" size={30} color="dodgerblue" />
      </TouchableOpacity>

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
  autocompleteContainer: {
    top: 3,
    left: 10,
    right: "17%",
    position: "absolute",
    marginTop: Constants.statusBarHeight + 10,
    // zIndex: 1,
    padding: 10,
  },
  container: {
    backgroundColor: "dodgerblue",
    flex: 1,
  },
  buttonArea: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    borderColor: "black",
    borderWidth: 1,
    marginTop: 10,
    marginHorizontal: 30,
  },
  list: {
    // margin: 20,
    flex: 1,
    marginTop: 200,
  },
});

export default ChooseIngredientsScreen;
