/* eslint-disable array-callback-return */
import style from "./customTable.module.css"
import { useRef, useState } from "react"

/**
 * 
 * @param { String } [title]
 * @param { Array.<{name: String, key: String}> } columns
 * @param { Array.<Object> } data
 * @returns { HTMLElement }
 */
function CustomTable({ title, columns, data }) {
    const [displayedData, updatedisplayedData] = useState(data)
    const searchInput = useRef(null)
    const [eraseButtonIsVisible, updateEraseButtonIsVisible] = useState(false)

    const handleSearch = () => {
        const searchRequest = searchInput.current.value
        searchRequest.length === 0 ? updateEraseButtonIsVisible(false) : updateEraseButtonIsVisible(true)
        let filteredData = []
        for (let employee of data) {
            let filteredEmployee= false
            columns.map(({key}) => {
                if (employee[key].indexOf(searchRequest) !== -1) {
                    console.log(key)
                    filteredEmployee = true
                    return
                }
            })
            filteredEmployee && filteredData.push(employee)
        }
        updatedisplayedData(filteredData)
    }

    const erase = () => {
        searchInput.current.value = ""
        updateEraseButtonIsVisible(false)
        updatedisplayedData(data)
    }

    return (
        <div className={style.tableContainer}>
            <div className={style.head}>
                <div>
                    Sow entries
                </div>
                <form action="#" className={style.tableSearchForm}>
                    <label htmlFor="tableSearch">
                        Search :
                    </label>
                    <input
                        type="text"
                        name="tableSearch"
                        id="tableSearch"
                        ref={searchInput}
                        onChange={handleSearch}
                    />
                    {eraseButtonIsVisible &&
                        <input
                            type="button"
                            name="erase"
                            id="tableSearchErase"
                            onClick={erase}
                        />
                    }
                </form>
            </div>

            <table className={style.table}>
                <caption className={style.caption}>
                    {title}
                </caption>
                <thead className={style.thead}>
                    <tr>
                        {columns.map(({ name, key }, index) => (
                            <th key={`column-${index}-${key}`} scope="col">{name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className={style.tbody}>
                    {displayedData.map((employee, employeeIndex) => (
                        <tr key={`row-${employeeIndex}`} className={employeeIndex % 2 ? style.evenTr : style.oddTr}>
                            {columns.map(({ key }, columnIndex) => (
                                columnIndex === 0 ?
                                    <th key={`${employeeIndex}-${key}`}>
                                        {employee[key]}
                                    </th> :
                                    <td key={`${employeeIndex}-${key}`}>
                                        {employee[key]}
                                    </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={style.foot}>
                <div>
                    Showing 1 to ??? of {displayedData.length} entries
                </div>
                <div
                    className={style.nextAndPreviousContainer}>
                    <button>Previous</button>
                    <button>Next</button>
                </div>
            </div>
        </div>
    )
}

export default CustomTable