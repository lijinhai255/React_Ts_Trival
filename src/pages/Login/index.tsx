import React from "react";
import { UserLayout } from "../../layout/userLayout/index"
import {SignInForm} from "./From"
export const Login: React.FC = (props) => {
    console.log(props)
    return (
        <UserLayout>
           <SignInForm></SignInForm>
        </UserLayout>
    );
}