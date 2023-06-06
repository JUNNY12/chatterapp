import React from "react";
import { useThemeContext } from "../../../hooks/theme/useThemeContext";
import { useAuthContext } from "../../../hooks/auth/useAuthContext";
export default function User():React.JSX.Element{
    const {theme} = useThemeContext()
    const {user} = useAuthContext()
    
    return(
        <section>

        </section>
    )
}