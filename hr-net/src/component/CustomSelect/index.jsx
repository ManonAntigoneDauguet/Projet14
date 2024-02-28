import style from "./customSelect.module.css"
import Select from 'react-select'


/**
 * Return a cursomized Select component of React Select
 * @param { String } inputId 
 * @param { Array.<{value: String, label: String}> } options
 * @param { Function } setOption as onChange method
 * @returns { HTMLElement }
 */
function CustomSelect({ inputId, options, setOption }) {
    return (
        <Select
            name={inputId}
            id={inputId}
            className={style.customSelect}
            options={options}
            defaultValue={options[0]}
            onChange={(option) => setOption(option)}
        />
    )
}

export default CustomSelect