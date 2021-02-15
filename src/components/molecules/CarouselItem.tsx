import React from "react";
import {StyleSheet} from "react-native";
import {COLOR} from "../../constants/theme";
import {width} from "../../lib/window";

const padding = 20;
const edgeNumber = 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding,
        backgroundColor: COLOR.MAIN,
    },
    text: {
        fontSize: 28,
        fontWeight: '800',
        lineHeight: 40,
        color: COLOR.WHITE,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: width - padding * edgeNumber,
        paddingVertical:10,
    },

});
