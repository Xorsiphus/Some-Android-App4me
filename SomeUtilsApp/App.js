import React from 'react';
import Navigator from './app/routes/HomeStack';
import { View } from 'react-native';


export default function App() {

  let theme = 'dodgerblue';

  return (
    <View style={{
      flex: 1,
      backgroundColor: theme,
    }}>
      <Navigator initialRoute={{test: '1'}} />
    </View>
  );
}