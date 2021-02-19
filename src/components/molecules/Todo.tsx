import React from "react";
import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {width} from "../../lib/window";
import {COLOR} from "../../constants/theme";
import Icon from "react-native-vector-icons/FontAwesome";

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: COLOR.MAIN,
        height: 120,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 32,
        color: COLOR.WHITE,
    },
    doneText: {
        textDecorationLine: 'line-through',
    },
    detail: {
        fontSize: 16,
        color: COLOR.WHITE,
    }
});

interface Props {
    onPress: () => void;
    title: string;
    detail: string;
    isDone: boolean | undefined;
}

export default function TodoDisplay(props: Props) {
    const {onPress, title, detail, isDone} = props;
    const labelStyle = React.useMemo(() => (isDone ? [styles.title, styles.doneText] : styles.title), [isDone]);

    return (
        <TouchableHighlight style={styles.contentContainer} onPress={onPress}>
            <View style={styles.contentContainer}>
                <View>
                    <Text style={labelStyle}>{title}</Text>
                    {!!detail && <Text style={styles.detail}>{detail}</Text>}
                </View>
                <Icon name="angle-right" size={32} color={COLOR.WHITE}/>
            </View>
        </TouchableHighlight>
    )
}
