import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage, ImageBackground } from 'react-native';
import { FontAwesome, MaterialIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import api from '../../services/api';
import { screenFont, screenHeight } from '../../constants/screen';

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
                <ImageBackground blurRadius={25} source={require("../../../assets/background.png")} imageStyle={{ resizeMode: "cover" }} style={{ backgroundColor: '#0d1624', flexDirection: 'column', justifyContent: 'center', width: undefined, padding: 15, paddingTop: 40, height: screenHeight * 0.15 }}> 
                    <Text style={styles.nameUser}>{user.fullname}</Text>
                    <Text style={styles.campusName}>{`Campus de ${campus.city}`}</Text>
                </ImageBackground>

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
                        <TouchableOpacity style={styles.buttonOption} onPress={() => navigateOption('Campus')}>
                            <FontAwesome5 name="university" style={{fontSize: 20, marginRight: 5}} color="#000"/>
                            <Text style={styles.options}>Campus</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonOption} onPress={() => navigateOption('Cursos')}>
                            <MaterialIcons name="library-books" style={{fontSize: 20, marginRight: 5}} color="#000"/>
                            <Text style={styles.options}>Cursos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonOption} onPress={() => navigateOption('Equipamentos')}>
                            <MaterialIcons name="computer" style={{fontSize: 20, marginRight: 5}} color="#000"/>
                            <Text style={styles.options}>Equipamentos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonOption} onPress={() => navigateOption('Salas')}>
                            <MaterialIcons name="place" style={{fontSize: 20, marginRight: 5}} color="#000"/>
                            <Text style={styles.options}>Salas</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonOption} onPress={() => navigateOption('Usuarios')}>
                            <FontAwesome name="users" style={{fontSize: 20, marginRight: 5}} color="#000"/>
                            <Text style={styles.options}>Usuários</Text>
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
        color: '#F0F0F0',
        marginRight: 4
    },
    buttonOption: {
        marginBottom: 25,
        flexDirection: "row",
        alignItems: 'center',
    },
    options: {
        fontSize: screenFont * 1.3,
        fontWeight: '700'
    }
});

export default CustomDrawer;