import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { FontAwesome, MaterialIcons, AntDesign } from '@expo/vector-icons';
import Logo from '../../../assets/logo.png';
import api from '../../services/api';

function CustomDrawer({ navigation }) {

    const [adm, setAdm] = useState(false);
    const [user, setUser] = useState([]);
    const [campus, setCampus] = useState([]);

    useEffect(() => {
        async function isAdm() {
            const response = await api.get("/userLogged");
            if(response.data.user.function === 'adm') {
                setAdm(true);
            }
            setUser(response.data.user);                
            setCampus(response.data.campus);
        }

        isAdm();
    }, []);

    function navigateOption(nameScreen) {
        navigation.navigate(nameScreen);
    }

    async function logout() {
        await AsyncStorage.removeItem('@AgendamentosApp:token');

        navigation.navigate('Login');
    }
    
    return(
        <>
            <View style={styles.container}>
                <View style={{ backgroundColor: '#0d1624', width: undefined, padding: 15, paddingTop: 40 }}> 
                    <Text style={styles.nameUser}>{user.fullname}</Text>
                    <Text style={styles.campusName}>{`Campus de ${campus.city}`}</Text>
                </View>

                {(adm) ? (
                    <View style={styles.userArea}>

                        <TouchableOpacity style={styles.buttonOption} onPress={() => navigateOption('Agendamentos')}>
                            <MaterialIcons name="schedule" style={{fontSize: 20, marginRight: 5}} color="#000"/>
                            <Text style={styles.options}>Agendamentos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonOption} onPress={() => navigateOption('Anos')}>
                            <AntDesign name="appstore-o" style={{fontSize: 20, marginRight: 5}} color="#000"/>
                            <Text style={styles.options}>Anos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonOption} onPress={() => logout()}>
                            <FontAwesome name="sign-out" style={{fontSize: 20, marginRight: 5}} color="#000"/>
                            <Text style={styles.options}>Sair</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.userArea}>
                        <TouchableOpacity style={styles.buttonOption} onPress={() => navigateOption('Agendamentos')}>
                            <MaterialIcons name="schedule" style={{fontSize: 20, marginRight: 5}} color="#000"/>
                            <Text style={styles.options}>Agendamentos</Text>
                        </TouchableOpacity>    
                        <TouchableOpacity style={styles.buttonOption} onPress={() => logout()}>
                            <FontAwesome name="sign-out" style={{fontSize: 20, marginRight: 5}} color="#000"/>
                            <Text style={styles.options}>Sair</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userArea: {
        marginVertical: 15,
        marginHorizontal: 10 
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#FFF',
    },
    nameUser: {
        marginTop: 5,
        fontWeight: '800',
        fontSize: 18,
        color: '#FFF',
    },
    campusName: {
        marginTop: 5,
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.8)',
        marginRight: 4
    },
    buttonOption: {
        marginBottom: 16,
        flexDirection: "row",
        alignItems: 'center',
    },
    options: {
        fontSize: 15,
        fontWeight: '700'
    }
});

export default CustomDrawer;