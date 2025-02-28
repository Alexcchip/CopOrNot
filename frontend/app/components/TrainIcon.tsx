import React from 'react';
import { View, StyleSheet } from 'react-native';

import OneTrain from './trains/OneTrain';
import TwoTrain from './trains/TwoTrain';
import ThreeTrain from './trains/ThreeTrain';
import FourTrain from './trains/FourTrain';
import FiveTrain from './trains/FiveTrain';
import SixTrain from './trains/SixTrain';
import SevenTrain from './trains/SevenTrain';

import ATrain from './trains/ATrain';
import BTrain from './trains/BTrain';
import CTrain from './trains/CTrain';
import DTrain from './trains/DTrain';
import ETrain from './trains/ETrain';
import FTrain from './trains/FTrain';
import GTrain from './trains/GTrain';
import JTrain from './trains/JTrain';
import LTrain from './trains/LTrain';
import MTrain from './trains/MTrain';
import NTrain from './trains/NTrain';
import QTrain from './trains/QTrain';
import RTrain from './trains/RTrain';
import STrain from './trains/STrain'; 
import WTrain from './trains/WTrain';
import ZTrain from './trains/ZTrain';

import NJTransit from './trains/NJTransit';
import TRAM from './trains/Tram';

export type TrainLine = '1' | '2' | '3' | '4' | '5' | '6' | '7' |
                 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' |
                 'J' | 'L' | 'M' | 'N' | 'Q' | 'R' | 'S' | 'W' | 'Z' |
                 'SIR' | 'TRAM1' | 'TRAM2';

const trainComponents = {
    1: OneTrain,
    2: TwoTrain,
    3: ThreeTrain,
    4: FourTrain,
    5: FiveTrain,
    6: SixTrain,
    7: SevenTrain,
    A: ATrain,
    B: BTrain,
    C: CTrain,
    D: DTrain,
    E: ETrain,
    F: FTrain,
    G: GTrain,
    J: JTrain,
    L: LTrain,
    M: MTrain,
    N: NTrain,
    Q: QTrain,
    R: RTrain,
    S: STrain,
    W: WTrain,
    Z: ZTrain,
    SIR: NJTransit,
    TRAM1: TRAM,
    TRAM2: TRAM
};

const TrainIcon: React.FC<{ trainLine: TrainLine; height?: number; width?: number}> = ({trainLine, height = 50, width = 50}) => {

    if (!trainLine) {
        console.warn('Invalid trainLine passed to TrainIcon:', trainLine);
        return null; // Don't render if trainLine is invalid
    }

    const TrainComponent = trainComponents[trainLine];

    if (!TrainComponent) {
        console.warn('No TrainComponent found for:', trainLine);
        return null; // Fallback for invalid trainLine
    }

    return(
        <View style={styles.iconContainer}>
            <TrainComponent height={height} width={width}/>
        </View>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        margin: 5,
        marginHorizontal: 2.5,
        padding: 0,
    }
})

export default TrainIcon