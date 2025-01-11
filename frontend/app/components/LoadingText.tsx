import React, { useState, useEffect }from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoadingText = () => {
    const [dots, setDots] = useState('')

    useEffect(() => {

        const interval = setInterval(() => {
            setDots((prev) => {
                if (prev.length >= 3) {
                    return '';
                }
                return prev + ".";
            })
        }, 500)
        return () => clearInterval(interval);

    }, [])
    return (
        <View style={styles.container}>
      <Text style={styles.loadingText}>Loading{dots}</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#191521',
      margin: 10,
    },
    loadingText: {
      fontSize: 35,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 20,
    },
  });

export default LoadingText;