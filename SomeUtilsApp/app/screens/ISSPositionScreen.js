import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import axios from 'axios';


const height = Dimensions.get('screen').height;

function ISSPositionScreen() {

    this.timerId = null;
    const [startCamera, setStartCamera] = useState({
        center: {
           latitude: 0,
           longitude: 0,
       },
       pitch: 0,
       heading: 0,
       altitude: 0,
       zoom: 1
    });
    const requestURL = "http://api.open-notify.org/iss-now.json";
    const [myRegion, setRegion] = useState({latitude: 200, longitude: 0});
    const [fetching, setFetching] = useState(true); 

    useEffect(() => {
        let isMounted = true; 
        if(fetching && isMounted){
            axios.get(requestURL).then(response => {
                if(isMounted) setRegion({
                latitude: parseFloat(response.data.iss_position.latitude),
                longitude: parseFloat(response.data.iss_position.longitude),
            })
        }).finally(() => { 
                if(isMounted) setFetching(false);
            });
            this.timerId = setInterval(() => {
                if(isMounted) setFetching(true)
            }, 2000);
        }
        return () => { 
            isMounted = false; 
            if(this.timerId) clearInterval(this.timerId); 
        };
    }, [fetching]);

    return (
        <SafeAreaView style={styles.container}>
            <MapView
                // loadingEnabled={true}
                // initialRegion={startRegion}
                initialCamera={startCamera}
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