import React, { useState } from 'react';
import InputSearch from './input_search';

const Button = (props: any) => {

    const { name }  = props;

    const[currentName, setCurrentName] = useState("")

    

    const showNames = () => {
        return (
            <div>
                
                {name.map((namer: any) =>
                    <div>
                        <button onClick={() => setCurrentName(namer)}> {namer} </button>
                    </div>
                )}
                
            </div>
        )
    }

    // const Ignore = () => {
    //     return (
    //         <div>
    //         <h2>The chosen name is: {currentName}</h2>
    //         <button onClick={() => setDropState(!dropState)}>Toggle</button>
    //         </div>
    //     )
    // }

    return (
        <div>
            <h2>The chosen name is: {currentName}</h2>
            {/* {dropState ? showNames() : null}<br/> */}
            <InputSearch list_of_names = { name } setCurrentName={setCurrentName} currentName = {currentName}/>
        </div>
    )

}

export default Button; 