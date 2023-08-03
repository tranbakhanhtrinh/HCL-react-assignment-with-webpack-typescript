import { useEffect } from "react";

const useLocalStorage = () => {
    const isHasLocalStorage = typeof window !== 'undefined' && window.localStorage
    const getItem = (key: string) => isHasLocalStorage && JSON.parse(localStorage.getItem(key) as string)
    const setItem = (key: string,item: any) => isHasLocalStorage && localStorage.setItem(key,JSON.stringify(item));
    
    return {
        getItem, 
        setItem,
    } 
}

export default useLocalStorage;