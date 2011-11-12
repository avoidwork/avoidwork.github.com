$.on("ready", function(){ $("body")[0].hide(); });
$.on("render",  function(){ $("body")[0].opacity(0).show().fade(1000); });

