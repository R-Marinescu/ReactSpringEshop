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
