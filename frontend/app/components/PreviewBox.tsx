import React from 'react';
import {View, StyleSheet} from 'react-native';
import CText from './CText'
import TrainIcon from './TrainIcon'

type PreviewProps = {
    title: string;
    trainLines: string | number | (string | number)[];
    data: Record<string, any>;
}

const PreviewBox: React.FC<PreviewProps> = ({title, trainLines, data}) =>{
  const parsedTrainLines =
    trainLines
      ? typeof trainLines === 'string'
        ? trainLines.split(' ').map((line) => line.trim())
        : [trainLines.toString()] // Handle numerical trains
      : ['SIR']; // Fallback for missing trains

    return(
      <View style={styles.container}>
        <View style={styles.title}>
          <View style={styles.titleContainer}>
            <CText style={styles.titleText}>{title}</CText>
          </View>
          <View style={styles.trainIconsContainer}>
            {parsedTrainLines.map((trainLine, index) => (
              <TrainIcon key={index} trainLine={trainLine} height='25' width='25' />
            ))}
          </View>
        </View>
        <View style={styles.bar} />
        <View style={styles.previewContainer}>
            <View style={styles.previewNameContainer}>
                {Object.entries(data).map(([key, value], index) => (
                    <View key={index} style={styles.row}>
                        <CText style={styles.previewNameText}>{key}</CText>
                        <CText style={styles.previewValueText}>
                            {typeof value === 'object' ? JSON.stringify(value) : value}
                        </CText>
                    </View>
                ))}
            </View>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
      width: '100%',
      padding: 10,
      margin: 10,
      borderRadius: 10,
      backgroundColor: '#191521',
    },
    title: {
      flexDirection: 'row',
      marginBottom: 0,
    },
    titleText: {
      color: 'white',
      fontSize: 28,
    },
    bar: {
      width: '90%',
      height: 3,
      backgroundColor: 'grey',
      borderRadius: 10,
      alignSelf: 'center',
      opacity: 0.5,
      marginBottom: 10,
    },
    previewContainer: {
      flexDirection: 'column',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 5,
    },
    previewNameText: {
      color: 'white',
      fontSize: 18,
      opacity: 0.8,
    },
    previewValueText: {
      color: 'white',
      fontSize: 18,
      opacity: 0.5,
      textAlign: 'right',
    },
    trainIconsContainer:{
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      margin: 0,
      padding: 0,
      justifyContent: 'flex-end',
    },
    titleContainer:{
      flex: 2,
    },
});
  
export default PreviewBox;