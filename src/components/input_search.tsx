import React, { useState, createRef } from 'react';
import arrowdown from './arrowdown.svg';


const InputSearch = (props: any) => {

    const allTheRefs: any = {}

    const { list_of_names, currentName, setCurrentName } = props; 

    const [entryField, setEntryField] = useState("")

    const[dropState, setDropState] = useState(true)

    const checkList = () => {
        let array = []; 
        for (let i = 0; i < list_of_names.length; i++) {
            if (list_of_names[i].toLowerCase().includes(entryField.toLowerCase())) {
                array.push(list_of_names[i])
            };
        }        
        return array
    }

    const keyPress = (event: any) => {
        const typeKeyPress = event.key
        switch (typeKeyPress) {
            case "Enter": 
                if (event.target.type !== "button") {
                    setCurrentName(event.target.value);
                }
                break;
            case "ArrowUp":
                allTheRefs[parseInt(event.target.id) - 1].focus()
                break;
            case "ArrowDown":
                if (event.target.id) {
                allTheRefs[parseInt(event.target.id) + 1].focus()
                } else {
                    allTheRefs["0"].focus()
                }
                break;
            case "Escape":
                setDropState(false);
                break;
        }

    }

    return(
        <div>
            <input type="text" 
            placeholder={currentName} 
            defaultValue="" 
            onChange={(event) => setEntryField(event.target.value)} 
            onKeyDown={(event) => keyPress(event)}/>
            <button type = "button" className="buttonEl"
                    style={{
                        transform: dropState ? "rotate(180deg)" : 'rotate(0deg)',
                    }} 
                    onClick={() => setDropState(!dropState)} onKeyDown={(event) =>keyPress(event)}>
                <img height = {10} style={{ transform: 'rotate(180deg)' }} src = {arrowdown} alt="arrowdown"/>
            </button>
            <div style = {{position: 'fixed', top: 0, left: 0, visibility: 'hidden'}}>
            { dropState === false && entryField === ""
            ?
            null
            :
            checkList().map((searched_name: string, key: any) =>
                <div key = {key}>
                    <button ref={ref => allTheRefs[key] = ref } 
                    id = {key} 
                    value = {searched_name} 
                    onClick = {(event) => { setCurrentName(searched_name);}} 
                    onKeyDown={(event) => keyPress(event)}> {searched_name} </button>
                </div>
            )
            }
            </div>
        </div>
    )

}

export default InputSearch;