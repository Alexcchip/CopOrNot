import React from 'react';
import { View, StyleSheet, TextStyle } from 'react-native';
import CText from '../components/CText';

type LogProps = {
  timestamp: Date;
  station: string;
  copOrNot: boolean;
  leftStyle?: TextStyle;
  rightStyle?: TextStyle;
};

const Log: React.FC<LogProps> = ({ timestamp, station, copOrNot, leftStyle, rightStyle }) => {
    return (
      <View style={styles.logContainer}>
        <View style={styles.leftContainer}>
          <CText style={[styles.leftText, leftStyle]}>
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} {/* Optional formatting */}
          </CText>
          <CText style={[styles.leftText, leftStyle]} fontType="regular italic">
            {station}
          </CText>
        </View>
        <View style={styles.rightContainer}>
          <CText style={[styles.rightText, rightStyle]}>{copOrNot ? 'Cop' : 'Not'}</CText>
        </View>
      </View>
    );
  };
  

const styles = StyleSheet.create({
  logContainer: {
    flexDirection: 'row',
    padding: 0,
    margin: 5,
    borderRadius: 10,
  },
  leftContainer: {
    flex: 2,
    padding: 0,
    margin: 0,
    borderRadius: 10,
  },
  rightContainer: {
    flex: 1,
    padding: 0,
    margin: 0,
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  rightText: {
    fontSize: 36,
    color: 'white',
    textAlign: 'right',
  },
  leftText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'left',
  },
});

export const rightText = styles.rightText;
export const leftText = styles.leftText;

export default Log;
