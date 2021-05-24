import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Alert, View, Text, TextInput, StatusBar, RefreshControl, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import api from '../../../services/api';
import { EvilIcons } from '@expo/vector-icons'; 
import { formatDate } from '../../../utils/formatDate';
import { FlatList } from 'react-native-gesture-handler';
import { screenHeight, screenWidth } from '../../../constants/screen';
import { Modalize } from 'react-native-modalize';
import moment from 'moment';
import CardSchedule from '../../../components/CardSchedule';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { NavigationEvents } from 'react-navigation';
import Picker from 'react-native-picker-select'
import { Icon } from "react-native-elements";

function ViewSchedule({ navigation }) {
    
    const [schedules, setSchedules] = useState([]);
    const [schedule, setSchedule] = useState({})
    const [isRefreshing, setIsRefreshing] = useState(true);
    const [date, setDate] = useState(moment().format('DD/MM/YYYY'));
    const [periods, setPeriods] = useState([{value: "Manha", label: "Manhã"}, 
                                            {value: "Tarde", label: "Tarde"}, 
                                            {value: "Noite", label: "Noite"}]);
    const [period, setPeriod] = useState('');
    const modalizeRef = useRef(null);
    const [isDeleting, setIsDeleting] = useState(false)

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const handleConfirm = (date) => {
        setDatePickerVisibility(false);
        setDate(moment(date).format('DD/MM/YYYY'))
    };

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    const closeModal = () => {
        modalizeRef.current?.close();
    };

    const onRefresh = useCallback(() => {
        filter();
    }, [isRefreshing]);

    async function deleteSchedule(id) {
        setIsDeleting(true)
        await api.delete(`/schedules/${id}`)
        .then(function (response) {
            Alert.alert('Prontinho', 'Agendamento deletado com sucesso');
            filter();
            closeModal()
        })
        .catch(function (error) {
            console.log(error)
            Alert.alert('Oops...', 'Houve um tentar visualizar as informações, tente novamente!');
        })
        .finally(() => setIsDeleting(false))
    }

    async function editSchedule(id, data) {        

        await api.put(`/schedules/${id}`, data)
        .then(function (response) {      
            closeModal()          
            Alert.alert('Prontinho', 'Agendamento editado com sucesso!');
            filter();
        })
        .catch(function (error) {
            console.log(error)
            Alert.alert('Oops...', 'Houve um erro ao tentar editar o agendamento');
        });
    }

    async function filter() {
        if(!date) {Alert.alert('Campo não preenchido', 'A data deve ser preenchida'); return}
        let dateFilter = moment().format('YYYY-MM-DD')
        let periodFilter = ""

        if(date) { dateFilter = formatDate(date) }
        if(period) { periodFilter = period }
                
        setIsRefreshing(true);
        await api.get("/filter", {
            headers: { 
                period: periodFilter,
                date_a: dateFilter, 
            },
        })
        .then(function (response) {
            setIsRefreshing(false);
            setSchedules(response.data);    
        })
        .catch(function (error) {
            setIsRefreshing(false);
            console.log(error)
            Alert.alert('Erro', 'Houve um erro ao recuperar as informações, tente novamente');
        });
    }

    function renderCard({ item }) {
        return(
            <CardSchedule isOnModal={false} onOpen={onOpen} item={item} setItem={setSchedule}/>
        )
    }

    return(
        <View style={{ flex: 1, backgroundColor: '#F0F0F0' }}>
            <NavigationEvents onDidFocus={payload => filter()} />
            <View style={{ backgroundColor: "#042963", padding: 20, flexDirection: 'row' }}>
                <TouchableOpacity style={{ backgroundColor: "#FFF", width: screenWidth * 0.369, height: 41, marginRight: 20, paddingLeft: 15, paddingVertical: 13, borderRadius: 11, justifyContent: 'center' }} onPress={() => {setDatePickerVisibility(true)}}>
                    <Text style={!date ? { color: '#ccc' } : { color: '#000' }} >{date || "Data"}</Text>
                </TouchableOpacity>
                <Picker
                    onValueChange={setPeriod}
                    items={periods}
                    placeholder={{ label: "Turno", value: null }}
                    style={{
                        inputAndroid: { backgroundColor: "#FFF", width: screenWidth * 0.369, height: 41, paddingLeft: 10, paddingVertical: 13, borderRadius: 11, alignItems: 'center', justifyContent: 'center', color: '#000' },
                        inputIOS: { backgroundColor: "#FFF", width: screenWidth * 0.369, height: 41, paddingLeft: 10, paddingVertical: 13, borderRadius: 11, alignItems: 'center', justifyContent: 'center', color: '#000' },
                        placeholder: { backgroundColor: "#FFF", width: screenWidth * 0.369, height: 41, paddingLeft: 10, paddingVertical: 13, borderRadius: 11, alignItems: 'center', justifyContent: 'center' }
                    }}
                    value={period}
                    useNativeAndroidPickerStyle={false}
                    Icon={() => {return null}}
                />
                <TouchableOpacity onPress={filter} style={{ width: screenWidth * 0.1, justifyContent: 'center', alignItems: 'center', marginLeft: 12, height: screenWidth * 0.1, backgroundColor: '#021026', borderRadius: (screenWidth * 0.15)/2 }}>
                    <EvilIcons name="search" size={30} color="white" />
                </TouchableOpacity>
            </View>
            <FlatList 
                style={{ paddingTop: 20 }}
                contentContainerStyle={{ marginHorizontal: 20 }}
                data={schedules}
                ListEmptyComponent={
                    <View style={{ alignItems: 'center', flex: 1, paddingTop: 50 }}>
                        <Text style={{ color: '#777', fontSize: 16, fontWeight: '500' }}>Nenhum agendamento para este dia</Text>
                    </View>
                }
                renderItem={renderCard}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={ <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
            />

            <Modalize ref={modalizeRef} modalTopOffset={200}>
                <CardSchedule navigation={navigation} isOnModal={true} onOpen={onOpen} item={schedule} setItem={setSchedule} editSchedule={editSchedule} deleteSchedule={deleteSchedule} isDeleting={isDeleting} />
            </Modalize>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                locale="pt_BR"
                onConfirm={handleConfirm}
                isDarkModeEnabled={false}
                onCancel={() => setDatePickerVisibility(false)}
                headerTextIOS="Selecionar"
                cancelTextIOS="Cancelar"
                confirmTextIOS="Confirmar"
            />
        </View>
    );
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
        flex: 1,
        flexDirection: 'row',
    },  
    buttonsGroup: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    buttons: {
        color: '#A24AC1',
        fontSize: 27, 
        marginLeft: 10,
    },
    titleText: {
        marginTop: 14,
        fontSize: 16,
        color: '#999'
    },
    infoText: {
        marginTop: 30,
        fontSize: 18,
        color: '#CCC'
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

export default ViewSchedule;