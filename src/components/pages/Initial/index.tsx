import React, {useCallback, useContext, useRef, useState} from "react";
import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import {COLOR} from "../../../constants/theme";
import {Context, Status} from "../../../contexts/ui";
import {CarouselStatic} from "react-native-snap-carousel";
import {Carousel} from "../../organisms";
import {Pagination} from "../../atoms";

const padding = 20;
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding,
        backgroundColor:COLOR.MAIN,
    },
    text:{
        color:COLOR.WHITE
    }
});

interface Data {
    text:string;
}

const renderData = [
    {
        text:"Hello React Native world.\nWelcome to the JS world.\n\nThis application is made from React Native.",
    },{
        text:"Sample Sample Sample",
    },{
        text:"Test Test Test",
    },
];

export default function Initial() {
    const [activeSlide,changeSlide] = useState(0);
    const {setApplicationState} = useContext(Context);

    const carouselRef = useRef(null);
    const onEnd = useCallback(() => {
        setApplicationState(Status.UN_AUTHORIZED);
    },[setApplicationState]);

    const onNext = useCallback(() => {
        const nextIndex = activeSlide === renderData.length - 1 ? activeSlide : 1 + activeSlide;
        setTimeout(() => {
            if(!carouselRef || !carouselRef.current){
                return;
            }
            const carousel = (carouselRef.current as any) as CarouselStatic<Data>;
            carousel.snapToItem(nextIndex);
        },250);
        changeSlide(nextIndex);
    },[activeSlide]);
    return(
        <SafeAreaView style={styles.container}>
            <Carousel onEnd={onEnd} onNext={onNext} carouselRef={carouselRef} onSnapToItem={changeSlide} data={renderData}/>
            <Pagination length={renderData.length} index={activeSlide}/>
        </SafeAreaView>
    )
}
