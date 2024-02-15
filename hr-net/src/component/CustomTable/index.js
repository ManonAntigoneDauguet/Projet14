/* eslint-disable array-callback-return */
import style from "./customTable.module.css"

/**
 * 
 * @param { String } [title]
 * @param { Array.<{name: String, key: String}> } columns
 * @param { Array.<Object> } data
 * @returns { HTMLElement }
 */
function CustomTable({ title, columns, data }) {
    console.log(data)

    return (
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
                {data.map((employee, index) => (
                    <tr key={`row-${index}`} className={index % 2 ? style.evenTr : style.oddTr}>
                        {columns.map(({ key }) => (
                            <td key={`${index}-${key}`}>
                                {employee[key]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
            <tfoot className={style.tfoot}>
                <tr>
                    <td colSpan={Math.floor(columns.length / 2)}>
                        Showing 1 to ??? of {data.length} entries
                    </td>
                    <td colSpan={columns.length - Math.floor(columns.length / 2)}>
                        <div
                            className={style.nextAndPreviousContainer}>
                            <button>Previous</button>
                            <button>Next</button>
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>
    )
}

export default CustomTable