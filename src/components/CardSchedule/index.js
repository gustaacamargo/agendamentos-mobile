import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import moment from 'moment'
import { MaterialIcons } from '@expo/vector-icons';

export default function CardSchedule({ isOnModal, onOpen, item, setItem, editSchedule, deleteSchedule, navigation, isDeleting }) {

    async function confirmDelete(id) {
        Alert.alert(
            'Confirmação',
            'Realmente deseja excluir esse agendamento?',
            [
                {text: 'Sim', onPress: () => deleteSchedule(id)},
                {text: 'Não', style: 'cancel'},
            ],
            { cancelable: false }
        )
    }

    return (
        <TouchableOpacity onPress={() => { onOpen(); setItem(item) }} style={styles.main(isOnModal)}>
            <View style={styles.line}>
                <Text style={[ styles.text(item.status), { marginBottom: 10 } ]}>Data: {moment(item.date.substring(0,10)).format('DD/MM/YYYY')}</Text>
                <View style={styles.row}>
                    <Text style={styles.text(item.status)}>Inicial: {item.initial.substring(0,5)}</Text>
                    <Text style={[ styles.text(item.status), { marginLeft: 10 } ]}>Final: {item.final.substring(0,5)}</Text>
                </View>
            </View>
            <View style={styles.line}>
                <Text style={[ styles.text(item.status), { marginBottom: 10 } ]}>Sala: {item.place.name}</Text>
                <Text style={styles.text(item.status)}>Solicitante: {item.requesting_user.fullname}</Text>
            </View>
            
            <View style={styles.row}>
                <Text style={[ styles.text(item.status), { marginBottom: 10 } ]}>Equipamentos: </Text>
                <View style={styles.containerEquipaments}>
                    {item.equipaments.map(equipament => (
                        <Text style={styles.text(item.status)}>{equipament.name}</Text>
                    ))}
                </View>
            </View>
            <Text style={[ styles.text(item.status), { marginBottom: 10 } ]}>Status: {item.status}</Text>

            {isOnModal && (
                <>
                    <View style={styles.line}/>
                    <Text style={[ styles.text(item.status), { marginBottom: 10 }] }>Curso: {item.course.name}</Text>
                    <Text style={[ styles.text(item.status), { marginBottom: 10 }] }>Ano: {item.category.description}</Text>
                    <View style={styles.line}/>
                    <Text style={[ styles.text(item.status), { marginBottom: 10 }] }>Responsável: {item.registration_user.fullname}</Text>
                    <Text style={[ styles.text(item.status), { marginBottom: 10 }] }>Observações: {item.comments}</Text>

                    {(item.status === 'Confirmado') && (
                        <View style={styles.buttonsGroup}>
                            <TouchableOpacity onPress={() => navigation.navigate('EditSchedules', { schedule: item })} style={styles.row}>
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
        marginTop: 10
    },
    buttons: {
        color: '#042963',
        fontSize: 27, 
        marginLeft: 10,
    },
})