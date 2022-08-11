import React, { useState } from 'react';
import InputSearch from './input_search';

const Button = (props: any) => {

    const { name }  = props;

    const[currentOption, setCurrentOption] = useState("")

    

    const showNames = () => {
        return (
            <div>
                
                {name.map((namer: any) =>
                    <div>
                        <button onClick={() => setCurrentOption(namer)}> {namer} </button>
                    </div>
                )}
                
            </div>
        )
    }

    return (
        <div>
            <InputSearch list_of_options = { name } setCurrentOption={setCurrentOption} currentOption = {currentOption}/>
        </div>
    )

}

export default Button; 