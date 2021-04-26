$(()=>{
    $('#start-match').click(()=>{
        console.log('cart clicked')
        

        $.get('/user/islogin',(data)=>{
            if(!data){
                window.alert('Please login first')
                $('#content').load('html/login.html')
            }
            else{
                
                $('#content').load('html/match.html')
            }
        })
    })
})