import React, { useState, useEffect } from "react";
import { StyleSheet, Share } from "react-native";
import {
  Container,
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
  const [individual, setIndividual] = useState("Insira valores");
  const messageToShare = `A conta de R$ ${cost} dividida para ${people} pessoas é: ${individual}`;
  const onShare = async () => {
    let isZero = notZero(Number(cost), Number(people));
    if (isZero) {
      await Share.share({
        message: "Número de pessoas ou valor inválido",
      });
    } else {
      await Share.share({
        message: messageToShare,
      });
    }
  };
  const onSpeech = () => {
    let message = "";
    let isZero = notZero(Number(cost), Number(people));
    if (isZero) {
      message = "Número de pessoas ou valor inválido";
    } else {
      message = messageToShare;
    }
    Speech.speak(message);
  };

  function notZero(numerator, denominator) {
    if (
      denominator === 0 ||
      isNaN(denominator) ||
      numerator === 0 ||
      isNaN(denominator)
    ) {
      return true;
    } else {
      return false;
    }
  }
  useEffect(() => {
    let isZero = notZero(Number(cost), Number(people));
    if (isZero) {
      setIndividual("");
    } else {
      setIndividual(`R$ ${(Number(cost) / Number(people)).toFixed(2)}`);
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
      <H1 style={styles.individual}>{individual}</H1>
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
