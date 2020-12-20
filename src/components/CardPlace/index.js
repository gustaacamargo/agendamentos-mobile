import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native';

export default function CardPlace({ isOnModal, onOpen, item, setItem, deletePlace, isDeleting, navigation }) {

    async function confirmDelete(id) {
        Alert.alert(
            'Confirmação',
            'Realmente deseja excluir essa sala?',
            [
                {text: 'Sim', onPress: () => deletePlace(id)},
                {text: 'Não', style: 'cancel'},
            ],
            { cancelable: false }
        )
    }

    return (
        <TouchableOpacity onPress={() => { onOpen(); setItem(item) }} style={styles.main(isOnModal)}>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Text style={{ fontWeight: '700', color: item.status === 'Ativo' ? '#333' : '#FF0000', fontSize: 16 }}>Nome: </Text>
                <Text style={{ fontSize: 16, color: item.status === 'Ativo' ? '#000' : '#FF0000' }}>{item.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Text style={{ fontWeight: '700', color: item.status === 'Ativo' ? '#333' : '#FF0000', fontSize: 16 }}>Capacidade: </Text>
                <Text style={{ fontSize: 16, color: item.status === 'Ativo' ? '#000' : '#FF0000' }}>{item.capacity}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: '700', color: item.status === 'Ativo' ? '#333' : '#FF0000', fontSize: 16, }}>Status: </Text>
                <Text style={{ fontSize: 16, color: item.status === 'Ativo' ? '#000' : '#FF0000' }}>{item.status}</Text>
            </View>

            {isOnModal && (
                <>
                    {(item.status === 'Ativo') && (
                        <View style={styles.buttonsGroup}>
                            <TouchableOpacity onPress={() => navigation.push('EditPlaces', { place: item })} style={styles.row}>
                                <MaterialIcons name="edit" style={[styles.buttons, { marginLeft: 0 }]} color="#FFF"/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.row} onPress={() => confirmDelete(item.id)}>
                                <MaterialIcons name="delete" style={styles.buttons} color="#FFF"/>
                                {isDeleting && (
                                    <ActivityIndicator animating={isDeleting} size="small" color="#000" />   
                                )}
                            </TouchableOpacity>
                        </View>
                    )}
                </>
            )}
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    main: isOnModal => ({
        width: '100%', 
        backgroundColor: '#FFF', 
        marginBottom: 20, 
        borderRadius: 25, 
        padding: 20,
        shadowColor: "#333",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: isOnModal ? 0 : 0.25,
        shadowRadius: isOnModal ? 0 : 3.84,

        elevation: 5
    }),  
    row: {
        flexDirection: 'row',
    }, 
    containerEquipaments: {
        marginLeft: 10, 
        marginBottom: 10
    },
    text: status => ({
        fontWeight: '500', 
        color: (status == 'Confirmado') ? '#555' : '#FF0000', 
        fontSize: 15
    }),
    line: {
        marginBottom: 12, 
        borderBottomColor: '#CCC', 
        borderBottomWidth: 0.5, 
        paddingBottom: 10 
    },
    buttonsGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    buttons: {
        color: '#042963',
        fontSize: 27, 
        marginLeft: 10,
    },
})