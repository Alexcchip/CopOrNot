import React from 'react';
import {View, StyleSheet} from 'react-native';
import CText from './CText'
import Log, {leftText, rightText} from './Log'

type LogPreviewProps = {
    logs: {
        timestamp: string;
        entrance: string;
        copOrNot: boolean;
    }[];
    onClose?: () => void;
}

const LogPreview: React.FC<LogPreviewProps> = ({logs, onClose}) => {
  const leftFont = leftText.fontSize * 1.5;
  const rightFont = rightText.fontSize * 1.5;

    return(
      <View style={styles.logBunchContainer}>
        <View style={styles.topLogContainer}>
          {logs.length > 0 && (
            <Log {
              ...logs[0]}
              leftStyle={{
                color: logs[0].copOrNot ? '#ED4D4D' : '#6DC35E',
                fontSize: leftFont
              }}
              rightStyle={{
                color: logs[0].copOrNot ? '#ED4D4D' : '#6DC35E',
                fontSize: rightFont
              }}
            />
          )}
        </View>
        <View style={styles.bar} />
        <View style={styles.logContainer}>
          {logs.slice(1).map((log, index) => (
            <Log key={index + 1} {...log}
              leftStyle={{color: 'grey'}}
              rightStyle={{color: 'grey'}}
            />
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
      color: 'white',
    },
    bar:{
      width: '90%',
      height: 3,
      backgroundColor: 'grey',
      borderRadius: 10,
      alignSelf: 'center',
      opacity: 0.5,
    }
})

export default LogPreview;