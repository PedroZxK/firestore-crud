import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import firebaseConfig from '../src/firebaseConfig';

const AdicionarJogadores = ({ navigation }) => {
    const [nome, setNome] = useState("");
    const [altura, setAltura] = useState("");
    const [camisa, setCamisa] = useState("");
    const [nascimento, setNascimento] = useState("");

    const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
    const db = getFirestore(app);

    const addJogador = async () => {
        if (!nome || !altura || !camisa || !nascimento) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return;
        }
        try {
            const jogadoresCollection = collection(db, "real-madrid");

            const [day, month, year] = nascimento.split("/");
            const nascimentoDate = new Date(`${year}-${month}-${day}`);
            const nascimentoTimestamp = Timestamp.fromDate(nascimentoDate);

            await addDoc(jogadoresCollection, {
                nome: nome,
                altura: parseFloat(altura),
                camisa: parseInt(camisa, 10),
                nascimento: nascimentoTimestamp,
            });

            Alert.alert("Sucesso", "Jogador adicionado com sucesso!");
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao adicionar jogador: ", error);
            Alert.alert("Erro", "Ocorreu um erro ao adicionar o jogador.");
        }
    };

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                placeholder="Nome do jogador"
            />

            <Text style={styles.label}>Altura (cm)</Text>
            <TextInput
                style={styles.input}
                value={altura}
                onChangeText={setAltura}
                placeholder="Altura do jogador"
                keyboardType="numeric"
            />

            <Text style={styles.label}>Camisa</Text>
            <TextInput
                style={styles.input}
                value={camisa}
                onChangeText={setCamisa}
                placeholder="Número da camisa"
                keyboardType="numeric"
            />

            <Text style={styles.label}>Data de Nascimento (DD/MM/AAAA)</Text>
            <TextInput
                style={styles.input}
                value={nascimento}
                onChangeText={setNascimento}
                placeholder="Data de nascimento"
            />

            <TouchableOpacity style={styles.button} onPress={addJogador}>
                <Text style={styles.buttonText}>Adicionar Jogador</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} onPress={goBack}>
                <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'left',
        width: '100%',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        width: '100%',
    },
    button: {
        backgroundColor: '#000',
        width: '100%',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
    },
    backButton: {
        backgroundColor: '#ddd',
        width: '100%',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButtonText: {
        fontSize: 18,
        color: '#000',
    },
});

export default AdicionarJogadores;
