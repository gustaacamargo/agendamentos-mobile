import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight, Image, KeyboardAvoidingView } from 'react-native';
import DismissKeyboard from '../../utils/dismissKeyboard';
import Logo from '../../../assets/logo.png';

function Login( {navigation} ) {

    return(
        <DismissKeyboard>
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

            {/* <View style={styles.container}> */}
                <Image style={styles.logo} source={Logo} resizeMode="contain"/>
                <TextInput style={styles.input} placeholder="Nome de usuário"></TextInput>
                <TextInput style={styles.input} placeholder="Senha"></TextInput>
                <TouchableHighlight style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableHighlight>
            {/* </View> */}
            </KeyboardAvoidingView>
        </DismissKeyboard>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
    },
    logo: {
        height: '40%',
        marginBottom: 40,
    },
    input: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 5,
        backgroundColor: '#FFF',
        alignSelf: 'stretch',
        marginBottom: 15,
        marginHorizontal: 20,
        fontSize: 16,
    },
    button: {
        padding: 20,
        borderRadius: 5,
        backgroundColor: '#042963',
        alignSelf: 'stretch',
        margin: 15,
        marginHorizontal: 20,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    }
});


export default Login;