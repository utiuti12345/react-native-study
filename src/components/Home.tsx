import React from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Todo from './Todo';
import {ITodoState} from "../interface/interface";

export default function Home(props: ITodoState[]) {
    const renderItem = ({item}: { item: any }) => <Todo isDone={item.isDone} text={item.text}/>;

    return (
        <View>
            <Text>Home</Text>
            <FlatList data={props}
                      renderItem={renderItem}/>
        </View>
    )
}
