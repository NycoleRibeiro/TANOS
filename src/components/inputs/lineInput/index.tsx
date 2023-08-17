import './style.sass'
import { useState } from 'react';

type Props = {
    type: string,
    placeholder: string,
    onChange: (value: string) => void
}

export const LineInput = ({ type, placeholder, onChange }: Props) => {
    const [value, setValue] = useState('');

    const handleOnChange = (value:string) => {
        setValue(value);
        onChange(value);
    }
    
    return (
        <div className="group">
            <input 
                required={true} 
                className={value ? "main-input has-value" : "main-input" }
                type={type}
                value={value}
                onChange={(e) => handleOnChange(e.target.value)}
            />
            <label className={value ? "label-email has-value" : "label-email"}>
                {placeholder}
            </label>
        </div>
    )
}
