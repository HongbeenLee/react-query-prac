import type { NextPage } from 'next'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"  
import {Infinity} from "../components"

const infinityScroll:NextPage = () => {
    return <>
    <Infinity/>
    <ReactQueryDevtools initialIsOpen />
    </>
}

export default infinityScroll;