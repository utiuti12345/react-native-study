import React from "react";
import {IconButton as PaperIconButton} from 'react-native-paper';
import {StyleSheet, ViewStyle} from "react-native";
import {COLOR} from "../../constants/theme";

const styles = StyleSheet.create({
    button:{
        height:120,
        justifyContent:'center',
        alignItems:'center',
        width:80,
        borderRadius:0,
        margin:0,
    }
});

interface Props {
    icon:string,
    onPress:() => void;
    style:ViewStyle | ViewStyle[];
    iconColor?:string;
    size?:number;
}

export default function IconButton(props:Props) {
    const {icon,onPress,style,iconColor = COLOR.WHITE,size = 18} = props;

    return <PaperIconButton onPress={onPress} color={iconColor}
                            style={[styles.button,style]} size={size} icon={icon}/>
}
