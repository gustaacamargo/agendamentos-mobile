import React, { useEffect, useState } from "react";
import { StatusBar, KeyboardAvoidingView, StyleSheet, Alert } from "react-native";
import DismissKeyboard from '../../../utils/dismissKeyboard';
import api from '../../../services/api';
import FormPlace from '../../../components/Form Place';

function EditPlaces({ navigation }) {
    const [place, setPlace] = useState(navigation.getParam('place'))

    useEffect(() => {
        const listener = navigation.addListener('didFocus', () => {
            setPlace(navigation.getParam('place'))
        })

        return () => {
            listener.remove()
        }
    }, [navigation])

    async function edit(id, data) {        
        await api.put("/places/"+id, data)
        .then(function (response) {  
            navigation.navigate('ViewPlaces')              
            Alert.alert('Prontinho', 'Sala editada com sucesso!');
        })
        .catch(function (error) {
            navigation.navigate('ViewPlaces')
            console.log(error)
            Alert.alert('Oops...', 'Houve um erro ao tentar editar as informações');
        });
    }

    return(
        <KeyboardAvoidingView style={styles.main} behavior="padding" enabled>
            <FormPlace onSubmit={edit} place={place}/>
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

export default EditPlaces;