import { useState } from 'react';
import Button from './dropdown_button';


function Dropdown() {
    
    const [name, addName] = useState(["Mary", "John", "Alex", "Marie", "Jonathan", "Babel", "Hanna", "Joseph", "Ivan", "Gregory", "Ioseph", "Papadopoulos"])



    return (
      <div>
        <Button name = {name} />
      </div>
    )
}

export default Dropdown; 