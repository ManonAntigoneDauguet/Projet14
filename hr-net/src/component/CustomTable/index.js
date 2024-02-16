/* eslint-disable array-callback-return */
import style from "./customTable.module.css"
import { useEffect, useRef, useState } from "react"

/**
 * 
 * @param { String } [title]
 * @param { Array.<{name: String, key: String}> } columns
 * @param { Array.<Object> } data
 * @returns { HTMLElement }
 */
function CustomTable({ title, columns, data }) {
    const defaultMaxEntries = 10
    const [displayedData, updatedisplayedData] = useState(data)
    const [filteredData, updateFilteredData] = useState(data)
    const searchInput = useRef(null)
    const [maxEntries, updateMaxEntries] = useState(defaultMaxEntries)
    const [minIndex, updateMinIndex] = useState(0)
    const [maxIndex, updateMaxIndex] = useState(defaultMaxEntries)
    const [eraseButtonIsVisible, updateEraseButtonIsVisible] = useState(false)

    // Search features
    const handleSearch = () => {
        const searchRequest = searchInput.current.value.toLowerCase()
        searchRequest.length === 0 ? updateEraseButtonIsVisible(false) : updateEraseButtonIsVisible(true)
        let newFilteredData = []
        for (let employee of data) {
            let filteredEmployee = false
            columns.map(({ key }) => {
                if (employee[key].toLowerCase().indexOf(searchRequest) !== -1) {
                    filteredEmployee = true
                    return
                }
            })
            filteredEmployee && newFilteredData.push(employee)
        }
        updateFilteredData(newFilteredData)
    }

    const erase = () => {
        searchInput.current.value = ""
        updateEraseButtonIsVisible(false)
        updateFilteredData(data)
    }

    // Show entries features
    const handleChangeEntries = (e) => {
        updateMinIndex(0)
        updateMaxEntries(parseInt(e.target.value))
    }

    useEffect(() => {
        let newdisplayedData = filteredData.slice(minIndex, minIndex + maxEntries)
        updatedisplayedData(newdisplayedData)
    }, [data, filteredData, maxEntries, minIndex])

    useEffect(() => {
        (minIndex + maxEntries) > filteredData.length
            ? updateMaxIndex(filteredData.length)
            : updateMaxIndex(minIndex + maxEntries)
    }, [filteredData.length, maxEntries, minIndex])

    
    return (
        <div className={style.tableContainer}>
            <div className={style.head}>
                <form action="#" className={style.tableSelectForm}>
                    <label htmlFor="selectEntries">Show</label>
                    <select
                        id="selectEntries"
                        name="selectEntries"
                        value={maxEntries}
                        onChange={(e) => handleChangeEntries(e)}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                    <span>entries</span>
                </form>
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
                    Showing {minIndex + 1} to {maxIndex} of {filteredData.length} entries
                </div>
                <div className={style.nextAndPreviousContainer}>
                    {
                        minIndex !== 0
                            ? <button type="button" onClick={() => updateMinIndex(Math.max(0, minIndex - maxEntries))}>
                                Previous
                            </button>
                            : <span>Previous</span>
                    }
                    {
                        filteredData.length > maxEntries && filteredData.length !== maxIndex
                            ? <button type="button" onClick={() => updateMinIndex(Math.max(0, minIndex + maxEntries))}>
                                Next
                            </button>
                            : <span>Next</span>
                    }
                </div>
            </div>
        </div>
    )
}

export default CustomTable