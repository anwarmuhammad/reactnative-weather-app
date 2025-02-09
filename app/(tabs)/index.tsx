import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import axios from "axios";


export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3433376b4c27c75c12951d24accdeb78&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      alert("City not found!");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
      />
      <TouchableOpacity style={styles.button} onPress={fetchWeather}>
        <Text style={styles.buttonText}>{loading ? "Loading..." : "Get Weather"}</Text>
      </TouchableOpacity>

      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.city}>{weather.name}, {weather.sys.country}</Text>
          <Image
            source={{ uri: `https://openweathermap.org/img/w/${weather.weather[0].icon}.png` }}
            style={styles.weatherIcon}
          />
          <Text style={styles.temperature}>{weather.main.temp}°C</Text>
          <Text style={styles.condition}>{weather.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  city: {
    fontSize: 22,
    fontWeight: "bold",
  },
  weatherIcon: {
    width: 80,
    height: 80,
    marginVertical: 10,
  },
  temperature: {
    fontSize: 30,
    fontWeight: "bold",
  },
  condition: {
    fontSize: 18,
    textTransform: "capitalize",
  },
});
