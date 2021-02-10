import React from "react";
import { UserLayout } from "../../layout/userLayout/index"
import {RegisterForm} from "./From"
export const RegisterPage : React.FC = () => {
    return (
        <UserLayout>
            <RegisterForm/>
        </UserLayout>
    );
}