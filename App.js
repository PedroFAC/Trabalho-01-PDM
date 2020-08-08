import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Share } from "react-native";
import {
  Container,
  Content,
  Item,
  Label,
  Input,
  H1,
  Form,
  Fab,
  Icon,
} from "native-base";
import * as Speech from "expo-speech";

export default function App() {
  const [cost, setCost] = useState("0");
  const [people, setPeople] = useState("0");
  const [individual, setIndividual] = useState(null);
  const messageToShare =
    "A Conta de " +
    cost +
    " reais dividida para " +
    people +
    " é: R$ " +
    individual;
  const onShare = async () => {
    if (people !== "0") {
      await Share.share({
        message: messageToShare,
      });
    }
  };
  const onSpeech = (message) => Speech.speak(message);

  useEffect(() => {
    if (people !== "0" || people !== null) {
      setIndividual((Number(cost) / Number(people)).toFixed(2));
    } else {
      setIndividual("Valor Incorreto");
    }
  }, [cost, people]);
  return (
    <Container style={styles.container}>
      <H1 style={styles.title}>Vamos rachar!</H1>
      <Form style={styles.form}>
        <Item style={styles.input} floatingLabel regular>
          <Label>Valor total (R$)</Label>
          <Input
            value={cost}
            keyboardType="phone-pad"
            onChangeText={(value) => setCost(value)}
          />
        </Item>
        <Item style={styles.input} floatingLabel regular>
          <Label>Pessoas</Label>
          <Input
            value={people}
            keyboardType="phone-pad"
            onChangeText={(value) => setPeople(value)}
          />
        </Item>
      </Form>
      <H1 style={styles.individual}>R$ {individual}</H1>
      <Fab style={styles.fab} onPress={onShare} position="bottomLeft">
        <Icon style={styles.fabIcon} name="share" />
      </Fab>
      <Fab
        style={styles.fab}
        onPress={() => onSpeech(messageToShare)}
        position="bottomRight"
      >
        <Icon style={styles.fabIcon} name="md-volume-high" />
      </Fab>
    </Container>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "blue",
  },
  form: {
    alignContent: "center",
    marginHorizontal: 8,
  },
  input: {
    padding: 4,
    backgroundColor: "white",
  },
  individual: {
    padding: 8,
    alignSelf: "center",
    color: "white",
  },
  title: {
    marginBottom: 48,
    alignSelf: "center",
    color: "white",
  },
  fab: {
    backgroundColor: "white",
  },
  fabIcon: {
    color: "blue",
  },
});
