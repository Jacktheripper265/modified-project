
$(document).ready(()=>{
       
        

    $('.button1').click(function(){
        console.log('reach');
        $('#home').css('display','none');
        $('#contain1').css('display','block');
        $('#myForm1').css('display','block');
        // $('#myForm').addClass('invisible');
        // $('#myForm1').addClass('visible');
        
        $('footer').addClass('foot2');
    })
    
    $('.button2').click(function(){
        console.log('reach');
        $('#contain1').css('display','none');
        $('#home').css('display','block');
        // $('#myForm').addClass('visible');
        // $('#myForm1').addClass('invisible');
        
        $('footer').removeClass('foot2');
    })  

var user=JSON.parse(sessionStorage.getItem('user'));
  
$('form').submit((a)=>{
  a.preventDefault();

console.log(user[0].name);
  var o = new Object();
var title=$('#title').val();
var content=tinymce.activeEditor.getContent();
var category=$( "#Category option:selected" ).text();
o.author=user[0].name;
  o.title=title;
  o.category=category;
  o.content=content;

  console.log(JSON.stringify(o))
  $.ajax({
      type: "POST",
      url: "http://localhost:3000/blogs",
      data: JSON.stringify(o),
      success: function(data, status, xhr){
          console.log('success'+status);
          alert('success'+status);
          
      },
      
      error:function(jqXhr, textStatus, errorMessage){
          console.log('error'+errorMessage);
      },
      dataType: "text",
      contentType : "application/json",
      
    });
  
  


})


$('.button3').on('click',function(){
    sessionStorage.removeItem('user');
    window.location.replace('login.html');
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

var cate="";
$('.buttonz').on('click',function(){
    var cat=$(this).attr('data-filter');
    cate=cat;
    $('.wrapperblog').html("");
    for(var i=0;i<blog.length;i++)
    {       
      
        
        
        if(cat==blog[i].category)
        {
          

        
            $('.wrapperblog').append('<div class="sub"><h4><small>RECENT POSTS</small></h4><hr><h3>Author: '+blog[i].author+'</h3><br><h3>Category: '+blog[i].category+'</h3><br><h3>Title: '+blog[i].title+'</h3><br><p>'+blog[i].content+'</p><br><button class="but3 btn btn-primary" id='+blog[i].id+'>Continue Reading</button><hr></div><br><br>');
        }
        if(cat=="all")
        {
            $('.wrapperblog').append('<div class="sub"><h4><small>RECENT POSTS</small></h4><hr><h3>Author: '+blog[i].author+'</h3><br><h3>Category: '+blog[i].category+'</h3><br><h3>Title: '+blog[i].title+'</h3><br><p>'+blog[i].content+'</p><br><button class="but3 btn btn-primary" id='+blog[i].id+'>Continue Reading</button><hr></div><br><br>');
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
            
            $('.wrapperblog').append('<div class="sub"><h4><small>RECENT POSTS</small></h4><hr><h3>Author: '+blog[i].author+'</h3><br><h3>Category: '+blog[i].category+'</h3><br><h3>Title: '+blog[i].title+'</h3><br><p>'+blog[i].content+'</p><br><button class="but3 btn btn-primary" id='+blog[i].id+'>Continue Reading</button><hr></div><br><br>');
            }
        }
        if(cate=="all")
        {
            if(blog[i].title.includes(search))
            {
            
            $('.wrapperblog').append('<div class="sub"><h4><small>RECENT POSTS</small></h4><hr><h3>Author: '+blog[i].author+'</h3><br><h3>Category: '+blog[i].category+'</h3><br><h3>Title: '+blog[i].title+'</h3><br><p>'+blog[i].content+'</p><br><button class="but3 btn btn-primary" id='+blog[i].id+'>Continue Reading</button><hr></div><br><br>');
            }
        }
    }


  })



$('body').on('click','.but3',function(){
    var id=$(this).attr('id');
    console.log(id);
    window.location = 'details.html?id=' +id;
  
})



    })






























