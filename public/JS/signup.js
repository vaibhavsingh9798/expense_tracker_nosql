

let signupForm = document.getElementById('signupForm')
signupForm.addEventListener('submit',singnupFormSubmit)


function singnupFormSubmit(e){
    e.preventDefault();
    let name = document.getElementById('name').value 
    let email = document.getElementById('email').value 
    let password = document.getElementById('password').value 
    let user = {name,email,password}
    signup(user)
     document.getElementById('name').value =""
     document.getElementById('email').value =""
     document.getElementById('password').value =""
}



const signup = async (user)=>{
    let div = document.getElementById('errmsg')
         div.innerHTML=''
    let success = true;
    let errMsg = ''
   // console.log('signup call')
    try{
        console.log('send data',user)
    const resp = await axios.post('http://localhost:3001/user/signup',user)
   // console.log('resp',resp)
    }catch(e){
      success = e.response.data.sucsess
      errMsg = e.response.data.message
      console.error('e',e)
      
    }
    if(!success){
        let div = document.getElementById('errmsg')
        let p = document.createElement('p')
        p.appendChild(document.createTextNode(`${errMsg}`))
        document.getElementById('errmsg').style.color = 'red'
        div.appendChild(p)
    }else{
        alert('Thanks for signing up')
    }
  

}

