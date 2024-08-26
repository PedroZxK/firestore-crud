import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const SobreNos = ({ navigation }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Sobre Nós</Text>
            <Text style={styles.text}>
                Somos uma empresa dedicada a fornecer as melhores soluções para nossos clientes. 
                Nosso objetivo é oferecer produtos e serviços de alta qualidade que atendam 
                às suas necessidades e superem suas expectativas.
            </Text>
            <Text style={styles.text}>
                Com uma equipe de profissionais experientes e apaixonados pelo que fazem, 
                estamos sempre em busca de inovação e melhorias contínuas. Agradecemos 
                por confiar em nós e esperamos continuar a servir você com excelência.
            </Text>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        marginBottom: 15,
        lineHeight: 24,
    },
    backButton: {
        backgroundColor: '#ccc',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
    },
});

export default SobreNos;
