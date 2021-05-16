import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Image, SafeAreaView, View, TouchableOpacity } from 'react-native';

function WelcomeScreen(props) {
    return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconView}>
        <Image style={styles.icon} source={require('../../assets/icon.png')}/>
      </View>

      <View style={styles.buttonsView}>
        <Text style={styles.label}>Выберите функцию:</Text>

        <TouchableOpacity onPress={() => props.navigation.navigate('CategoriesList')} activeOpacity={0.5} style={styles.oneButtonView}>
          <Text style={styles.oneButtonText}>Арты</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('ISSPositionScreen')} activeOpacity={0.5} style={styles.oneButtonView}>
          <Text style={styles.oneButtonText}>Текущее местоположение МКС</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('ChooseIngredientsScreen')} activeOpacity={0.5} style={styles.oneButtonView}>
          <Text style={styles.oneButtonText}>Рецепты по ингридиентам</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.infoView}>
        <View style={{borderBottomColor: 'black', borderBottomWidth: 2}}/>
        <Text style={styles.infoText}>v0.1</Text>
      </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'dodgerblue',
      // alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    iconView: {
      paddingTop: StatusBar.currentHeight,
      height: '20%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    icon: {
      borderRadius: 15,
      width: 100,
      height: 100,
    },
    label: {
      fontSize: 30,
      textAlign: 'center',
      color: 'white'
      // fontFamily: 
    },
    buttonsView: {
      height: '60%',
      // flex: 0.8,
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    oneButtonView: {
      flex: 1,
      borderWidth: 2,
      borderColor: 'silver',
      borderRadius: 30,
      backgroundColor: 'white',
      justifyContent: 'center',
      marginVertical: '7%',
      width: '80%'
    },
    oneButtonText: {
      textAlign: 'center',
      fontSize: 18,
      padding: 15
    },
    infoView: {
      flex: 0.1,
    },
    infoText: {
      textAlign: 'center',
      fontSize: 20
    }
  });
  

export default WelcomeScreen;