import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Alert, View, StyleSheet, RefreshControl } from 'react-native';
import api from '../../../services/api';
import { NavigationEvents } from 'react-navigation';
import { FlatList } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Text } from 'react-native';
import CardCourse from '../../../components/CardCourse';

function ViewCourses({ navigation }) {
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false)
    const modalizeRef = useRef(null);

    const onRefresh = useCallback(() => {
        retrieveCourses();        
    }, [isRefreshing]);

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    const closeModal = () => {
        modalizeRef.current?.close();
    };

    useEffect(() => {
        retrieveCourses();
    }, [course]);

    async function retrieveCourses() {
        setIsRefreshing(true);   
        setIsLoading(true)
        await api.get("/courses")
        .then(function (response) {
            setIsLoading(false);  
            setIsRefreshing(false);  
            setCourses(response.data);
        })
        .catch(function (error) {
            setIsLoading(false);  
            setIsRefreshing(false);  
            console.log(error)
            Alert.alert('Oops...', 'Houve um erro ao tentar visualizar as informações');
        });   
    }  

    async function deleteCourse(id) {
        setIsDeleting(true)
        await api.delete(`/courses/${id}`)
        .then(function (response) {
            setCourse({})
            setIsDeleting(false)
            Alert.alert('Prontinho', 'Curso deletado com sucesso');
            closeModal()
        })
        .catch(function (error) {
            setIsDeleting(false)
            console.log(error)
            Alert.alert('Oops...', 'Houve um tentar deletar as informações, tente novamente!');
        });
    }

    async function restoreCourse(id) {
        setIsDeleting(true)
        await api.post(`/courses/restore/${id}`)
        .then(function (response) {
            setCourse({})
            setIsDeleting(false)
            Alert.alert('Prontinho', 'Curso restaurado com sucesso');
            closeModal()
        })
        .catch(function (error) {
            setIsDeleting(false)
            console.log(error)
            Alert.alert('Oops...', 'Houve um tentar restaurar as informações, tente novamente!');
        });
    }

    function renderCard({ item }) {
        return(
            <CardCourse isOnModal={false} onOpen={onOpen} item={item} setItem={setCourse}/>
        )
    }

    return(
        <View style={styles.main}>
            <NavigationEvents onDidFocus={payload => retrieveCourses()} />
            <FlatList 
                style={styles.pdTop20}
                contentContainerStyle={styles.mh20}
                data={courses}
                renderItem={renderCard}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={ <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
            />
            <Modalize adjustToContentHeight={true} ref={modalizeRef}>
                <CardCourse navigation={navigation} isOnModal={true} onOpen={onOpen} item={course} setItem={setCourse} deleteCourse={deleteCourse} isDeleting={isDeleting} restoreCourse={restoreCourse}/>
            </Modalize>

            {courses.length <= 0 && (
                <View style={styles.center}>
                    <Text style={styles.txtNothing}>Nenhum curso cadastrado</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1, 
        backgroundColor: '#F0F0F0'
    },
    pdTop20: {
        paddingTop: 20
    },
    mh20: {
        marginHorizontal: 20
    },
    center: { 
        flex: 1,
        alignItems: 'center', 
    },
    txtNothing: { 
        color: '#777', 
        fontSize: 16, 
        fontWeight: '500' 
    }
});

export default ViewCourses;