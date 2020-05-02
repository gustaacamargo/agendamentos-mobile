import React, { useState, useEffect, useCallback } from 'react';
import { Alert, View, StatusBar, StyleSheet, RefreshControl, ScrollView, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import api from '../../../services/api';
import PlacesCard from "../../../components/PlacesCard";

function ViewPlaces() {
    const [places, setPlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [modified, setModified] = useState(false);
    const [showApp, setShowApp] = useState(false);

    const onRefresh = useCallback(() => {
        setIsRefreshing(true);
        retrievePlaces();
        setIsRefreshing(false);
        
      }, [isRefreshing]);

    useEffect(() => {
        setIsLoading(true);  
        retrievePlaces();

    }, [modified]);

    async function retrievePlaces() {
        await api.get("/places")
        .then(function (response) {
            setPlaces(response.data);
        })
        .catch(function (error) {
            console.log(error)
            Alert.alert('Oops...', 'Houve um erro ao tentar visualizar as informações');
        });
        setIsLoading(false);   
        setShowApp(true);    
    }  

    async function deletePlace(id) {
        await api.delete(`/places/${id}`)
        .then(function (response) {
            Alert.alert('Prontinho', 'Sala deletada com sucesso');
            setModified(true);
        })
        .catch(function (error) {
            console.log(error)
            Alert.alert('Oops...', 'Houve um tentar visualizar as informações, tente novamente!');
        });
        setModified(false);
        setShowApp(false);
    }

    async function editPlace(id, data) {        

        await api.put(`/places/${id}`, data)
        .then(function (response) {                
            Alert.alert('Prontinho', 'Sala editada com sucesso!');
            setModified(true);
        })
        .catch(function (error) {
            console.log(error)
            Alert.alert('Oops...', 'Houve um erro ao tentar editar a sala');
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
                                    {places.map( place => (
                                        <PlacesCard onEdit={editPlace} onDelete={deletePlace} key={place.id} place={place}/>
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

export default ViewPlaces;