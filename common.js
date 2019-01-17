function getItems(url) { 
							// get data from list
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
    setPageTitle();
  getsiteOwners();
  //for search start
  $('a[href="#btnSiteLevelSearch"]').click(function(){
SearchData(1)
	}); 
  $('a[href="#btnCollectionLevelSearch"]').click(function(){
SearchData(0)
	}); 
  //for search end
  });

function getsiteOwners()
{
getItems("/_api/web/sitegroups/getbyid(4)/Users").then(function(data){

html='';

$.each(data.d.results, function( index, value ) {

if(value.Title!=""&& value.Email!="")
{

html+='<span class="icon-box__subtitle"><i class="fa fa-user">  </i> '+value.Title+' </span> <br/>';

}
});

$("#siteowners").html(html); // Top Footer
$(".footer-siteOwner").append(html.replace("<br/>","")); // bottom footer
})
}

function setPageTitle(){
    // pageTitle1
   
    var x=document.title;

    $("#pageTitle").text(x.substring(x.indexOf('-')+1));
}


