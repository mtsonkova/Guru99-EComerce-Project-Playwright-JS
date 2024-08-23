class ReusableFunctions {
    static compareTwoProductArrays(arr1, arr2) {
        return JSON.stringify(arr1) === JSON.stringify(arr2);
    }
}

module.exports = {ReusableFunctions};