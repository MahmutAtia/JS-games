$("h1").css("color", "red");


$("body").keypress(function(event){
console.log(event.key);
$("h1").html("<em>"+event.key.toUpperCase()+"</em>");
});