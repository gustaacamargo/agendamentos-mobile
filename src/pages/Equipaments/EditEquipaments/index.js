import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Alert } from "react-native";
import api from '../../../services/api';
import FormEquipament from '../../../components/Form Equipament';

function EditEquipaments({ navigation }) {
    const [equipament, setEquipament] = useState(navigation.getParam('equipament'))

    useEffect(() => {
        const listener = navigation.addListener('didFocus', () => {
            setEquipament(navigation.getParam('equipament'))
        })

        return () => {
            listener.remove()
        }
    }, [navigation])

    async function edit(id, data) {        
        await api.put("/equipaments/"+id, data)
        .then(function (response) {     
            navigation.navigate('ViewEquipaments')
            Alert.alert('Prontinho', 'Equipamento editado com sucesso!');
        })
        .catch(function (error) {
            navigation.navigate('ViewEquipaments')
            console.log(error)
            Alert.alert('Oops...', 'Houve um erro ao tentar editar as informações');
        });
    }

    return(
        <KeyboardAvoidingView style={styles.main} behavior="padding" enabled>
            <FormEquipament onSubmit={edit} equipament={equipament}/>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    loading: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.10)',
        justifyContent: 'center',
        alignItems: 'center',
        

    },
    main: {
        flex: 1,
        backgroundColor: '#7c90b1',
        padding: 10
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
    cardBetween: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 15,
        height: 'auto',
        borderRadius: 4,
        backgroundColor: '#FFF',
        marginRight: 5,
        marginLeft: 5
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
    cardDisabled: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 15,
        height: 'auto',
        borderRadius: 4,
        backgroundColor: '#CCC',
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

export default EditEquipaments;