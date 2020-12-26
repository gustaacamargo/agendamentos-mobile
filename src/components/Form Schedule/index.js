import React, { useState, useEffect } from "react";
import { styles } from './styles'
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import Select2 from "react-native-select-two";
import api from '../../services/api';
import { formatDate } from '../../utils/formatDate';
import { isHourValid } from '../../utils/isHourValid';
import { returnDateFormatted } from '../../utils/returnDateFormatted';
import moment from 'moment';
import { useStore } from "../../reducer";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function FormSchedule({ onSubmit, schedule }) {
    const { userLogged: { userLogged } } = useStore()

    const [date, setDate] = useState(moment().format('DD/MM/YYYY'));
    const [final, setFinal] = useState(moment().format('HH:mm'));
    const [initial, setInitial] = useState(moment().format('HH:mm'));
    const [comments, setComments] = useState('');
    const [edited, setEdited] = useState(false)
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

    const [isLoading, setIsLoading] = useState(false);
    const [showFields, setShowFields] = useState(false);
    const [typeModal, setTypeModal] = useState('date');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [nameOfSelectedDate, setNameOfSelectedDate] = useState('date');

    const showDatePicker = (type, name) => {
        setTypeModal(type);
        setNameOfSelectedDate(name);
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        hideDatePicker();
        setTimeDate(typeModal, nameOfSelectedDate, date);
    };

    function setTimeDate(typeModal, nameOfSelectedDate, date) {
        let dateReturned;
        if(typeModal == 'time') { dateReturned = moment(date).format('HH:mm') }
        else { dateReturned = moment(date).format('DD/MM/YYYY'); }

        if(nameOfSelectedDate == 'date') { setDate(dateReturned) }
        else if(nameOfSelectedDate == 'initial') { setInitial(dateReturned) }
        else if(nameOfSelectedDate == 'final') { setFinal(dateReturned) }
    }

    useEffect(() => {
        if(schedule){       
            setDate(returnDateFormatted(schedule.date));
            setInitial(schedule.initial);
            setFinal(schedule.final);
            setPlace(schedule.place.id)
            setComments(schedule.comments);

            setEdited(true)
        }
    }, [schedule]);

    useEffect(() => {
        if(edited) {
            setEdited(false)
            disponibilty()
        }
    }, [edited])

    function setArrays(array, comp, setter, setterArray) {
        let a = []
        array.map(obj => {
            if(comp == obj.id) {
                setter(obj.id)
                obj.checked = true
            }
            a.push(obj)
        })
        setterArray(a)
    }

    async function disponibilty() {     
        if(date && initial && final) {
            setIsLoading(true);

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
                if(schedule){    
                    schedule.equipaments.map(obj => {
                        obj.checked = true
                        equipamentsSelected.push(obj.id)
                    })              
                    setEquipaments([...JSON.parse(JSON.stringify(schedule.equipaments)), ...response.data.avaibilityEquipaments]);
                    schedule.place.checked = true
                    setPlaces([JSON.parse(JSON.stringify(schedule.place)), ...response.data.avaibilityPlaces]);
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
                console.log(error.response);
                Alert.alert('Erro', error.response.data.error);
                setIsLoading(false); 
            });
               
        }
        else {
            Alert.alert('Campos não preenchidos', 'Preencha todos os campos!');
        }
    }

    async function retrieveData(lenghtPlaces) {
        if(lenghtPlaces > 0) {
            if(!userLogged.isUser) {  
                await api.get('/users')
                .then(response => {
                    const usersReceived = response.data.filter((elem) => {
                        return elem.status === 'Ativo';
                    });
                    usersReceived.map(user => {
                        user.name = user.fullname
                    })
                    if(schedule) {
                        if(!userLogged.isUser) {
                            setArrays(usersReceived, schedule.requesting_user.id, setRequestingUser, setUsers)
                        }
                        else {
                            setRequestingUser(userLogged.id)
                        }
                    }
                    else {
                        setUsers(usersReceived);  
                    }
                })
                .catch(error => {
                    console.log(error);
                    Alert.alert('Oops', 'Houve um erro ao recuperar a lista de usuários!');
                }) 
            }        

            await api.get("/categories")
            .then(response => {
                const categoriesReceived = response.data.filter((elem) => {
                    return elem.status === 'Ativo';
                });
                categoriesReceived.map(category => {
                    category.name = category.description
                })

                if(schedule) {
                    setArrays(categoriesReceived, schedule.category.id, setCategory, setCategories)
                }
                else {
                    setCategories(categoriesReceived);
                }  
            })
            .catch(error => {
                console.log(error);
                Alert.alert('Oops', 'Houve um erro ao recuperar a lista de categorias!');
            });
                     
            await api.get("/courses")
            .then(response => {
                const coursesReceived = response.data.filter((elem) => {
                    return elem.status === 'Ativo';
                });
                if(schedule) {
                    setArrays(coursesReceived, schedule.course.id, setCourse, setCourses)
                }
                else {
                    setCourses(coursesReceived);    
                }
            })
            .catch(error => {
                console.log(error);
                Alert.alert('Oops', 'Houve um erro ao recuperar a lista de cursos!');
            });

            setIsLoading(false); 
            setShowFields(true);
        }
        else {       
            setIsLoading(false);          
            Alert.alert("Sem salas para o horário solicitado", "Não há mais disponibilidade de salas para este horário!");
        }
    }

    async function save() {      
        if(!course) { Alert.alert('Campo não preenchido', 'O campo curso deve ser preenchido'); return }  
        if(!category) { Alert.alert('Campo não preenchido', 'O campo categoria deve ser preenchido'); return }  
        if(!place) { Alert.alert('Campo não preenchido', 'O campo sala deve ser preenchido'); return }  
        if(!requestingUser) { Alert.alert('Campo não preenchido', 'O campo solicitante deve ser preenchido'); return }  

        setIsLoading(true);

        if(userLogged.isUser){
            setRequestingUser(userLogged.id)
        }

        await onSubmit(schedule ? schedule.id : undefined, {
            place_id: place,
            category_id: category,
            course_id: course,
            registration_user_id: userLogged.id,
            requesting_user_id: requestingUser,
            campus_id: userLogged.campusId,
            comments,
            date: formatDate(date),
            initial,
            final,
            equipaments: equipamentsSelected,
            status: "Confirmado"
        })
        .then(() => {
            clearFields()
        })
        .catch(() => {})

        setIsLoading(false);
    }

    function clearFields(){
        onClickDateOrHour();
        setComments('');
        setDate('');
        setInitial('');
        setFinal('');
        
        setEquipaments([]);
        setEquipamentsSelected([]);
        setPlace('');
        setCourse('');
        setRequestingUser('');
        setCategory('');
    }

    function onClickDateOrHour() {
        setShowFields(false);
    }

    return(
        <KeyboardAwareScrollView>
            <View style={styles.row}>
                <View style={styles.card}>
                    <Text style={styles.titleText}>Data *</Text>
                    <TouchableOpacity style={styles.input} onPress={() => {showDatePicker('date', 'date'); onClickDateOrHour()}}>
                        <Text style={!date && styles.placeholder}>{date || "Data"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.cardBetween}>
                    <View style={{flex: 1, marginRight: 2}}>
                        <Text style={styles.titleText}>Início *</Text>
                        <TouchableOpacity style={styles.input} onPress={() => {showDatePicker('time', 'initial'); onClickDateOrHour()}}>
                            <Text style={!initial && styles.placeholder}>{initial || "Início"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, marginLeft: 2}}>
                        <Text style={styles.titleText}>Final *</Text>
                        <TouchableOpacity style={styles.input} onPress={() => {showDatePicker('time', 'final'); onClickDateOrHour()}}>
                            <Text style={!final && styles.placeholder}>{final || "Final"}</Text>
                        </TouchableOpacity>
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
                            <Text style={styles.titleText}>Sala *</Text>
                            <Select2
                                isSelectSingle
                                style={styles.input}
                                colorTheme="blue"
                                popupTitle="Selecione um turno"
                                searchPlaceHolderText="Pesquisar"
                                title="Sala"
                                data={places}
                                onSelect={data => {
                                    setPlace(data[0]);                                           
                                }}
                                cancelButtonText="Cancelar"
                                selectButtonText="Selecionar"
                                listEmptyTitle="Não há nada aqui"
                            />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.card}>
                            <Text style={styles.titleText}>Ano *</Text>
                            <Select2
                                isSelectSingle
                                style={styles.input}
                                colorTheme="blue"
                                popupTitle="Selecione um turno"
                                searchPlaceHolderText="Pesquisar"
                                title="Ano"
                                data={categories}
                                onSelect={data => {
                                    setCategory(data[0]);                                           
                                }}
                                cancelButtonText="Cancelar"
                                selectButtonText="Selecionar"
                                listEmptyTitle="Não há nada aqui"
                            />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.card}>
                            <Text style={styles.titleText}>Solicitante *</Text>
                            {userLogged.isUser ? (
                                <View style={styles.input}>
                                    <Text>{userLogged.name}</Text>
                                </View>
                            ) : (
                                <Select2
                                    isSelectSingle
                                    style={styles.input}
                                    colorTheme="blue"
                                    popupTitle="Selecione um turno"
                                    searchPlaceHolderText="Pesquisar"
                                    title="Solicitante"
                                    data={users}
                                    onSelect={data => {
                                        setRequestingUser(data[0]);                                           
                                    }}
                                    cancelButtonText="Cancelar"
                                    selectButtonText="Selecionar"
                                    listEmptyTitle="Não há nada aqui"
                                />
                            )}
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.card}>
                            <Text style={styles.titleText}>Curso *</Text>
                            <Select2
                                isSelectSingle
                                style={styles.input}
                                colorTheme="blue"
                                popupTitle="Selecione um turno"
                                searchPlaceHolderText="Pesquisar"
                                title="Curso"
                                data={courses}
                                onSelect={data => {
                                    setCourse(data[0]);                                                                           
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
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode={typeModal}
                locale="pt_BR"
                onConfirm={handleConfirm}
                isDarkModeEnabled={false}
                onCancel={hideDatePicker}
                headerTextIOS="Selecionar"
                cancelTextIOS="Cancelar"
                confirmTextIOS="Confirmar"
            />
        </KeyboardAwareScrollView>
    )
}

export default FormSchedule;