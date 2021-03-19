import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Alert, View, StyleSheet, RefreshControl } from 'react-native';
import api from '../../../services/api';
import { NavigationEvents } from 'react-navigation';
import { FlatList } from 'react-native';
import { Modalize } from 'react-native-modalize';
import CardPlace from '../../../components/CardPlace';
import { Text } from 'react-native';

function ViewPlaces({ navigation }) {
    const [places, setPlaces] = useState([]);
    const [place, setPlace] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false);
    const modalizeRef = useRef(null);

    const onRefresh = useCallback(() => {
        retrievePlaces();
    }, [isRefreshing]);

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    useEffect(() => {
        retrievePlaces();
    }, [place]);

    async function retrievePlaces() {
        setIsRefreshing(true);   
        setIsLoading(true)
        await api.get("/places")
        .then(function (response) {
            setIsLoading(false);  
            setIsRefreshing(false);
            setPlaces(response.data);
        })
        .catch(function (error) {
            setIsLoading(false);  
            setIsRefreshing(false);
            console.log(error)
            Alert.alert('Oops...', 'Houve um erro ao tentar visualizar as informações');
        }); 
    }  

    async function deletePlace(id) {
        setIsDeleting(true)
        await api.delete(`/places/${id}`)
        .then(function (response) {
            setPlace({})
            Alert.alert('Prontinho', 'Sala deletada com sucesso');
            setIsDeleting(false)
        })
        .catch(function (error) {
            setIsDeleting(false)
            console.log(error)
            Alert.alert('Oops...', 'Houve um tentar deletar as informações, tente novamente!');
        });
    }

    async function restorePlace(id) {
        setIsDeleting(true)
        await api.post(`/places/restore/${id}`)
        .then(function (response) {
            setPlace({})
            Alert.alert('Prontinho', 'Sala restaurada com sucesso');
            setIsDeleting(false)
        })
        .catch(function (error) {
            setIsDeleting(false)
            console.log(error)
            Alert.alert('Oops...', 'Houve um tentar restaurar as informações, tente novamente!');
        });
    }

    function renderCard({ item }) {
        return(
            <CardPlace isOnModal={false} onOpen={onOpen} item={item} setItem={setPlace}/>
        )
    }

    return(
        <View style={styles.main}>
            <NavigationEvents onDidFocus={payload => retrievePlaces()} />
            <FlatList 
                style={styles.pdTop20}
                contentContainerStyle={styles.mh20}
                data={places}
                renderItem={renderCard}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={ <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
            />
            <Modalize adjustToContentHeight={true} ref={modalizeRef}>
                <CardPlace navigation={navigation} isOnModal={true} onOpen={onOpen} item={place} setItem={setPlace} deletePlace={deletePlace} isDeleting={isDeleting} restorePlace={restorePlace}/>
            </Modalize>

            {places.length <= 0 && (
                <View style={styles.center}>
                    <Text style={styles.txtNothing}>Nenhuma sala cadastrada</Text>
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

export default ViewPlaces;