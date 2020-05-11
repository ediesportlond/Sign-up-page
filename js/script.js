function validateEmail(email) {
    var emailReg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/;
    return emailReg.test( email );
};

function validatePassword(){

    let password = $("#password").val();

    let passLength = password.length >= 8;
    
    if(passLength){
        $("#length").animate({fontSize: "12pt"},50);
        $("#length").css("color", "green");
    } else {
        $("#length").animate({fontSize: "10pt"},50);
        $("#length").css("color", "red");
    };

    let passSmallLetters =/[?=a-z]/.test(password);

    if(passSmallLetters){
        $("#lower").animate({fontSize: "12pt"},50);
        $("#lower").css("color", "green");
    } else {
        $("#lower").animate({fontSize: "10pt"},50);
        $("#lower").css("color", "red");
    };

    let passCapital =/[?=A-Z]/.test(password);

    if(passCapital){
        $("#upper").animate({fontSize: "12pt"},50);
        $("#upper").css("color", "green");
    } else {
        $("#upper").animate({fontSize: "10pt"},50);
        $("#upper").css("color", "red");
    };

    let passNumber =/[?=0-9]/.test(password);

    if(passNumber){
        $("#number").animate({fontSize: "12pt"},50);
        $("#number").css("color", "green");
    } else {
        $("#number").animate({fontSize: "10pt"},50);
        $("#number").css("color", "red");
    };

    let passSymbol = /[^?=A-z0-9]/.test(password);
    //These symbols won't work \\^_=[]?`
    //These symbols work ~!@#$%&*()-+{}|:;\"'<>,./

    if(passSymbol){
        $("#symbol").animate({fontSize: "12pt"},50);
        $("#symbol").css("color", "green");
    } else {
        $("#symbol").animate({fontSize: "10pt"},50);
        $("#symbol").css("color", "red");
    };

    var rejectPassword = /password/i.test(password);

    passLength && passSmallLetters && passCapital && passNumber && passSymbol && !rejectPassword ? passwordValid =true : passwordValid = false;

    return passwordValid;
};

var validName = false;
var validEmail= false;
var passwordMatch= false;
var passwordValid=false;

$("input").keyup(function(){
    validatePassword();
});

$("#submit").click(function(event){

    event.preventDefault();
    
    let firstName = $("#firstName").val();
    let lastName = $("#lastName").val();
    let email = $("#email").val();
    let password = $("#password").val();
    let passwordVerify = $("#passwordVerify").val();

    let checkFirst = /^[a-z]+$/i.test(firstName);

    let checkLast = /^[a-z]+$/i.test(lastName);
    
    if(checkFirst){
        if(checkLast){
            validName = true;
            $("#e1").hide();
            $("#e2").hide();
        } else {
            validName = false;
            $("#e2").show();
            $("#e1").hide();
        };
    } else if (checkLast){
        validName = false;
        $("#e1").show();
        $("#e2").hide();
    } else {
        validName = false;
        $("#e1").show();
        $("#e2").show();
    };

    if (validateEmail(email)){
        validEmail = true;
        $("#e3").hide();
    } else {
        validEmail = false;
        $("#e3").show();
    };

    if(password == passwordVerify){
        passwordMatch = true;
        $("#e5").hide();
    } else {
        passwordMatch = false;
        $("#e5").show();
    };

    if (!validatePassword(password)){
        $("#e4").show();
    } else {
        $("#e4").hide();
    }

    var rejectPassword = /password/i.test(password);

    rejectPassword ? $("#e6").show():$("#e6").hide();

    validName && validEmail && passwordMatch && passwordValid ? alert("All requirements have been met!"):null;
});


$("#showPassword").click(function (){
    
    var showPassword = $("#showPassword").is(":checked");
    if(showPassword){
        $("#password").attr("type", "text");
        $("#passwordVerify").attr("type", "text");
    } else {
        $("#password").attr("type", "password");
        $("#passwordVerify").attr("type", "password");     
    };
});

