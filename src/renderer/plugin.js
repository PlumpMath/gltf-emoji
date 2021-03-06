



function okClick(){
	canvasIds = [];
	var conte
	for(var cb in checkboxCanvasMap){
		if(document.getElementById(cb).checked){
			canvasIds.push(checkboxCanvasMap[cb]);
		}
	}
	var canvasString = ""
	for(var id in canvasIds){
		canvasString += '[' + canvasIds[id] + ']';
	}
	

	window.frames[0].document.body.innerHTML = window.frames[0].document.body.innerHTML + canvasString;
	// document.getElementById("editor1").innerHTML = document.getElementById("editor1").innerHTML + "hello";
	// alert(document.getElementById('cb1').checked);
}

var canvasInit = false;
var canvasIds = [];
var displayDivIdsNum = 0;
var displayCanvasIdsNum = 0;
var displayCanvasCanvasMap = {};
//mapping gltf files to canvas
var map = {
	canvas1: memeSet['duck'],
	canvas2: memeSet['milkTruck'],
	canvas3: memeSet['jackieChan2']
};


var checkboxCanvasMap = {
	cb1:"canvas1",
	cb2:"canvas2",
	cb3:"canvas3"
};
function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;

}

function displayAll(){
	var content = CKEDITOR.instances.editor1.getData();
	content = '<font color="blue">ShrekShao updates at ' + getDateTime() + 
	':</font><br/>' +
	'------------------------------------------------------------------------------'+ 
	'<br/>' +  content
	var curDispCanvasIds = [];
	for(cid in canvasIds){
		var displayCanvasId = "displayCanvas"+displayCanvasIdsNum++;
		displayCanvasCanvasMap[displayCanvasId] = canvasIds[cid];
		//remove dummy
		var subStr = '[' + canvasIds[cid] + ']';
		if(content.includes(subStr)){
			content = content.replace(subStr, "");
			content += '<canvas id="' + displayCanvasId + '" class="canvases" width="360px" height="240px"></canvas>';
			curDispCanvasIds.push(displayCanvasId);
		}		
	}
	// var newDiv = document.createElement("div");
	var newDiv = document.getElementById("divForClone").cloneNode(true);
	var newId = "displayDiv"+displayDivIdsNum++;
	newDiv.id = newId;
	//newDiv.style="height:230px;";
	newDiv.style="";
	// newDiv.innerHTML = content;
	// newDiv.className = "well";

	document.getElementById("display").appendChild(newDiv);
	$("#"+newId).children(".col-md-10")[0].innerHTML = content;
	//$("#"+newId).children(".imgbox-no-float")[0].innerHTML = content;

	for(cid in curDispCanvasIds){
		var canvas = document.getElementById(curDispCanvasIds[cid]);
		canvas.width
		var cfg = map[displayCanvasCanvasMap[curDispCanvasIds[cid]]];
		var text = $('#meme-text')[0].value;
		text = text == "" ? cfg.text : text;
		var meme = new glTFEmojiRenderer.Meme(canvas, cfg.url, text, cfg.params.sceneInfo, cfg.params.textInfo);
		meme.createEmoji();
	}
	window.frames[0].document.body.innerHTML = "";
	canvasIds = [];
}	

function displayAllFirst(){
	var content = "<p>Welcome to glTF 3D Emoji World, my friend!<br>You can submit your comment with glTF Emoji by clicking the green glTF button.<br>You can drag the meme to rotate and use slider to zoom in/out. <br>This is a (static) forum for demo use. <br>Have fun!</p>";
	content = '<font color="blue">ShrekShao updates at ' + getDateTime() + 
	':</font><br/>' +
	'------------------------------------------------------------------------------'+ 
	'<br/>' +  content
	var curDispCanvasIds = [];
	for(cid in canvasIds){
		var displayCanvasId = "displayCanvas"+displayCanvasIdsNum++;
		displayCanvasCanvasMap[displayCanvasId] = canvasIds[cid];
		//remove dummy
		content += '<canvas id="' + displayCanvasId + '" class="canvases" width="360px" height="240px"></canvas>';
		curDispCanvasIds.push(displayCanvasId);
	}
	// var newDiv = document.createElement("div");
	var newDiv = document.getElementById("divForClone").cloneNode(true);
	var newId = "displayDiv"+displayDivIdsNum++;
	newDiv.id = newId;

	newDiv.style="";

	document.getElementById("display").appendChild(newDiv);
	$("#"+newId).children(".col-md-10")[0].innerHTML = content;

	for(cid in curDispCanvasIds){
		var canvas = document.getElementById(curDispCanvasIds[cid]);
		canvas.width
		var cfg = map[displayCanvasCanvasMap[curDispCanvasIds[cid]]];
		var text = $('#meme-text')[0].value;
		text = text == "" ? cfg.text : text;
		var meme = new glTFEmojiRenderer.Meme(canvas, cfg.url, "Duck", cfg.params.sceneInfo, cfg.params.textInfo);
		meme.createEmoji();
	}
	canvasIds = [];
}	

function myOnLoad() {
	CKEDITOR.plugins.add( 'emoji',{
		init: function( editor )
		{
			editor.addCommand( 'popUpDialog', {
				exec : function( editor ){    
					$("#myModal").modal() 
					if(!canvasInit){
						var canvas1 = document.getElementById("canvas1");
						var cfg1 = map.canvas1;
						var meme = new glTFEmojiRenderer.Meme(canvas1, cfg1.url, cfg1.text, cfg1.params.sceneInfo, cfg1.params.textInfo);
						meme.createEmoji();

						var canvas2 = document.getElementById("canvas2");
						var cfg2 = map.canvas2;
						var meme2 = new glTFEmojiRenderer.Meme(canvas2, cfg2.url, cfg2.text, cfg2.params.sceneInfo, cfg2.params.textInfo);
						meme2.createEmoji();

						var canvas3 = document.getElementById("canvas3");
						var cfg3 = map.canvas3;
						var meme3 = new glTFEmojiRenderer.Meme(canvas3, cfg3.url, cfg3.text, cfg3.params.sceneInfo, cfg3.params.textInfo);
						meme3.createEmoji();

						// Modify meme name
						document.getElementById("name1").innerHTML = cfg1.name;
						document.getElementById("name2").innerHTML = cfg2.name;
						document.getElementById("name3").innerHTML = cfg3.name;



						canvasInit = true;
					}		 	
				}
			});
			editor.ui.addButton( 'btnInsert',{
				label: 'Insert a Link',
				command: 'popUpDialog',
				icon: 'gltf_ds4_icon.ico'
			});
		}
	} );

	CKEDITOR.replace( 'editor1',{
		extraPlugins : 'emoji',
		toolbar :
		[
			{ name: 'document', items : [ 'NewPage','Preview' ] },
			{ name: 'clipboard', items : [ 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ] },
			{ name: 'editing', items : [ 'Find','Replace','-','SelectAll','-','Scayt' ] },
			{ name: 'insert', items : [ 'Image','Flash','Table','HorizontalRule','Smiley','btnInsert','SpecialChar','PageBreak'
	                 ,'Iframe' ] },
	                '/',
			{ name: 'styles', items : [ 'Styles','Format' ] },
			{ name: 'basicstyles', items : [ 'Bold','Italic','Strike','-','RemoveFormat' ] },
			{ name: 'paragraph', items : [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote' ] },
			{ name: 'links', items : [ 'Link','Unlink','Anchor' ] },
			{ name: 'tools', items : [ 'Maximize','-','About' ] }
		]
	});

	// var canvas1 = document.getElementById("canvas1");
	// var meme = new glTFEmojiRenderer.Meme(canvas1, "/glTFs/CesiumMan.gltf");
	// meme.createEmoji();

	// var canvas2 = document.getElementById("canvas2");
	// var meme2 = new glTFEmojiRenderer.Meme(canvas2, "/glTFs/CesiumMilkTruck.gltf");
	// meme2.createEmoji();

	// var canvas3 = document.getElementById("canvas3");
	// var meme3 = new glTFEmojiRenderer.Meme(canvas3, "/glTFs/duck/glTF-MaterialsCommon/duck.gltf");
	// meme3.createEmoji();

	canvasIds = ['canvas1'];
	displayAllFirst();
}