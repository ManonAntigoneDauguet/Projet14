/* eslint-disable array-callback-return */
import style from "./customTable.module.css"
import { useEffect, useRef, useState, useCallback } from "react"


/**
 * Return a dynamic table
 * @param { String } [title]
 * @param { Array.<{name: String, key: String, date: Boolean}> } columns
 * @param { Array.<Object> } data
 * @returns { HTMLElement }
 */
function CustomTable({ title, columns, data }) {
    const defaultMaxEntries = 10
    const [displayedData, updateDisplayedData] = useState(data)
    const [filteredData, updateFilteredData] = useState(data)
    const searchInput = useRef(null)
    const [maxEntries, updateMaxEntries] = useState(defaultMaxEntries)
    const [minIndex, updateMinIndex] = useState(0)
    const [maxIndex, updateMaxIndex] = useState(defaultMaxEntries)
    const [eraseButtonIsVisible, updateEraseButtonIsVisible] = useState(false)


    /**
     * Display a data declared as a date in the good format (string) if is available
     * @param { Object | String } date 
     * @returns { String | Object }
     */
    const displayDate = (date) => {
        try {
            return date.toLocaleDateString('en-us')
        } catch {
            return date
        }
    }


    /**
     * Sort feature
     * Allow to sort the entries by increasing ou decreasing order by changing the filteredData state
     * @param { String } columnKey 
     * @param { Bollean } [isIncreasing] 
     */
    const handleSort = useCallback((columnKey, isIncreasing = true) => {
        let newFilteredData = [...filteredData].sort((a, b) => {
            if (a[columnKey] === b[columnKey]) {
                return 0
            }
            if (a[columnKey] === "" || a[columnKey] === null) {
                return 1
            }
            if (b[columnKey] === "" || b[columnKey] === null) {
                return -1
            }
            if (isIncreasing) {
                return a[columnKey] < b[columnKey] ? -1 : 1
            } else {
                return a[columnKey] > b[columnKey] ? -1 : 1
            }
        })
        updateFilteredData(newFilteredData)
    }, [filteredData])


    /**
     * Search feature
     * Allow to filter the entries according to the user's request by changing the filteredData state
     */
    const handleSearch = useCallback(() => {
        const searchRequest = searchInput.current.value.toLowerCase()
        updateEraseButtonIsVisible(searchRequest.length !== 0)
        const newFilteredData = data.filter(employee => {
            return columns.some(({ key }) => {
                const value = employee[key].toString().toLowerCase();
                return value.includes(searchRequest);
            })
        })
        updateFilteredData(newFilteredData)
    }, [columns, data])


    /**
     * Search feature
     * Allow to erase the user's request and reboot the filteredData state
     */
    const erase = useCallback(() => {
        searchInput.current.value = ""
        updateEraseButtonIsVisible(false)
        updateFilteredData(data)
    }, [data])


    /**
     * Allow to change the number of showed entries
     */
    const handleChangeEntries = (e) => {
        updateMinIndex(0)
        updateMaxEntries(parseInt(e.target.value))
    }


    useEffect(() => {
        // Display a part of the filtered data
        let newDisplayedData = filteredData.slice(minIndex, minIndex + maxEntries)
        updateDisplayedData(newDisplayedData)
    }, [filteredData, maxEntries, minIndex])

    
    useEffect(() => {
        // Update the display of the number of entries displayed at the foot of the table
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
                            <th key={`column-${index}-${key}`} scope="col">
                                <div className={style.columnNameContainer}>
                                    {name}
                                    <div className={style.arrowsContainer}>
                                        <div className={`${style.arrow} ${style.arrowUp}`}>
                                            <input
                                                type="button"
                                                aria-label="sort in ascending order"
                                                onClick={() => handleSort(key, true)}
                                            />
                                        </div>
                                        <div className={`${style.arrow} ${style.arrowDown}`}>
                                            <input
                                                type="button"
                                                aria-label="sort in descending order"
                                                onClick={() => handleSort(key, false)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={style.tbody}>
                    {displayedData.map((employee, employeeIndex) => (
                        <tr key={`row-${employeeIndex}`} className={employeeIndex % 2 ? style.evenTr : style.oddTr}>
                            {columns.map(({ key, date }, columnIndex) => (
                                columnIndex === 0 ?
                                    <th key={`${employeeIndex}-${key}`}>
                                        {date ? displayDate(employee[key]) : employee[key]}
                                    </th> :
                                    <td key={`${employeeIndex}-${key}`}>
                                        {date ? displayDate(employee[key]) : employee[key]}
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