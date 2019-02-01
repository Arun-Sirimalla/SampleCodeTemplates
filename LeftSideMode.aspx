<%@ Page language="C#"   Inherits="Microsoft.SharePoint.Publishing.PublishingLayoutPage,Microsoft.SharePoint.Publishing,Version=16.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" meta:progid="SharePoint.WebPartPage.Document" meta:webpartpageexpansion="full" %>
<%@ Register Tagprefix="SharePointWebControls" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="PublishingWebControls" Namespace="Microsoft.SharePoint.Publishing.WebControls" Assembly="Microsoft.SharePoint.Publishing, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="PublishingNavigation" Namespace="Microsoft.SharePoint.Publishing.Navigation" Assembly="Microsoft.SharePoint.Publishing, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceHolderId="PlaceHolderPageTitle" runat="server">
	<SharePointWebControls:ListProperty Property="Title" runat="server"/> - 
	<SharePointWebControls:FieldValue FieldName="Title" runat="server"/>
	
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
<style>
	.customborder{
	border:3px solid #1f425d;
		margin-bottom:10px;
}
#leftColumn a{
	display:block;
}
#leftColumn a:hover {
    background-color: #DDDDDD;
}
	</style>
	<div id="DeltaPlaceHolderMain" class="row">
	<div id="leftColumn" class="col-lg-2 col-md-2 col-sm-2 col-xs-12"  >
		<div class="col-md-12 customborder">
			<PublishingWebControls:RichHtmlField FieldName="f55c4d88-1f2e-4ad9-aaa8-819af4ee7ee8" runat="server"></PublishingWebControls:RichHtmlField>
	    </div>
	</div>
	<div id="rightColumn" class="col-lg-10  col-md-10 col-sm-10 col-xs-12">
		<div class="col-md-12 ">
			<PublishingWebControls:RichHtmlField FieldName="f351da3f-e225-4f09-b74d-922f44e3292c" runat="server"></PublishingWebControls:RichHtmlField>
		</div>
	</div>
</div>

<script>
$(document).ready(function(){

	var textField =$('#leftColumn .ms-rtestate-field').find('p'); 	
   if (textField.length<=0) {
    // do stuff
    $('.customborder').css('border','0px');
    
  } 
});
  
  </script>
</asp:Content>
