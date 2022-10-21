
import React from "react";
import {Outlet} from "react-router-dom";

import AppHeader from "./AppHeader";
import Sidebar from "./Sidebar";
import FooterBox from "./FooterBox";
import BottomMenu from "./BottomMenu";
import {useMediaQuery} from "usehooks-ts";

import {MainPageLayout,Header, Main, SideBar, FooterBar} from "../styles/Root.components";

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