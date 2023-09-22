
const getExpenses = async (req,where)=>{
    return req.user.getExpenses(where)
}

module.exports = {getExpenses}