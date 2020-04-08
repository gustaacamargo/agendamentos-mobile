import React, { useState, useEffect, useCallback } from 'react';
import { Alert, View, Text, TextInput, StatusBar, RefreshControl, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import api from '../../../services/api';
import dateFnsFormat from 'date-fns/format';
import Select2 from "react-native-select-two";
import SchedulesCard from "../../../components/SchedulesCard";
import { formatDate } from '../../../utils/formatDate';

function ViewSchedule({ navigation }) {
    
    const FORMAT = 'yyyy-MM-dd';
    const [schedules, setSchedules] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingBt, setIsLoadingBt] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showApp, setShowApp] = useState(false);
    const [date, setDate] = useState('');
    const [periods, setPeriods] = useState([{id: "Manha", name: "Manhã"}, 
                                            {id: "Tarde", name: "Tarde"}, 
                                            {id: "Noite", name: "Noite"}]);
    const [period, setPeriod] = useState('');

    const onRefresh = useCallback(() => {
        setIsRefreshing(true);
        filter();
        setIsRefreshing(false);
        
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
        
        if(date && period) {
            if((formatDate(date) !== false)){
                
                setIsLoadingBt(true);  
                await api.get("/filter", {
                    headers: { 
                        period: period[0],
                        date_a: formatDate(date), 
                    },
                })
                .then(function (response) {
                    setSchedules(response.data);                
                })
                .catch(function (error) {
                    console.log(error)
                    Alert.alert('Erro', 'Houve um erro ao tentar visualizar as informações');
                });
                setIsLoadingBt(false);
            }
            else {
                Alert.alert('Data inválida', 'Por favor, insira um data válida!');           
            }            
        }
        else {
            Alert.alert('Campos não preenchidos', 'Preencha todos os campos!');
        }
        setIsRefreshing(false);
    }

    return(
        <>
            <StatusBar barStyle="light-content"/>
            <ScrollView 
                contentContainerStyle={styles.main}
                refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
                }
            >
                { isLoading && (
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#FFF" />    
                    </View>)
                }
                
                {showApp && (
                    <View style={styles.row}>
                        <Swiper showsPagination={false} loop={false}>
                            {/* swiper com card para realizar filtragem */}
                            <Swiper showsPagination={false} loop={false}>
                                <View style={styles.card}>
                                    <View>
                                        <Text style={styles.titleText}>Data</Text>
                                        <TextInput 
                                            keyboardType="numbers-and-punctuation" 
                                            style={styles.input} 
                                            placeholder="xx/xx/xxxx"
                                            value={date}
                                            onChangeText={setDate}
                                        />

                                        <Text style={styles.titleText}>Turno</Text>
                                        <Select2
                                            isSelectSingle
                                            style={styles.input}
                                            colorTheme="blue"
                                            popupTitle="Selecione um turno"
                                            searchPlaceHolderText="Pesquisar"
                                            title="Turno"
                                            data={periods}
                                            onSelect={data => {
                                            setPeriod(data);                                           
                                            }}
                                            cancelButtonText="Cancelar"
                                            selectButtonText="Selecionar"
                                            listEmptyTitle="Não há nada aqui"
                                        />



                                        <TouchableOpacity onPress={filter} style={styles.button}>
                                            <Text style={styles.buttonText}>Filtrar</Text>
                                            <ActivityIndicator animating={isLoadingBt} size="small" color="#FFF" />   
                                        </TouchableOpacity>

                                        { (schedules.length <= 0) ? 
                                            (<Text style={styles.infoText}>Sem agendamentos para a pesquisa realizada</Text>) :
                                            (<Text style={styles.infoText}>Deslize para a esquerda para visualizar seus agendamentos</Text>)
                                        
                                        }
                                    </View>
                                </View>
                            </Swiper>
                            
                            <Swiper loop={false} showsPagination={false}>    
                                {schedules.map( schedule => (
                                    <SchedulesCard onEdit={editSchedule} onDelete={deleteSchedule} key={schedule.id} schedule={schedule}/>
                                ))}
                            </Swiper>
                        </Swiper>
                    </View>
                )}
            </ScrollView>      
        </>
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