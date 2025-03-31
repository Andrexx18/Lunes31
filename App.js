import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import db from "./firebaseConfig"; // Importamos Firestore

const App = () => {
  const [dice, setDice] = useState(1);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  // Función para guardar los datos del jugador en Firestore
  const savePlayerData = async (name, age) => {
    try {
      await addDoc(collection(db, "players"), {
        name,
        age: parseInt(age),
        rolls: [],
        date: new Date().toLocaleString(),
      });
      console.log("Jugador guardado en Firestore");
    } catch (error) {
      console.error("Error al guardar el jugador:", error);
    }
  };

  // Iniciar el juego
  const startGame = () => {
    if (name.trim() !== "" && age.trim() !== "" && !isNaN(Number(age)) && Number(age) > 0) {
      savePlayerData(name, age);
      setIsPlaying(true);
    } else {
      Alert.alert("Error", "Por favor, ingresa un nombre y una edad válida.");
    }
  };

  // Tirar el dado
  const rollDice = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    setDice(randomNumber);
  };

  return (
    <View style={styles.container}>
      {!isPlaying ? (
        <View style={styles.form}>
          <Text style={styles.title}>🎲 Bienvenido al Simulador de Dados KR</Text>
          <TextInput style={styles.input} placeholder="Ingresa tu nombre" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="Ingresa tu edad" value={age} onChangeText={setAge} keyboardType="numeric" />
          <Button title="🚀 Iniciar Juego" onPress={startGame} />
        </View>
      ) : (
        <View style={styles.game}>
          <Text style={styles.title}>Hola, {name}! 🎲 ¡Que comience el juego!</Text>
          <View style={styles.dice}>
            <Text style={styles.diceNumber}>{dice}</Text>
          </View>
          <Button title="🎲 Lanzar Dado" onPress={rollDice} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  form: { width: "100%", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { width: "100%", padding: 10, borderWidth: 1, borderRadius: 5, marginBottom: 10 },
  game: { alignItems: "center" },
  dice: { marginVertical: 20, padding: 20, borderWidth: 1, borderRadius: 10 },
  diceNumber: { fontSize: 50, fontWeight: "bold" },
});

export default App;
