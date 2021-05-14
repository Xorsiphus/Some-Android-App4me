import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, LogBox, Dimensions } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';


LogBox.ignoreLogs(['TypeError']);

function ShowImagesFromApi(props) {

    const requestURL = props.navigation.getParam('link') + props.navigation.getParam('categoryName');
    const dimensions = Dimensions.get('screen');

    const [links, setLinks] = useState([]);
    const [pos, setPos] = useState(0);
    const [fetching, setFetching] = useState(true);
    const [curImageView, setCurImageView] = useState(0);

    const backHandler = () => props.navigation.goBack();    
    
    useEffect(() => {
        let isMounted = true; 
        if(fetching && isMounted){
            axios.get(requestURL).then((response) => {
                if(isMounted) setLinks([...links, {...response.data, id: pos}])}).finally(() => { 
                setFetching(false);
                pos < 4 ? setFetching(true) : setFetching(false);
            });
            setPos(cur => cur + 1);
        }
        return () => { isMounted = false };
    }, [fetching]);

    const SaveToPhone = async (imageUrl) => {
        const permission = await MediaLibrary.requestPermissionsAsync();

        if (permission.granted) {
            const downloadResumable = FileSystem.createDownloadResumable(
                imageUrl,
                FileSystem.documentDirectory + imageUrl.split('/')[imageUrl.split('/').length - 1],
                {},
                null
            );
            try {
                const { uri } = await downloadResumable.downloadAsync();                
                const asset = await MediaLibrary.createAssetAsync(uri);
                MediaLibrary.createAlbumAsync('Arts', asset, false);
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log('Need Storage permission to save file');
        }
    };

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
                imageLoadingColor={'dodgerblue'}
                currentImageEmitter={(cur) => swipeHandler(cur)}
                ImageComponentStyle={{borderRadius: 30, height: dimensions.height, width: dimensions.width}}
                dotStyle={{
                    width: 0,
                    height: 0,
                }}
            />

            <TouchableOpacity 
                onPress={() => SaveToPhone(links[curImageView].url)}
                style={{
                backgroundColor: 'white',
                position: 'absolute',
                padding: 5,
                borderRadius: 30,
                bottom: 10,
                left: 30,
                borderColor: 'dodgerblue',
                borderWidth: 1
            }}>
                <AntDesign name="download" size={40} color="dodgerblue" />
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={backHandler}
                style={{
                backgroundColor: 'white',
                position: 'absolute',
                padding: 5,
                borderRadius: 30,
                bottom: 10,
                right: 30,
                borderColor: 'dodgerblue',
                borderWidth: 1
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
        // justifyContent: ''
        // alignItems: 'flex-start'
    },
})

export default ShowImagesFromApi;