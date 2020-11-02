import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Alert, View, Text, TextInput, StatusBar, RefreshControl, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import api from '../../../services/api';
import dateFnsFormat from 'date-fns/format';
import { EvilIcons } from '@expo/vector-icons'; 
import Select2 from "react-native-select-two";
import SchedulesCard from "../../../components/SchedulesCard";
import { formatDate } from '../../../utils/formatDate';
import { FlatList } from 'react-native-gesture-handler';
import { screenHeight, screenWidth } from '../../../constants/screen';
import { Modalize } from 'react-native-modalize';
import format from 'date-fns/format';
import { parseISO } from 'date-fns';
import moment from 'moment';
import CardSchedule from '../../../components/CardSchedule';

function ViewSchedule({ navigation }) {
    
    const FORMAT = 'yyyy-MM-dd';
    const [schedules, setSchedules] = useState([]);
    const [schedule, setSchedule] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingBt, setIsLoadingBt] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showApp, setShowApp] = useState(false);
    const [date, setDate] = useState('');
    const [periods, setPeriods] = useState([{id: "Manha", name: "Manhã"}, 
                                            {id: "Tarde", name: "Tarde"}, 
                                            {id: "Noite", name: "Noite"}]);
    const [period, setPeriod] = useState('');
    const modalizeRef = useRef(null);

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    const onRefresh = useCallback(() => {
        filter();
    }, [isRefreshing]);

    useEffect(() => {
        setIsLoading(true);        
        async function retrieveSchedules() {
            await api.get("/filter", {
                headers: { 
                    period: '',
                    date_a: dateFnsFormat(new Date(), FORMAT), 
                },
            })
            .then(function (response) {
                setSchedules(response.data);   
                console.log(response.data);                         
            })
            .catch(function (error) {
                console.log(error)
                Alert.alert('Erro', 'Houve um erro ao tentar visualizar as informações');
            });
            setIsLoading(false);   
            setShowApp(true);     
        }

        retrieveSchedules();
    }, []);

    async function deleteSchedule(id) {
        await api.delete(`/schedules/${id}`)
        .then(function (response) {
            Alert.alert('Prontinho', 'Agendamento deletado com sucesso');
            filter();
        })
        .catch(function (error) {
            console.log(error)
            Alert.alert('Oops...', 'Houve um tentar visualizar as informações, tente novamente!');
        });
    }

    async function editSchedule(id, data) {        

        await api.put(`/schedules/${id}`, data)
        .then(function (response) {                
            Alert.alert('Prontinho', 'Agendamento editado com sucesso!');
            filter();
        })
        .catch(function (error) {
            console.log(error)
            Alert.alert('Oops...', 'Houve um erro ao tentar editar o agendamento');
        });
    }

    async function filter() {
        let dateFilter = dateFnsFormat(new Date(), FORMAT)
        let periodFilter = ""

        if(date) { dateFilter = date }
        if(period) { periodFilter = period[0] }
                
        setIsRefreshing(true);
        setIsLoadingBt(true);  
        await api.get("/filter", {
            headers: { 
                period: periodFilter,
                date_a: dateFilter, 
            },
        })
        .then(function (response) {
            setSchedules(response.data);    
        })
        .catch(function (error) {
            console.log(error)
            Alert.alert('Erro', 'Houve um erro ao recuperar as informações, tente novamente');
        });
        setIsLoadingBt(false);
        setIsRefreshing(false);
    }

    function renderCard({ item }) {
        return(
            <CardSchedule isOnModal={false} onOpen={onOpen} item={item} setItem={setSchedule}/>
        )
    }

    return(
        <View style={{ flex: 1, backgroundColor: '#F0F0F0' }}>
            <View style={{ backgroundColor: "#042963", padding: 20, flexDirection: 'row' }}>
                <TextInput style={{ backgroundColor: "#FFF", flex: 1, marginRight: 20, paddingLeft: 15, paddingVertical: 13, borderRadius: 11 }} placeholder="Data"></TextInput>
                <TextInput style={{ backgroundColor: "#FFF", flex: 1, paddingLeft: 15, paddingVertical: 13, borderRadius: 11 }} placeholder="Turno"></TextInput>
                <TouchableOpacity style={{ width: screenWidth * 0.1, justifyContent: 'center', alignItems: 'center', marginLeft: 12, height: screenWidth * 0.1, backgroundColor: '#021026', borderRadius: (screenWidth * 0.15)/2 }}>
                    <EvilIcons name="search" size={30} color="white" />
                </TouchableOpacity>
            </View>
            <FlatList 
                style={{ paddingTop: 20 }}
                contentContainerStyle={{ marginHorizontal: 20 }}
                data={schedules}
                renderItem={renderCard}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={ <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
                
            />
            <Modalize adjustToContentHeight={true} ref={modalizeRef}>
                <CardSchedule isOnModal={true} onOpen={onOpen} item={schedule} setItem={setSchedule} editSchedule={editSchedule} deleteSchedule={deleteSchedule}/>
            </Modalize>
        </View>
        // <ScrollView 
        //     contentContainerStyle={styles.main}
        //     refreshControl={
        //         <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        //     }
        // >
        //     { isLoading && (
        //         <View style={styles.loading}>
        //             <ActivityIndicator size="large" color="#FFF" />    
        //         </View>)
        //     }
            
        //     {showApp && (
        //         <View style={styles.row}>
        //             <Swiper showsPagination={false} loop={false}>
        //                 {/* swiper com card para realizar filtragem */}
        //                 <Swiper showsPagination={false} loop={false}>
        //                     <View style={styles.card}>
        //                         <View>
        //                             <Text style={styles.titleText}>Data</Text>
        //                             <TextInput 
        //                                 keyboardType="numbers-and-punctuation" 
        //                                 style={styles.input} 
        //                                 placeholder="xx/xx/xxxx"
        //                                 value={date}
        //                                 onChangeText={setDate}
        //                             />

        //                             <Text style={styles.titleText}>Turno</Text>
        //                             <Select2
        //                                 isSelectSingle
        //                                 style={styles.input}
        //                                 colorTheme="blue"
        //                                 popupTitle="Selecione um turno"
        //                                 searchPlaceHolderText="Pesquisar"
        //                                 title="Turno"
        //                                 data={periods}
        //                                 onSelect={data => {
        //                                 setPeriod(data);                                           
        //                                 }}
        //                                 cancelButtonText="Cancelar"
        //                                 selectButtonText="Selecionar"
        //                                 listEmptyTitle="Não há nada aqui"
        //                             />



        //                             <TouchableOpacity onPress={filter} style={styles.button}>
        //                                 <Text style={styles.buttonText}>Filtrar</Text>
        //                                 <ActivityIndicator animating={isLoadingBt} size="small" color="#FFF" />   
        //                             </TouchableOpacity>

        //                             { (schedules.length <= 0) ? 
        //                                 (<Text style={styles.infoText}>Sem agendamentos para a pesquisa realizada</Text>) :
        //                                 (<Text style={styles.infoText}>Deslize para a esquerda para visualizar seus agendamentos</Text>)
                                    
        //                             }
        //                         </View>
        //                     </View>
        //                 </Swiper>
                        
        //                 <Swiper loop={false} showsPagination={false}>    
        //                     {schedules.map( schedule => (
        //                         <SchedulesCard onEdit={editSchedule} onDelete={deleteSchedule} key={schedule.id} schedule={schedule}/>
        //                     ))}
        //                 </Swiper>
        //             </Swiper>
        //         </View>
        //     )}
        // </ScrollView>      
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