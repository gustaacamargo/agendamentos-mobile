import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import Select2 from "react-native-select-two";
import api from '../../services/api';
import { formatDate } from '../../utils/formatDate';
import { isHourValid } from '../../utils/isHourValid';
import { returnDateFormatted } from '../../utils/returnDateFormatted';

function FormSchedule({ onSubmit, schedule }) {

    const [date, setDate] = useState('');
    const [final, setFinal] = useState('');
    const [initial, setInitial] = useState('');
    const [comments, setComments] = useState('');

    const [course, setCourse] = useState('');
    const [category, setCategory] = useState('');
    const [place, setPlace] = useState('');
    const [requestingUser, setRequestingUser] = useState('');
    const [equipamentsSelected, setEquipamentsSelected] = useState([]);

    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [places, setPlaces] = useState([]);
    const [equipaments, setEquipaments] = useState([]);
    const [users, setUsers] = useState([]);

    const [isUser, setIsUser] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [showFields, setShowFields] = useState(false);
    const [userLogged, setUserLogged] = useState([]);

    const [locked, setLocked] = useState(true);

    useEffect(() => {
        async function getUser() {
            const response = await api.get('/userLogged');
            setUserLogged(response.data.user);
            if(response.data.user.function === 'user') {
                setIsUser(true);
            }
            else {
                setIsUser(false);
            }
        }

        getUser();

        if(schedule !== ''){            
            setDate(returnDateFormatted(schedule.date));
            setEquipaments(schedule.equipaments);
            setInitial(schedule.initial);
            setFinal(schedule.final);
            setCourse(schedule.course);
            setCategory(schedule.category);
            setPlace(schedule.place);
            setRequestingUser(schedule.requesting_user);
            setComments(schedule.comments);
        }

    }, []);

    async function disponibilty() {        
        if(date && initial && final) {
            setIsLoading(true);

            if(isHourValid(initial) && isHourValid(final) && (formatDate(date) !== false)) {
                let lenghtPlaces = 0;
                await api.get("/availability", {
                    headers: { 
                        initial: initial,
                        final: final,
                        date_a: formatDate(date), 
                        status: 'Confirmado'
                    },
                })
                .then(function (response) {
                    if(schedule !== ''){                    
                        setEquipaments([...equipaments, ...response.data.avaibilityEquipaments]);
                        setPlaces([schedule.place, ...response.data.avaibilityPlaces]);
                        lenghtPlaces = response.data.avaibilityPlaces.length+1; 
                    }
                    else {
                        setEquipaments(response.data.avaibilityEquipaments);
                        setPlaces(response.data.avaibilityPlaces);   
                        lenghtPlaces = response.data.avaibilityPlaces.length;  
                    }
                    retrieveData(lenghtPlaces);
                    
                })
                .catch(function (error) {
                    console.log(error);
                    
                    Alert.alert('Erro', error.response.data.error);
                });

                
            }
            else {
                Alert.alert('Horário ou data inválida', 'Por favor, reveja os dados inseridos e tente novamente!');           
            }   
            setIsLoading(false);        
        }
        else {
            Alert.alert('Campos não preenchidos', 'Preencha todos os campos!');
        }
    }

    async function retrieveData(lenghtPlaces) {
        if(lenghtPlaces > 0) {
            let array;
            if(userLogged.function === 'adm') {                
                const responseUsers = await api.get("/users");

                const usersReceived = responseUsers.data.filter((elem) => {
                    return elem.status === 'Ativo';
                });

                array = usersReceived;
                array.forEach(user => {
                    user["name"] = user["fullname"];
                });
                setUsers(array);     
            }
            else {
                userLogged["name"] = userLogged["fullname"];
                setUsers([userLogged]);
            }         

            const responseCategories = await api.get("/categories");
            const categoriesReceived = responseCategories.data.filter((elem) => {
                return elem.status === 'Ativo';
            });
            array = categoriesReceived;
            array.forEach(category => {
                category["name"] = category["description"];
            });
            setCategories(array);             
            
            const responseCourses = await api.get("/courses");
            const coursesReceived = responseCourses.data.filter((elem) => {
                return elem.status === 'Ativo';
            });
            setCourses(coursesReceived); 

            setLocked(false);
            setShowFields(true);
        }
        else {                
            Alert.alert("Sem salas para o horário solicitado", "Não há mais disponibilidade de salas para este horário!");
        }
    }

    async function save() {        
        if(typeof course === 'object' && typeof category === 'object' && typeof place === 'object' && typeof requestingUser === 'object' ) {
            setIsLoading(true);

            const response = await api.get('/userLogged');
            if(isUser){
                setRequestingUser(userLogged.id)
                // requestingUser = userLogged.id;
            }

            await onSubmit(schedule.id, {
                place_id: place[0],
                category_id: category[0],
                course_id: course[0],
                registration_user_id: userLogged.id,
                requesting_user_id: requestingUser,
                campus_id: response.data.campus.id,
                comments,
                date: formatDate(date),
                initial,
                final,
                equipaments: equipamentsSelected,
                status: "Confirmado"
            });

            onClickDateOrHour();
            setComments('');
            setDate('');
            setInitial('');
            setFinal('');
            // //controlFields();
            // //setEquipamentsView('');
            
            setEquipaments([]);
            setEquipamentsSelected([]);
            setPlace('');
            setCourse('');
            setRequestingUser('');
            setCategory('');
            setIsLoading(false);
        }
        else {
            Alert.alert('Campos não preenchidos', 'Preencha todos os campos!');
        }
    }

    function onClickDateOrHour() {
        setShowFields(false);
    }

    return(
        <ScrollView >
            <View style={styles.row}>
                <View style={styles.card}>
                    <Text style={styles.titleText}>Data</Text>
                    <TextInput 
                        onFocus={onClickDateOrHour}
                        keyboardType="numbers-and-punctuation" 
                        style={styles.input} 
                        placeholder="xx/xx/xxxx"
                        value={date}
                        onChangeText={setDate}
                    />
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.cardBetween}>
                    <View style={{flex: 1, marginRight: 2}}>
                        <Text style={styles.titleText}>Início</Text>
                        <TextInput 
                            onFocus={onClickDateOrHour}
                            keyboardType="numbers-and-punctuation" 
                            style={styles.input} 
                            placeholder="hh:mm"
                            value={initial}
                            onChangeText={setInitial}
                        />
                    </View>
                    <View style={{flex: 1, marginLeft: 2}}>
                        <Text style={styles.titleText}>Final</Text>
                        <TextInput 
                            onFocus={onClickDateOrHour}
                            keyboardType="numbers-and-punctuation" 
                            style={styles.input} 
                            placeholder="hh:mm"
                            value={final}
                            onChangeText={setFinal}
                        />
                    </View>
                </View>
            </View>

            {(!showFields) && (
                <TouchableOpacity onPress={disponibilty} style={styles.button}>
                    <Text style={styles.buttonText}>Verficar disponibilidade</Text>
                    <ActivityIndicator animating={isLoading} size="small" color="#FFF" />   
                </TouchableOpacity>
            )}

            {(showFields) && (
                <>
                    <View style={styles.row}>
                        <View style={styles.card}>
                            <Text style={styles.titleText}>Observações</Text>
                            <TextInput 
                                keyboardType="default" 
                                style={styles.input} 
                                placeholder="Observações"
                                value={comments}
                                onChangeText={setComments}
                                numberOfLines={4}
                            />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.card}>
                            <Text style={styles.titleText}>Sala</Text>
                            <Select2
                                isSelectSingle
                                style={styles.input}
                                colorTheme="blue"
                                popupTitle="Selecione um turno"
                                searchPlaceHolderText="Pesquisar"
                                title="Sala"
                                data={places}
                                onSelect={data => {
                                setPlace(data);                                           
                                }}
                                cancelButtonText="Cancelar"
                                selectButtonText="Selecionar"
                                listEmptyTitle="Não há nada aqui"
                            />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.card}>
                            <Text style={styles.titleText}>Ano</Text>
                            <Select2
                                isSelectSingle
                                style={styles.input}
                                colorTheme="blue"
                                popupTitle="Selecione um turno"
                                searchPlaceHolderText="Pesquisar"
                                title="Ano"
                                data={categories}
                                onSelect={data => {
                                setCategory(data);                                           
                                }}
                                cancelButtonText="Cancelar"
                                selectButtonText="Selecionar"
                                listEmptyTitle="Não há nada aqui"
                            />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.card}>
                            <Text style={styles.titleText}>Solicitante</Text>
                            <Select2
                                isSelectSingle
                                style={styles.input}
                                colorTheme="blue"
                                popupTitle="Selecione um turno"
                                searchPlaceHolderText="Pesquisar"
                                title="Solicitante"
                                data={users}
                                onSelect={data => {
                                setRequestingUser(data);                                           
                                }}
                                cancelButtonText="Cancelar"
                                selectButtonText="Selecionar"
                                listEmptyTitle="Não há nada aqui"
                            />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.card}>
                            <Text style={styles.titleText}>Curso</Text>
                            <Select2
                                isSelectSingle
                                style={styles.input}
                                colorTheme="blue"
                                popupTitle="Selecione um turno"
                                searchPlaceHolderText="Pesquisar"
                                title="Curso"
                                data={courses}
                                onSelect={data => {
                                setCourse(data);                                                                           
                                }}
                                cancelButtonText="Cancelar"
                                selectButtonText="Selecionar"
                                listEmptyTitle="Não há nada aqui"
                            />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.card}>
                            <Text style={styles.titleText}>Equipamento</Text>
                            <Select2
                                style={styles.input}
                                colorTheme="blue"
                                popupTitle="Selecione um turno"
                                searchPlaceHolderText="Pesquisar"
                                title="Equipamento"
                                data={equipaments}
                                onSelect={data => {
                                    setEquipamentsSelected(data);                                                                          
                                }}
                                cancelButtonText="Cancelar"
                                selectButtonText="Selecionar"
                                listEmptyTitle="Não há nada aqui"
                            />
                        </View>
                    </View>

                    <TouchableOpacity onPress={save} style={styles.button}>
                        <Text style={styles.buttonText}>Salvar</Text>
                        <ActivityIndicator animating={isLoading} size="small" color="#FFF" />   
                    </TouchableOpacity>
                </>
            )}
        </ScrollView>
    )
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

export default FormSchedule;