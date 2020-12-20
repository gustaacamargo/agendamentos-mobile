import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Alert, View, StatusBar, StyleSheet, RefreshControl, ScrollView, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import api from '../../../services/api';
import { FlatList } from 'react-native';
import { Text } from 'react-native';
import CardCategory from '../../../components/CardCategory';
import { Modalize } from 'react-native-modalize';
import { NavigationEvents } from 'react-navigation';

function ViewCategories({ navigation }) {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const modalizeRef = useRef(null);

    const onRefresh = useCallback(() => {
        retrieveCategories();
    }, [isRefreshing]);

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    useEffect(() => {
        retrieveCategories();
    }, [category]);

    async function retrieveCategories() {
        setIsRefreshing(true);   
        setIsLoading(true)
        await api.get("/categories")
        .then(function (response) {
            setIsLoading(false);  
            setIsRefreshing(false);  
            setCategories(response.data);
        })
        .catch(function (error) {
            setIsLoading(false);   
            console.log(error)
            Alert.alert('Oops...', 'Houve um erro ao tentar visualizar as informações');
        });
    }  

    async function deleteCategory(id) {
        await api.delete(`/categories/${id}`)
        .then(function (response) {
            setCategory({})
            Alert.alert('Prontinho', 'Ano deletado com sucesso');
        })
        .catch(function (error) {
            console.log(error)
            Alert.alert('Oops...', 'Houve um tentar visualizar as informações, tente novamente!');
        });
    }

    function renderCard({ item }) {
        return(
            <CardCategory isOnModal={false} onOpen={onOpen} item={item} setItem={setCategory}/>
        )
    }

    return(
        <View style={styles.main}>
            <NavigationEvents onDidFocus={payload => retrieveCategories()} />
            <FlatList 
                style={styles.pdTop20}
                contentContainerStyle={styles.mh20}
                data={categories}
                renderItem={renderCard}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={ <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
            />
            <Modalize adjustToContentHeight={true} ref={modalizeRef}>
                <CardCategory navigation={navigation} isOnModal={true} onOpen={onOpen} item={category} setItem={setCategory} deleteCategory={deleteCategory}/>
            </Modalize>

            {categories.length <= 0 && (
                <View style={styles.center}>
                    <Text style={styles.txtNothing}>Nenhum ano cadastrado</Text>
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

export default ViewCategories;