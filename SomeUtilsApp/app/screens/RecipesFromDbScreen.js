import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';


function RecipesFromDbScreen(props) {

    const pressBack = () => props.navigation.goBack(); 

    return (
        <SafeAreaView style={styles.container}>


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
        </SafeAreaView>
    );
}

export default RecipesFromDbScreen;