import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Dimensions, Button } from 'react-native';
import MapView from 'react-native-maps';
import axios from 'axios';

const height = Dimensions.get('screen').height;

function ISSPositionScreen() {

    const requestURL = "http://api.open-notify.org/iss-now.json";
    const [myRegion, setRegion] = useState({latitude: 200, longitude: 0});
    const [fetching, setFetching] = useState(true);
    // const [myInterval, setMyInterval] = useState(null);

    useEffect(() => {
        let isMounted = true; 
        let myInterval = null;
        if(fetching && isMounted){
            axios.get(requestURL).then(response => {
                if(isMounted) setRegion({
                latitude: parseFloat(response.data.iss_position.latitude),
                longitude: parseFloat(response.data.iss_position.longitude),
            })
        }).finally(() => { 
                setFetching(false);
            });
            myInterval = setInterval(regionUpdate, 2000);
        }
        return () => { isMounted = false; if(!myInterval) clearInterval(myInterval); };
    }, [fetching]);
      
    const regionUpdate = () => {
        setFetching(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <MapView
                loadingEnabled={true}
                style={styles.map}
            >
                <MapView.Marker coordinate={myRegion} />
            </MapView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'dodgerblue',
        flex: 1,
        // justifyContent: ''
        // alignItems: 'flex-start'
    },
    map: {
        height
    }
})  

export default ISSPositionScreen;