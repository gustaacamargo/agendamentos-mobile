import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Alert, View, StatusBar, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import Swiper from 'react-native-swiper';
import api from '../../../services/api';
import UsersCard from "../../../components/UsersCard";
import { NavigationEvents } from 'react-navigation';
import { FlatList } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Text } from 'react-native';
import CardUser from '../../../components/CardUser';

function ViewUsers({ navigation }) {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false);
    const modalizeRef = useRef(null);

    const onRefresh = useCallback(() => {
        retrieveUsers();        
    }, [isRefreshing]);

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    useEffect(() => {
        retrieveUsers();
    }, [user]);

    async function retrieveUsers() {
        setIsRefreshing(true);   
        setIsLoading(true)
        await api.get("/users")
        .then(function (response) {
            setIsLoading(false);  
            setIsRefreshing(false);
            setUsers(response.data);
        })
        .catch(function (error) {
            setIsLoading(false);  
            setIsRefreshing(false);
            console.log(error)
            Alert.alert('Oops...', 'Houve um erro ao tentar visualizar as informações');
        });  
    }  

    async function deleteUser(id) {
        setIsDeleting(true)
        await api.delete(`/users/${id}`)
        .then(function (response) {
            setUser({})
            Alert.alert('Prontinho', 'Usuário deletado com sucesso');
            setIsDeleting(false)
        })
        .catch(function (error) {
            setIsDeleting(false)
            console.log(error)
            Alert.alert('Oops...', 'Houve um tentar deletar o usuário, tente novamente!');
        });
    }

    function renderCard({ item }) {
        return(
            <CardUser isOnModal={false} onOpen={onOpen} item={item} setItem={setUser}/>
        )
    }

    return(
        <View style={styles.main}>
            <NavigationEvents onDidFocus={payload => retrieveUsers()} />
            <FlatList 
                style={styles.pdTop20}
                contentContainerStyle={styles.mh20}
                data={users}
                renderItem={renderCard}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={ <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
            />
            <Modalize adjustToContentHeight={true} ref={modalizeRef}>
                <CardUser navigation={navigation} isOnModal={true} onOpen={onOpen} item={user} setItem={setUser} deleteUser={deleteUser} isDeleting={isDeleting}/>
            </Modalize>

            {users.length <= 0 && (
                <View style={styles.center}>
                    <Text style={styles.txtNothing}>Nenhum usuário cadastrado</Text>
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

export default ViewUsers;