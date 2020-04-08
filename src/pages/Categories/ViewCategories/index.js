import React, { useState, useEffect, useCallback } from 'react';
import { Alert, View, StatusBar, StyleSheet, RefreshControl, ScrollView, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import api from '../../../services/api';
import CategoriesCard from "../../../components/CategoriesCard";

function ViewCategories() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [modified, setModified] = useState(false);
    const [showApp, setShowApp] = useState(false);

    const onRefresh = useCallback(() => {
        setIsRefreshing(true);
        retrieveCategories();
        setIsRefreshing(false);
        
      }, [isRefreshing]);

    useEffect(() => {
        setIsLoading(true);  
        retrieveCategories();

    }, [modified]);

    async function retrieveCategories() {
        await api.get("/categories")
        .then(function (response) {
            setCategories(response.data);
        })
        .catch(function (error) {
            console.log(error)
            Alert.alert('Oops...', 'Houve um erro ao tentar visualizar as informações');
        });
        setIsLoading(false);   
        setShowApp(true);    
    }  

    async function deleteCategory(id) {
        await api.delete(`/categories/${id}`)
        .then(function (response) {
            Alert.alert('Prontinho', 'Ano deletado com sucesso');
            setModified(true);
        })
        .catch(function (error) {
            console.log(error)
            Alert.alert('Oops...', 'Houve um tentar visualizar as informações, tente novamente!');
        });
        setModified(false);
        setShowApp(false);
    }

    async function editCategory(id, data) {        

        await api.put(`/categories/${id}`, data)
        .then(function (response) {                
            Alert.alert('Prontinho', 'Ano editado com sucesso!');
            setModified(true);
        })
        .catch(function (error) {
            console.log(error)
            Alert.alert('Oops...', 'Houve um erro ao tentar editar o ano');
        });
        setModified(false);
        setShowApp(false);
    }

    return(
        <>
            <StatusBar barStyle="light-content"/>
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
                                    {categories.map( category => (
                                        <CategoriesCard onEdit={editCategory} onDelete={deleteCategory} key={category.id} category={category}/>
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
        flexDirection: 'row',
    },   
});

export default ViewCategories;