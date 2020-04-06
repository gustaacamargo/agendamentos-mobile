import React, { useState, useEffect } from 'react';
import { Alert, View, StatusBar, StyleSheet, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import api from '../../../services/api';
import CampusCard from "../../../components/CampusCard";

function ViewCampus() {
    const [campuses, setCampuses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modified, setModified] = useState(false);
    const [showApp, setShowApp] = useState(false);

    useEffect(() => {
        setIsLoading(true);  
        
        async function retrieveCampuses() {
            await api.get("/campuses")
            .then(function (response) {
                setCampuses(response.data);
            })
            .catch(function (error) {
                console.log(error)
                Alert.alert('Oops...', 'Houve um erro ao tentar visualizar as informações');
            });
            setIsLoading(false);   
            setShowApp(true);    
        }  

        retrieveCampuses();
    }, [modified]);

    async function deleteCampus(id) {
        await api.delete(`/campuses/${id}`)
        .then(function (response) {
            Alert.alert('Prontinho', 'Campus deletado com sucesso');
            setModified(true);
        })
        .catch(function (error) {
            console.log(error)
            Alert.alert('Oops...', 'Houve um tentar visualizar as informações, tente novamente!');
        });
        setModified(false);
        setShowApp(false);
    }

    async function editCampus(id, data) {        

        await api.put(`/campuses/${id}`, data)
        .then(function (response) {                
            Alert.alert('Prontinho', 'Campus editado com sucesso!');
            setModified(true);
        })
        .catch(function (error) {
            console.log(error)
            Alert.alert('Oops...', 'Houve um erro ao tentar editar o campus');
        });
        setModified(false);
        setShowApp(false);
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
                        <Swiper loop={false} >    
                            {campuses.map( campus => (
                                <CampusCard onEdit={editCampus} onDelete={deleteCampus} key={campus.id} campus={campus}/>
                            ))}
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
    main: { 
        flex: 1, 
        backgroundColor: '#7c90b1',
        padding: 10,
    }, 
    row: {
        flexDirection: 'row',
    },   
});

export default ViewCampus;