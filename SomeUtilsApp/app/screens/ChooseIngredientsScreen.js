import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import Autocomplete from 'react-native-autocomplete-input';
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';



function ChooseIngredientsScreen(props) {

    const baseURL = 'https://api.spoonacular.com/food/ingredients/search?apiKey=d6597270e4204c35804c8bbf3dfdc449&number=5&query=';
    // const [apiIngredients, setAPIIngredients] = useState();
    const [query, setQuery] = useState('');
    const [ingredients, setIngredients] = useState([{name: 'apple', id: '1214'}, {name: 'apple2', id: '1215'}]);
    const [finalIngredients, setFinalIngredients] = useState([{name: 'apple', id: '1214'},
    {name: 'apple', id: '1215'},
    {name: 'apple', id: '1264'},
    {name: 'apple', id: '1274'},
    {name: 'apple', id: '1284'},
    {name: 'apple', id: '1294'},
    {name: 'apple', id: '2215'},
    {name: 'apple', id: '2264'},
    {name: 'apple', id: '2274'},
    {name: 'apple', id: '2284'},
    {name: 'apple', id: '2294'},
    {name: 'apple', id: '2204'},]);

    const updateIngridients = (newQuery) => {
        // setAPIIngredients(baseURL + newQuery);
        fetch(baseURL + newQuery)
        .then((res) => res.json())
        .then(({results}) => {
            setIngredients(results);
        });      
        setQuery(newQuery);
    };

    const addFinalIngredient = (item) => {
        setIngredients([]);
        setQuery(item.name);
        for (var i = 0; i < finalIngredients.length; i++){
            if (finalIngredients[i].id === item.id)
            return;
        }
        setFinalIngredients([...finalIngredients, {name: item.name, id: item.id.toString()}]);
    };

    const deleteFinalIngredient = (item) => {
        setFinalIngredients(finalIngredients.filter(curItem => curItem.id !== item));
    };

    const pressBack = () => props.navigation.goBack();

    const showRecipes = () => {
        if (finalIngredients.length > 0)
            props.navigation.navigate('RecipesScreen');
        else
            ToastAndroid.show('Нет ингридиентов!', 2);
    };

    return(
        <SafeAreaView style={styles.container}>

            <View style={styles.autocompleteContainer}>
                <Autocomplete
                    autoCapitalize="none"
                    autoCorrect={false}
                    data={ingredients}
                    value={query}
                    onChangeText={updateIngridients}
                    placeholder="Enter your ingridient name here"
                    flatListProps={{
                        keyExtractor: (item) => item.id.toString(),
                        renderItem: ({ item, i }) => (
                        <TouchableOpacity onPress={() => addFinalIngredient(item)}>
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                        ),
                    }}
                />
            </View>

            {/* <ScrollView 
                style={{top: 200}}
                keyboardShouldPersistTaps='handled' 
                showsVerticalScrollIndicator={false}>
                <View style={styles.scrollView}> */}
            <View style={{flex: 0.65}}>
                <FlatList
                    scrollEnabled={true}
                    style={styles.list}
                    showsVerticalScrollIndicator={false} 
                    data={finalIngredients.length > 0 ? finalIngredients : [{name: 'Тут будут ваши ингридиенты', id: '1'}]} 
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                    <TouchableOpacity
                        style={styles.buttonArea}
                        onPress={() => deleteFinalIngredient(item.id)}>
                        <View >
                            <Text>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                    )} 
                />
            </View>


            <TouchableOpacity 
                onPress={pressBack}
                style={{
                backgroundColor: 'white',
                position: 'absolute',
                padding: 5,
                borderRadius: 30,
                bottom: 25,
                right: 10,
                borderColor: 'black',
                borderWidth: 1
            }}>
                <AntDesign name="back" size={40} color="dodgerblue" />
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={showRecipes}
                style={{
                backgroundColor: 'white',
                position: 'absolute',
                padding: 10,
                borderRadius: 30,
                bottom: 100,
                right: 10,
                borderColor: 'black',
                borderWidth: 1
            }}>
                <AntDesign name="forward" size={30} color="dodgerblue" />
            </TouchableOpacity>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    autocompleteContainer: {
        top: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        marginTop: Constants.statusBarHeight + 10,
        // zIndex: 1,
        padding: 10,
    },
    container: {
        backgroundColor: 'dodgerblue',
        flex: 1,
    },
    buttonArea: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 10, 
        marginHorizontal: 30
    },
    list: {
        // margin: 20,
        // flex: 1,
        top: 200,
    }
  });

export default ChooseIngredientsScreen;