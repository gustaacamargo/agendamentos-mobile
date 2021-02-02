import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useStore } from "../../reducer";

function FormEquipament({ onSubmit, equipament, navigation }) {
    const { userLogged: { userLogged } } = useStore()

    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [equityNumber, setEquityNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(equipament){
            setName(equipament.name);
            setBrand(equipament.brand);
            setEquityNumber(equipament.equityNumber);
        }
    }, []);

    function save() { 
        if(!name) { Alert.alert('Campo obrigatório', 'O campo nome deve ser preenchido'); return }       
        if(!brand) { Alert.alert('Campo obrigatório', 'O campo marca deve ser preenchido'); return }       
        if(!equityNumber) { Alert.alert('Campo obrigatório', 'O campo número de patrimônio deve ser preenchido'); return }       

        setIsLoading(true);
        onSubmit(equipament.id, {
            name,
            brand,
            equityNumber,
            status: 'Ativo',
            campus_id: userLogged.campusId,
        })
        .then(function (response) {     
            clear()
            setIsLoading(false);
            if(navigation) { navigation.navigate('ViewEquipaments') }
            Alert.alert('Prontinho', 'Equipamento salvo com sucesso!');
        })
        .catch(function (error) {
            console.log(error)
            setIsLoading(false);
            if(error?.response?.data?.error) { Alert.alert('Oops...', error.response.data.error) }
            else { Alert.alert('Oops...', 'Houve um erro ao tentar cadastrar as informações') }
        });
    }

    function clear() {
        setName('');
        setBrand('');
        setEquityNumber('');
    }

    return(
        <KeyboardAwareScrollView>
            <View style={styles.row}>
                <View style={styles.card}>
                    <Text style={styles.titleText}>Nome *</Text>
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
                    <Text style={styles.titleText}>Marca *</Text>
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
                    <Text style={styles.titleText}>Número de patrimônio *</Text>
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

export default FormEquipament;