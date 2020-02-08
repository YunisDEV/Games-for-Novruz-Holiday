var gci1 = document.querySelector("#st img");
var gci2 = document.querySelector("#nd img");
var gci3 = document.querySelector("#rd img");
const hover=(obj)=>{
    var id = obj.getAttribute("id");
    console.log("a");
    switch(id){
        case "st":
            gci1.style.opacity = "1";
            gci2.style.opacity = "0.6";
            gci3.style.opacity = "0.6";
            break;
        case "nd":
            gci1.style.opacity = "0.6";
            gci2.style.opacity = "1";
            gci3.style.opacity = "0.6";
            break;
        case "rd":
            gci1.style.opacity = "0.6";
            gci2.style.opacity = "0.6";
            gci3.style.opacity = "1";
            break;
        default:
            gci1.style.opacity = "0.6";
            gci2.style.opacity = "0.6";
            gci3.style.opacity = "0.6";     
    }
}