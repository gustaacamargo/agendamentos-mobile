import React, { useState, useEffect, useCallback } from 'react';
import { Alert, View, StatusBar, StyleSheet, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import api from '../../../services/api';
import CoursesCard from "../../../components/CoursesCard";

function ViewCourses() {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [modified, setModified] = useState(false);
    const [showApp, setShowApp] = useState(false);

    const onRefresh = useCallback(() => {
        setIsRefreshing(true);
        retrieveCourses();
        setIsRefreshing(false);
        
    }, [isRefreshing]);

    useEffect(() => {
        setIsLoading(true);  
        retrieveCourses();

    }, [modified]);

    async function retrieveCourses() {
        await api.get("/courses")
        .then(function (response) {
            setCourses(response.data);
        })
        .catch(function (error) {
            console.log(error)
            Alert.alert('Oops...', 'Houve um erro ao tentar visualizar as informações');
        });
        setIsLoading(false);   
        setShowApp(true);    
    }  

    async function deleteCourse(id) {
        await api.delete(`/courses/${id}`)
        .then(function (response) {
            Alert.alert('Prontinho', 'Curso deletado com sucesso');
            setModified(true);
        })
        .catch(function (error) {
            console.log(error)
            Alert.alert('Oops...', 'Houve um tentar visualizar as informações, tente novamente!');
        });
        setModified(false);
        setShowApp(false);
    }

    async function editCourse(id, data) {        

        await api.put(`/courses/${id}`, data)
        .then(function (response) {                
            Alert.alert('Prontinho', 'Curso editado com sucesso!');
            setModified(true);
        })
        .catch(function (error) {
            console.log(error)
            Alert.alert('Oops...', 'Houve um erro ao tentar editar o curso');
        });
        setModified(false);
        setShowApp(false);
    }

    return(
        <>
            <StatusBar backgroundColor="#042963" barStyle="light-content"/>
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
                        <Swiper 
                            loop={false} 
                            showsPagination={false}
                        >    
                            {courses.map( course => (
                                <CoursesCard onEdit={editCourse} onDelete={deleteCourse} key={course.id} course={course}/>
                            ))}
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
    main: { 
        flex: 1, 
        backgroundColor: '#7c90b1',
        padding: 10,
    }, 
    row: {
        flex: 1,
        flexDirection: 'row',
    },   
});

export default ViewCourses;