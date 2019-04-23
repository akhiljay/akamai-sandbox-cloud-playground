$(document).ready(function() {
    //connectors between cards -- does not work as of now
  //  jQuery('#urls_selector').connections({ to: '#cdn_selector' });
    //jQuery('#cdn_selector').connections({ to: '#slack_selector' });
    //jQuery('#slack_selector').connections({ to: '#submit_selector' });
    //var arr_text_method;
    $('.ui.dropdown').dropdown();

//here is the code that is called when someone clicks on RUN under index.ejs
      $(document).on('touchstart click', '#startsand', function() {
        $('.apiresponse-js').empty();
        //grabbing all the input from UI
      var arr_text_apiinput = $('#domain').val();
        /*  var arr_text_apiheaders = $('#api-headers').val().split("\n");
        var arr_text_apivalues = $('#api-values').val().split("\n");
        var arr_text_slackendpoint = $('#slack-url').val();
        var arr_text_postBody = $('#postBody').val();
        var arr_text_headerlength = $('#api-headers').val().length;
        var arr_text_method = $('#methoddrop').dropdown('get value');
        console.log(arr_text_apiinput);
        console.log(arr_text_apiheaders);
        console.log(arr_text_apivalues);
        console.log(arr_text_method);
        var body_data = arr_text_apiinput.replace(/\n/g,"");
        var body_data1 = '{"apiendpoint":"' + body_data + '","apiheaders":"' + arr_text_apiheaders + '","apivalues":"' + arr_text_apivalues + '","slackwebhook":"' + arr_text_slackendpoint + '","apimethod":"' + arr_text_method +'","postBody":"'+ arr_text_postBody + '","headerlngth":"'+arr_text_headerlength+'"}';
        console.log(body_data1);
        */
       var xhrdata = '{"domain":"'+arr_text_apiinput + '"}';
       console.log(xhrdata);
        $.ajax({
            url: "/start",
            type: 'POST',
            data: xhrdata,
            contentType: "application/json",
            success: function(response, status, xhr) { 
                console.log("POST XHR request was a success");
                var respjson = JSON.parse(xhr.responseText);
                addAPIResponse(respjson);
            },
            error: function(xhr, status, error) {

                console.log("Recieved an error while executing POST XHR request");
              
            },
            complete: function (xhr, status) {
     
                console.log("complete callback sent");
              
            }
          });
      });

      $(document).on('touchstart click', '#stopsand', function() {
        $('.apiresponse-js').empty();
        //grabbing all the input from UI
      /*  var arr_text_apiinput = $('#apiendpoint').val();
        var arr_text_apiheaders = $('#api-headers').val().split("\n");
        var arr_text_apivalues = $('#api-values').val().split("\n");
        var arr_text_slackendpoint = $('#slack-url').val();
        var arr_text_postBody = $('#postBody').val();
        var arr_text_headerlength = $('#api-headers').val().length;
        var arr_text_method = $('#methoddrop').dropdown('get value');
        console.log(arr_text_apiinput);
        console.log(arr_text_apiheaders);
        console.log(arr_text_apivalues);
        console.log(arr_text_method);
        var body_data = arr_text_apiinput.replace(/\n/g,"");
        var body_data1 = '{"apiendpoint":"' + body_data + '","apiheaders":"' + arr_text_apiheaders + '","apivalues":"' + arr_text_apivalues + '","slackwebhook":"' + arr_text_slackendpoint + '","apimethod":"' + arr_text_method +'","postBody":"'+ arr_text_postBody + '","headerlngth":"'+arr_text_headerlength+'"}';
        console.log(body_data1);
        */
        $.ajax({
            url: "/stop",
            type: 'GET',
            success: function(response, status, xhr) { 
                console.log("GET XHR request was a success");
                var respjson = JSON.parse(xhr.responseText);
                addAPIResponse(respjson);
            },
            error: function(xhr, status, error) {

                console.log("Recieved an error while executing POST XHR request");
              
            },
            complete: function (xhr, status) {
     
                console.log("complete callback sent");
              
            }
          });
      });

});

function addAPIResponse(obj_resp){
    console.log("called-editing app");

    var loadresponse_payload = '<pre style="font-size: 1.0rem; background-color: white">' + JSON.stringify(obj_resp, null, 2) + '</pre>';
    $('.apiresponse-js').empty();
    $('.apiresponse-js').append(loadresponse_payload);
}


