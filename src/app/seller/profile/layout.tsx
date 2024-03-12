import React from "react";
import {cookies} from "next/headers";
import {AccessToken} from "@/types/token.t";
import AccessDenied from "@/components/native/AccessDenied";

export default  function Layout({children}: {children:React.ReactNode}){
    const token = cookies().get("access-token");

    if (token?.value !== AccessToken.SELLER) {
        return (
            <div className="w-screen h-screen grid place-items-center">
                <AccessDenied />
            </div>
        );
    }

    return <>{children}</>
}