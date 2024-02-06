import data from "../data/data.json"


function formatsDepartmentList() {
    let formatedData = []
    for(let department of data.departmentList) {
        let formatedDepartment = {
            "id": department.id,
            "value": department.name.toLocaleLowerCase(),
            "label": department.name
        }
        formatedData.push(formatedDepartment)
    }
    return formatedData
}

function formatsStates() {
    let formatedData = []
    for(let state of data.states) {
        let formatedDepartment = {
            "id": state.id,
            "value": state.abbreviation,
            "label": state.name
        }
        formatedData.push(formatedDepartment)
    }
    return formatedData
}


export { formatsDepartmentList, formatsStates }