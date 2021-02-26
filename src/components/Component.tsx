import React from "react";
import {FlatList, Text} from "react-native";

interface Todo {
    title: string;
    isCompleted: boolean;
}

interface Props {
    completedTodos: Array<Todo>;
    numofCompleted: number;
}

export default function Component(props: Props) {
    return(
        <>
            <Text>{props.numofCompleted}</Text>;
            <FlatList
                data={props.completedTodos}
                renderItem={({item}) => <Text>{item.title}</Text>}
            />;
        </>
    )
}
