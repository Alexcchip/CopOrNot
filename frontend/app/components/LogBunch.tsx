import React from 'react';
import {View, StyleSheet} from 'react-native';
import CText from './CText'
import Log from './Log'

type LogBunchProps = {
    logs: {
        timestamp: string;
        entrance: string;
        copOrNot: boolean;
    }[];
}

const LogBunch: React.FC<LogBunchProps> = ({logs}) => {
    return(
      <View style={styles.logBunchContainer}>
        <View style={styles.topLogContainer}>
          {logs.length > 0 && <Log {...logs[0]} style={styles.topLogText}/>}
        </View>
        <View style={styles.logContainer}>
          {logs.slice(1).map((log, index) => (
            <Log key={index + 1} {...log} />
          ))}
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    logBunchContainer:{
        width: '100%',
        padding: 10,
        paddingBottom: 0,
        margin: 10,
        borderRadius: 10,
    },
    topLogContainer:{
        padding: 0,
        borderRadius: 10,
    },
    logContainer:{
        padding: 0,
        borderRadius: 10,
    },
    topLogText:{
        fontSize: 36,
        color: 'white',
    },
})

export default LogBunch;