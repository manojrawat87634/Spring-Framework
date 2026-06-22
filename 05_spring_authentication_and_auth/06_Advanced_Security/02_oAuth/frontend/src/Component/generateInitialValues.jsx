const genrateInitalValues = (inputArr)=>{
    let initalValues = {}
    inputArr.forEach(element => {
          initalValues[element.name] = element.value
    });
    return initalValues;
}

export default genrateInitalValues;