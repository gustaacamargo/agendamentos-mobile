import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Alert, View, StyleSheet, RefreshControl } from 'react-native';
import api from '../../../services/api';
import { NavigationEvents } from 'react-navigation';
import { FlatList } from 'react-native';
import { Modalize } from 'react-native-modalize';
import CardEquipament from '../../../components/CardEquipament';
import { Text } from 'react-native';

function ViewEquipaments({ navigation }) {
    const [equipaments, setEquipaments] = useState([]);
    const [equipament, setEquipament] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false);
    const modalizeRef = useRef(null);

    const onRefresh = useCallback(() => {
        retrieveEquipaments();        
    }, [isRefreshing]);

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    useEffect(() => {
        retrieveEquipaments();
    }, [equipament]);

    async function retrieveEquipaments() {
        setIsRefreshing(true);   
        setIsLoading(true)
        await api.get("/equipaments")
        .then(function (response) {
            setIsLoading(false);  
            setIsRefreshing(false);
            setEquipaments(response.data);
        })
        .catch(function (error) {
            setIsLoading(false);  
            setIsRefreshing(false);
            console.log(error)
            Alert.alert('Oops...', 'Houve um erro ao tentar visualizar as informações');
        });
    }  

    async function deleteEquipament(id) {
        setIsDeleting(true)
        await api.delete(`/equipaments/${id}`)
        .then(function (response) {
            setEquipament({})
            Alert.alert('Prontinho', 'Equipamento deletado com sucesso');
            setIsDeleting(false)
        })
        .catch(function (error) {
            setIsDeleting(false)
            console.log(error)
            Alert.alert('Oops...', 'Houve um tentar deletar as informações, tente novamente!');
        });
    }

    function renderCard({ item }) {
        return(
            <CardEquipament isOnModal={false} onOpen={onOpen} item={item} setItem={setEquipament}/>
        )
    }

    return(
        <View style={styles.main}>
            <NavigationEvents onDidFocus={payload => retrieveEquipaments()} />
            <FlatList 
                style={styles.pdTop20}
                contentContainerStyle={styles.mh20}
                data={equipaments}
                renderItem={renderCard}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={ <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
            />
            <Modalize adjustToContentHeight={true} ref={modalizeRef}>
                <CardEquipament navigation={navigation} isOnModal={true} onOpen={onOpen} item={equipament} setItem={setEquipament} deleteEquipament={deleteEquipament} isDeleting={isDeleting}/>
            </Modalize>

            {equipaments.length <= 0 && (
                <View style={styles.center}>
                    <Text style={styles.txtNothing}>Nenhum equipamento cadastrado</Text>
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

export default ViewEquipaments;