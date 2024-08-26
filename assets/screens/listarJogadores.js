import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { FontAwesome } from '@expo/vector-icons';
import firebaseConfig from '../src/firebaseConfig';

const ListarJogadores = ({ navigation }) => {
    const [jogadores, setJogadores] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [jogadorAtual, setJogadorAtual] = useState(null);
    const [nome, setNome] = useState("");
    const [altura, setAltura] = useState("");
    const [camisa, setCamisa] = useState("");
    const [nascimento, setNascimento] = useState("");

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

    const editarJogador = (jogador) => {
        setJogadorAtual(jogador);
        setNome(jogador.nome);
        setAltura(jogador.altura.toString());
        setCamisa(jogador.camisa.toString());
        setNascimento(new Date(jogador.nascimento.seconds * 1000).toLocaleDateString());
        setModalVisible(true);
    };

    const salvarJogador = async () => {
        const jogadorRef = doc(db, "real-madrid", jogadorAtual.id);

        const [day, month, year] = nascimento.split("/");
        const nascimentoDate = new Date(`${year}-${month}-${day}T00:00:00`);
        const nascimentoTimestamp = Timestamp.fromDate(nascimentoDate);

        await updateDoc(jogadorRef, {
            nome,
            altura: parseFloat(altura),
            camisa,
            nascimento: nascimentoTimestamp,
        });

        const atualizarJogadores = jogadores.map((jogador) =>
            jogador.id === jogadorAtual.id ? { ...jogador, nome, altura, camisa, nascimento: nascimentoTimestamp } : jogador
        );

        setJogadores(atualizarJogadores);
        setModalVisible(false);
    };

    const deletarJogador = async (id) => {
        const jogadorRef = doc(db, "real-madrid", id);
        Alert.alert(
            "Confirmação",
            "Você tem certeza que deseja excluir este jogador?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    onPress: async () => {
                        try {
                            console.log(`Tentando excluir jogador com ID: ${id}`);
                            await deleteDoc(jogadorRef);
                            console.log('Documento excluído com sucesso!');
                            setJogadores(jogadores.filter((jogador) => jogador.id !== id));
                        } catch (error) {
                            console.error('Erro ao excluir jogador: ', error);
                        }
                    },
                    style: "destructive",
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Jogadores Real Madrid</Text>

            <FlatList
                data={jogadores}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.jogadorItem}>
                        <View style={styles.textContainer}>
                            <Text style={styles.textoInformacao}>Nome: {item.nome}</Text>
                            <Text style={styles.textoInformacao}>Altura: {item.altura}cm</Text>
                            <Text style={styles.textoInformacao}>Camisa: {item.camisa}</Text>
                            <Text style={styles.textoInformacao}>Nascimento: {new Date(item.nascimento.seconds * 1000).toLocaleDateString()}</Text>
                        </View>
                        <View style={styles.iconsContainer}>
                            <TouchableOpacity onPress={() => editarJogador(item)}>
                                <FontAwesome name="pencil" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deletarJogador(item.id)}>
                                <FontAwesome name="trash" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
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

            <Modal
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
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

                    <TouchableOpacity style={styles.button} onPress={salvarJogador}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 80,
    },
    header: {
        fontSize: 24,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    jogadorItem: {
        padding: 20,
        width: '100%',
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
    },
    textoInformacao: {
        fontSize: 18,
        marginBottom: 5,
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 60,
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#000',
        width: '100%', // Ajuste a largura para 100% para centralizar o botão
        paddingVertical: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        alignSelf: 'center', // Centraliza horizontalmente
    },
    
    
});

export default ListarJogadores;
