import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PaginaPrincipal = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Home</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('listarJogadores')}
            >
                <Text style={styles.buttonText}>Listar Jogadores</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('adicionarJogadores')}
            >
                <Text style={styles.buttonText}>Adicionar Jogadores</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('editarPerfil')}
            >
                <Text style={styles.buttonText}>Editar perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('sobreNos')}
            >
                <Text style={styles.buttonText}>Sobre nós</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.logoutButton]}
                onPress={() => navigation.navigate('realizarLogin')}
            >
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80,
    },
    header: {
        fontSize: 24,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
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

export default PaginaPrincipal;