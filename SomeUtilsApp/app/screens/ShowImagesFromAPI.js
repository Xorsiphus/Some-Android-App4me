import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, Image, View, LogBox, FlatList, Dimensions } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

LogBox.ignoreLogs(['TypeError']);

function ShowImagesFromApi(props) {

    let requestURL = props.navigation.getParam('link') + props.navigation.getParam('categoryName');
    let dimensions = Dimensions.get('screen');

    const [links, setLinks] = useState([]);
    const [pos, setPos] = useState(0);
    const [fetching, setFetching] = useState(true);
    const [curImageView, setCurImageView] = useState(0);

    const backHandler = () => props.navigation.goBack();    
    
    useEffect(() => {
        if(fetching){
            axios.get(requestURL).then(response => setLinks([...links, {...response.data, id: pos}])).finally(() => { 
                setFetching(false);
                pos < 4 ? setFetching(true) : setFetching(false);
            });
            setPos(cur => cur + 1);
        }
    }, [fetching]);

    const swipeHandler = (num) => {
        setCurImageView(num);
        if(num > (links.length - 4))
            setFetching(true);
        else 
            setFetching(false);
    };

    return (
        <SafeAreaView style={styles.container}>

            <SliderBox
                images={links.map((item) => item.url)}
                disableOnPress={true}
                resizeMode={'contain'}
                currentImageEmitter={(cur) => swipeHandler(cur)}
                ImageComponentStyle={{borderRadius: 15, height: dimensions.height, width: dimensions.width, marginTop: 5}}
                dotStyle={{
                    width: 0,
                    height: 0,
                  }}
            />

            <TouchableOpacity 
                onPress={backHandler}
                style={{
                backgroundColor: 'white',
                position: 'absolute',
                padding: 5,
                borderRadius: 30,
                bottom: 30,
                right: 15,
            }}>
                <AntDesign name="back" size={40} color="dodgerblue" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
    },
})

export default ShowImagesFromApi;