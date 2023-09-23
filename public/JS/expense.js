// const Razorpay = require("razorpay")
let ispremiumuser=false;
let expenseForm = document.getElementById('expenseForm')
expenseForm.addEventListener('submit',submitForm)
let ul = document.getElementById('expenses')
ul.addEventListener('click',delItem)
let token = localStorage.getItem('token')
const backendAPI = 'http://localhost:3001' 
let pagination = document.getElementById('pagination')
let limit = 2;

// extract user data from form 
function submitForm(e){
    e.preventDefault()
    let eamount = document.getElementById('eamount').value 
    let description = document.getElementById('description').value
    let category = document.getElementById('category').value
     const expense = {eamount,description,category}
    postExpense(expense)
    document.getElementById('eamount').value =""
     document.getElementById('description').value=""
    document.getElementById('category').value=""
}

function printExpense(item){
    let ul = document.getElementById('expenses')
    let li = document.createElement('li')
    li.setAttribute('class','list-group-item m-1')
    li.appendChild(document.createTextNode(`${item.eamount} - ${item.description} - ${item.category}`))
    let delBtn = document.createElement('button')
    delBtn.appendChild(document.createTextNode('Delete'))
    delBtn.setAttribute('class','del float-right')
    delBtn.setAttribute('id',item._id)
    li.appendChild(delBtn)
    console.log(li)
    ul.appendChild(li)
   
}

function addPremiumButton(premimum){
    let btn = document.getElementById('rzp-button')
    btn.innerHTML=""
    if(premimum){ 
         btn.appendChild(document.createTextNode('Premium User'))
        }else{
            btn.appendChild(document.createTextNode('Buy Premium Membership'))
        }
}

let lb = document.getElementById('leaderboard')
async function printLeaderBoard(user){
// LEADERBOARD
 document.getElementById('lb-title').innerHTML="LEADERBOARD"
 let li = document.createElement('li')
 li.appendChild(document.createTextNode(`Name - ${user.name} Total Expense - ${user.totalexpense}`))
 lb.appendChild(li)
}
    
function addLeadeboard(premium){
    let btn = document.createElement('button')
    btn.appendChild(document.createTextNode('Leaderboard'))
    btn.setAttribute('class','float-right m-1 p-1')
    let div = document.getElementById('rzp-lb')
    div.innerHTML=""  
    if(premium)
    div.appendChild(btn).onclick = async function(){
       // console.log('click....')
        let users = await axios.get(`http://localhost:3001/premium/showLeaderBoard`)
       // console.log('users..',users)
        document.getElementById('leaderboard').innerHTML=""  
        users.data.map(user => printLeaderBoard(user))
    }
 

 }
 // download 
 
//  async function downlaod(e){
//     e.preventDefault();
//     console.log('downlad...')
//     await axios.get(`http://localhost:3001/user/expense/download`,{headers:{"Authorization":token}})

//   }

 // add table income expense
  function addTableButton(premium){
    let div  = document.getElementById('exp-table')
     div.innerHTML=""
      let btn = document.createElement('button')
      btn.appendChild(document.createTextNode('Download Expense'))
      btn.setAttribute('class','float-right p-1 m-1')
      if(premium){
      div.appendChild(btn).onclick = async function(){
        //window.location.href='expensetable.html'
        // let dow = document.getElementById('dow-btn')
        // dow.addEventListener('click',downlaod)
        let response = await axios.get(`http://localhost:3001/expense/download`,{headers:{"Authorization":token}})
        window.open(response.data.fileURL,'_blank')
      }
      }
  }

const getExpense = async () =>{
   // console.log('get call token',token)
   
    let ul = document.getElementById('expenses')
    ul.innerHTML=''
    try{
   let expresponse = await axios.get(`http://localhost:3001/expense/allexpenses`,{headers:{"Authorization":token}})
     let response = await axios.get('http://localhost:3001/purchase/usercategory',{headers:{"Authorization":token}})
    const usercategory = response.data
    ispremiumuser = response.data
   console.log('usercategory>>>>>>>',usercategory) 
   addPremiumButton(usercategory) 
    addLeadeboard(usercategory) 
    addTableButton(usercategory)                
  // print(item)
  console.log('get resp', expresponse.data.expenses)
  expresponse.data.expenses.map((item)=> printExpense(item)) //  
}catch(error){
    console.error('error',error)
}
}

const postExpense = async (expense) => {
    try{
    let resp = await axios.post('http://localhost:3001/expense/addexpense',expense,{headers:{"Authorization":token}})
    console.log('post resp',resp)
    getExpense()
    }catch(error){
        console.error('error',error)
    }
}

const deleteExpense = async (id)=>{
    try{
    let resp = await axios.delete(`http://localhost:3001/expense/deleteexpense/${id}`,{headers:{"Authorization":token}})
    getExpense()
}catch(error){
    console.error('error',error)
}
}

function delItem(e){
   // console.log('del call')
    if(e.target.getAttribute('class') == 'del float-right')
    {
        let id = e.target.getAttribute('id')
        //console.log('id',id)
        deleteExpense(id)
    }
}

function showPagination({currentPage,previousPage,nextPage,hasNextPage,hasPreviousPage,lastPage}){
     pagination.innerHTML=''
    // console.log('pagination..',pagination)
     //console.log('current..',currentPage,previousPage,nextPage,hasNextPage,hasPreviousPage,lastPage)
    // if hash previous page
   if(hasPreviousPage){
    let btn2 = document.createElement('button')
    btn2.setAttribute('class','page-item page-link m-1')
  btn2.innerHTML = `<h3>${previousPage}</h3>`
  btn2.addEventListener('click',() => getProducts(previousPage))
   pagination.appendChild(btn2)
   } 

   // hash current page
  let btn1 = document.createElement('button')
  btn1.setAttribute('class','page-item page-link m-1')
  btn1.innerHTML = `<h3>${currentPage}</h3>`
  btn1.addEventListener('click',() => getProducts(currentPage))
  pagination.appendChild(btn1)
  
   // if  hash next page 
   if(hasNextPage){
        let btn3 = document.createElement('button')
        btn3.setAttribute('class','page-item page-link m-1')
  btn3.innerHTML = `<h3>${nextPage}</h3>`
  btn3.addEventListener('click',() => getProducts(nextPage))
   pagination.appendChild(btn3)
   }
}

async function getProducts(page){
    try{
         limit = +localStorage.getItem('itemperpage')
        // console.log('limit..',limit, typeof limit)
        let expresponse = await axios.get(`${backendAPI}/expense/allexpenses/?page=${page}&maxItem=${limit}`,{headers:{"Authorization":token}})
                   // console.log('getP data',expresponse)
              //  listProducts(data.products) // DOM manipulation
                showPagination(expresponse.data) 
               //  delete previous item from expense list
                let ul = document.getElementById('expenses')
                ul.innerHTML = ''
             //  getExpense() 
             expresponse.data.expense.map((item)=> printExpense(item))

    }catch(err){
        console.log(err)
    }
}

function addRowperPage(e){
    e.preventDefault();
   // console.log('click...')
    let selectElement = document.getElementById('rowperpage').value;
    localStorage.setItem('itemperpage',selectElement)
    getProducts(1)
}

window.addEventListener('DOMContentLoaded',async ()=>{
    const page = 1
    try{
   // let expresponse = await axios.get(`${backendAPI}/expense/allexpenses?page=${page}`,{headers:{"Authorization":token}})
              // console.log('window data load',expresponse.data)
              //  listProducts() // DOM manipulation
              //  showPagination(expresponse.data)  
               getExpense()
    }catch(err){
        console.error('error',err)
    }
   // set limit per page
    // let pagerow = document.getElementById('rowperpage')
    // pagerow.addEventListener('click',addRowperPage)
})
 
document.getElementById('rzp-button').onclick = async function(e){
   
    let token = localStorage.getItem('token')
   // console.log('rzp-click',token)
    if(!ispremiumuser){
        try{
    let response = await axios.get(`http://localhost:3001/purchase/premiummembership`,{headers:{"Authorization":token}})
  console.log('resp44',response)

  var options = {
    "key":response.data.key_id,
    "order_id":response.data.order.id,
    "handler": async function(response){
        await axios.post(`http://localhost:3001/purchase/updatetransactionstatus`,{
        order_id: options.order_id,
        payment_id: response.razorpay_payment_id,
        success:true 
        },{headers:{"Authorization":token}})

        alert('You are a Premium User Now')
        addPremiumButton(true)
        addLeadeboard(true)
        addTableButton(true)
    }

  };

  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();
  
  rzp1.on('payment.failed',async function(response){
    await axios.post(`http://localhost:3001/purchase/updatetransactionstatus`,{
        order_id: options.order_id,
        payment_id: response.razorpay_payment_id,
        success:false
        },{headers:{"Authorization":token}})
        alert('something went wrong')

  })

}catch(error){
    console.error('error',error)
}
}
}





