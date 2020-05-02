import React, { useState, useEffect, useCallback } from 'react';
import { Alert, View, StatusBar, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import Swiper from 'react-native-swiper';
import api from '../../../services/api';
import UsersCard from "../../../components/UsersCard";

function ViewUsers() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [modified, setModified] = useState(false);
    const [showApp, setShowApp] = useState(false);

    const onRefresh = useCallback(() => {
        setIsRefreshing(true);
        retrieveUsers();
        setIsRefreshing(false);
        
    }, [isRefreshing]);

    useEffect(() => {
        setIsLoading(true);  
        retrieveUsers();

    }, [modified]);

    async function retrieveUsers() {
        await api.get("/users")
        .then(function (response) {
            setUsers(response.data);
        })
        .catch(function (error) {
            console.log(error)
            Alert.alert('Oops...', 'Houve um erro ao tentar visualizar as informações');
        });
        setIsLoading(false);   
        setShowApp(true);    
    }  

    async function deleteUser(id) {
        await api.delete(`/users/${id}`)
        .then(function (response) {
            Alert.alert('Prontinho', 'Usuário deletado com sucesso');
            setModified(true);
        })
        .catch(function (error) {
            console.log(error)
            Alert.alert('Oops...', 'Houve um tentar deletar o usuário, tente novamente!');
        });
        setModified(false);
        setShowApp(false);
    }

    async function editUser(id, data) {        

        await api.put(`/users/${id}`, data)
        .then(function (response) {                
            Alert.alert('Prontinho', 'Usuário editado com sucesso!');
            setModified(true);
        })
        .catch(function (error) {
            console.log(error);
            setModified(true);
            Alert.alert('Oops...', 'Houve um erro ao tentar editar o usuário, verifique se não há outro usuário com as mesmas informações');
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
                            {users.map( user => (
                                <UsersCard onEdit={editUser} onDelete={deleteUser} key={user.id} user={user}/>
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

export default ViewUsers;