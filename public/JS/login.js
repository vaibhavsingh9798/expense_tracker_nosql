

let loginForm = document.getElementById('loginForm')
loginForm.addEventListener('submit',loginFormSubmit)

function loginFormSubmit(e){
    e.preventDefault();
    let email = document.getElementById('email').value 
    let password = document.getElementById('password').value 
    let user = {email,password} 
     login(user)
     document.getElementById('email').value =""
    document.getElementById('password').value =""
}

const login = async (user)=>{
   // console.log('login call')
    let div = document.getElementById('errmsg')
    div.innerHTML=''
    let success = true;
    let errMsg = ''
    let token;
    try{
    const resp = await axios.post('http://localhost:3001/user/signin',user)
   // console.log('resp....',resp)
    token = resp.data.token
    }
    catch(error){
        console.error('err',error)
       success = e.response.data.success
       errMsg = e.response.data.meassage
    }
    if(!success){
        let div = document.getElementById('errmsg')
        let p = document.createElement('p')
        p.appendChild(document.createTextNode(`${errMsg}`))
        document.getElementById('errmsg').style.color = 'red'
        div.appendChild(p)
    }
    else{
      alert('You are successfully logged in')
      localStorage.setItem('token',token)
      location.assign('file:///D:/expense_tracker/view/expense.html')
    }
}