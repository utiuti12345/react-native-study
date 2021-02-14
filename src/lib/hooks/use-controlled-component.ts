import React from "react";

export default function useControlledComponent<T>(initializeValue:T) {
    const [value,setValue] = React.useState(initializeValue);

    function onChangeText(newValue:T) {
        setValue(newValue);
    }

    return {
        value,
        onChangeText,
    };
}
