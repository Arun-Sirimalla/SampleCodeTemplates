function getItems(url) { 
		debugger;					// get data from list
    return $.ajax({
		beforeSend: function() {

		},
        url: _spPageContextInfo.webAbsoluteUrl + url,
        type: "GET",
		async: false,
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data) {
        },
        error: function (error) {
            console.log(JSON.stringify(error));
        }
    });

}
$( document ).ready(function() {  
debugger;	
setPageTitle();
 debugger;	
  getsiteOwners();
  });

function getsiteOwners()
{
getItems("/_api/web/lists/getbytitle('Pages')/items("+_spPageContextInfo.pageItemId+")?$select=Author/Title,*&$expand=Author").then(function(data){
debugger;	
html='';
owners='';

//$.each(data.d.results, function( index, value ) {
value=data.d;
if(value.Author.Title!="")
{

html+='<span class="icon-box__subtitle"><i class="fa fa-user">  </i> '+value.Author.Title+' </span> <br/>';
owners+='<a href="#"><i class="fa fa fa-user"></i>'+value.Author.Title+'</a>';
}
//});

$("#siteowners").html(html); // Top Footer
$(".footer-siteOwner").append(html.replace("<br/>","")); // bottom footer
})
}


function setPageTitle(){
    // pageTitle
var title="";    
var tempTitle = document.title;
var format =/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
if(tempTitle.match(format) )
{
var title = tempTitle.substring(0, tempTitle.indexOf('-'));
}
else
{
title=tempTitle;
}
$("#pageTitle").text(title);
}
