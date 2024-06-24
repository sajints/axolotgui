import { createContext, useState } from 'react';
const FilterContext = createContext();

const FilterProvider = ({children})=>{
    const [filterData , setFilterData] = useState({});

    const setData = (id ,value) =>{
        const newState = {
            ...filterData,
            [id]:value
        }
        setFilterData(newState)
    }
    return(
        <FilterContext.Provider value={{filterData, setData,setFilterData}}>
            {children}
        </FilterContext.Provider>
    )
}
;
export {FilterContext , FilterProvider}