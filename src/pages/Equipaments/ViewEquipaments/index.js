import React, { useState, useEffect } from 'react';
import { Alert, View, StatusBar, StyleSheet, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import api from '../../../services/api';
import EquipamentsCard from "../../../components/EquipamentsCard";

function ViewEquipaments() {
    const [equipaments, setEquipaments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modified, setModified] = useState(false);
    const [showApp, setShowApp] = useState(false);

    useEffect(() => {
        setIsLoading(true);  
        
        async function retrieveEquipaments() {
            await api.get("/equipaments")
            .then(function (response) {
                setEquipaments(response.data);
            })
            .catch(function (error) {
                console.log(error)
                Alert.alert('Oops...', 'Houve um erro ao tentar visualizar as informações');
            });
            setIsLoading(false);   
            setShowApp(true);    
        }  

        retrieveEquipaments();
    }, [modified]);

    async function deleteEquipament(id) {
        await api.delete(`/equipaments/${id}`)
        .then(function (response) {
            Alert.alert('Prontinho', 'Equipamento deletado com sucesso');
            setModified(true);
        })
        .catch(function (error) {
            console.log(error)
            Alert.alert('Oops...', 'Houve um tentar visualizar as informações, tente novamente!');
        });
        setModified(false);
        setShowApp(false);
    }

    async function editEquipament(id, data) {        

        await api.put(`/equipaments/${id}`, data)
        .then(function (response) {                
            Alert.alert('Prontinho', 'Equipamentos editado com sucesso!');
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
                            {equipaments.map( equipament => (
                                <EquipamentsCard onEdit={editEquipament} onDelete={deleteEquipament} key={equipament.id} equipament={equipament}/>
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

export default ViewEquipaments;