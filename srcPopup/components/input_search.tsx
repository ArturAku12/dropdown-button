// @ts-nocheck
import React, { useState, createRef } from 'react';
import arrowdown from './arrowdown.svg';
import {usePopupPos} from './popup';



const InputSearch = (props: any) => {

    //usePopupPos set-up
    const [theElement,setElement] = useState(null)
    const [theLRMode,setLRMode] = useState(false)
    const [pos] = usePopupPos(theElement,theLRMode)

    //Refs for the buttons in the dropdown
    const allTheRefs: any = {}

    const { list_of_names, currentName, setCurrentName } = props; 

    //Values in the entryField of the input.
    const [entryField, setEntryField] = useState("")

    //Boolean to show/hide the dropdown. (TRUE = DROPDOWN IS HIDDEN, FALSE = DROPDOWN IS SHOWN)
    const[dropState, setDropState] = useState(true)

    //Creates a list of names based on the input in the entryField.
    //When entry is empty, all names of the list are displayed.
    //Otherwise, when entry is not empty, all available names are displayed,
    //that contain the string of the entryField.
    const checkList = () => {
        let array = []; 
        for (let i = 0; i < list_of_names.length; i++) {
            if (list_of_names[i].toLowerCase().includes(entryField.toLowerCase())) {
                array.push(list_of_names[i])
            };
        }        
        return array
    }

    // Handles the Blur event. Blur events that occur between clicks/buttonpress inside the div are ignored.
    // If pressed outside the div, the blur event occurs and the dropdown menu is hidden.
    const handleBlur = (event: any) => {
        const currentTarget = event.currentTarget;
        requestAnimationFrame(() => {
            // Check if the new focused element is a child of the original container
            if (!currentTarget.contains(document.activeElement)) {
              setDropState(true);
            }
          });
    }

    // Handles different key press scenarios when the focus is either on the input field,
    // the arrow button or the dropdown buttons. Enter selects, Exit hides the dropdown, arrow keys
    // Up and Down navigate the entries in the menu. Can also navigate with Tab.
    const keyPress = (event: any) => {
        const typeKeyPress = event.key
        switch (typeKeyPress) {
            case "Enter": 
                if (event.target.type !== "button") {
                    setCurrentName(event.target.value);
                    setEntryField("")
                }
                break;
            case "ArrowUp":
                allTheRefs[parseInt(event.target.id) - 1].focus()
                break;
            case "ArrowDown":
                if (event.target.id && event.target.id !== "input") {
                allTheRefs[parseInt(event.target.id) + 1].focus()
                } else {
                    allTheRefs["0"].focus()
                }
                console.log("I am here", dropState);
                break;
            case "Escape":
                if (event.target.id !== "input") {
                setDropState(true);
                }
                break;
        }

    }
    return(
        <div className = "random" onKeyDown={(event) => keyPress(event)} onFocus={(event) =>{console.log("FOCUS ACQUIRED")}} onBlur={(event) => {console.log('FOCUS LOST'); handleBlur(event)}}>
            {/* input field */}
            <div key="parent" style={{ border: "3px solid green" }}>
            <input type="text"
            id = "input" 
            placeholder={currentName} 
            defaultValue="" 
            onChange={(event) => setEntryField(event.target.value)} 
            onKeyDown={(event) => keyPress(event)}
            onFocus={(event) => setDropState(false)}/>
            
            
            {/* arrow button */}
            <button type = "button" className="buttonEl"
                    style={{
                        transform: dropState ? "rotate(180deg)" : 'rotate(0deg)',
                    }}
                    onClick={(event) => setDropState(!dropState)}
                    onKeyDown={(event) =>keyPress(event)}>
                <img height = {10} style={{ transform: 'rotate(180deg)' }} src = {arrowdown} alt="arrowdown"/>
            </button>
            </div>
                { dropState  
                    ?
                    null
                    :
                    // dropdown menu with buttons
                    <div id="popupDiv" ref = {setElement} style = { pos } >
                        <div   style = {{border: "1px solid blue"}}>
                            {checkList().map((searched_name: string, key: any) =>
                                <div key = {key}>
                                    <button ref={ref => allTheRefs[key] = ref } 
                                    id = {key} 
                                    value = {searched_name} 
                                    onClick = {(event) => {setCurrentName(searched_name);}} 
                                    onKeyDown={(event) => keyPress(event)}> {searched_name} </button>
                                </div>
                            )}
                        </div>
                    </div>
                }
        </div>
        
    )

}

export default InputSearch;