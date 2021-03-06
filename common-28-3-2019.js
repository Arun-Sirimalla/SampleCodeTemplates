var siteUrl = "https://i82.sharepoint.com/sites/dot/";
function getItems(url) {
    // get data from list
    return $.ajax({
        beforeSend: function () {

        },
        url: siteUrl + url,
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
/*Start Update 28 March*/
function getCurrentItems(url) {
    // get data from list
    return $.ajax({
        beforeSend: function () {

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
/*end Update 28 March*/

$(document).ready(function () {
    //Load Quick Links --
    getQuickLinks();

    //Load Support Links --
    getSupport();


    //Intranet Links  --updated
    /*update 26 march*/
    getIntranetLinks();
    /*update 26 march*/

    //11 feb 2018
    getFooterDescription()
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
        getCurrentListItem(
          function (listItem) {
              var modifiedDate = "";
              var priority = listItem.get_item('Modified');
              //console.log("modified");
              //console.log(priority);
              modifiedDate += '<span>' + datetoISODate(new Date(priority)) + '</span>';
              $("#modifiedDate").html('<h6 class="footer-top__headings">Modified Date</h6><div  class="icon-box__title" style="color: white !important;">' + modifiedDate + '</div>');

          },
          function (sender, args) {
              //console.log(args.get_message());    
          }
       );

    });


    setPageTitle();
    getPageOwners();
    //for search start
    $('a[href="#btnSiteLevelSearch"]').click(function () {
        SearchData(1)
    });
    $('a[href="#btnCollectionLevelSearch"]').click(function () {
        SearchData(0)
    });
    //for search end
});

function getPageOwners() {
/*Start Update 28 March*/
    getCurrentItems("/_api/web/lists/getbytitle('Pages')/items(" + _spPageContextInfo.pageItemId + ")?$select=Owner/Title,*&$expand=Owner").then(function (data) {

        //console.log(data)
        html = '';
        owners = '';

        //$.each(data.d.results, function( index, value ) {
        value = data.d;
        if (value.Owner.Title != "") {

            html += '<span class="icon-box__subtitle"><i class="fa fa-user">  </i> ' + value.Owner.Title + ' </span> <br/>';
            owners += '<a href="#"><i class="fa fa fa-user"></i>' + value.Owner.Title + '</a>';
        }
        //});

        $("#pageowners").html(html); // Top Footer
        //$(".footer-siteOwner").append(html.replace("<br/>","")); // bottom footer
    }, function (err) {
        $("#pageowners").html('<span class="icon-box__subtitle"><i class="fa fa-user">  </i> System Page </span> <br/>');
    })
}


function setPageTitle() {

    console.log("set Page title starts");
    var pageTitle = document.title;
    console.log(pageTitle)
    //var pgtitle=pageTitle.substring(pageTitle.indexOf('-')+1);
    //console.log(pageTitle);
    if (pageTitle.indexOf('Pages -') >= 0) {
        console.log("Pages - hiven and Pages word exist");
        pageTitle = pageTitle.replace("Pages -", "");
        console.log(pageTitle)
        $("#pageTitle").text(pageTitle);	//this to change page title in content
        $("title").text(pageTitle);//this to change page title at the top

    }
    else if (pageTitle.indexOf('Pages') >= 0) {
        console.log("Pages word exist");
        pageTitle = pageTitle.replace("Pages", "");
        $("#pageTitle").text(pageTitle);// page title in content
        $("title").text(pageTitle);// page title at the top

    }
    else {
        console.log("nothing exist");
        $("#pageTitle").text(pageTitle);//page title in content
        $("title").text(pageTitle);// page title at the top

    }
}


//Get Quick Links
function getQuickLinks() {
    getItems("/_api/web/lists/getbytitle('Resources')/items?$select=Title,Link").then(function (data) {

        var quickLinkHtml = "";
        $.each(data.d.results, function (i, value) {
            if (value.Link) {
                quickLinkHtml += '<li><a href="' + value.Link.Url + '">' + value.Title + '</a></li>'
            }
        });
        $("#quickLinks").html(quickLinkHtml);
    });
}


// Get Support  
function getSupport() {
    getItems("/_api/web/lists/getbytitle('Support')/items?$select=Title,Link").then(function (data) {

        var SupportHtml = "";
        $.each(data.d.results, function (i, value) {
            if (value.Link) {
                SupportHtml += '<li><a href="' + value.Link.Url + '">' + value.Title + '</a></li>'
            }
        });
        $("#Support").html(SupportHtml);
    });
}

// INtranet Links -- updated
function getIntranetLinks() {
    getItems("/_api/web/lists/getbytitle('Division SharePoint Sites')/items?$select=*,FileRef/FileRef,Link").then(function (data) {

        var imagehtml = "";
        var count = 0;
        $.each(data.d.results, function (i, value) {
            if (count % 3 == 0) {
                imagehtml += '<div class="row">';
            }
            var url = "#";
            if (value.Link) {
                url = value.Link.Url;
            }
            count++;
            imagehtml += '<div class="col-lg-4 col-xs-4 col-sm-4 intranetimg">' + // Updated
			'<a href="' + url + '"><img src="' + value.FileRef + '" class="img-circle" alt="Cinque Terre" style="height: 80px;width: 80px;"></a></div>';
            if (count % 3 == 0) { imagehtml += '</div>'; }

        });
        $("#intranetLinks").html(imagehtml);

    });
}

// Get Footer Description
function getFooterDescription() {
    getItems("/_api/web/lists/getbytitle('Footer Description')/items?$select=Description").then(function (data) {

        var Description = "";
        $.each(data.d.results, function (i, value) {
            Description = value.Description;

        });
        $("#footerdesc").html(Description);
    });
}

/*Start Get page last date modified*/
function datetoISODate(dateObj) {
    return (dateObj.getMonth() + 1) + "/" + dateObj.getDate() + "/" + dateObj.getFullYear();
    alert('test');
}
function getCurrentListItem(success, error) {
    var context = SP.ClientContext.get_current();
    var web = context.get_web();
    var currentList = web.get_lists().getById(_spPageContextInfo.pageListId);
    var currentListItem = currentList.getItemById(_spPageContextInfo.pageItemId);
    context.load(currentListItem);
    context.executeQueryAsync(
      function () {
          success(currentListItem);
      },
      error
    );
}
/*End  Get page last date modified*/


