function retrieveEventsListItems() {
debugger;
    var clientContext = SP.ClientContext.get_current();;
    var oList = clientContext.get_web().get_lists().getByTitle('events');

    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml('<View><Query><OrderBy><FieldRef Name="Created" Ascending="false"></FieldRef></OrderBy></Query><RowLimit>3</RowLimit></View>');
    this.collEventsListItem = oList.getItems(camlQuery);

    clientContext.load(collEventsListItem);

    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceededEvents), Function.createDelegate(this, this.onQueryFailed));

}

function onQuerySucceededEvents(sender, args) {
debugger;
    var listItemInfo = '';

    var listItemEnumerator = collEventsListItem.getEnumerator();

    while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        listItemInfo +='<li item="'+ oListItem.get_id() +'">'
                            +'<div  class="float-right">'+oListItem.get_item('Title') +'</div>'
                            +'<p>'+oListItem.get_item('description')+'</p>'
                        +'</li>';

    }
    $('#timeline').html(listItemInfo);
}
/*Start RSS*/
function retrieveRSSListItems() {

    var clientContext = SP.ClientContext.get_current();;
    var oList = clientContext.get_web().get_lists().getByTitle('RSS Feed');

    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml('<View><Query><OrderBy><FieldRef Name="Created" Ascending="false"></FieldRef></OrderBy></Query><RowLimit>3</RowLimit></View>');
    this.collRSSListItem = oList.getItems(camlQuery);

    clientContext.load(collRSSListItem);

    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceededRSS), Function.createDelegate(this, this.onQueryFailed));

}

function onQuerySucceededRSS(sender, args) {

    var listItemInfo = '';

    var listItemEnumerator = collRSSListItem.getEnumerator();

    while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        listItemInfo +='<li item="'+ oListItem.get_id() +'">'
                            +'<div  class="rss-title">'+oListItem.get_item('Title') +'</div>'
                            +'<p>'+oListItem.get_item('description')+'</p>'
                        +'</li>';
                        
                                                       
    }
    $('#rss ul').html(listItemInfo);
}

/*end RSS*/
/*Start News*/
function retrievenewsListItems() {

    var clientContext = SP.ClientContext.get_current();;
    var oList = clientContext.get_web().get_lists().getByTitle('news');

    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml('<View><Query><OrderBy><FieldRef Name="Created" Ascending="false"></FieldRef></OrderBy></Query><RowLimit>4</RowLimit></View>');
    this.collnewsListItem = oList.getItems(camlQuery);

    clientContext.load(collnewsListItem);

    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceedednews), Function.createDelegate(this, this.onQueryFailed));

}

function onQuerySucceedednews(sender, args) {

    var listItemInfo = '';

    var listItemEnumerator = collnewsListItem.getEnumerator();

    while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        listItemInfo +='<div class="col-md-3 HomeNews" item="'+ oListItem.get_id() +'">'
                            +'<div class="rss-title">'+oListItem.get_item('Title') +'</div>'
                            +'<p>'+oListItem.get_item('description')+'</p>'
                        +'</div>';

    }
    $('#news').html(listItemInfo);
}
/*End News*/
/**/
function retrieveInfoLinksListItems() {

    var clientContext = SP.ClientContext.get_current();;
    var oList = clientContext.get_web().get_lists().getByTitle('company Info Links');

    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml('<View><Query><OrderBy><FieldRef Name="Created" Ascending="false"></FieldRef></OrderBy></Query><RowLimit>3</RowLimit></View>');
    this.collInfoLinksListItem = oList.getItems(camlQuery);

    clientContext.load(collInfoLinksListItem);

    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceededInfoLinks), Function.createDelegate(this, this.onQueryFailed));

}

function onQuerySucceededInfoLinks(sender, args) {

    var listItemInfo = '';

    var listItemEnumerator = collInfoLinksListItem.getEnumerator();

    while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        listItemInfo +='<li item="'+ oListItem.get_id() +'">'
                            +'<a href="'+oListItem.get_item('URL')+'" >'+oListItem.get_item('Title') +'</div>'
                        +'</li>';

    }
    //$('#InfoLinks').html(listItemInfo);
}
/**/
function onQueryFailed(sender, args) {

    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}
$(document).ready(function () {

    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
        retrieveEventsListItems();
        retrieveRSSListItems();
        retrievenewsListItems();
        
    });
 })
