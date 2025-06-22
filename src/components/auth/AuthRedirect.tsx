'use client';

import {redirect} from "next/navigation";

const AuthRedirect = async () => {
    return redirect('/login');
};

export default AuthRedirect;
