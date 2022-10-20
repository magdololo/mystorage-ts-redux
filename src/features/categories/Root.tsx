
import React from "react";
import {Outlet} from "react-router-dom";

import AppHeader from "../../app/TopMenu/AppHeader";
import Sidebar from "../../app/BottomMenu/Sidebar";
import FooterBox from "../../component/FooterBox";
import BottomMenu from "../../app/BottomMenu/BottomMenu";
import {useMediaQuery} from "usehooks-ts";

import {MainPageLayout,Header, Main, SideBar, FooterBar} from "../mainLayoutStyles/MainLayout.components";

const Root = ()=>{

    const isLargerThan1280 = useMediaQuery('(min-width: 1280px)')

    return (
        <>
        <MainPageLayout>
                <Header><AppHeader/></Header>
                <Main>
                    <Outlet/>
                </Main>
                {isLargerThan1280 ?
                <>
                <SideBar><Sidebar toggleDrawer={null}/></SideBar>
                <FooterBar><FooterBox/></FooterBar>
                </>
                : <BottomMenu/> }
        </MainPageLayout>
        </>
    )
}

export default Root;