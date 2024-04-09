import style from "./customDatePicker.module.css"
import DatePicker from "react-date-picker"
import "react-date-picker/dist/DatePicker.css"
import "react-calendar/dist/Calendar.css"


/**
 * Return a cursomized Date Picker component of React-Date-Picker
 * @param { Object } value
 * @param { Function } setValue as onChange method
 * @returns { HTMLElement }
 */
function CustomDatePicker({value, setValue}) {
    return (
        <DatePicker
            className={style.input}
            value={value}
            clearIcon={null}
            calendarIcon={null}
            format="MM/dd/y"
            onChange={(date) => setValue(date)}
        />
    )
}

export default CustomDatePicker
