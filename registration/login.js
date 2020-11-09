

$(document).ready(()=>{
   
    var arr=new Array();

    
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/users",
       
        success: function(data, status, xhr){
            // console.log('success'+status);
            // alert('success'+status);
            arr=JSON.parse(data);
            console.log(arr);
            
        },
        
        error:function(jqXhr, textStatus, errorMessage){
            console.log('error'+errorMessage);
        },
        dataType: "text",
        contentType : "application/json",
    
});



    $('footer').load('footer.html ',function(){
      
    })

    //password checking
    $('#pass,#cpass').on('keyup',function()
    {
    if($('#pass').val() === $('#cpass').val())
    {
        $('#out').html("Matching");
        $('#out').css('color','green');
        $('#but').removeAttr("disabled");
    }
    else{
        $('#out').html("Not Matching");
        $('#out').css('color','red');
        $('#but').attr("disabled","true");
    }
});


// //date checking
// $('#dat').on('change',function()
// {
//     var dat=$('#dat').val();
//     var today=new Date();
//     var dob=new Date(dat);
//     // if(today.toString()== dob.toString()) {
//     //     $('#but').attr("disabled","true");
//     // }
//     if(today > dob)
//     {
//         $('#but').removeAttr("disabled");
//     }
  
//     else  {
//         $('#but').attr("disabled","true");
//     }
// })

//gender validation

$('#but,.gen').on('click',function(){
    var radio=$('.gen');
    var flag=0;
    for(var i=0;i<radio.length;i++)
    {
        if(radio[i].checked==true)
        {
            flag=1;
            $('#but').removeAttr("disabled");
            break;

        }
    }
    if(flag==0)
    {
        $('#but').attr("disabled","true");
        alert("Choose Your Gender");
    }
})







$('#myForm').submit((a)=>{
    a.preventDefault();
    let name=$('#name').val();
    let email=$('#email').val();
    let password=$('#pass').val();
    // let cpassword=$('#cpass').val();
    // let dob=$('#dat').val();
    let phone=$('#phone').val();
    let gender=$('input[name="gender"]:checked').val();
  

    var user={"name":name,"email":email,"password":password,"phone":phone,
     "gender":gender};
    
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/users",
        data: JSON.stringify(user),
        success: function(data, status, xhr){
            // console.log('success'+status);
            // alert('success'+status);
            
            
        },
        
        error:function(jqXhr, textStatus, errorMessage){
            console.log('error'+errorMessage);
        },
        dataType: "text",
        contentType : "application/json",
        
      });
      


})


$('.button1').click(function(){
    console.log('reach');
    $('#home').css('display','none');
    $('#contain1').css('display','block');
    $('#myForm').css('display','none');
    $('#myForm1').css('display','block');
    // $('#myForm').addClass('invisible');
    // $('#myForm1').addClass('visible');
    $('footer').addClass('foot2');
})

$('.button2').click(function(){
    console.log('reach');
    $('#home').css('display','none');
    $('#contain1').css('display','block');
    $('#myForm1').css('display','none');
    $('#myForm').css('display','block');
   
    // $('#myForm').addClass('visible');
    // $('#myForm1').addClass('invisible');
    $('footer').removeClass('foot2');
})

$('.button3').click(function(){
    console.log('reach');
    $('#myForm1').css('display','none');
    $('#myForm').css('display','none');
    $('#contain1').css('display','none');
    $('#home').css('display','block');
    $('#myModal').attr('display','block');
    // $('#myForm').addClass('visible');
    // $('#myForm1').addClass('invisible');
    $('footer').removeClass('foot2');
})

$('#myForm1').submit((a)=>{
    a.preventDefault();
    let email=$('#email1').val();
    
    let password=$('#pass1').val();
  
  

    if(email==""&&password==""||email==""||password=="")
    {
        alert("name and password is incorrect")
    }
    else{
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/users",
        data: {"email":email,"password":password},
        success: function(data, status, xhr){
            console.log(data);
            alert(data);
            if(data!=='[]')
            {
            sessionStorage.setItem('user',data);
            window.location.replace('editor2.html');
            }
            else
            {
            $('.text-muted').html('Wrong Email Id or Password');
            $('.text-muted').css('color','red');
            alert('error');
            }
        },
        
        error:function(jqXhr, textStatus, errorMessage){
            console.log('error'+errorMessage);
        },
        dataType: "text",
        contentType : "application/json",
        
      });
    }
    


})




$('#email').on('keyup',function () {

    var email=$('#email').val();
    console.log(email);
    var flag=0;
    for(var i=0;i<arr.length;i++)
    {
        if(email==arr[i].email)
        {
            $('#inval').html("Already registered user");
            $('#inval').css('color','red');
            $('#but').attr("disabled","true");
            flag=1;
            break;

        }
       
    }
    if(flag==0)
    {
             $('#but').removeAttr("disabled");
            $('#inval').html("Ready to go");
            $('#inval').css('color','green');
        
    }
    if(email=="")
    {
        $('#but').attr("disabled","true");
        $('#inval').html("enter your email");
        $('#inval').css('color','red');
    }
   
    
})



var blog=new Array();
$.ajax({
    type:"GET",
    dataType:"json",
    url:"http://localhost:3000/blogs",

    success:(data)=>{
        console.log(data);
        blog=data;
        
        
    },
    error:(e)=>{
        alert("error");
    }
})

var cate;

$('.buttonz').on('click',function(){
    var cat=$(this).attr('data-filter');
    cate=cat;
    $('.wrapperblog').html("");
    
   
    
    for(var i=0;i<blog.length;i++)
    {
        
        if(cat==blog[i].category)
        {
            
            $('.wrapperblog').append('<div class="sub"><h4><small>RECENT POSTS</small></h4><hr><h3>Author: '+blog[i].author+'</h3><br><h3>Category: '+blog[i].category+'</h3><br><h3>Title: '+blog[i].title+'</h3><br><p>'+blog[i].content+'</p><br> <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Continue Reading</button><hr></div><br><br>');
            
        }
        if(cat=="all")
        {
            
            $('.wrapperblog').append('<div class="sub"><h4><small>RECENT POSTS</small></h4><hr><h3>Author: '+blog[i].author+'</h3><br><h3>Category: '+blog[i].category+'</h3><br><h3>Title: '+blog[i].title+'</h3><br><p>'+blog[i].content+'</p><br> <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Continue Reading</button><hr></div><br><br>');
           
        }
    }
})

$('#sea').on('keyup',()=>{
    var search =$('#sea').val();
    $('.wrapperblog').html("");
    for(var i=0;i<blog.length;i++)
    {
        
        if(cate==blog[i].category)
        {
            if(blog[i].title.includes(search))
            {
            
            $('.wrapperblog').append('<div class="sub"><h4><small>RECENT POSTS</small></h4><hr><h3>Author: '+blog[i].author+'</h3><br><h3>Category: '+blog[i].category+'</h3><br><h3>Title: '+blog[i].title+'</h3><br><p>'+blog[i].content+'</p><br> <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Continue Reading</button><hr></div><br><br>');
            }
        }
        if(cate=="all")
        {
            if(blog[i].title.includes(search))
            {
            
            $('.wrapperblog').append('<div class="sub"><h4><small>RECENT POSTS</small></h4><hr><h3>Author: '+blog[i].author+'</h3><br><h3>Category: '+blog[i].category+'</h3><br><h3>Title: '+blog[i].title+'</h3><br><p>'+blog[i].content+'</p><br> <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Continue Reading</button><hr></div><br><br>');
            }
        }
    }


  })





$('.butz').on('click',function(){
    $('#home').css('display','none');
    $('#contain1').css('display','block');
    $('#myForm').css('display','none');
    $('#myForm1').css('display','block');

})















// $('#allBlogButton').click(function(e){
  
//     $(".wrapperblog").show();
    
   
   
//             $('.wrapperblog').html("");
//             $('.techWrapperBlog').html("");
//             $('.lifestyleWrapperBlog').html("");
//             $('.ITWrapperBlog').html(" ");
//             $('.SearchB').html(" ");
//             for(i=0;i<blog.length;i++)
//             {
                
//                 var contentsliced=blog[i].content.slice(0,50);
//                 $('.wrapperblog').append('<div class="sub"><h4><small>RECENT POSTS</small></h4><hr><h3>Author: '+blog[i].author+'</h3><br><h3>Category: '+blog[i].category+'</h3><br><h3>Title: '+blog[i].title+'</h3><br><p>'+contentsliced+'</p><br> <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Continue Reading</button><hr></div><br><br>');
                
    
//             }
        
// })


// //techcatbuttonclick

// $('#techCatButton').click(function(e){
//     $(".wrapperblog").hide();
//     $(".lifstyleWrapperBlog").hide();
//     $(".ITWrapperBlog").hide();
//     $(".techWrapperBlog").show();
//     $('.techWrapperBlog').html("");
   
//     $('.lifestyleWrapperBlog').html("");
//     $('.ITWrapperBlog').html(" ");
//     $('.SearchB').html(" ");
   
//             for(i=0;i<blog.length;i++)
//             {
//                 console.log(blog[i]);
//                 if(blog[i].category=="Technology")
//                 {  var contentsliced=blog[i].content.slice(0,50);

//                 $('.techWrapperBlog').append('<div class="sub"><h4><small>RECENT POSTS</small></h4><hr><h3>Author: '+blog[i].author+'</h3><br><h3>Category: '+blog[i].category+'</h3><br><h3>Title: '+blog[i].title+'</h3><br><p>'+contentsliced+'</p><br> <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Continue Reading</button><hr></div><br><br>');
//                 }
//             }
        
      


// })

// //lifestylecatButton onclick
// $('#lifestyleCatButton').click(function(e){
// $(".wrapperblog").hide();
// $(".techWrapperBlog").hide();
// $(".ITWrapperBlog").hide();
// $(".lifestyleWrapperBlog").show();
// $('.lifestyleWrapperBlog').html("");
// $('.SearchB').html(" ");
// $('.techWrapperBlog').html("");


// $('.ITWrapperBlog').html(" ");

//         for(i=0;i<blog.length;i++)
//         {
//             if(blog[i].category=="Lifestyle")
//             {var contentsliced=blog[i].content.slice(0,50);
//             $('.lifestyleWrapperBlog').append('<div class="sub"><h4><small>RECENT POSTS</small></h4><hr><h3>Author: '+blog[i].author+'</h3><br><h3>Category: '+blog[i].category+'</h3><br><h3>Title: '+blog[i].title+'</h3><br><p>'+contentsliced+'</p><br> <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Continue Reading</button><hr></div><br><br>');
//             }
//         }
    


// })



// //ITcatButton onclick

// $('#ITCatButton').click(function(e){
// $(".wrapperblog").hide();
// $(".techWrapperBlog").hide();
// $(".lifestyleWrapperBlog").hide();
// $(".ITWrapperBlog").show();
// $('.ITWrapperBlog').html(" ");
// $('.SearchB').html(" ");
// $('.techWrapperBlog').html("");

// $('.lifestyleWrapperBlog').html("");


//         for(i=0;i<blog.length;i++)
//         {
//             if(blog[i].category=="IT")
//             {var contentsliced=blog[i].content.slice(0,50);
//             $('.ITWrapperBlog').append('<div class="sub"><h4><small>RECENT POSTS</small></h4><hr><h3>Author: '+blog[i].author+'</h3><br><h3>Category: '+blog[i].category+'</h3><br><h3>Title: '+blog[i].title+'</h3><br><p>'+contentsliced+'</p><br> <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Continue Reading</button><hr></div><br><br>');
//             }

//         }
    
// })

// $('#sea').on('keyup',function(e){
//     $(".wrapperblog").hide();
//     $(".techWrapperBlog").hide();
//     $(".lifestyleWrapperBlog").hide();
//     $(".ITWrapperBlog").hide();
//     $(".SearchB").show();
//     $('.techWrapperBlog').html("");
//     $('.SearchB').html(" ");
//     $('.lifestyleWrapperBlog').html("");
//     $('.ITWrapperBlog').html(" ");
//     var title=$('#sea').val();
//     console.log(title);
//             for(i=0;i<blog.length;i++)
//             {
//                 var titles=blog[i].title;
//                 if(titles.includes(title))
//                 {var contentsliced=blog[i].content.slice(0,50);
//                 $('.SearchB').append('<div class="sub"><h4><small>RECENT POSTS</small></h4><hr><h3>Author: '+blog[i].author+'</h3><br><h3>Category: '+blog[i].category+'</h3><br><h3>Title: '+blog[i].title+'</h3><br><p>'+contentsliced+'</p>  <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Continue Reading</button><hr></div><br><br>');
//                 }
    
//             }
        
//     })


  

}
)