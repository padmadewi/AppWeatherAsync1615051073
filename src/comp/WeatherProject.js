import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';

const windIcon = require('./img/wind.png');
const tempIcon = require('./img/temp.png');
const mainIcon = require('./img/main.png');
const levelIcon = require('./img/sea.png');

export default class WeatherProject extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      city:'',
      forecast: {
        main: '-',
        description: '-',
        temp: 0,
        sunset: 0,
        sunrise: 0,
        pressure: 0,
        humidity:0,
        sea_level: 0,
        grnd_level: 0,
        speed: 0,
        //loading: false
      }
    };
  }
  async getWeather() {
    
  try {
    let response = await fetch(
      'http://api.openweathermap.org/data/2.5/weather?q='+ this.state.city + '&appid=cbd038eac6dea6556247f669df8967e5&units=metric'
    ); 
     
    let responseJson = await response.json();
    return this.setState({
      forecast : {
        main: responseJson.weather[0].main,
        description: responseJson.weather[0].description,
        temp: responseJson.main.temp,
        sunrise: responseJson.sys.sunrise,
        sunset: responseJson.sys.sunset,
        pressure: responseJson.main.pressure,
        humidity: responseJson.main.humidity,
        sea_level: responseJson.main.sea_level,
        grnd_level: responseJson.main.grnd_level,
        speed: responseJson.wind.speed
      }
    });
  } catch (error) {
    console.error(error);
  }
}

  render() {
    return (
    <View style={styles.containerMain}>

      <View style={styles.box2}>
      <Text style={{ textAlign: 'center', color: 'black', padding: 10, fontSize: 15 }} > Masukkan Nama Kota </Text>
          <View style={{marginTop:10, marginLeft: 20, marginRight: 20, padding:2, backgroundColor:'white'}}>
            <TextInput style = {{height: 40}}
              onChangeText={(city)=>this.setState({ city })}
            />
          </View>
          <View style={{marginTop:10, marginLeft: 20, marginRight: 20, padding: 1}}>
            <Button
              onPress={
                () => this.getWeather()
              }

              title="Lihat"
              color="pink"
              accessibilityLabel="Klik untuk melihat"

            />
          </View>
      </View>

     <View style={styles.box4}>
        <View style={styles.button}>
        <View style={styles.iconContainer}>
          <Image source={tempIcon} style={styles.icon} />
       </View>
          <Text> Temp : { this.state.forecast.temp} </Text>
        </View>
         <View style={styles.button}>
        <View style={styles.iconContainer}>
          <Image source={mainIcon} style={styles.icon} />
       </View>
          <Text> Main : { this.state.forecast.main} </Text>
        </View>
      </View>

      <View style={styles.box4}>
        <View style={styles.button}>
        <View style={styles.iconContainer}>
          <Image source={mainIcon} style={styles.icon} />
       </View>
          <Text> Main desc : { this.state.forecast.description} </Text>
        </View>
         <View style={styles.button}>
        <View style={styles.iconContainer}>
          <Image source={mainIcon} style={styles.icon} />
       </View>
          <Text> Sunrise : { this.state.forecast.sunrise} </Text>
        </View>
      </View>

       <View style={styles.box4}>
        <View style={styles.button}>
        <View style={styles.iconContainer}>
          <Image source={mainIcon} style={styles.icon} />
       </View>
          <Text> Sunset: { this.state.forecast.sunset} </Text>
        </View>

         <View style={styles.button}>
        <View style={styles.iconContainer}>
          <Image source={levelIcon} style={styles.icon} />
       </View>
          <Text> pressure : { this.state.forecast.pressure} </Text>
        </View>
      </View>

       <View style={styles.box4}>
        <View style={styles.button}>
        <View style={styles.iconContainer}>
          <Image source={levelIcon} style={styles.icon} />
       </View>
          <Text> humidity : { this.state.forecast.humidity} </Text>
        </View>
         <View style={styles.button}>
        <View style={styles.iconContainer}>
          <Image source={levelIcon} style={styles.icon} />
       </View>
          <Text> Sea Level : { this.state.forecast.sea_level} </Text>
        </View>
      </View>

       <View style={styles.box4}>
        <View style={styles.button}>
        <View style={styles.iconContainer}>
          <Image source={levelIcon} style={styles.icon} />
       </View>
          <Text> Ground Level : { this.state.forecast.grnd_level} </Text>
        </View>
         <View style={styles.button}>
        <View style={styles.iconContainer}>
          <Image source={windIcon} style={styles.icon} />
       </View>
          <Text> Wind Speed : { this.state.forecast.speed} </Text>
        </View>
      </View>


</View>
    );
  }
}
const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: 'lightblue',
    flex: 1,
    flexDirection: 'column'
  },
  box1: {
    flex: 0.22,
    backgroundColor: 'darkturquoise',
  },
  box2: {
    flex: 2.5,
    backgroundColor: 'aqua',
    margin: 5
  },
  box3: {
    flex: 1,
    backgroundColor: 'darkturquoise',
    margin: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  box4: {
    flex: 1,
    backgroundColor: 'pink',
    
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  box5: {
    flex: 0.2,
    backgroundColor: 'darkturquoise',
    margin: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  button: {
    width: 140,
    height: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  iconContainer: {
    alignItems: 'center',
    backgroundColor: '#feb401',
    borderColor: '#feaf12',
    //borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'center',
    height: 40,
    width: 30,
  },
  icon: {
    tintColor: '#fff',
    height: 20,
    width: 20,
  }
});
