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
//Load Quick Links ---- Updated
getQuickLinks();

//Intranet Links  --updated
getIntranetLinks();

    setPageTitle();
  getPageOwners();
  //for search start
  $('a[href="#btnSiteLevelSearch"]').click(function(){
SearchData(1)
	}); 
  $('a[href="#btnCollectionLevelSearch"]').click(function(){
SearchData(0)
	}); 
  //for search end
  });
function getPageOwners()
{
getItems("/_api/web/lists/getbytitle('Pages')/items("+_spPageContextInfo.pageItemId+")?$select=Owner/Title,*&$expand=Owner").then(function(data){

console.log(data)
html='';
owners='';

//$.each(data.d.results, function( index, value ) {
value=data.d;
if(value.Owner.Title!="")
{

html+='<span class="icon-box__subtitle"><i class="fa fa-user">  </i> '+value.Owner.Title+' </span> <br/>';
owners+='<a href="#"><i class="fa fa fa-user"></i>'+value.Owner.Title+'</a>';
}
//});

$("#pageowners").html(html); // Top Footer
//$(".footer-siteOwner").append(html.replace("<br/>","")); // bottom footer
}, function(err) { 
$("#pageownersdiv").hide();
})
}


function setPageTitle(){
    // pageTitle
    var x=document.title;
    $("#pageTitle").text(x.substring(x.indexOf('-')+1));
}
// Get Quick Links -- Updated
function getQuickLinks()
{
getItems("/_api/web/lists/getbytitle('Quick%20Links')/items?$select=Title,Link").then(function(data){

var quickLinkHtml="";
		$.each(data.d.results,function(i,value)
		{
		quickLinkHtml+='<li><a href="'+value.Link.Url+'">'+value.Title+'</a></li>'
			
		});
		$("#quickLinks").html(quickLinkHtml);
});
}

// INtranet Links -- Updated
function getIntranetLinks()
{
getItems("/_api/web/lists/getbytitle('Intranet%20Sites')/items?$select=*,FileRef/FileRef,Link").then(function(data){

 var imagehtml="";
 		$.each(data.d.results,function(i,value){
			imagehtml+= '<div class="col-lg-3 col-xs-3 col-sm-3">'+
			'<a href="'+value.Link.Url+'"><img src="'+value.FileRef+'" class="img-circle" alt="Cinque Terre" style="height: 80px;width: 80px;"></a></div>';
		 });
		 $("#intranetLinks").html(imagehtml);

});
}

