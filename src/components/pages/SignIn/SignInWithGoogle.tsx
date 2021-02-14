import React from "react";
import {Context, Status} from "../../../contexts/ui";
import {Button} from "../../atoms";

export default function SignInWithGoogle() {
    const {setApplicationState} = React.useContext(Context);

    return(
        <Button onPress={() => setApplicationState(Status.AUTHORIZED)} icon="google" label="Sign In With Google"/>
    )
}
