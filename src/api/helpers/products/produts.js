/* Product Model fields */
fields = ["name", "description", "category", "price", "dateCreated"];

/* check query parameters */
/**
 * @param {Object} query 
 * @returns {Object} :query on successful check
 */
exports.validateQuery = async (query = {}) => {
    const invalidParams = [];
        for (const key in query) {
            if (fields.indexOf(key) == -1) {
                invalidParams.push(key);
            }
        }
        if (invalidParams.length > 0) {
            let err = new Error();
            for (const index of invalidParams) {
                if (invalidParams[-1] == index) {
                    err.message += `${index} `;
                    break;
                }
                err.message += `${index}, `;
            }
            invalidParams.length > 1
                ? (err.message += "are invalid query parameters")
                : (err.message += "is an invalid query parameter");
            err.status = 400;
            throw err;
    }
    return query;
}

/**
 * 
 * @param {Object} o 
 * @param {Array} array of object(o) key and value
 * @returns key and value of type object
 */
function createObject(o = {}, [k, v]) {
    if (!Number(v)) {
        return (o[k] = { $regex: new RegExp(v, "i") }, o);
    } else {
        return (o[k] = v, o);
    }
}

/* Construct query conditions */
/**
 * @param {Object} query 
 * @returns {Array} :an array of objects
 */
exports.constructQueryConditions = async (query = {}) => {
    let conditions = [];
    for (const data = Object.entries(query); data.length;) {
        conditions.push(data.splice(0, 1).reduce(createObject, {}));
    }
    return conditions;
}

/**
 * 
 * @param {Array} conditions 
 * @returns {Array} of documents that match the search
 */
exports.search = async (conditions = []) => {
    try {
        const Products = await require("../../models/product");
        let result = await Products.find({ $and: [...conditions] });
        if (result.length == 0) { result = await Products.find({ $or: [...conditions] }) };
        return result;
    } catch (error) { throw error }
} 