import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import FormCategory from '../Form Category';

function CategoriesCard({category, onDelete, onEdit}) {
    const [isLoading, setIsLoading] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    async function confirmDelete(id) {
        Alert.alert(
            'Confirmação',
            'Realmente deseja excluir esse ano?',
            [
                {text: 'Sim', onPress: () => deleteCategory(id)},
                {text: 'Não', style: 'cancel'},
            ],
            { cancelable: false }
        )
    }

    async function deleteCategory(id) {
        setIsLoading(true);
        await onDelete(id);
        setIsLoading(false);
    }

    async function editCategory(id, data) {
        setIsLoading(true);
        await onEdit(id, data);
        setIsLoading(false);
        backToPageApp();
    }

    function backToPageApp() {
        setShowEdit(false);
    }

    return(
        <>
            {showEdit ? 
                (
                    <>
                        <FormCategory onSubmit={editCategory} category={category}/>
                        <View style={styles.pd10}>
                            <TouchableOpacity onPress={backToPageApp} style={styles.button}>
                                <Text style={styles.buttonText}>Voltar</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )
                :
                (
                    <View style={styles.card}>
                        <ScrollView>
                            
                            <Text style={styles.titleText}>Descrição</Text>
                            <Text style={styles.dataText} >{category.description}</Text>

                            <Text style={styles.titleText}>Status</Text>
                            <Text style={
                                (category.status === 'Inativo') ? (styles.red) : (styles.dataText)}
                            >{category.status}</Text>
                        </ScrollView>
                        {(category.status === 'Ativo') && (
                            <View style={styles.buttonsGroup}>
                                <TouchableOpacity onPress={() => setShowEdit(true)} style={styles.row}>
                                    <MaterialIcons name="edit" style={styles.buttons} color="#FFF"/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.row} onPress={() => confirmDelete(category.id)}>
                                    <MaterialIcons name="delete" style={styles.buttons} color="#FFF"/>
                                    <ActivityIndicator animating={isLoading} size="small" color="#000" />   
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>  
                )
            }
        </>
    )
}

const styles = StyleSheet.create({
    loading: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center'

    },
    input: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 5,
        backgroundColor: '#F1F1F1',
        alignSelf: 'stretch',
        marginTop: 5,
        fontSize: 16,
        borderWidth: 0
    },
    main: { 
        flex: 1, 
        backgroundColor: '#7c90b1',
        padding: 10,
    },
    scroll: {
        flex: 1, 
    },  
    card: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 30,
        height: 'auto',
        borderRadius: 4,
        backgroundColor: '#FFF',
        marginRight: 5,
        marginLeft: 5
    },  
    row: {
        flexDirection: 'row',
    },  
    mr: {
        marginRight: 50
    },
    buttonsGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttons: {
        color: '#042963',
        fontSize: 27, 
        marginLeft: 10,
    },
    red: {
        color: '#FF0000',
        fontSize: 20,
        marginTop: 3
    },
    dataText: {
        color: '#333',
        fontSize: 20,
        marginTop: 3
    },
    titleText: {
        marginTop: 14,
        fontSize: 16,
        color: '#999'
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 5,
        backgroundColor: '#042963',
        alignSelf: 'stretch',
        marginRight: 5,
        marginLeft: 5,
        marginTop: 5
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    
});

export default CategoriesCard;