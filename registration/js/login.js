$(document).ready(() => {
  var arr = new Array();

  $.ajax({
    type: "GET",
    url: "http://localhost:3000/users",

    success: function (data, status, xhr) {
      // console.log('success'+status);
      // alert('success'+status);
      arr = JSON.parse(data);
      console.log(arr);
    },

    error: function (jqXhr, textStatus, errorMessage) {
      console.log("error" + errorMessage);
    },
    dataType: "text",
    contentType: "application/json",
  });

  $("footer").load("footer.html ", function () {});

  //password checking
  $("#pass,#cpass").on("keyup", function () {
    if ($("#pass").val() === $("#cpass").val()) {
      $("#out").html("Matching");
      $("#out").css("color", "green");
      $("#but").removeAttr("disabled");
    } else {
      $("#out").html("Not Matching");
      $("#out").css("color", "red");
      $("#but").attr("disabled", "true");
    }
  });

  $("#but,.gen").on("click", function () {
    var radio = $(".gen");
    var flag = 0;
    for (var i = 0; i < radio.length; i++) {
      if (radio[i].checked == true) {
        flag = 1;
        $("#but").removeAttr("disabled");
        break;
      }
    }
    if (flag == 0) {
      $("#but").attr("disabled", "true");
      alert("Choose Your Gender");
    }
  });

  $("#myForm").submit((a) => {
    a.preventDefault();
    let name = $("#name").val();
    let email = $("#email").val();
    let password = $("#pass").val();
    // let cpassword=$('#cpass').val();
    // let dob=$('#dat').val();
    let phone = $("#phone").val();
    let gender = $('input[name="gender"]:checked').val();

    var user = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      gender: gender,
    };

    $.ajax({
      type: "POST",
      url: "http://localhost:3000/users",
      data: JSON.stringify(user),
      success: function (data, status, xhr) {
        // console.log('success'+status);
        // alert('success'+status);
      },

      error: function (jqXhr, textStatus, errorMessage) {
        console.log("error" + errorMessage);
      },
      dataType: "text",
      contentType: "application/json",
    });
  });

  $(".buttonx").on("click", function () {
    let type = $(this).attr("data-filter");
    if (type == "home") {
     
      console.log("reach");
      $("#myForm1").css("display", "none");
      $("#myForm").css("display", "none");
      $("#contain1").css("display", "none");
      $("#home").css("display", "block");
      $("#myModal").attr("display", "block");
      $("footer").removeClass("foot2");
    } else if (type == "login") {
      console.log("reach");
      $("#home").css("display", "none");
      $("#contain1").css("display", "block");
      $("#myForm").css("display", "none");
      $("#myForm1").css("display", "block");
      $("footer").addClass("foot2");
    } else if (type == "register") {
      console.log("reach");
      $("#home").css("display", "none");
      $("#contain1").css("display", "block");
      $("#myForm1").css("display", "none");
      $("#myForm").css("display", "block");
      $("footer").removeClass("foot2");
    }
  });

  // $('.button1').click(function(){
  //     console.log('reach');
  //     $('#home').css('display','none');
  //     $('#contain1').css('display','block');
  //     $('#myForm').css('display','none');
  //     $('#myForm1').css('display','block');
  //     $('footer').addClass('foot2');
  // })

  // $('.button2').click(function(){
  //     console.log('reach');
  //     $('#home').css('display','none');
  //     $('#contain1').css('display','block');
  //     $('#myForm1').css('display','none');
  //     $('#myForm').css('display','block');
  //     $('footer').removeClass('foot2');
  // })

  // $('.button3').click(function(){
  //     console.log('reach');
  //     $('#myForm1').css('display','none');
  //     $('#myForm').css('display','none');
  //     $('#contain1').css('display','none');
  //     $('#home').css('display','block');
  //     $('#myModal').attr('display','block');
  //     $('footer').removeClass('foot2');
  // })

  $("#myForm1").submit((a) => {
    a.preventDefault();
    let email = $("#email1").val();

    let password = $("#pass1").val();

    if ((email == "" && password == "") || email == "" || password == "") {
      alert("name and password is incorrect");
    } else {
      $.ajax({
        type: "GET",
        url: "http://localhost:3000/users",
        data: { email: email, password: password },
        success: function (data, status, xhr) {
          console.log(data);
          alert(data);
          if (data !== "[]") {
            sessionStorage.setItem("user", data);
            window.location.replace("editor2.html");
          } else {
            $(".text-muted").html("Wrong Email Id or Password");
            $(".text-muted").css("color", "red");
            alert("error");
          }
        },

        error: function (jqXhr, textStatus, errorMessage) {
          console.log("error" + errorMessage);
        },
        dataType: "text",
        contentType: "application/json",
      });
    }
  });

  $("#email").on("keyup", function () {
    var email = $("#email").val();
    console.log(email);
    var flag = 0;
    for (var i = 0; i < arr.length; i++) {
      if (email == arr[i].email) {
        $("#inval").html("Already registered user");
        $("#inval").css("color", "red");
        $("#but").attr("disabled", "true");
        flag = 1;
        break;
      }
    }
    if (flag == 0) {
      $("#but").removeAttr("disabled");
      $("#inval").html("Ready to go");
      $("#inval").css("color", "green");
    }
    if (email == "") {
      $("#but").attr("disabled", "true");
      $("#inval").html("enter your email");
      $("#inval").css("color", "red");
    }
  });

  var blog = new Array();
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "http://localhost:3000/blogs",

    success: (data) => {
      console.log(data);
      blog = data;

      load1();
    },
    error: (e) => {
      alert("error");
    },
  });
  function getBlogCard(data) {
    return `
      <div class="sub">
        <img class="Bimage" src='${data.image}'>
        <h3>${data.title}</h3>
        <div class="innersub">${data.content}</div>
        <span class="text-muted datespan">Posted on ${data.date}</span>
        <button type="button" class="btn btn-info btn-lg mbutton" data-toggle="modal" data-target="#myModal">Continue Reading</button>
      </div>
    `;
  }

  var cate;

  $(".buttonz").on("click", function () {
    let cat = $(this).attr("data-filter");
    cate = cat;

    $(".wrapperblog").html("");

    for (var i = 0; i < blog.length; i++) {
      if (cat == blog[i].category || cat == "all") {
        $(".wrapperblog").append(getBlogCard(blog[i]));
        //$('.wrapperblog').append('<div class="sub"><h3>Title: '+blog[i].title+'</h3><span class="text-muted">Posted on:'+blog[i].date+'</span><br><img class="Bimage" src='+blog[i].image+'><br> <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Continue Reading</button><br><p>'+blog[i].content+'</p><hr></div><br><br>');
      }
      // if(cat=="all")
      // {

      //     $('.wrapperblog').append('<div class="sub"><h3>Title: '+blog[i].title+'</h3><span class="text-muted">Posted on:'+blog[i].date+'</span><br><img class="Bimage" src='+blog[i].image+'><br> <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Continue Reading</button><br><p>'+blog[i].content+'</p><hr></div><br><br>');

      // }
    }
  });

  $("#sea").on("keyup", () => {
    let search = $("#sea").val();
    $(".wrapperblog").html("");
    for (var i = 0; i < blog.length; i++) {
      if (cate == blog[i].category || cat == "all") {
        if (blog[i].title.includes(search)) {
          $(".wrapperblog").append(getBlogCard(blog[i]));
          // $('.wrapperblog').append('<div class="sub"><h3>Title: '+blog[i].title+'</h3><span class="text-muted">Posted on:'+blog[i].date+'</span><br><img class="Bimage" src='+blog[i].image+'><br> <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Continue Reading</button><br><p>'+blog[i].content+'</p><hr></div><br><br>');
        }
      }
      // if(cate=="all")
      // {
      //     if(blog[i].title.includes(search))
      //     {

      //     $('.wrapperblog').append('<div class="sub"><h3>Title: '+blog[i].title+'</h3><span class="text-muted">Posted on:'+blog[i].date+'</span><br><img class="Bimage" src='+blog[i].image+'><br> <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Continue Reading</button><br><p>'+blog[i].content+'</p><hr></div><br><br>');
      //     }
    }
  });

  // $(".butz").on("click", function () {
  //   $("#home").css("display", "none");
  //   $("#contain1").css("display", "block");
  //   $("#myForm").css("display", "none");
  //   $("#myForm1").css("display", "block");
  // });

  function load1() {
    $(".wrapperblog").html("");
    for (var i = 0; i < blog.length; i++) {
      $(".wrapperblog").append(getBlogCard(blog[i]));
      //$('.wrapperblog').append('<div class="sub"><h3>Title: '+blog[i].title+'</h3><span class="text-muted">Posted on:'+blog[i].date+'</span><br><img class="Bimage" src='+blog[i].image+'><br> <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Continue Reading</button><br><p>'+blog[i].content+'</p><hr></div><br><br>');
    }
  }
});
