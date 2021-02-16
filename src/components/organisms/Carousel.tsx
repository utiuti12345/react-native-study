import React from "react";
import SnapCarousel from 'react-native-snap-carousel';
import {CarouselItem} from "../molecules";
import {width} from "../../lib/window";


interface Props {
    onEnd:() => void;
    onNext:() => void;
    carouselRef:any;
    onSnapToItem:(slide:number) => void;
    data:{text:string}[];
}

export default function Carousel(props:Props) {
    const {onEnd,onNext,carouselRef,onSnapToItem,data} = props;

    return(
        <SnapCarousel
            data={data}
            ref={carouselRef}
            renderItem={({item,index}) =>(
                <CarouselItem onPress={index === data.length - 1 ? onEnd : onNext} item={item}/>
            )}
            sliderWidth={width}
            itemWidth={width}
            onSnapToItem={onSnapToItem}
        />
    );
}
