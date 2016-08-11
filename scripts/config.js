var base_rest_url;
var test = window.location.href.indexOf("http://qa1")!=-1;
var dev = (window.location.href.indexOf("http://dev1")!=-1 || window.location.href.indexOf("http://localhost")!=-1);
var prod = window.location.href.indexOf("http://prod")!=-1;

function getBaseUrl() {
    if (test) {
        base_rest_url = "http://qa1.whplabs.com:8080"; 
    } else if (prod) {
        base_rest_url = "http://prod1.whplabs.com:8080";
    } else if(dev){
        base_rest_url = "http://dev1.whplabs.com:8080";
        //local or dev
    }
    return base_rest_url;
}