const temp = ['11','12','cii','001','2','1998','7','89','iia','fii']


const foo = (items) => {
    const onlyString = items.filter((item) => {
        return !parseInt(item) 
    })
    let result = {};
    let all = [];
    onlyString.forEach((item) => {
        const separateString = item.split("")
        let subString = [];
        separateString.forEach((subItem, index) => {
            let temps = item.slice(0,index + 1)
            subString.push(temps)
            all.push(temps)
            let helper = 0;
            let isLoop = true;
            while((index === separateString.length - 1) && isLoop) {
                temps = item.slice(helper, index + 1)
                subString.push(temps)
                all.push(temps)
                subString = [...new Set(subString)] 
                helper += 1
                if(helper === index + 1) isLoop = false
            }
        })
        all = [...new Set(all)] 
        result = {
            ...result,
            [item]: subString,
            ['S']: all
        }
    })
    return result
}

console.log(foo(temp));