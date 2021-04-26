$(()=>{
    $('#profile').click(()=>{
       console.log($('h2').data('aa'))
        $('#content').empty()
        $('#footer_box').empty()
        $('#content').load('html/products.html')
    })
    $('#content').load('/html/dashboard.html')


    $.get('/user/islogin',(data)=>{
        console.log('islogin clicked')
        if(data){
            
            $('#user_login').empty()
            $('#user_login').append(`
            <span id="user_login"><button class="btn btn-outline-primary ms-4 me-5 btn" id="logout" type="button"> Logout</button></span>
                
            `)
            activelogout();
        }
    })
    $('#register').click(()=>{
        console.log('cart clicked')
        $('#content').empty()
        $('#footer_box').empty()

        $('#content').load('/html/Register.html')

        
    })
    $('#login').click(()=>{
        console.log('btn clicked')

        $('#content').empty()
        $('#footer_box').empty()



        $('#content').load('/html/login.html')
    })
    
    $('#logout').click(()=>{
        console.log('logout clicked')
    })




})

function getinner(data){
    // for get the type of data
    window.sessionStorage.product=data.innerText;
    $('#content').empty()
    // $('#footer_box').empty()
    $('#content').load('html/products.html')
    
}

console.log('js connected')

async function activelogout(){
    $('#logout').click(()=>{
        console.log('logout clicked')
        $.get('/user/logout',()=>{
            
            window.alert('logout sucessfully')
            location.reload('index.html')
        })
    })
}