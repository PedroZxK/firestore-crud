import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../src/firebaseConfig';

const RealizarLogin = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigation.navigate('paginaPrincipal');
            })
            .catch(error => {
                console.error('Login failed:', error);
            });
    };


    return (
        <ImageBackground
            source={require('./../cidade.jpg')}
            style={styles.background}
            resizeMode="cover"

        >
            <View style={styles.container}>
                <Text style={styles.header}>Login</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Senha"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
    },
    container: {
        marginHorizontal: 40,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        marginTop: 80,
    },
    header: {
        fontSize: 24,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        marginBottom: 15,
        paddingHorizontal: 10,
        color: '#000',
        borderBottomWidth: 2,
        borderBottomColor: '#000'
    },
    button: {
        backgroundColor: '#000',
        width: '100%',
        paddingVertical: 15,
        marginBottom: 10,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#FFFFFF',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
        fontSize: 16
    }
});

export default RealizarLogin;