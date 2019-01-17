$(document).ready(function() {

    function inputSearch() {

           var link = "";

           $('#search-submit').click(function(event) {

                     event.preventDefault();

                     var queryString = $('#search-input').val();

                     // Make sure this location matches your site structure

                     var location = "/search/Pages/results.aspx?k=" + queryString;

                     link = location;

                     $('#search-input').attr("value", '');

                     window.location.href = link;

                     return;

           });

    }

   // inputSearch();

             

    $('#search-input').keypress(function(event) {
	
           if (event.keyCode === 10 || event.keyCode === 13) {
          event.preventDefault();
                     //$('#search-submit').click();
                     SearchData(1)

           }

    });

});



function SearchData(type){
// event.preventDefault();
 var queryString = $('#search-input').val();
  var location = "";

switch (type) {

    case 0:
       location = "/search/Pages/results.aspx?k=" + queryString;
        break;
    case 1:
       location = _spPageContextInfo.webAbsoluteUrl+"/_layouts/15/osssearchresults.aspx?u="+_spPageContextInfo.webAbsoluteUrl+"&k=" + queryString;

        break;
   
}

 link = location;

                     $('#search-input').attr("value", '');

                     window.location.href = link;

                     return;

}
