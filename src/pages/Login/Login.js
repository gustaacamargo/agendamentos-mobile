import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StatusBar, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, ActivityIndicator, AsyncStorage, ImageBackground } from 'react-native';
import DismissKeyboard from '../../utils/dismissKeyboard';
import Logo from '../../../assets/logo.png';
import api from '../../services/api';

function Login( {navigation} ) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        isLogged();
        setIsLoading(false);
    }, []);

    async function isLogged() {
        const token = await AsyncStorage.getItem('@AgendamentosApp:token');

        if (token) {
            navigation.navigate('App');
        }
    }

    async function onLogin() {
        if (!username || !password) {
            setError("Preencha todos os campos para continuar!");
        } else {
            try {
                setIsLoading(true);
                
                const response = await api.post("/sessions", {                     
                        username, 
                        password                   
                });  

                await AsyncStorage.setItem('@AgendamentosApp:token', response.data.token);

                navigation.navigate('App');
            } catch (err) {
                setError("Nome de usuário ou senha incorreta.");
                console.log(err);
            }
            setIsLoading(false);
        }
    }

    return(
        <ImageBackground source={require("../../../assets/background.png")} style={{ flex: 1 }} imageStyle={{ resizeMode: "cover", flex: 1 }}>
            <DismissKeyboard>
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

                    <StatusBar backgroundColor="#F5F5F5" barStyle="dark-content"/>
                    <Image style={styles.logo} source={Logo} resizeMode="contain"/>
                    {(error) && <Text style={styles.errorText}>{error}</Text>}
                    <TextInput 
                        autoCapitalize="none" 
                        autoCorrect={false} 
                        style={styles.input} 
                        placeholder="Nome de usuário"
                        value={username}
                        onChangeText={setUsername}
                    ></TextInput>
                    <TextInput 
                        autoCapitalize="none" 
                        autoCorrect={false} 
                        secureTextEntry 
                        style={styles.input} 
                        placeholder="Senha"
                        value={password}
                        onChangeText={setPassword}
                    ></TextInput>
                    <TouchableOpacity onPress={onLogin} style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    { isLoading && (
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#FFF" />    
                    </View>)}
                </KeyboardAvoidingView>
            </DismissKeyboard>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    loading: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center'

    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    },
    errorText: {
        marginBottom: 10,
        color: '#FF0000',
        fontSize: 16,
        textAlign: 'center',
    }
});


export default Login;