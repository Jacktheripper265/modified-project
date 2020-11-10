$(document).ready(() => {
  var likes = new Array();
  //////like array
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/likes",

    success: function (data, status, xhr) {
      console.log("success" + status);
      alert("success" + status);
      likes = JSON.parse(data);
      console.log(likes);
    },

    error: function (jqXhr, textStatus, errorMessage) {
      console.log("error" + errorMessage);
    },
    dataType: "text",
    contentType: "application/json",
  });

  /////comment array
  var commentarray = new Array();
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/comments",

    success: function (data, status, xhr) {
      console.log("success" + status);
      alert("success" + status);
      commentarray = JSON.parse(data);
      console.log(commentarray);
    },

    error: function (jqXhr, textStatus, errorMessage) {
      console.log("error" + errorMessage);
    },
    dataType: "text",
    contentType: "application/json",
  });

  var user = JSON.parse(sessionStorage.getItem("user"));

  $("form").submit((a) => {
    a.preventDefault();

    console.log(user[0].name);
    var o = new Object();
    var title = $("#title").val();
    var Bimage = $("#Bimage").val();
    var d = new Date();
    var strDate =
      d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
    var content = tinymce.activeEditor.getContent();
    var category = $("#Category option:selected").text();
    o.author = user[0].name;
    o.title = title;
    o.image = Bimage;
    o.date = strDate;
    o.category = category;
    o.content = content;

    console.log(JSON.stringify(o));
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/blogs",
      data: JSON.stringify(o),
      success: function (data, status, xhr) {
        console.log("success" + status);
        alert("success" + status);
      },

      error: function (jqXhr, textStatus, errorMessage) {
        console.log("error" + errorMessage);
      },
      dataType: "text",
      contentType: "application/json",
    });
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
        <button class="but3 btn btn-primary" id='${data.id}'>Continue Reading</button>
      </div>
    `;
  }

  var cate = "";
  $(".buttonz").on("click", function () {
    var cat = $(this).attr("data-filter");
    cate = cat;
    $(".wrapperblog").html("");
    for (var i = 0; i < blog.length; i++) {
      if (cat == blog[i].category || cat == "all") {
        $(".wrapperblog").append(getBlogCard(blog[i]));

        // $('.wrapperblog').append('<div class="sub"><h3>Title: '+blog[i].title+'</h3><span class="text-muted">Posted on:'+blog[i].date+'</span><br><img class="Bimage" src='+blog[i].image+'><br><button class="but3 btn btn-primary" id='+blog[i].id+'>Continue Reading</button><br><p>'+blog[i].content+'</p><hr></div><br><br>');
      }
      // if(cat=="all")
      // {
      //     $('.wrapperblog').append(getBlogCard(blog[i]));
      //   //  $('.wrapperblog').append('<div class="sub"><h3>Title: '+blog[i].title+'</h3><span class="text-muted">Posted on:'+blog[i].date+'</span><br><img class="Bimage" src='+blog[i].image+'><br><button class="but3 btn btn-primary" id='+blog[i].id+'>Continue Reading</button><br><p>'+blog[i].content+'</p><hr></div><br><br>');
      // }
    }
  });

  $("#sea").on("keyup", () => {
    var search = $("#sea").val();
    $(".wrapperblog").html("");
    for (var i = 0; i < blog.length; i++) {
      if (cate == blog[i].category || cat == "all") {
        if (blog[i].title.includes(search)) {
          $(".wrapperblog").append(getBlogCard(blog[i]));

          //$('.wrapperblog').append('<div class="sub"><h3>Title: '+blog[i].title+'</h3><span class="text-muted">Posted on:'+blog[i].date+'</span><br><img class="Bimage" src='+blog[i].image+'><br><button class="but3 btn btn-primary" id='+blog[i].id+'>Continue Reading</button><br><p>'+blog[i].content+'</p><hr></div><br><br>');
        }
      }
      // if(cate=="all")
      // {
      //     if(blog[i].title.includes(search))
      //     {

      //     $('.wrapperblog').append('<div class="sub"><h3>Title: '+blog[i].title+'</h3><span class="text-muted">Posted on:'+blog[i].date+'</span><br><img class="Bimage" src='+blog[i].image+'><br><button class="but3 btn btn-primary" id='+blog[i].id+'>Continue Reading</button><br><p>'+blog[i].content+'</p><hr></div><br><br>');
      //     }
      // }
    }
  });

  $("body").on("click", ".but3", function () {
    let id = $(this).attr("id");
    console.log(id);
    window.location = "details.html?id=" + id;
  });

  function load1() {
    $(".wrapperblog").html("");

    for (var i = 0; i < blog.length; i++) {
      $(".wrapperblog").append(getBlogCard(blog[i]));
      //$('.wrapperblog').append('<div class="sub"><h3>Title: '+blog[i].title+'</h3><span class="text-muted">Posted on:'+blog[i].date+'</span><br><img class="Bimage" src='+blog[i].image+'><br><button class="but3 btn btn-primary " id='+blog[i].id+'>Continue Reading</button><br><p>'+blog[i].content+'</p><hr></div><br><br>');
    }
  }

  $("body").on("click", ".but9", function () {
    let id = $(this).attr("id");

    for (let i = 0; i < commentarray.length; i++) {
      if (commentarray[i].blogid == id) {
        deleted1(commentarray[i].id);
      }
    }
    for (let i = 0; i < likes.length; i++) {
      if (likes[i].blogid == id) {
        deleted2(likes[i].id);
      }
    }
    deleted3(id);
  });

  function deleted1(id) {
    $.ajax({
      type: "DELETE",
      dataType: "json",
      url: "http://localhost:3000/comments/" + id,

      success: (data) => {
        console.log("deleted");
        alert("deleted comments");
      },
      error: (e) => {
        alert("error comments");
      },
      async: false,
    });
  }

  function deleted2(id) {
    $.ajax({
      type: "DELETE",
      dataType: "json",
      url: "http://localhost:3000/likes/" + id,
      data: { blogid: id },
      success: (data) => {
        console.log("deleted");
        alert("deleted likes");
      },
      error: (e) => {
        alert("error likes");
      },
      async: false,
    });
  }
  function deleted3(id) {
    $.ajax({
      type: "DELETE",
      dataType: "json",
      url: "http://localhost:3000/blogs/" + id,

      success: (data) => {
        console.log("deleted");
        alert("deleted");
      },
      error: (e) => {
        alert("error");
      },
      async: false,
    });
  }

  $(".buttonx").on("click", function () {
    let type = $(this).attr("data-filter");
    if (type == "home") {
      console.log("reach");
      $("#contain1").css("display", "none");
      $("#home").css("display", "block");
      $("#profile").css("display", "none");

      $("footer").removeClass("foot2");
    } else if (type == "profile") {
      console.log("reach");
      $("#profile").html("");
      $("#userblog").html("");
      $("#contain1").css("display", "none");
      $("#home").css("display", "none");
      $("#profile").css("display", "block");

      $("#profile").append(
        '<div  class="container-fluid userdata"><img src="https://bootdey.com/img/Content/user_1.jpg" alt="" class="img-circle userimg"><br><BR><br><label for="Title" class="col-sm-6 control-label text-right">Username :</label><label for="username" class="col-sm-6 control-label text-left">' +
          user[0].name +
          "</label>" +
          '<label for="username" class="col-sm-6 control-label text-right">Email:</label>' +
          '<label for="username" class="col-sm-6 control-label text-left">' +
          user[0].email +
          "</label>" +
          '<br><label for="Title" class="col-sm-6 control-label text-right">Phone no :</label><label for="phoneno" class="col-sm-6 control-label text-left">' +
          user[0].phone +
          "</label></div><br><br>"
      );
      for (let i = 0; i < blog.length; i++) {
        if (user[0].name == blog[i].author) {
          console.log("enter");
          $("#profile").append(
            '<div class="col-sm-12    subblog"><h3>Title: ' +
              blog[i].title +
              '</h3><span class="text-muted">Posted on:' +
              blog[i].date +
              '</span><br><img class="Bimage" src=' +
              blog[i].image +
              "><br><p>" +
              blog[i].content +
              '</p><br><button class="but9 btn btn-primary" id=' +
              blog[i].id +
              ">Delete Blog</button><hr></div><br><br>"
          );
        }
      }
    } else if (type == "create") {
      console.log("reach");
      $("#home").css("display", "none");
      $("#contain1").css("display", "block");
      $("#myForm1").css("display", "block");
      $("#profile").css("display", "none");
      $("footer").addClass("foot2");
    } else if (type == "logout") {
      sessionStorage.removeItem("user");
      window.location.replace("login.html");
    }
  });

  // $('.button4').on('click',function(){
  //     console.log('reach');
  //     $('#profile').html("");
  //     $('#userblog').html("");
  //     $('#contain1').css('display','none');
  //     $('#home').css('display','none');
  //     $('#profile').css('display','block');

  //     $('#profile').append('<div  class="container-fluid userdata"><img src="https://bootdey.com/img/Content/user_1.jpg" alt="" class="img-circle userimg"><br><BR><br><label for="Title" class="col-sm-6 control-label text-right">Username :</label><label for="username" class="col-sm-6 control-label text-left">'+user[0].name+'</label>'+
  //     '<label for="username" class="col-sm-6 control-label text-right">Email</label>'+'<label for="username" class="col-sm-6 control-label text-left">'+user[0].email+'</label>'+
  //     '<br><label for="Title" class="col-sm-6 control-label text-right">Phone no :</label><label for="phoneno" class="col-sm-6 control-label text-left">'+user[0].phone+'</label></div><br><br>');
  //     for(let i=0;i<blog.length;i++)
  //     {
  //         if(user[0].name==blog[i].author)
  //         {
  //             console.log("enter");
  //     $('#profile').append('<div class="col-sm-12    subblog"><h3>Title: '+blog[i].title+'</h3><span class="text-muted">'+blog[i].date+'</span><br><img class="Bimage" src='+blog[i].image+'><br><p>'+blog[i].content+'</p><br><button class="but9 btn btn-primary" id='+blog[i].id+'>Delete Blog</button><hr></div><br><br>');

  // }
  // }
  // })

  // $('.button3').on('click',function(){
  //     sessionStorage.removeItem('user');
  //     window.location.replace('login.html');
  // })

  //     $('.button1').click(function(){
  //         console.log('reach');
  //         $('#home').css('display','none');
  //         $('#contain1').css('display','block');
  //         $('#myForm1').css('display','block');
  //         // $('#myForm').addClass('invisible');
  //         // $('#myForm1').addClass('visible');
  //         $('#profile').css('display','none');

  //         $('footer').addClass('foot2');
  //     })

  //     $('.button2').click(function(){
  //         console.log('reach');
  //         $('#contain1').css('display','none');
  //         $('#home').css('display','block');
  //         // $('#myForm').addClass('visible');
  //         // $('#myForm1').addClass('invisible');
  //         $('#profile').css('display','none');

  //         $('footer').removeClass('foot2');
  //     })
});
