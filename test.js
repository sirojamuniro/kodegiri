const data = ['11','12','cii','001','2','1998','7','89','iia','fii']

const check = (items) => {
    const thisString = items.filter((item) => {
        return !parseInt(item) 
    })
    let result = {};
    let allData = [];
    thisString.forEach((item) => {
        const splitString = item.split("")
        let subString = [];
        splitString.map((index) => {
            let datas = item.slice(0,index + 1)
            subString.push(datas)
            allData.push(datas)
        })
        allData = [...new Set(allData)] 
        result = {
            ...result,
            [item]: subString,
            ['S']: allData
        }
    })
    return result
}

console.log(check(data));