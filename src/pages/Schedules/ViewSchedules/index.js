import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StatusBar, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import api from '../../../services/api';
import dateFnsFormat from 'date-fns/format';
import Select2 from "react-native-select-two";
import SchedulesCard from "../../../components/SchedulesCard";
import AwesomeAlert from 'react-native-awesome-alerts';

function ViewSchedule({ navigation }) {
    
    const FORMAT = 'yyyy-MM-dd';
    const [schedules, setSchedules] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingBt, setIsLoadingBt] = useState(false);
    const [showApp, setShowApp] = useState(false);
    const [date, setDate] = useState('');
    const [periods, setPeriods] = useState([{id: "Manha", name: "Manhã"}, 
                                            {id: "Tarde", name: "Tarde"}, 
                                            {id: "Noite", name: "Noite"}]);
    const [period, setPeriod] = useState('');

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
               
            });
            setIsLoading(false);   
            setShowApp(true);     
        }

        retrieveSchedules();
    }, []);

    function formatDate(string) {
        const dateInitial = string.split("/");
        if(dateInitial[1] >= 1 && dateInitial[1] <= 12 && isNumber(dateInitial[1]) ){
            return dateInitial[2]+"-"+dateInitial[1]+"-"+dateInitial[0];
        } 
        else {
            alert('insira uma data válida')            
        }
    }

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    async function filter() {

        if(date && period) {
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
                //MySwal.fire('Oops...', 'Houve um tentar filtrar as informações, tente novamente!', 'error');
            });
            setIsLoadingBt(false);
        }
        else {
            
            alert("erro")
        }
    }

    return(
        <>
            <StatusBar barStyle="light-content"/>
            <View style={styles.main}>
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
                                    </View>
                                </View>
                            </Swiper>

                            <Swiper loop={false} >    
                                {schedules.map( schedule => (
                                    <SchedulesCard key={schedule.id} schedule={schedule}/>
                                ))}
                            </Swiper>
                        </Swiper>

                    </View>
                )}
            </View>      
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