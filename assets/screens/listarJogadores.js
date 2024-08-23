import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseConfig from '../src/firebaseConfig';

const ListarJogadores = ({ navigation }) => {
    const [jogadores, setJogadores] = useState([]);

    const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
    const db = getFirestore(app);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await getDocs(collection(db, 'real-madrid'));
                const jogadoresData = [];
                snapshot.forEach((doc) => {
                    jogadoresData.push({ id: doc.id, ...doc.data() });
                });
                setJogadores(jogadoresData);
            } catch (error) {
                console.error("Erro ao buscar jogadores: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <ImageBackground
            source={require('../real.jpg')}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Text style={styles.header}>Jogadores Real Madrid</Text>

                <FlatList
                    data={jogadores}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.jogadorItem}>
                            <Text style={styles.textoInformacao}>Nome: {item.nome}</Text>
                            <Text style={styles.textoInformacao}>Altura: {item.altura}cm</Text>
                            <Text style={styles.textoInformacao}>Camisa: {item.camisa}</Text>
                            <Text style={styles.textoInformacao}>Nascimento: {new Date(item.nascimento.seconds * 1000).toLocaleDateString()}</Text>
                        </View>
                    )}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('paginaPrincipal')}
                >
                    <Text style={styles.buttonText}>Página Principal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.logoutButton]}
                    onPress={() => navigation.navigate('realizarLogin')}
                >
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 80,
    },
    header: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    jogadorItem: {
        flex: 1,
        padding: 20,
        width: 375,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        alignSelf: 'stretch',
        borderWidth: 1,
        borderColor: '#fff',
    },
    textoInformacao: {
        fontSize: 18,
    },
    button: {
        backgroundColor: '#000',
        width: '80%',
        paddingVertical: 15,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
    },
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#FFFFFF',
    },
});

export default ListarJogadores;