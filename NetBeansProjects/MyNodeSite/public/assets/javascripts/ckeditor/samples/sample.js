(function(){CKEDITOR.on("instanceReady",function(ev){var editor=ev.editor,meta=CKEDITOR.document.$.getElementsByName("ckeditor-sample-required-plugins"),requires=meta.length?CKEDITOR.dom.element.get(meta[0]).getAttribute("content").split(","):[],missing=[];if(requires.length){for(var i=0;i<requires.length;i++){if(!editor.plugins[requires[i]]){missing.push("<code>"+requires[i]+"</code>")}}if(missing.length){var warn=CKEDITOR.dom.element.createFromHtml('<div class="warning"><span>To fully experience this demo, the '+missing.join(", ")+" plugin"+(missing.length>1?"s are":" is")+" required.</span></div>");warn.insertBefore(editor.container)}}})})();