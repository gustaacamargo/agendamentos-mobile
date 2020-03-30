import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function SchedulesCard({schedule, onDelete}) {
    const [isLoading, setIsLoading] = useState(false);

    function returnDateFormatted(date) {
        const string = date.toString();
        const dateString = string.split("T");
        return formatDateString(dateString[0]);
    }

    function formatDateString (string) {
        const input = string.split("-");  // ex input "2010-01-18"
        return input[2]+ "/" +input[1]+ "/" +input[0]; 
    }

    async function deleteSchedule(id) {
        setIsLoading(true);
        await onDelete(id);
        setIsLoading(false);
    }

    return(
        <View style={styles.card}>
            <ScrollView>
                <Text style={styles.titleText}>Data</Text>
                <Text style={styles.dataText} >{returnDateFormatted(schedule.date)}</Text>

                <View style={styles.row}>
                    <View style={styles.mr}>
                        <Text style={styles.titleText}>Início</Text>
                        <Text style={styles.dataText} >{schedule.initial}</Text>
                    </View>
                    <View>
                        <Text style={styles.titleText}>Final</Text>
                        <Text style={styles.dataText} >{schedule.final}</Text>
                    </View>            
                </View>

                <View style={styles.row}>
                    <View style={styles.mr}>
                        <Text style={styles.titleText}>Sala</Text>
                        <Text style={styles.dataText} >{schedule.place.name}</Text>
                    </View>
                    <View>
                        <Text style={styles.titleText}>Ano</Text>
                        <Text style={styles.dataText} >{schedule.category.description}</Text>
                    </View>            
                </View>

                <Text style={styles.titleText}>Solicitante</Text>
                <Text style={styles.dataText} >{schedule.requesting_user.fullname}</Text>

                <Text style={styles.titleText}>Cadastrador</Text>
                <Text style={styles.dataText} >{schedule.registration_user.fullname}</Text>

                <View style={styles.row}>
                    <View style={styles.mr}>
                        <Text style={styles.titleText}>Curso</Text>
                        <Text style={styles.dataText} >{schedule.course.name}</Text>
                    </View>
                    <View>
                        <Text style={styles.titleText}>Status</Text>
                        <Text style={
                            (schedule.status === 'Cancelado') ? (styles.red) : (styles.dataText)}
                        >{schedule.status}</Text>
                    </View>            
                </View>

                <Text style={styles.titleText}>Observações</Text>
                <Text style={styles.dataText} >{schedule.comments}</Text>
                
                <Text style={styles.titleText}>Equipamentos</Text>
                {schedule.equipaments.map( equipament => (
                        <Text style={styles.dataText} key={equipament.id}>{equipament.name}</Text>
                ))}
            </ScrollView>
            {(schedule.status === 'Confirmado') && (
                <View style={styles.buttonsGroup}>
                {/*  */}
                    <TouchableOpacity style={styles.row}>
                        <MaterialIcons name="edit" style={styles.buttons} color="#FFF"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row} onPress={() => deleteSchedule(schedule.id)}>
                        <MaterialIcons name="delete" style={styles.buttons} color="#FFF"/>
                        <ActivityIndicator animating={isLoading} size="small" color="#000" />   
                    </TouchableOpacity>
                </View>
            )}
        </View>  
    )
}

const styles = StyleSheet.create({
    loading: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center'

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
    main: { 
        flex: 1, 
        backgroundColor: '#7c90b1',
        padding: 10,
    },
    scroll: {
        flex: 1, 
    },  
    card: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 30,
        height: 'auto',
        borderRadius: 4,
        backgroundColor: '#FFF',
        marginRight: 5,
        marginLeft: 5
    },  
    row: {
        flexDirection: 'row',
    },  
    mr: {
        marginRight: 50
    },
    buttonsGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttons: {
        color: '#042963',
        fontSize: 27, 
        marginLeft: 10,
    },
    red: {
        color: '#FF0000',
        fontSize: 20,
        marginTop: 3
    },
    dataText: {
        color: '#333',
        fontSize: 20,
        marginTop: 3
    },
    titleText: {
        marginTop: 14,
        fontSize: 16,
        color: '#999'
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 5,
        backgroundColor: '#042963',
        alignSelf: 'stretch',
        marginTop: 15
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        marginRight: 5
    },
});

export default SchedulesCard;