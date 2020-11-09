$(document).ready(()=>{
    $('.b').click(function(){
        var col=$(this).attr('data-filter');
        console.log(col);
        $(".b").not(this).css("background-color","grey");
        $(this).css("background-color","green");
        if(col=='all')
        {
            $('.filter').show();
           
        }
        else{
            $('.filter').filter("."+col).show();
            $('.filter').not("."+col).hide();
        }
    })
})