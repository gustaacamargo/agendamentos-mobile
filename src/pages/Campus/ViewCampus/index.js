import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Alert, View, StatusBar, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import api from '../../../services/api';
import { Modalize } from 'react-native-modalize';
import { NavigationEvents } from 'react-navigation';
import { FlatList } from 'react-native';
import CardCampus from '../../../components/CardCampus';
import { Text } from 'react-native';

function ViewCampus({ navigation }) {
    const [campuses, setCampuses] = useState([]);
    const [campus, setCampus] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false);
    const modalizeRef = useRef(null);

    const onRefresh = useCallback(() => {
        retrieveCampuses();        
    }, [isRefreshing]);

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    const closeModal = () => {
        modalizeRef.current?.close();
    };

    useEffect(() => {
        retrieveCampuses();
    }, [campus]);

    async function retrieveCampuses() {
        setIsRefreshing(true);   
        setIsLoading(true)
        await api.get("/campuses")
        .then(function (response) {
            setIsLoading(false);  
            setIsRefreshing(false); 
            setCampuses(response.data);
        })
        .catch(function (error) {
            setIsLoading(false);  
            setIsRefreshing(false);  
            console.log(error)
            Alert.alert('Oops...', 'Houve um erro ao tentar visualizar as informações');
        });   
    }  

    async function deleteCampus(id) {
        setIsDeleting(true)
        await api.delete(`/campuses/${id}`)
        .then(function (response) {
            setCampus({})
            setIsDeleting(false)
            Alert.alert('Prontinho', 'Campus deletado com sucesso');
            closeModal()
        })
        .catch(function (error) {
            setIsDeleting(false)
            console.log(error)
            Alert.alert('Oops...', 'Houve um tentar deletar as informações, tente novamente!');
        });
    }

    async function restoreCampus(id) {
        setIsDeleting(true)
        await api.post(`/campuses/restore/${id}`)
        .then(function (response) {
            setCampus({})
            setIsDeleting(false)
            Alert.alert('Prontinho', 'Campus restaurado com sucesso');
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
            <CardCampus isOnModal={false} onOpen={onOpen} item={item} setItem={setCampus}/>
        )
    }

    return(
        <View style={styles.main}>
            <NavigationEvents onDidFocus={payload => retrieveCampuses()} />
            <FlatList 
                style={styles.pdTop20}
                contentContainerStyle={styles.mh20}
                data={campuses}
                renderItem={renderCard}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={ <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
            />
            <Modalize adjustToContentHeight={true} ref={modalizeRef}>
                <CardCampus navigation={navigation} isOnModal={true} onOpen={onOpen} item={campus} setItem={setCampus} deleteCampus={deleteCampus} isDeleting={isDeleting} restoreCampus={restoreCampus}/>
            </Modalize>

            {campuses.length <= 0 && (
                <View style={styles.center}>
                    <Text style={styles.txtNothing}>Nenhum campus cadastrado</Text>
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

export default ViewCampus;