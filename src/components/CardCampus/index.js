import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native';

export default function CardCampus({ isOnModal, onOpen, item, setItem, deleteCampus, isDeleting, navigation, restoreCampus }) {

    async function confirm(id, type) {
        Alert.alert(
            'Confirmação',
            type === 'delete' ? 'Realmente deseja excluir esse campus?' : 'Realmente deseja reativar esse campus?',
            [
                {text: 'Sim', onPress: () => type === 'delete' ? deleteCampus(id) : restoreCampus(id)},
                {text: 'Não', style: 'cancel'},
            ],
            { cancelable: false }
        )
    }

    return (
        <TouchableOpacity onPress={() => { onOpen(); setItem(item) }} style={styles.main(isOnModal)}>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Text style={{ fontWeight: '700', color: item.status === 'Ativo' ? '#333' : '#FF0000', fontSize: 16 }}>Cidade: </Text>
                <Text style={{ fontSize: 16, color: item.status === 'Ativo' ? '#000' : '#FF0000' }}>{item.city}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Text style={{ fontWeight: '700', color: item.status === 'Ativo' ? '#333' : '#FF0000', fontSize: 16 }}>Endereço: </Text>
                <Text style={{ fontSize: 16, color: item.status === 'Ativo' ? '#000' : '#FF0000' }}>{item.adress}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: '700', color: item.status === 'Ativo' ? '#333' : '#FF0000', fontSize: 16, }}>Status: </Text>
                <Text style={{ fontSize: 16, color: item.status === 'Ativo' ? '#000' : '#FF0000' }}>{item.status}</Text>
            </View>

            {isOnModal && (
                <>
                    {(item.status === 'Ativo') ? (
                        <View style={styles.buttonsGroup}>
                            <TouchableOpacity onPress={() => navigation.push('EditCampus', { campus: item })} style={styles.row}>
                                <MaterialIcons name="edit" style={[styles.buttons, { marginLeft: 0 }]} color="#FFF"/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.row} onPress={() => confirm(item.id, 'delete')}>
                                <MaterialIcons name="delete" style={styles.buttons} color="#FFF"/>
                                {isDeleting && (
                                    <ActivityIndicator animating={isDeleting} size="small" color="#000" />   
                                )}
                            </TouchableOpacity>
                        </View>
                    )  : (
                        <View style={styles.center}>
                            <TouchableOpacity style={[styles.row, styles.center, { marginTop: 15 }]} onPress={() => confirm(item.id, 'restore')}>
                                <MaterialIcons name="restore-from-trash" style={styles.buttons} color="#FFF"/>
                                <Text style={{ fontSize: 16, marginLeft: 5 }}>Restaurar</Text>
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
    center: { 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
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