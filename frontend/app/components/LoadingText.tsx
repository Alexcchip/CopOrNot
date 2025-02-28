import React, { useState, useEffect }from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CText from './CText'

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
      <CText style={styles.loadingText}>Loading{dots}</CText>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#191521',
      padding: 20,
      borderRadius: 15,
      margin: 10,
      alignSelf: 'center',
      height: 100,
    },
    loadingText: {
      fontSize: 35,
      fontWeight: 'bold',
      color: 'white',
    },
  });

export default LoadingText;