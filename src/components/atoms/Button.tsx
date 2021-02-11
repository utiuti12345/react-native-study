import React from "react";
import {StyleSheet, Text, TextStyle, ViewStyle} from "react-native";
import { Button as PaperButton } from 'react-native-paper';
import {COLOR} from "../../constants/theme";

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: '900',
        color: COLOR.WHITE
    }
});

interface Props {
    onPress: () => void;
    style?: ViewStyle | ViewStyle[];
    textStyle?: TextStyle | TextStyle[];
    label?: string;
    color?: string;
    disabled?: boolean;
    disabledColor?: string;
    icon?: string;
}

export default function Button(props: Props) {
    const {onPress, style, textStyle, label, color, disabled, disabledColor, icon} = props;
    return (
        <PaperButton
            mode="contained"
            onPress={onPress}
            style={style}
            disabled={disabled}
            contentStyle={{
                backgroundColor: disabled ? disabledColor : color,
            }}
            icon={icon}
        >
            {label && <Text style={[styles.text,textStyle]}>{label}</Text> }
        </PaperButton>
    )
}
