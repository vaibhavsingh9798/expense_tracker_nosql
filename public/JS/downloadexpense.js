let dow = document.getElementById('dow-btn')
        dow.addEventListener('click',downlaod)
let token = localStorage.getItem('token')
        async function downlaod(e){
            e.preventDefault();
           // console.log('downlad...')
            let token = localStorage.getItem('token')
           let response = await axios.get(`http://localhost:3001/expense/download`,{headers:{"Authorization":token}})
           //console.log('url',response.data.fileURL)
          // console.log('dow response..',response.data.fileURL)
            window.open(response.data.fileURL,'_blank')
          }
