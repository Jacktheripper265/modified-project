$(document).ready(()=>{
  

    var arr=new Array();
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/blogs",
       
        success: function(data, status, xhr){
            console.log('success'+status);
            alert('success'+status);
            arr=JSON.parse(data);
            console.log(arr);
            
        },
        
        error:function(jqXhr, textStatus, errorMessage){
            console.log('error'+errorMessage);
        },
        dataType: "text",
        contentType : "application/json",
        
      });
              

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








})
