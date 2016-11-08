//utility
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

$(function () {
    $("#step1_generate").click(function () {
        var tpl = "{0}?client_id={1}&redirect_uri={2}&scope={3}&response_type=code&state=12345";

        var code_endpoint = $("#code_endpoint").val();
        var app_id = $("#auth_app_id").val();
        var redirect_uri = $("#redirect_uri1").val();
        var scope = $("#auth_scope").val();

        if(!code_endpoint || !app_id || !redirect_uri || !scope) {
            alert("all fields must not be empty");
            return false;
        }

        var result = tpl.format(code_endpoint, app_id, redirect_uri, scope);
        
        $("#stepend1").empty();

        $("<textarea></textarea>")
        .attr("wrap", "soft")
        .attr("cols", "50")
        .attr("rows", "8")
        .val(encodeURI(result))
        .appendTo($("#stepend1"));

        $("<br><br><a class='btn btn-primary pull-right' target='_blank'>Authorize</a>")
        .attr("href", encodeURI(result))
        .appendTo($("#stepend1"));
    });

    $("#step2_exchange").click(function () {

        var token_endpoint = $("#token_endpoint").val();
        var code = $("#auth_code").val();
        var app_id = $("#token_app_id").val();
        var app_secret = $("#token_app_secret").val();
        var grant_type = $("#grant_type").val();
        var redirect_uri = $("#redirect_uri2").val();
        var scope = $("#token_scope").val();

        if(!token_endpoint || !code || !app_id || !app_secret || !redirect_uri || !scope) {
            alert("all fields must not be empty");
            return false;
        }

        $("#token_form").attr("action", token_endpoint).submit();
    });
});
