import React, { useState, useEffect }from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CText from './CText'

const LoadingHeader = () => {
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
      padding: 20,
      paddingLeft: 20,
      alignSelf: 'center',
    },
    loadingText: {
      fontSize: 48,
      color: 'white',
    },
  });

export default LoadingHeader;