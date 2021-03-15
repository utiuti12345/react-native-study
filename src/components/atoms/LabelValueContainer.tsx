import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {COLOR} from "../../constants/theme";

const styles = StyleSheet.create({
    row:{
        alignSelf:'stretch',
        alignItems:'center',
        paddingHorizontal:50,
        flexDirection:'row',
        marginBottom:10,
    },
    labelContainer:{
        minWidth:100,
    },
    labelText:{
        color:COLOR.BLACK,
        fontSize:18,
    },
    valueContainer:{
        flexShrink:1,
        paddingLeft:10,
    },
    valueText:{
        color:COLOR.BLACK,
        fontSize:16,
    }
});

interface Props {
    label:string;
    value:string | number | null;
}

export default function LabelValueContainer(props:Props) {
    const {label,value = ''} = props;

    return(
        <View style={styles.row}>
            <View style={styles.labelContainer}>
                <Text style={styles.labelText}>
                    {label}
                </Text>
            </View>
            <View style={styles.valueContainer}>
                <Text style={styles.valueText}>
                    {value}
                </Text>
            </View>
        </View>
    )
}
