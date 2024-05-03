// import React, { useState } from 'react';

// interface ButtonProps {
//     label: string;
//     onClick: () => void;
// }

// function Button({ label, onClick }: ButtonProps) {
//     const [showComponent, setShowComponent] = useState(false);

//     const handleClick = () => {
//         setShowComponent(true);
//     }

//     return (
//         <button id='renderCompBtn' onClick={() => { onClick(); handleClick(); }}>{label}</button>
//     );
// }

// export default Button;


import React, { useState } from 'react';

interface ButtonProps {
    label: string;
    onClick: () => void;
}

function Button({ label, onClick }: ButtonProps) {

    return (
        <button id='renderCompBtn' onClick={onClick}>{label}</button>
    );
}

export default Button;
