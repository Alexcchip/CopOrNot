import React, {useEffect, useState} from 'react'
import CText from '../components/CText'
import {View, StyleSheet, StatusBar, TextInput} from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';

type SearchHeaderProps = {
    onChange: (text: string) => void;
}
//yo which dumbass put the styles up here :sob:
//mighta been me tbh
export default function SearchHeader({onChange} : SearchHeaderProps) {
    const [searchQuery, setSearchQuery] = useState('');
    
    const styles = StyleSheet.create({
      headerContainer: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: "black",
        paddingTop: 50,
        paddingBottom: 30,
        alignItems: "center",
      },
      whiteStripe:{
        position: 'absolute',
        top: 50,
        width: '100%',
        height: 2.5,
        backgroundColor: 'white',
      },
      searchContainer: {
        width: '100%',
        margin: 0,
        marginBottom: 0,
        marginTop: 15,
        paddingHorizontal: 10,
        position: 'relative',
      },
      searchInput: {
        height: 60,
        borderColor: '#444',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: 'white',
        backgroundColor: '#000',
        fontSize: 24,
      },
      textInput: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 15, // Add more padding for better appearance
        //fontSize: 36, // Increase font size for larger text
        color: 'white',
      },
      placeholderText: {
        position: 'absolute',
        left: 15, // Match padding of text input
        top: 18, // Adjust for larger height
        fontSize: 24, // Match font size of text input
        color: '#999',
      },
    });

    //passing search query to main page for searching
    const handleChange = (text: string) => {
        setSearchQuery(text);
        onChange(text);
    }

    return (
    
        <View style={styles.headerContainer}>
            <View style={styles.whiteStripe} />
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search stations..."
                    placeholderTextColor="#999"
                    value={searchQuery}
                    onChangeText={handleChange}
                />
                <FontAwesome name="filter" size={35} color='#444' style={{position: 'absolute', right: 25, top: 15,}}/>
            </View>
            <StatusBar translucent backgroundColor="transparent" />
        </View>
    );
    
}