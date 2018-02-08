

onmessage = function(e) {
    //console.log(' --> sww Message received from main script =',e.data,e.data.headers.headers);
    var url=e.data.url;
    var xhr = new XMLHttpRequest();
  //  console.log(' --> sww Message xwhr',xhr);

    xhr.onreadystatechange = function()    {
      //  console.log(' --> sww readystage');
        if (xhr.readyState === XMLHttpRequest.DONE) {
        //    console.log(' --> sww readystage st=',xhr.status);
            if (xhr.status === 200) {
                postMessage({reqId:e.data.reqId,url:url,success:true,result:JSON.parse(xhr.responseText)});
            } else {
                postMessage({reqId:e.data.reqId,url:url,success:false});
            }
        }
    };
//    console.log(' --> sww Message xwhr2',xhr);
    xhr.open("GET", url, true);
    for(var i=0;i<e.data.headers.headers.length;++i){
        var h=e.data.headers.headers[i]
        console.log(" --> swwx header",h,h.title,h.value)
        xhr.setRequestHeader(h.title, h.value)
    }

    xhr.send();



}