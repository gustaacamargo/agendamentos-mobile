import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import api from '../../services/api';

function FormEquipament({ onSubmit, equipament }) {

    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [equityNumber, setEquityNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(equipament !== ''){
            setName(equipament.name);
            setBrand(equipament.brand);
            setEquityNumber(equipament.equityNumber);
        }
    }, []);

    async function save() {        
        if(name && brand && equityNumber) {
            const userLogged = await api.get('/userLogged');
            setIsLoading(true);
            await onSubmit(equipament.id, {
                name,
                brand,
                equityNumber,
                status: 'Ativo',
                campus_id: userLogged.data.campus.id,
            })
            setIsLoading(false);
            setName('');
            setBrand('');
            setEquityNumber('');
        }
        else {
            Alert.alert('Campos não preenchidos', 'Preencha todos os campos!');
        }
    }

    return(
        <ScrollView >
            <View style={styles.row}>
                <View style={styles.card}>
                    <Text style={styles.titleText}>Nome</Text>
                    <TextInput 
                        keyboardType="default" 
                        style={styles.input} 
                        placeholder="Nome"
                        value={name}
                        onChangeText={setName}
                    />
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.card}>
                    <Text style={styles.titleText}>Marca</Text>
                    <TextInput 
                        keyboardType="default" 
                        style={styles.input} 
                        placeholder="Marca"
                        value={brand}
                        onChangeText={setBrand}
                    />
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.card}>
                    <Text style={styles.titleText}>Número de patrimônio</Text>
                    <TextInput 
                        keyboardType="numbers-and-punctuation" 
                        style={styles.input} 
                        placeholder="Número de patrimônio"
                        value={equityNumber}
                        onChangeText={setEquityNumber}
                    />
                </View>
            </View>
            <TouchableOpacity onPress={save} style={styles.button}>
                <Text style={styles.buttonText}>Salvar</Text>
                <ActivityIndicator animating={isLoading} size="small" color="#FFF" />   
            </TouchableOpacity>
            
        </ScrollView>
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

export default FormEquipament;