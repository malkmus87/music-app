import * as React from 'react';
import { useState,FunctionComponent } from 'react';
import {ButtonStyle,TextInputStyle} from '../../styles/inputs';
import {SearchInputStyle,SearchInputTextStyle,SearchButtonStyle} from './Style';
import {StaticWideFramed} from '../../styles/layouts';

interface PropsType {
    onSubmit: Function;
}

const SearchInput:FunctionComponent<PropsType> = ({onSubmit,children}) => {
    const [searchKey, setSearchKey] = useState<string>("");
    const [activeTimeout, setActiveTimeout] = useState<number | null>(null);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKey(event.target.value);
        if ( activeTimeout !== null ) window.clearTimeout(activeTimeout);
        let newTimeoutID: number = window.setTimeout(() => onSearch(event.target.value), 1000);
        setActiveTimeout(newTimeoutID);

    }
    function onSearch(submittedKey: string){
        onSubmit(submittedKey);
    }
    function onKeyDown(){

    }
    
    return (
        <div style={{...SearchInputStyle,...StaticWideFramed}}>
            <input
                style={{...TextInputStyle,...SearchInputTextStyle}}
                type="text"
                value={searchKey}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
            <button 
                onClick={() => onSubmit(searchKey)} 
                style={{...ButtonStyle,...SearchButtonStyle}}
            >Sök</button>
            {children}
        </div>
    )
}
export default SearchInput;