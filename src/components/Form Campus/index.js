import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function FormCampus({ onSubmit, campus, navigation }) {

    const [city, setCity] = useState('');
    const [adress, setAdress] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(campus){
            setCity(campus.city);
            setAdress(campus.adress);
        }
    }, []);

    function save() {   
        if(!city) { Alert.alert('Campo obrigatório', 'O campo cidade deve ser preenchido'); return }
        if(!adress) { Alert.alert('Campo obrigatório', 'O campo endereço deve ser preenchido'); return }

        setIsLoading(true);
        onSubmit(campus.id, {
            city,
            adress,
            status: 'Ativo',
        })
        .then(function (response) {  
            setIsLoading(false);
            setCity('');
            setAdress('');              
            Alert.alert('Prontinho', 'Campus salvo com sucesso!');
            if(navigation) { navigation.navigate('ViewCampus') }
        })
        .catch(function (error) {
            setIsLoading(false);
            console.log(error)
            if(error?.response?.data?.error) { Alert.alert('Oops...', error.response.data.error) }
            else { Alert.alert('Oops...', 'Houve um erro ao tentar editar as informações') }
        });
        
    }

    return(
        <KeyboardAwareScrollView>
            <View style={styles.row}>
                <View style={styles.card}>
                    <Text style={styles.titleText}>Cidade *</Text>
                    <TextInput 
                        keyboardType="default" 
                        style={styles.input} 
                        placeholder="Cidade"
                        value={city}
                        onChangeText={setCity}
                    />
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.card}>
                    <Text style={styles.titleText}>Endereço *</Text>
                    <TextInput 
                        keyboardType="default" 
                        style={styles.input} 
                        placeholder="Endereço"
                        value={adress}
                        onChangeText={setAdress}
                    />
                </View>
            </View>

            <TouchableOpacity onPress={save} style={styles.button}>
                <Text style={styles.buttonText}>Salvar</Text>
                <ActivityIndicator animating={isLoading} size="small" color="#FFF" />   
            </TouchableOpacity>
            
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    loading: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.10)',
        justifyContent: 'center',
        alignItems: 'center',   
    },
    input: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 5,
        backgroundColor: '#F1F1F1',
        alignSelf: 'stretch',
        marginTop: 5,
        fontSize: 16,
        borderWidth: 0
    },
    titleText: {
        fontSize: 16,
        color: '#999'
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10
    },
    card: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 15,
        height: 'auto',
        borderRadius: 4,
        backgroundColor: '#FFF',
        marginRight: 5,
        marginLeft: 5
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 5,
        backgroundColor: '#042963',
        alignSelf: 'stretch',
        marginTop: 10,
        flex: 1,
        marginRight: 5,
        marginLeft: 5,
        marginBottom: 15
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        marginRight: 5
    },
});

export default FormCampus;