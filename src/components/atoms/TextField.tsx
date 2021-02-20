import React from "react";
import {Keyboard, ViewStyle} from "react-native";
import {dark} from "@eva-design/eva";
import {COLOR} from "../../constants/theme";
import {TextInput} from "react-native-paper";

interface Props {
    label: string;
    value: string;
    onChangeText?: (str: string) => void;
    style?: ViewStyle;
    autoCompleteType?:
        | 'off'
        | 'username'
        | 'password'
        | 'email'
        | 'name'
        | 'tel'
        | 'street-address'
        | 'postal-code'
        | 'cc-number'
        | 'cc-exp'
        | 'cc-exp-month'
        | 'cc-exp-year';
    secureTextEntry?: boolean;
    disabled?: boolean;
}

const theme = {
    dark: true,
    colors: {
        primary: COLOR.PRIMARY,
        backgroundColor: COLOR.MAIN,
        text: COLOR.BLACK,
        placeholder: COLOR.PRIMARY,
    }
};

export default function TextField(props: Props) {
    const {label, value, onChangeText = () => {},style,autoCompleteType,secureTextEntry,disabled} = props;

    return(
        <TextInput
            label={label}
            value={value}
            disabled={disabled}
            onChangeText={onChangeText}
            mode="outlined"
            theme={theme}
            style={style}
            autoCompleteType={autoCompleteType}
            autoCapitalize="none"
            secureTextEntry={secureTextEntry}
        />
    );
}

export function dismiss() {
    Keyboard.dismiss();
}
