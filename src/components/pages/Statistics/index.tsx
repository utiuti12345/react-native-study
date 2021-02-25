import React from "react";
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {DETAIL} from "../../../constants/path";
import {Statistic} from "../../molecules/ProgressPanel";
import Todos, {Todo,State as TodosState} from "../../organisms/Todos";
import {ProgressPanel} from "../../molecules";
import {HeaderText} from "../../atoms";

const styles = StyleSheet.create({
    headerTextContainer: {
        paddingLeft: 20,
        marginTop: 20,
        marginBottom: 8,
    }
});

const props = {
    statistics: {
        numofCompleted: 10,
        numofAll: 25,
        numofUncompleted: 15,
        completedRatio: 0.4,
        uncompletedRatio: 0.6,
    },
    histories:[
        {
            id:'1',
            title:'Todo1',
            detail:'Done',
            isDone:true,
        },
        {
            id:'2',
            title:'Todo2',
            detail:'Done',
            isDone:true,
        },
    ]
};

interface Props {
    statistics:Statistic;
    histories:TodosState;
}

function Header(props:Props) {
    return(
        <View>
            <ProgressPanel {...props.statistics}/>
            <View style={styles.headerTextContainer}>
                <HeaderText text="History"/>
            </View>
        </View>
    );
}

export default function Statistics() {
    const {navigate} = useNavigation();
    const gotoDetail = React.useCallback((state:Todo.State,isEditable:boolean) => {
        console.log({isEditable});
        navigate(DETAIL,{...state,isEditable});
    },[navigate]);
    const actions = React.useMemo(() => ({gotoDetail}),[gotoDetail]);

    return <Todos isEditable={false} todos={props.histories} actions={actions} header={<Header {...props} />} />;
}
