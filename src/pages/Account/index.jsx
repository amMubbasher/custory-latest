import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AccountSidebar from '../../components/Account/AccountSidebar';
import Layout from '../../components/Layout/Layout';

const Account = () => {
    const [screenWidth,setScreenWidth] = useState(100);
    const router = useNavigate();
    useEffect(()=>{
        setScreenWidth(window.innerWidth);
    }, [])
    useEffect(()=>{
        if (screenWidth>=1024) {
            router('/account/user');
        }
    }, [screenWidth])


    return <Layout><AccountSidebar/></Layout>
}


export default Account