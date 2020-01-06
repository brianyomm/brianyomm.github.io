var prevPosition,touchStartPosition,touchEndPosition,targetAngleCoef,InputControls=pc.createScript("InputControls"),mouseDown=!1,touchDown=!1,pressedRotationArrow=-1,rotationArrowMaxSpeed=8,currAngleDiff=0,inputPositionCoef=1,prevTime=0,ActiveControls={},canRotate=!0,canMove=!0,cancelClick=!1;InputControls.prototype.initialize=function(){ActiveControls.Mouse=!1,ActiveControls.Touch=!1,ActiveControls.Keyboard=!1,this.InitalizeMouse(),this.InitalizeKeyboard(),this.InitalizeTouch()},InputControls.prototype.InitalizeMouse=function(){this.app.mouse&&(console.log("initalize mouse"),ActiveControls.Mouse=!0,this.app.mouse.disableContextMenu(),this.app.mouse.on(pc.EVENT_MOUSEMOVE,this.MouseMove,this),this.app.mouse.on(pc.EVENT_MOUSEDOWN,this.MouseDown,this),this.app.mouse.on(pc.EVENT_MOUSEUP,this.MouseUp,this))},InputControls.prototype.InitalizeKeyboard=function(){this.app.keyboard&&(console.log("initalize keyboard"),ActiveControls.Keyboard=!0,this.app.keyboard.on(pc.EVENT_KEYDOWN,this.KeyDown,this),this.app.keyboard.on(pc.EVENT_KEYUP,this.KeyUp,this))},InputControls.prototype.InitalizeTouch=function(){this.app.touch&&(console.log("initalize touch"),ActiveControls.Touch=!0,this.app.touch.on(pc.EVENT_TOUCHSTART,InputControls.prototype.TouchStart,this),this.app.touch.on(pc.EVENT_TOUCHMOVE,InputControls.prototype.TouchMove,this),this.app.touch.on(pc.EVENT_TOUCHEND,InputControls.prototype.TouchEnd,this),this.app.touch.on(pc.EVENT_TOUCHCANCEL,InputControls.prototype.TouchCancel,this))},InputControls.prototype.update=function(o){isUIOpen=ProductDialogue.isOpen||BagDialogue.isOpen||BookAppointment.isOpen||MenuDropdown.isOpen||VideoHotSpotController.isOpen,this.app.mouse&&(mouseDown=this.app.mouse.isPressed(0)),this.app.mouse&&!ActiveControls.Mouse&&this.InitalizeMouse(),this.app.touch&&!ActiveControls.Touch&&this.InitalizeTouch(),this.app.keyboard&&!ActiveControls.Keyboard&&this.InitalizeKeyboard()},InputControls.prototype.MouseMove=function(o){if(!cancelClick&&mouseDown){var t={x:o.x*inputPositionCoef,y:o.y*inputPositionCoef};this.OnMove(t),prevPosition=t}},InputControls.prototype.MouseDown=function(o){if(InputControls.prototype.isUiElement(o))cancelClick=!0;else if(o.button===pc.MOUSEBUTTON_LEFT){var t={x:o.x*inputPositionCoef,y:o.y*inputPositionCoef};touchStartPosition=t.x,prevPosition=t,this.OnDown(t)}},InputControls.prototype.MouseUp=function(o){if(cancelClick)cancelClick=!1;else if(mouseDown){var t={x:o.x*inputPositionCoef,y:o.y*inputPositionCoef};this.OnUp(t),prevPosition=t,SetAfterCameraRotationValues()}},InputControls.prototype.TouchStart=function(o){if(InputControls.prototype.isUiElement(o))cancelClick=!0;else if(1===o.touches.length){var t={x:o.touches[0].x*inputPositionCoef,y:o.touches[0].y*inputPositionCoef};touchStartPosition=t.x,prevPosition=t,this.OnDown(t),touchDown=1==o.touches.length}},InputControls.prototype.TouchMove=function(o){if(!cancelClick&&touchDown){var t={x:o.touches[0].x*inputPositionCoef,y:o.touches[0].y*inputPositionCoef};this.OnMove(t),prevPosition=t}},InputControls.prototype.TouchEnd=function(o){if(cancelClick)cancelClick=!1;else if(touchDown){var t=prevPosition;this.OnUp(t),touchDown=!1}},InputControls.prototype.TouchCancel=function(o){if(touchDown){var t=prevPosition;this.OnUp(t),touchDown=!1}},InputControls.prototype.KeyDown=function(o){o.key===pc.KEY_UP&&canMove?CheckPointSwitchByDirection(GetCameraRotation().y):o.key===pc.KEY_DOWN&&canMove&&CheckPointSwitchByDirection(GetCameraRotation().y+180),o.key===pc.KEY_LEFT&&pressedRotationArrow<0&&canRotate&&(pressedRotationArrow=o.key,targetAngleCoef=rotationArrowMaxSpeed,currAngleDiff=curAngleDiffX,ResetCameraRotation()),o.key===pc.KEY_RIGHT&&pressedRotationArrow<0&&canRotate&&(pressedRotationArrow=o.key,targetAngleCoef=-rotationArrowMaxSpeed,currAngleDiff=curAngleDiffX,ResetCameraRotation()),o.key===pc.KEY_ESCAPE&&(BagDialogue.isOpen&&CheckoutDialogController.prototype.Close(),ProductDialogue.isOpen&&ProductDialogue.Close(),console.log("event.key === pc.KEY_ESCAPE"),VideoHotSpotController.isOpen&&(console.log("VideoHotSpotController.isOpen"),VideoHotSpotController.prototype.Close()))},InputControls.prototype.KeyUp=function(o){o.key===pc.KEY_LEFT&&pressedRotationArrow===o.key&&(pressedRotationArrow=-1,SetAfterCameraRotationValues()),o.key===pc.KEY_RIGHT&&pressedRotationArrow===o.key&&(pressedRotationArrow=-1,SetAfterCameraRotationValues())},InputControls.prototype.isUiElement=function(o){return!(!o.element||(console.log(o.element.className),!o.element.className.includes("preventCanvasEvents")))&&(console.log("found prevent Canvas"),!0)},InputControls.prototype.OnDown=function(o){ResetCameraRotation()},InputControls.prototype.OnMove=function(o){var t=Date.now();canRotate&&CheckCameraRotationForMouse(o,prevPosition,t-prevTime)},InputControls.prototype.OnUp=function(o){canMove&&(RayCastDetector.ProductPointClicked(o)||CheckPointSwitch(o));SetAfterCameraRotationValues()},InputControls.prototype.CameraBehaviourUpdate=function(){var o=Date.now(),t=o-prevTime;if(pressedRotationArrow>0){if(targetAngleCoef!==currAngleDiff){var e=targetAngleCoef-currAngleDiff;Math.abs(e)>.05&&(e*=.1),currAngleDiff+=e}CheckCameraRotation({x:currAngleDiff,y:0},t)}else CheckCameraAfterRotation(t);CheckRotationCoef(),CheckPointSwitchTransitionCoef(),prevTime=o};var view_point_id_key="point_id",floor_position_key="floor_position",camera_position_key="camera_position",camera_rotation_key="camera_rotation",texName_key="textureName",isActive_key="active";function CreateNewViewPointData(t){var e={};e.id=OptInt(t,this.view_point_id_key),e.tex_name=OptString(t,this.texName_key),e.floor_pos=TextToVec3(OptString(t,this.floor_position_key)),e.floor_pos.x*=-1;var o=TextToVec3(OptString(t,this.camera_position_key));if(e.active=OptBool(t,isActive_key),e.camera_pos=new pc.Vec3(-o.x,o.y,o.z),e.camera_rot=new pc.Vec3(0,0,0),camera_rotation_key in t){var a=parseFloat(t[camera_rotation_key]);isNaN(a)?e.camera_rot=TextToVec3(OptString(t,this.camera_rotation_key)):e.camera_rot.y=a}return e.camera_rot.y*=-1,e.camera_rot_matrix=CreateRotationMatrixFromVector(e.camera_rot,5===e.id),e}var deg2Rad=Math.PI/180,rad2Deg=180/Math.PI,serverHighUrl="https://cdn.nextretail.com/goop/1/cubemaps/2K_5/",serverLowUrl="https://cdn.nextretail.com/goop/1/cubemaps/2K_5/",logsEnabled=!1,formatter=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2});function OptInt(t,e,r){if(r=void 0!==r?r:0,e in t){var n=parseInt(t[e]);if(!isNaN(n))return n}return r}function OptFloat(t,e,r){if(r=void 0!==r?r:0,e in t){var n=parseFloat(t[e]);if(!isNaN(n))return n}return r}function OptString(t,e,r){if(r=void 0!==r?r:"",e in t){var n=String(t[e]);if("string"==typeof n)return n}return r}function OptBool(t,e,r){if(r=void 0===r||r,e in t){var n=t[e];if("boolean"==typeof n)return n}return r}function TextToVec3(t){var e=new pc.Vec3(0,0,0);if("string"==typeof t){for(var r=t.split(/[\s,()]+/),n=r.length-1;n>=0;n--)""===r[n]&&r.splice(n,1);r.length>0&&(e.x=parseFloat(r[0]),r.length>1&&(e.y=parseFloat(r[1]),r.length>2&&(e.z=parseFloat(r[2]))))}return e}function TextToArray(t){var e=[];if("string"==typeof t)for(var r=(e=t.split(/[\s,\[\]\"]+/)).length-1;r>=0;r--)""===e[r]&&e.splice(r,1);return e}function TextToColor(t){var e=TextToVec3(t);return new pc.Color(e.x/255,e.y/255,e.z/255,1)}function ColorToArray(t){var e=[];return e.push(t.r),e.push(t.g),e.push(t.b),e.push(t.a),e}function Vec4ToArray(t){var e=[];return e.push(t.x),e.push(t.y),e.push(t.z),e.push(t.w),e}function Vec3ToArray(t){var e=[];return e.push(t.x),e.push(t.y),e.push(t.z),e}function IsInArray(t,e){return e.indexOf(t)>-1}function LoadTexture(t,e){var r=application.assets.find(t,"texture");r.ready(e),application.assets.load(r)}function LoadTextureFromUrl(t,e,r){var n=(e?serverHighUrl:serverLowUrl)+t,a=new Image;a.crossOrigin="anonymous",a.onload=function(){var t=new pc.Texture(application.graphicsDevice);t.setSource(a),t.mipmaps=!1,t.addressU=pc.ADDRESS_CLAMP_TO_EDGE,t.addressV=pc.ADDRESS_CLAMP_TO_EDGE,r(t)},a.src=n}function LoadImageFromUrl(t,e){var r=new Image;r.crossOrigin="anonymous",r.onload=function(){var t=new pc.Texture(application.graphicsDevice);t.setSource(r),t.mipmaps=!1,t.addressU=pc.ADDRESS_CLAMP_TO_EDGE,t.addressV=pc.ADDRESS_CLAMP_TO_EDGE,e(t)},r.src=t}function UnloadAsset(t){void 0!==t&&t.unload()}function FormatAngleIn180Range(t){for(;t>180;)t-=360;for(;t<-180;)t+=360;return t}function GetCameraRotation(){var t=camera.getEulerAngles(),e=Math.abs(t.x)>90?-1:1;return t.x=FormatAngleIn180Range(t.x-t.z),t.y=FormatAngleIn180Range(e*(t.y+t.z)),t.z=0,t}function GetCubeSideNamesForImage(t){var e=[];return e.push(t+"_f0"),e.push(t+"_f1"),e.push(t+"_f2"),e.push(t+"_f3"),e.push(t+"_f4"),e.push(t+"_f5"),e}function GetShaderNewTextureNames(){var t=[];return t.push("_FirstTexNew"),t.push("_SecondTexNew"),t.push("_ThirdTexNew"),t.push("_VertTexNew"),t}function GetShaderOldTextureNames(){var t=[];return t.push("_FirstTexOld"),t.push("_SecondTexOld"),t.push("_ThirdTexOld"),t.push("_VertTexOld"),t}function AddPriceString(t,e,r){var n,a;void 0===t&&(t=0),n=void 0===e||""===e||"-"===e?"0":e,a=void 0===r||""===r||"-"===r?"0":r;var o=parseFloat(n)+parseFloat(a),i="";if(t<1)o=parseInt(o);else for(var u=t-1;u>-1;u--)o*Math.pow(10,u)%1==0&&(i+="0",0===u&&(i=".0"));return o.toString()+i}function addStyle(t,e,r){t&&t.style&&t.style[e]&&(t.style[e]=r)}function phone_formatting(t,e){var r,n=t.selectionStart,a=t.selectionEnd,o=t.value.replace(/\D/g,"");o.length>2?(r=o.substring(0,3)+"-",4===o.length||5===o.length?r+=o.substr(3):o.length>5&&(r+=o.substring(3,6)+"-"),o.length>6&&(r+=o.substring(6)),!0===e&&"-"===r.slice(-1)&&(r=r.substring(0,r.length-2))):r=o,t.value=r.length>12?r.substring(0,12):r,"-"===r.slice(-1)&&!1===e&&8===r.length&&7===a||4===r.length&&3===a?(n=r.length,a=r.length):"revert"===e&&(n--,a--),t.setSelectionRange(n,a)}function phone_number_check(t,e){var r=e.keyCode,n=String.fromCharCode(r),a=!1,o=t.selectionEnd;[8,46].indexOf(r)>-1&&(a=!0),n.match(/^\d+$/)||a?phone_formatting(t,a):[33,34,35,36,37,38,39,40].indexOf(r)>-1||(189===r?o===t.value.length?t.value=t.value.slice(0,-1):(t.value=t.value.substring(0,o-1)+t.value.substr(o),t.selectionEnd=o-1):(e.preventDefault(),phone_formatting(t,"revert")))}function CreateRotationMatrixFromVector(t,e){var r=Y_RotationMatrix(-t.y-90),n=X_RotationMatrix(t.x);return matrix3x3mul(Z_RotationMatrix(t.z),matrix3x3mul(n,r))}function Y_RotationMatrix(t){return RotationMatrix([0,8],2,6,t)}function X_RotationMatrix(t){return RotationMatrix([4,8],7,5,t)}function Z_RotationMatrix(t){return RotationMatrix([0,4],3,1,t)}function RotationMatrix(t,e,r,n){n*=deg2Rad;for(var a,o=Math.sin(n),i=Math.cos(n),u=new pc.Mat3,s=0;s<u.data.length;s++)a=s===t[0]||s===t[1]?i:s===e?o:s===r?-o:Math.floor(s/3)===s%3?1:0,u.data[s]=a;return u}function matrix3x3mul(t,e){for(var r,n,a=new pc.Mat3,o=0;o<a.data.length;o++)r=3*Math.floor(o/3),n=o%3,a.data[o]=t.data[r]*e.data[n]+t.data[r+1]*e.data[n+3]+t.data[r+2]*e.data[n+6];return a}function log(t){logsEnabled&&console.log(t)}var product_point_id_key="point_id",product_point_position_key="position",product_ids_key="product_ids",variant_ids_key="variant_ids",product_point_url_key="url",comfortable_view_point_ids_key="comfortable_view_points",product_start_index_key="start_index",product_frames_count_key="frames_count",product_start_frame_key="start_frame";function CreateNewProductPointData(t){var _,i={};i.point_id=OptInt(t,this.product_point_id_key),i.position=TextToVec3(OptString(t,this.product_point_position_key)),i.position.x*=-1,i.product_ids=[];var r=TextToArray(OptString(t,this.product_ids_key));for(_=0;_<r.length;_++)i.product_ids.push(r[_]);i.variantIds=[];var o=TextToArray(OptString(t,this.variant_ids_key));for(_=0;_<o.length;_++)i.variantIds.push(o[_]);i.view_point_ids=[];var e=TextToArray(OptString(t,this.comfortable_view_point_ids_key));for(_=0;_<e.length;_++)i.view_point_ids.push(parseInt(e[_]));return i.url=OptString(t,this.product_point_url_key),i.start_index=OptInt(t,this.product_start_index_key,1),i.frames_count=OptInt(t,this.product_frames_count_key,1),i.start_frame=OptInt(t,this.product_start_frame_key,1),i}var category_name_key="name",category_view_point_id_key="view_point_id",category_product_point_id_key="product_point_id";function CreateNewProductCategoryData(t){var e={};return e.name=OptString(t,this.category_name_key),e.viewPointID=OptInt(t,this.category_view_point_id_key),e.productPointID=OptInt(t,this.category_product_point_id_key),e}// ProductData.js
var product_id_key = "id";
var product_type_key = "product_type";
var product_title_key = "title";
var product_body_html_key = "body_html";
var product_variants_key = "variants";
var product_options_key = "options";
var product_images_key = "images";
var product_image_key = "image";

function CreateNewProductData(jsonObj) {
    var productData = {};

    productData.id = jsonObj.nrid;
    productData.title = jsonObj.title;
    productData.description = jsonObj.description;
    productData.url = jsonObj.url;

    productData.variants = [];
    productData.options = [];
    productData.images = [];
    
    productData.variant_images = {};
    productData.allImages = [];

    //variants
    for(let i = 0; i < jsonObj.variants.length; i++)
    {
        jsonObj.variants[i].id = jsonObj.variants[i].ecommId;
        productData.variants.push(jsonObj.variants[i]);
    }
    
    //options/attributes
    for(let i = 0; i < jsonObj.variants.length; i++)
    {
        for(let n = 0; n < jsonObj.variants[i].attributes.length; n++)
        {
            if(!jsonObj.variants[i].attributes[n].name in productData.options)
            {
                productData.options.push(jsonObj.variants[i].attributes[n].name);
            }
        }
    }
    
    //images
    for(let i = 0; i < jsonObj.variants.length; i++)
    {
        productData.variant_images[jsonObj.variants[i].ecommId] = [];
        for(let n = 0; n < jsonObj.variants[i].images.length; n++)
        {
            //all images
            if(!jsonObj.variants[i].images[n].url in productData.allImages)
            {
                productData.allImages.push(jsonObj.variants[i].images[n].url);
            }
            //variant images
            productData.variant_images[jsonObj.variants[i].ecommId].push(jsonObj.variants[i].images[n].url);
        }
    }
    return productData;
}

var ViewPoint360=pc.createScript("viewPoint360");ViewPoint360.prototype.initialize=function(){},ViewPoint360.prototype.InitPoint=function(t){this.data=t,this.entity.localPosition=t.floor_pos,this.entity.name=String(t.id)},ViewPoint360.prototype.GetTextureName=function(){return this.data.tex_name},ViewPoint360.prototype.GetCameraPosition=function(){return this.data.camera_pos},ViewPoint360.prototype.GetCameraRotation=function(){return this.data.camera_rot},ViewPoint360.prototype.GetCameraRotationMatrix=function(){return this.data.camera_rot_matrix},ViewPoint360.prototype.update=function(t){};var hotSpotSprites,ProductPoint=pc.createScript("productPoint"),hoverColorBrightnessDif=30,brightnessChangeSpeed=1,closestDistUnits=2.5,farestDistUnits=4;ProductPoint.attributes.add("hotSpotSprites",{type:"asset",assetType:"sprite",title:"hot spot sprites",array:!0}),ProductPoint.attributes.add("spriteSize",{type:"number",default:.023}),ProductPoint.prototype.initialize=function(){this.productDatas=[],this.defaultMinScale=this.spriteSize,this.defaultMaxScale=this.spriteSize,this.minVisDist=4,this.maxVisDist=7,this.mouseOnPoint=!1;var t=this.entity.sprite.color;this.tempColor=t,this.fullOpaque=t,this.fullTransparent=new pc.Color(t.r,t.g,t.b,0),this.pointColor=t,this.pointBgColor=t,hotSpotSprites=this.hotSpotSprites,this.entity.enabled=!0},ProductPoint.prototype.onTapped=function(t){log("ProductPoint.prototype.onTapped")},ProductPoint.prototype.UpdatePointView=function(){this.CheckScaleAndVisibility(),this.SetRotation()},ProductPoint.prototype.InitPoint=function(t){this.pointData=t,this.entity.sprite.color=this.pointColor,this.targetBgColor=this.pointBgColor,this.entity.setLocalPosition(this.pointData.position),this.entity.name=String(this.pointData.point_id)},ProductPoint.prototype.SetRotation=function(){this.entity.lookAt(camera.getPosition())},ProductPoint.prototype.CheckScaleAndVisibility=function(){var t=graphicDevice.width/graphicDevice.height;t<1&&(t=1/t),this.app.keyboard&&!this.app.touch||(this.defaultMaxScale=this.defaultMinScale*t*1.11);var i=camera.getLocalPosition().clone(),o=this.entity.getLocalPosition(),e=this.entity.getLocalScale(),s=e.x/Math.abs(e.x),n=(i-o).length,r=graphicDevice.width>graphicDevice.height?this.defaultMaxScale:this.defaultMinScale;n<this.minVisDist&&(productPointSpriteRenderer.color=fullOpaque),n>this.minVisDist&&n<maxVisDist&&(tempColor.a=1-(n-this.minVisDist)/(this.maxVisDist-this.minVisDist),productPointSpriteRenderer.color=tempColor),n>this.maxVisDist&&(productPointSpriteRenderer.color=fullTransparent);var a=r;n<closestDistUnits?a=n/closestDistUnits*r:n>farestDistUnits&&(a=n/farestDistUnits*r),this.entity.setLocalScale(new pc.Vec3(s*a,a,a)),this.entity.configured=!0,HotspotChecked++};// DataManager.js
var DataManager = pc.createScript('DataManager');

var viewPointsInJson = "camera_poses";
var productPointsInJson = "product_points";
var productsInJson = "products";
var productCategoriesInJson = "product_categories";
var productPointColorsInJson = "product_point_colors";

var type_image = "image";
var type_video = "video";
var type_model = "model";

var singleProductJSON;
var startRotation;
var startPointID;
var viewPointDatas = [];
var productPointDatas = [];
var productDatas = [];
var productCategoryDatas = [];
var productPointColors = {};

var productsJSONFromURL;

function InitJson(jsonObj) {

	this.startRotation = jsonObj.start_rotation;
    this.startPointID = jsonObj.start_point_id;
	this.homeRotation = jsonObj.rotation_home;

	this.handBagsRotation = jsonObj.rotation_handbags;
	this.handBagsRotation_mobile = jsonObj.rotation_handbags;

	this.dayWearRotation = jsonObj.rotation_dayWear;
	this.dayWearRotation_mobile = jsonObj.rotation_dayWear;

	this.eveningRotation = jsonObj.rotation_evening;
	this.eveningRotation_mobile = jsonObj.rotation_evening;

	var i;
	if (this.viewPointsInJson in jsonObj) {
		var vp = jsonObj[this.viewPointsInJson];
		for (i = 0; i < vp.length; i++) {
			this.viewPointDatas.push(CreateNewViewPointData(vp[i]));
		}
	}

	if (this.productPointsInJson in jsonObj) {
		var pp = jsonObj[this.productPointsInJson];

		for (i = 0; i < pp.length; i++) {
			this.productPointDatas.push(CreateNewProductPointData(pp[i]));
		}
	}

	if (this.productCategoriesInJson in jsonObj) {
		var pc = jsonObj[this.productCategoriesInJson];
		for (i = 0; i < pc.length; i++) {
			this.productCategoryDatas.push(CreateNewProductCategoryData(pc[i]));
		}
	}
}

DataManager.prototype.LoadProductsJsonFromURL = function(url, callback) {
	log("Load Products Json From URL");

	var Http = new XMLHttpRequest();

	Http.open("GET", url);
	Http.setRequestHeader('Access-Control-Allow-Origin', '*');

	Http.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			productsJSONFromURL = JSON.parse(this.response.replace(/\n/g, "\\n"));
			callback(productsJSONFromURL);

			if (productsInJson in productsJSONFromURL) {
				var p = productsJSONFromURL[productsInJson];

				for (var i = 0; i < p.length; i++) {
					productDatas.push(CreateNewProductData(p[i]));
				}
			}
		} else {
			//console.log("error: " + this.readyState + " : " + this.status);
		}
	};
	Http.send();
};

DataManager.prototype.GetProductByProductType = function(hash) {
    for(let i = 0; i < productDatas.length; i++)
    {
        if(productDatas[i].id == hash) { return productDatas[i]; }
    }
    console.log("no product found for id: " + hash);
    return null;
};

DataManager.prototype.LoadProductByProductID = function(productID, onLoadComplete, onLoadError) {
	log("Load Product By Product ID");

	var url = "https://3zc5vdclcc.execute-api.us-east-1.amazonaws.com/Stage/product/get/" + productID;
    console.log(url);
	var Http = new XMLHttpRequest();

	Http.open("GET", url);
    
	Http.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			singleProductJSON = JSON.parse(this.response);
			productDatas.push(CreateNewProductData(singleProductJSON));
			onLoadComplete();
		} else {
			console.log("error:: readyState: " + this.readyState + " - status: " + this.status);
		}

		if (this.status != 200)
			onLoadError();
	};

	Http.send();
};

var MainSceneObject,model,room,camera,transitionCurve,MainScene=pc.createScript("mainScene");MainScene.attributes.add("html",{type:"asset",assetType:"html",title:"HTML Asset"}),MainScene.attributes.add("css",{type:"asset",assetType:"css",title:"CSS Asset"}),MainScene.attributes.add("gif",{type:"asset",assetType:"texture",title:"Gif"}),MainScene.attributes.add("vsc",{type:"asset",assetType:"shader",title:"Vertex Cube Shader"}),MainScene.attributes.add("fsc",{type:"asset",assetType:"shader",title:"Fragment Cube Shader"}),MainScene.attributes.add("vscm",{type:"asset",assetType:"shader",title:"Vertex Cube Map Shader"}),MainScene.attributes.add("fscm",{type:"asset",assetType:"shader",title:"Fragment Cube Map Shader"}),MainScene.attributes.add("md",{type:"entity",title:"Shop Model"}),MainScene.attributes.add("rm",{type:"entity",title:"Room"}),MainScene.attributes.add("cm",{type:"entity",title:"Main Camera"}),MainScene.attributes.add("vpContainer",{type:"entity",title:"View Points Container"}),MainScene.attributes.add("vpPrefab",{type:"entity",title:"View Points Prefab"}),MainScene.attributes.add("ppContainer",{type:"entity",title:"Product Points Container"}),MainScene.attributes.add("ppPrefab",{type:"entity",title:"Product Points Prefab"}),MainScene.attributes.add("ppVideoPrefab",{type:"entity",title:"Product Points Video Prefab"}),MainScene.attributes.add("pp3DPrefab",{type:"entity",title:"Product Points 3D Prefab"}),MainScene.attributes.add("trCurve",{type:"curve",title:"Transition Curve",curves:["The Curve"]}),MainScene.attributes.add("productsJSON",{type:"asset",assetType:"json",title:"Products JSON"}),MainScene.attributes.add("tvPlayButtons",{type:"entity",title:"Tv Play Buttons",array:!0}),MainScene.attributes.add("screens",{type:"entity",title:"Tvs",array:!0}),MainScene.attributes.add("hotspotDistance",{type:"number",title:"Hotspot Distance"});var cubeShader,cubeMapShader,application,graphicDevice,oldViewPoint,newViewPoint,oldPointTextureAsset,newPointTextureAsset,oldPointTexture,newPointTexture,curProductData,originalStartPointViewPoint,position_home,position_handBags,position_dayWear,position_evening,position_handBags_mobile,position_women_mobile,position_kids_mobile,position_r29_mobile,position_refinery29_mobile,StartPointAvalaible,MaxDistanceForHotspots,curShader,oldLowTexturesDownloadCameraAngle,hiddenHorizontalTextureIndexOld,hiddenHorizontalTextureIndexNew,hiddenVerticalTextureIndex,effectCoef=1,old_new_materials={},allMaterials=[],viewPoints=[],productPoints=[],tvs=[],playButtons=[],curTestTextures={new:{},old:{}},curImages=(curTestTextures={new:{},old:{}},{new:{},old:{}}),inputPositionCoef=1,testCounter=0,testMounter=0,ProductJSON={},HotspotChecked=0;function ResetCamera(){var e=newViewPoint.GetCameraPosition();camera.setLocalPosition(e),camera.setEulerAngles(startRotation.x,startRotation.y,0),graphicDevice.maxPixelRatio=1}function InitCubeShader(){var e=MainSceneObject.vsc.resource,t=MainSceneObject.fsc.resource,n="precision "+graphicDevice.precision+" float;\n";n+=t;var o={attributes:{aVertex_Position:pc.SEMANTIC_POSITION,aVertex_UV0:pc.SEMANTIC_TEXCOORD0},vshader:e,fshader:n};this.cubeShader=new pc.Shader(graphicDevice,o),MainSceneObject.fsc=null,MainSceneObject.vsc=null,curShader=CubeShader}function InitCubeMapShader(){var e=MainSceneObject.vscm.resource,t=MainSceneObject.fscm.resource,n="precision "+graphicDevice.precision+" float;\n";n+=t;var o={attributes:{aVertex_Position:pc.SEMANTIC_POSITION,aVertex_UV0:pc.SEMANTIC_TEXCOORD0},vshader:e,fshader:n};this.cubeMapShader=new pc.Shader(graphicDevice,o),MainSceneObject.fscm=null,MainSceneObject.vscm=null,curShader=CubemapShader}function InitMaterialsList(){AddMaterialsFromWholeObject(this.room)}function AddMaterialsFromWholeObject(e){AddMaterialsFormDirectObject(e);for(var t=0;t<e.children.length;t++)AddMaterialsFromWholeObject(e.children[t])}function AddMaterialsFormDirectObject(e){var t,n,o,i;if(void 0!==e.model)for(n=e.model.meshInstances,t=0;t<n.length;t++)(o=n[t].material).id in old_new_materials||(i=new pc.Material,curShader.initMaterialDefaultValues(i,o),allMaterials.push(i),old_new_materials[o.id]=i),e.model.meshInstances[t].material=old_new_materials[o.id]}function InitViewPoints(){for(var e=MainSceneObject.vpContainer,t=MainSceneObject.vpPrefab,n=0;n<viewPointDatas.length;n++){if(!viewPointDatas[n].active)return;var o=t.clone();o.enabled=!0,o.parent=e,o.script.viewPoint360.InitPoint(viewPointDatas[n]),viewPoints.push(o)}MainSceneObject.vpPrefab=null,MainSceneObject.vpContainer=null}function CreateHotSpot(e){var t=MainSceneObject.ppContainer,n=MainSceneObject.ppPrefab,o=MainSceneObject.pp3DPrefab,i=productPointDatas[e].point_id<2e3?n.clone():o.clone();i.enabled=!0,i.parent=t,i.script.productPoint.InitPoint(productPointDatas[e]),productPoints.push(i)}function InitProductPoints(){for(var e=MainSceneObject.ppVideoPrefab,t=MainSceneObject.ppContainer,n=0;n<productPointDatas.length;n++)if("video"===productPointDatas[n].product_ids[0]){var o=e.clone();o.enabled=!0,o.parent=t,o.script.productPoint.InitPoint(productPointDatas[n]),productPoints.push(o),o=null}else CreateHotSpot(n);MainSceneObject.ppVideoPrefab=null,MainSceneObject.ppPrefab=null,MainSceneObject.pp3DPrefab=null,MainSceneObject.ppContainer=null}function InitMaterialDefaultValues(){for(var e,t=0;t<viewPoints.length;t++)56===(e=viewPoints[t].script.viewPoint360).data.id&&(position_home=e),28===e.data.id&&(position_handBags=e),20===e.data.id&&(position_dayWear=e),7===e.data.id&&(position_evening=e),56===e.data.id&&(position_home_mobile=e),9===e.data.id&&(position_handBags_mobile=e),24===e.data.id&&(position_dayWear_mobile=e),20===e.data.id&&(position_evening_mobile=e),e.data.id_mobile===startPointID&&(newViewPoint=e,originalStartPointViewPoint=e),e.data.id===startPointID&&(newViewPoint=e,originalStartPointViewPoint=e);newViewPoint&&(lowQualityTexturesLoaded=!1,LoadManager.prototype.DownloadPointTextures(newViewPoint,!0,!0,void 0,function(e,t,n){TexturesLoadPreCompleteAtStart(),AllLowTexturesComplete(e,t,n)}))}function TexturesLoadPreCompleteAtStart(){curShader.newPointPreSettingsAtAppStart(allMaterials),CheckHotspotsDistance(),UpdateHotspots()}function AllLowTexturesComplete(e,t,n){var o=n.namesArr;curTestTextures.new[0]=allDownloadedTextures[e][o[0]],curTestTextures.new[1]=allDownloadedTextures[e][o[1]],curTestTextures.new[2]=allDownloadedTextures[e][o[2]],curTestTextures.new[3]=allDownloadedTextures[e][o[3]],curTestTextures.new[4]=allDownloadedTextures[e][o[4]],curTestTextures.new[5]=allDownloadedTextures[e][o[5]],curImages.new[0]=allDownloadedImages[e][o[0]],curImages.new[1]=allDownloadedImages[e][o[1]],curImages.new[2]=allDownloadedImages[e][o[2]],curImages.new[3]=allDownloadedImages[e][o[3]],curImages.new[4]=allDownloadedImages[e][o[4]],curImages.new[5]=allDownloadedImages[e][o[5]],curShader.newPointSettings(allMaterials),lowQualityTexturesLoaded=!0,DownloadNearbyPointsLowTextures(),DownloadNearbyHSDPointsVideos(),find360PhotosToUnLoad()}function DownloadNearbyPointsLowTextures(){LoadManager.prototype.ClearDownloadCategoryQueue("high_360");var e,t=[],n=[],o=[],i=[];for(oldLowTexturesDownloadCameraAngle=GetCameraRotation().y,e=0;e<viewPoints.length;e++)if(curPoint=viewPoints[e].script.viewPoint360,curPoint!==newViewPoint){var a=curPoint.GetCameraPosition(),r=newViewPoint.GetCameraPosition(),s=new pc.Vec3(a.x-r.x,0,a.z-r.z),d=Math.atan2(-s.x,-s.z)*rad2Deg,l=FormatAngleIn180Range(d-oldLowTexturesDownloadCameraAngle),c=s.length(),u={};u.angle=l,u.dist=c,u.point=curPoint,SetPointSortedInList(u,l>-45&&l<45?t:l>-135&&l<-45?n:l>45&&l<135?o:i)}for(e=0;e<3;e++)e<t.length&&LoadManager.prototype.DownloadPointTextures(t[e].point,!0,!1,void 0,void 0);for(e=0;e<3;e++)e<n.length&&LoadManager.prototype.DownloadPointTextures(n[e].point,!0,!1,void 0,void 0),e<o.length&&LoadManager.prototype.DownloadPointTextures(o[e].point,!0,!1,void 0,void 0);for(e=0;e<3;e++)e<i.length&&LoadManager.prototype.DownloadPointTextures(i[e].point,!0,!1,void 0,void 0)}function DownloadNearbyHSDPointsVideos(){}function SetPointSortedInList(e,t){for(var n=0;n<t.length;n++)if(e.dist<t[n].dist)return void t.splice(n,0,e);t.push(e)}function StartHSDVideoPreload(e){}function DownloadResourcesForSidesPoints(e,t,n,o,i,a){var r;for(r=0;r<i;r++)r<e.length&&void 0!==a&&a(e[r].point);for(r=0;r<i;r++)r<t.length&&void 0!==a&&a(t[r].point),r<n.length&&void 0!==a&&a(n[r].point);for(r=0;r<i;r++)r<o.length&&void 0!==a&&a(o[r].point)}function UnLoadResourcesForSidesPoints(e,t,n,o,i){var a;for(a=0;a<e.length;a++)void 0!==i&&i(e[a].point);for(a=0;a<t.length;a++)void 0!==i&&i(t[a].point);for(a=0;a<n.length;a++)void 0!==i&&i(n[a].point);for(a=0;a<o.length;a++)void 0!==i&&i(o[a].point)}function AddPointToSidesArrays(e,t,n,o,i,a,r){var s={};s.angle=e,s.dist=t,s.point=n,SetPointSortedInList(s,e>-45&&e<45?o:e>-135&&e<-45?i:e>45&&e<135?a:r)}function find360PhotosToUnLoad(){var e,t,n=[],o=[],i=[],a=[];for(oldLowTexturesDownloadCameraAngle=GetCameraRotation().y,e=0;e<viewPoints.length;e++)if(curPoint=viewPoints[e].script.viewPoint360,curPoint!==newViewPoint){var r=curPoint.GetCameraPosition();t=newViewPoint.GetCameraPosition();var s=new pc.Vec3(r.x-t.x,0,r.z-t.z),d=Math.atan2(-s.x,-s.z)*rad2Deg,l=FormatAngleIn180Range(d-oldLowTexturesDownloadCameraAngle),c=s.length(),u={};u.angle=l,u.dist=c,u.point=curPoint,SetPointSortedInList(u,l>-45&&l<45?n:l>-135&&l<-45?o:l>45&&l<135?i:a)}for(e=2;e<n.length;e++)oldViewPoint&&n[e].point!=oldViewPoint&&newViewPoint&&n[e].point!=newViewPoint&&(LoadManager.prototype.UnloadPointTextures(n[e].point,!0),LoadManager.prototype.UnloadPointImages(n[e].point,!0));for(e=2;e<o.length;e++)oldViewPoint&&o[e].point!=oldViewPoint&&newViewPoint&&o[e].point!=newViewPoint&&(LoadManager.prototype.UnloadPointTextures(o[e].point,!0),LoadManager.prototype.UnloadPointImages(o[e].point,!0));for(e=2;e<i.length;e++)oldViewPoint&&i[e].point!=oldViewPoint&&newViewPoint&&i[e].point!=newViewPoint&&(LoadManager.prototype.UnloadPointTextures(i[e].point,!0),LoadManager.prototype.UnloadPointImages(i[e].point,!0));for(e=2;e<a.length;e++)oldViewPoint&&a[e].point!=oldViewPoint&&newViewPoint&&a[e].point!=newViewPoint&&(LoadManager.prototype.UnloadPointTextures(a[e].point,!0),LoadManager.prototype.UnloadPointImages(a[e].point,!0))}function CheckCameraRotation(){var e=Input.mousePosition,t=GetAnglesFromCenterForScreenPoint(mousePrevPosition),n=GetAnglesFromCenterForScreenPoint(e)-t,o=transform.rotation.eulerAngles,i=new Vector3(Util.formatAngleIn180Range(o.x+n.y),Util.formatAngleIn180Range(o.y-n.x),0);i.x>maxAngleY?i.x=maxAngleY:i.x<minAngleY&&(i.x=minAngleY),rotationAngleSum+=Mathf.Abs(new Vector2(Util.formatAngleIn180Range(n.x),Util.formatAngleIn180Range(n.y)).magnitude);var a=(e-mousePrevPosition)/Screen.dpi;rotationInchesSum+=a.magnitude,quatOld=Quaternion.Euler(o),quatNew=Quaternion.Euler(i),transform.rotation=Quaternion.Slerp(quatNew,quatOld,Time.deltaTime),mousePosQueue.Enqueue(mousePrevPosition),6==mousePosQueue.Count&&mousePosQueue.Dequeue(),mousePrevPosition=e}function GetHorizontalTextureIndexByAngle(e){return(e=FormatAngleIn180Range(e))>=-45&&e<=45?0:e>=45&&e<=135?3:e>=-135&&e<=-45?1:2}function CheckHotspotsDistance(){var e,t=camera.getLocalPosition().clone();enabledHotspots=[];for(var n=0;n<productPoints.length;n++)e=productPoints[n].position,new pc.Vec3(t.x-e.x,0,t.z-e.z).length()>MaxDistanceForHotspots?productPoints[n].enabled=!1:(productPoints[n].enabled=!0,enabledHotspots.push(productPoints[n].script.productPoint))}function UpdateHotspots(){for(var e=0;e<enabledHotspots.length;e++)enabledHotspots[e].UpdatePointView()}MainScene.prototype.ResizeCanvas=function(e){inputPositionCoef=devicePixelRatio,graphicDevice.resizeCanvas(Math.round(window.innerHeight*devicePixelRatio)*e,Math.round(window.innerHeight*devicePixelRatio))},MainScene.prototype.InitAttributes=function(){MainSceneObject=this,application=this.app,graphicDevice=this.app.graphicsDevice,room=this.rm,camera=this.cm,MaxDistanceForHotspots=this.hotspotDistance,transitionCurve=this.trCurve,playButtons=this.tvPlayButtons;for(var e=0;e<this.screens.length;e++){var t={};t.screen=this.screens[e],t.playButton=this.tvPlayButtons[e],tvs.push(t)}application.loader.getHandler("texture").crossOrigin="anonymous"},MainScene.prototype.initialize=function(){this.InitAttributes(),ProductJSON=this.productsJSON.resource,InitJson(ProductJSON),InitCubeMapShader(),InitMaterialsList(),InitViewPoints(),InitProductPoints(),InitMaterialDefaultValues(),ResetCamera()},MainScene.prototype.update=function(e){if(void 0!==oldLowTexturesDownloadCameraAngle)Math.abs(GetCameraRotation().y-oldLowTexturesDownloadCameraAngle);InputControls.prototype.CameraBehaviourUpdate(),curShader.update(e,allMaterials)};var cameraFov={},angleDifQueue=[],rotationAngleSum=0,rotationInchesSum=0,minAngleDif=.02,inertionDecreaseCoef=.93,afterAngleDiffX=0,afterAngleDiffY=0,curAngleDiffX=0,curAngleDiffY=0,maxAngleY=50,rotationMinValue=5,angleDifQueueMaxCount=6;function ResetCameraRotation(){angleDifQueue=[],rotationAngleSum=0,rotationInchesSum=0,afterAngleDiffX=0,afterAngleDiffY=0}function CheckCameraRotationForMouse(e,a,n,t){screenSize={x:graphicDevice.width,y:graphicDevice.height};var o=GetAnglesFromCenterForScreenPoint(a,screenSize),i=GetAnglesFromCenterForScreenPoint(e,screenSize),r={};r.x=i.x-o.x,r.y=i.y-o.y,CheckCameraRotation(r,n,t)}function CheckCameraRotation(e,a,n){if(!isUIOpen&&!uiClicked){n=void 0!==n&&n;var t=GetCameraRotation(),o=new pc.Vec3(FormatAngleIn180Range(t.x+e.y),FormatAngleIn180Range(t.y+e.x),0);o.x>maxAngleY?o.x=maxAngleY:o.x<-maxAngleY&&(o.x=-maxAngleY);var i=(new pc.Quat).setFromEulerAngles(t.x,t.y,0),r=(new pc.Quat).setFromEulerAngles(o.x,o.y,0),f=(new pc.Quat).slerp(r,i,a/1e3);camera.setLocalEulerAngles(f.getEulerAngles()),t=GetCameraRotation(),n||(angleDifQueue.push(e),angleDifQueue.length===angleDifQueueMaxCount&&angleDifQueue.shift(),rotationAngleSum+=Math.abs(new pc.Vec2(FormatAngleIn180Range(e.x),FormatAngleIn180Range(e.y)).length())),curAngleDiffX=e.x,curAngleDiffY=e.y}}function GetAnglesFromCenterForScreenPoint(e,a){var n,t,o,i={};return cameraFov.y=camera.camera.fov,cameraFov.x=2*Math.atan(Math.tan(cameraFov.y/2*deg2Rad)*camera.camera.aspectRatio)*rad2Deg,n=e.x/a.x-.5,o=2*Math.sin(cameraFov.x/2*deg2Rad)*n,t=Math.cos(cameraFov.x/2*deg2Rad),i.x=Math.atan2(o,t)*rad2Deg,n=e.y/a.y-.5,o=2*Math.sin(cameraFov.y/2*deg2Rad)*n,t=Math.cos(cameraFov.y/2*deg2Rad),i.y=Math.atan2(o,t)*rad2Deg,i}function SetAfterCameraRotationValues(){if(angleDifQueue.length>0&&rotationAngleSum>5){for(var e=0,a=0,n=0;n<angleDifQueue.length;n++)e+=angleDifQueue[n].x,a+=angleDifQueue[n].y;afterAngleDiffX=e/angleDifQueue.length*.4,afterAngleDiffY=a/angleDifQueue.length*.4}rotationAngleSum=0,rotationInchesSum=0}function CheckCameraAfterRotation(e){if(Math.abs(afterAngleDiffX)>minAngleDif||Math.abs(afterAngleDiffY)>minAngleDif){var a={};a.x=afterAngleDiffX,a.y=afterAngleDiffY;GetCameraRotation().y;CheckCameraRotation(a,e,!0);GetCameraRotation().y;afterAngleDiffX*=inertionDecreaseCoef,afterAngleDiffY*=inertionDecreaseCoef,Math.abs(afterAngleDiffX)<=minAngleDif&&Math.abs(afterAngleDiffY)<=minAngleDif&&(afterAngleDiffX=0,afterAngleDiffY=0)}}var rotationStartTime,inRotation=!1,oldRotation=new pc.Quat,newRotation=new pc.Quat;function RotateTo(e){oldRotation=GetCameraRotation(),oldRotation=(new pc.Quat).setFromEulerAngles(oldRotation.x,oldRotation.y,0),newRotation=e,inRotation=!0,rotationStartTime=Date.now()}function CheckRotationCoef(){if(inRotation){var e=(Date.now()-rotationStartTime)/transitionDuration;(e=transitionCurve.value(e))>=1&&(e=1,inRotation=!1);var a=(new pc.Quat).slerp(oldRotation,newRotation,e);camera.setLocalEulerAngles(a.getEulerAngles())}}var targetNewPoint,pointSelectMaxAngle=50,inTransition=!1,transitionStartTime=0,transitionDuration=600,lowQualityTexturesLoaded=!1;function CheckPointSwitch(e){var t={x:graphicDevice.width,y:graphicDevice.height};CheckPointSwitchByDirection(GetCameraRotation().y-GetAnglesFromCenterForScreenPoint(e,t).x)}function CheckPointSwitchByDirection(e){if(!(!lowQualityTexturesLoaded||inTransition||inRotation||rotationAngleSum>5||isUIOpen||uiClicked)){for(var t,i,o=0,n=0;n<viewPoints.length;n++)if((t=viewPoints[n].script.viewPoint360)!==newViewPoint){var a=t.GetCameraPosition(),r=newViewPoint.GetCameraPosition(),s=new pc.Vec3(a.x-r.x,0,a.z-r.z),c=Math.atan2(-s.x,-s.z)*rad2Deg,l=FormatAngleIn180Range(c-e);if(!(l>pointSelectMaxAngle||l<-pointSelectMaxAngle)){var u=s.length(),w=Math.abs(u*Math.sin(l*deg2Rad))+Math.abs(u*Math.cos(l*deg2Rad));(void 0===i||w<o)&&(o=w,i=t)}}void 0!==i&&SwitchToPoint(i)}}function SwitchToPointById(e){console.log(e);for(var t=0;t<viewPoints.length;t++){var i=viewPoints[t].script.viewPoint360;if(i.data.id==e)return void SwitchToPoint(i)}}function SwitchToPoint(e,t){targetNewPoint=e,lowQualityTexturesLoaded=!1,LoadManager.prototype.DownloadPointTextures(targetNewPoint,!0,!0,void 0,function(e,i,o){TexturesLoadPreCompleteAtSwitch(),AllLowTexturesComplete(e,i,o),void 0!==t&&RotateTo(t)}),AmplitudeAnalytics.prototype.LogMovedToVantagePoint(e.data.id,e.data.floor_pos)}function TexturesLoadPreCompleteAtSwitch(){oldViewPoint=newViewPoint,newViewPoint=targetNewPoint,curTestTextures.old[0]=curTestTextures.new[0],curTestTextures.old[1]=curTestTextures.new[1],curTestTextures.old[2]=curTestTextures.new[2],curTestTextures.old[3]=curTestTextures.new[3],curTestTextures.old[4]=curTestTextures.new[4],curTestTextures.old[5]=curTestTextures.new[5],curImages.old[0]=curImages.new[0],curImages.old[1]=curImages.new[1],curImages.old[2]=curImages.new[2],curImages.old[3]=curImages.new[3],curImages.old[4]=curImages.new[4],curImages.old[5]=curImages.new[5],curShader.newPointPreSettingsAtPointSwitch(allMaterials),inTransition=!0,transitionStartTime=Date.now()}function CheckPointSwitchTransitionCoef(){if(allMaterials.length>0&&1!==allMaterials[0].getParameter("_TransitionValue").data){var e=(Date.now()-transitionStartTime)/transitionDuration;(e=transitionCurve.value(e))>=1&&(e=1,inTransition=!1,CheckHotspotsDistance());for(var t=0;t<allMaterials.length;t++)allMaterials[t].setParameter("_TransitionValue",e);var i=new pc.Vec3;i.lerp(oldViewPoint.GetCameraPosition(),newViewPoint.GetCameraPosition(),e),camera.setLocalPosition(i),UpdateHotspots()}}var newStart,oldStart,LoadManager=pc.createScript("LoadManager"),allDownloadedTextures={},allDownloadedImages={},textureDownloadQueue=[],curDownloadData={};LoadManager.prototype.initialize=function(){},LoadManager.prototype.update=function(){},LoadManager.prototype.DownloadPointTextures=function(e,o,a,t,n){newStart=Date.now();for(var r=LoadManager.prototype.GetPointSideNames(e),d=o?serverHighUrl:serverLowUrl,l=o?"high_360":"low_360",u=[],i=0;i<r.length;i++)u.push(d+r[i]);var p={};p.pointID=e.data.id,p.isHigh=o,LoadManager.prototype.DownloadTexturesSet(r,u,l,a,p,t,n)},LoadManager.prototype.DownloadTexturesSet=function(e,o,a,t,n,r,d){var l={};"object"!=typeof n&&(n={}),l.otherData=n,l.otherData.namesArr=e,l.count=0,l.maxCount=e.length,l.eachComplete=r,l.allComplete=d;for(var u=0;u<e.length;u++)LoadManager.prototype.DownloadTextureFromUrl(e[u],o[u],a,t,LoadManager.prototype.PointTextureDownloadSuccess,l)},LoadManager.prototype.DownloadTextureFromUrl=function(e,o,a,t,n,r){var d=LoadManager.prototype.CheckIfTextureIsDownloadingAndReturn(e,a);if(null!==d)d.onSuccess=n,d.additionalData=r;else{var l={};l.name=e,l.url=o,l.category=a,l.instant=t,l.onSuccess=n,l.additionalData=r,l.instant?LoadManager.prototype.StartDownload(l,a):(void 0===textureDownloadQueue[a]&&(textureDownloadQueue[a]=[]),textureDownloadQueue[a].push(l),1===textureDownloadQueue[a].length&&LoadManager.prototype.StartDownload(l,a))}},LoadManager.prototype.StartDownload=function(e,o){if(void 0!==allDownloadedTextures[o]&&e.name in allDownloadedTextures[o]){if(void 0!==e.onSuccess&&e.onSuccess(allDownloadedTextures[o][e.name],e.name,e.url,e.category,e.instant,e.additionalData),!e.instant&&void 0!==textureDownloadQueue[e.category]&&(textureDownloadQueue[e.category].shift(),textureDownloadQueue[e.category].length>0)){var a=textureDownloadQueue[e.category][0];LoadManager.prototype.StartDownload(a,a.category)}}else{void 0===curDownloadData[o]&&(curDownloadData[o]=[]),curDownloadData[o].push(e);var t=new Image;t.crossOrigin="anonymous",t.onload=function(){var a=curDownloadData[o].indexOf(e);a>-1&&curDownloadData[o].splice(a,1);var n=new pc.Texture(application.graphicsDevice);if(n.setSource(t),n.mipmaps=!1,n.addressU=pc.ADDRESS_CLAMP_TO_EDGE,n.addressV=pc.ADDRESS_CLAMP_TO_EDGE,void 0===allDownloadedTextures[e.category]&&(allDownloadedTextures[e.category]={}),allDownloadedTextures[e.category][e.name]=n,void 0===allDownloadedImages[e.category]&&(allDownloadedImages[e.category]={}),allDownloadedImages[e.category][e.name]=t,void 0!==e.onSuccess&&e.onSuccess(n,e.name,e.url,e.category,e.instant,e.additionalData),!e.instant&&void 0!==textureDownloadQueue[e.category]&&(textureDownloadQueue[e.category].shift(),textureDownloadQueue[e.category].length>0)){var r=textureDownloadQueue[e.category][0];LoadManager.prototype.StartDownload(r,r.category)}},t.src=e.url}},LoadManager.prototype.PointTextureDownloadSuccess=function(e,o,a,t,n,r){void 0!==r&&(void 0!==r.eachComplete&&r.eachComplete(e,o,a,t,n,r.otherData),void 0!==r.count&&(r.count++,void 0!==r.maxCount&&r.count===r.maxCount&&void 0!==r.allComplete&&r.allComplete(t,n,r.otherData)))},LoadManager.prototype.CheckIfTextureIsDownloadingAndReturn=function(e,o){if(void 0!==curDownloadData[o])for(var a=0;a<curDownloadData[o].length;a++)if(curDownloadData[o][a].name===e)return curDownloadData[o][a];return null},LoadManager.prototype.ClearDownloadCategoryQueue=function(e){if(void 0!==textureDownloadQueue[e]&&textureDownloadQueue[e].length>0){var o=textureDownloadQueue[e][0];textureDownloadQueue[e]=[],textureDownloadQueue[e].push(o)}},LoadManager.prototype.UnloadPointTextures=function(e,o){var a=LoadManager.prototype.GetPointSideNames(e),t=o?"high_360":"low_360";LoadManager.prototype.UnloadDownloadedTextureSet(a,t)},LoadManager.prototype.UnloadDownloadedTextureSet=function(e,o){allDownloadedTextures[o];for(var a=0;a<e.length;a++)LoadManager.prototype.UnloadDownloadedTexture(e[a],o)},LoadManager.prototype.UnloadDownloadedTexture=function(e,o){var a=allDownloadedTextures[o];e in a&&(a[e].destroy(),delete a[e])},LoadManager.prototype.UnloadPointImages=function(e,o){var a=LoadManager.prototype.GetPointSideNames(e),t=o?"high_360":"low_360";LoadManager.prototype.UnloadDownloadedImageSet(a,t)},LoadManager.prototype.UnloadDownloadedImageSet=function(e,o){for(var a=0;a<e.length;a++)LoadManager.prototype.UnloadDownloadedImage(e[a],o)},LoadManager.prototype.UnloadDownloadedImage=function(e,o){var a=allDownloadedImages[o];e in a&&(a[e]=null,delete a[e])},LoadManager.prototype.GetPointSideNames=function(e){var o=e.GetTextureName(),a="",t=o.lastIndexOf(".");t>0&&(a=o.substr(t),o=o.substr(0,t));for(var n=GetCubeSideNamesForImage(o),r=0;r<n.length;r++)n[r]+=a;return n},LoadManager.prototype.eachComplete=function(e,o,a,t,n,r){},LoadManager.prototype.allComplete=function(e,o,a){};var BoundingSphereShape=pc.createScript("boundingSphereShape");BoundingSphereShape.attributes.add("radius",{type:"number",title:"Radius"}),BoundingSphereShape.prototype.initialize=function(){this.boundingSphere=new pc.BoundingSphere(this.entity.getPosition(),this.radius)},BoundingSphereShape.prototype.postInitialize=function(){};// ProductDialogue.js
/*jshint esversion: 6 */

var ProductDialogue = {};
var loadedProductImages = {};


ProductDialogue.Init = function () {
    ProductDialogue.AssignHTML();
    ProductDialogue.AssignOnClick();

    ProductDialogue.ClearValues();
    ProductDialogue.Close();
};

//.. Assigning Values

ProductDialogue.AssignRoot = function (root) {
    ProductDialogue.root = root;
};

ProductDialogue.AssignHTML = function () {
    //3d
    ProductDialogue.sketchfabPrefabDOM = document.getElementById('product-3D-viewer-prefab');
    ProductDialogue.iframe3D = document.getElementById("iframe-3DProd");

    //root?
    ProductDialogue.view = document.getElementById("product_container");

    //title and Description
    ProductDialogue.productTitleDOM = document.getElementById("product-title");
    ProductDialogue.productDescriptionDOM = document.getElementById("product-description");

    //prices
    ProductDialogue.productPriceDOM = document.getElementById("product-price");
    ProductDialogue.productSalePriceDOM = document.getElementById("product-sale-price");

    //images
    ProductDialogue.productImageContainerDOM = document.getElementById("product-image-container");
    ProductDialogue.productImageOldDOM = document.getElementById("product-image-old");
    ProductDialogue.productImageNewDOM = document.getElementById("product-image-new");
    ProductDialogue.productImageNoImage = document.getElementById("no_image");

    //colors
    ProductDialogue.productColorsContainerDOM = document.getElementById("product-colors-container");
    ProductDialogue.productColorsPrefabDOM = document.getElementById("product-color-prefab");

    //quantity
    ProductDialogue.productQuantityDOM = document.getElementById("product-quantity");

    //sizes
    ProductDialogue.productSizesContainerDOM = document.getElementById("option-for-size");
    ProductDialogue.productSizePrefabDOM = document.getElementById("product-size-prefab");

    //add to bag
    ProductDialogue.addToBagButtonDOM = document.getElementById("addToBag-btn");

    //carousel
    ProductDialogue.productPreviousBtnDOM = document.getElementById("carousel-control-prev");
    ProductDialogue.productNextBtnDOM = document.getElementById("carousel-control-next");

    //close btns
    ProductDialogue.productDialogueCloseBtnDOM = document.getElementById("pdp-close-btn");
    ProductDialogue.productDialogueCloseBtnDOMVideo = document.getElementById("close-video");

    //details
    ProductDialogue.productDetails = document.getElementById("pdp_product_details");
    ProductDialogue.productDetailsContainer = document.getElementById("pdp_details_container");
    ProductDialogue.productDescriptionBottomAnchorDOM = document.getElementById("product-details-bottom-anchor");
    ProductDialogue.productDialogueMobileDescriptionButton = document.getElementById("moreDetails");

    //buttons
    ProductDialogue.productDialogueCloseBtnDOM1 = document.getElementById("close-btn1");
    ProductDialogue.productDialogueDefaultContainerDOM = document.getElementById("product_dialog_bg");

    //other?
    ProductDialogue.productSlideshowDOM = document.getElementById("carousel-thumb");
    ProductDialogue.product360ViewerDOM = document.getElementById("angle-view");
    ProductDialogue.product3DViewerDOM = document.getElementById("product-3D-viewer");
};

ProductDialogue.AssignOnClick = function () {
    //add to bag
    ProductDialogue.addToBagButtonDOM.addEventListener('click', function (event) {
        ProductDialogue.AddToBag();
        ServisBotController.prototype.AddToCart();
        AmplitudeAnalytics.prototype.LogShopNowClicked();
    });

    ProductDialogue.productDialogueCloseBtnDOM.addEventListener('click', function (event) {
        ProductDialogue.Close();
    });

    ProductDialogue.productDialogueMobileDescriptionButton.addEventListener('click', function (event) {
        AmplitudeAnalytics.prototype.LogProductDetailsClicked(ProductDialogue.currentVariant.product_id, ProductDialogue.currentVariant.id);
    });
};

ProductDialogue.ClearValues = function () {
    ProductDialogue.imagesIndex = 0;
    ProductDialogue.productDetails.classList.remove('detail-container-opened');
    ProductDialogue.currentVariant = null;
    ProductDialogue.itemsCount = 0;
};

//.. On Click Methods

ProductDialogue.SelectSize = function (event) {
    for (let i = 0; i < ProductDialogue.productData.variants.length; i++) {
        let opt1 = ProductDialogue.productData.variants[i].option1;
        let opt2 = ProductDialogue.productData.variants[i].option2;

        if ((opt1 === event.target.value || opt2 === event.target.value)) {
            if (ProductDialogue.productData.options[0].name.toLowerCase() === "size") {
                ProductDialogue.currentSize = ProductDialogue.productData.variants[i].option1;
            }
            if (ProductDialogue.productData.options[1].name.toLowerCase() === "size") {
                ProductDialogue.currentSize = ProductDialogue.productData.variants[i].option2;
            }

            ProductDialogue.currentVariant = ProductDialogue.productData.variants[i];
            ProductDialogue.currentVariant.id = ProductDialogue.productData.variants[i].id;

        }
    }

    AmplitudeAnalytics.prototype.LogSizeSelected(ProductDialogue.currentVariant.product_id, ProductDialogue.currentVariant.id, String(ProductDialogue.currentSize));
};

ProductDialogue.SetColor = function (event, newColor) {
    if (ProductDialogue.currentColor === event.target) {
        return;
    }
    var selectedColorClassName = "selected-color";
    ProductDialogue.UpdateImages();
    if (ProductDialogue.currentColor.classList.contains(selectedColorClassName)) {
        ProductDialogue.currentColor.classList.remove(selectedColorClassName);
    }

    if (!event.target.classList.contains(selectedColorClassName)) {
        event.target.classList.add(selectedColorClassName);
    }

    ProductDialogue.currentColor = event.target;
    ProductDialogue.PopulateSizes(newColor.id);
    AmplitudeAnalytics.prototype.LogSwatchClicked(ProductDialogue.currentVariant.product_id, ProductDialogue.currentVariant.id, newColor.id);
};

//.. Open Model or Video

ProductDialogue.TryOpenSketchFab = function (jsonObj) {
    if (jsonObj.type !== "model" || !jsonObj.embed_link) {
        ProductDialogue.productSlideshowDOM.style.display = "block";
        ProductDialogue.product3DViewerDOM.style.display = "none";
        return false;
    }

    //var sketchfabPrefab = ProductDialogue.sketchfabPrefabDOM.cloneNode(true);

    ProductDialogue.productSlideshowDOM.style.display = "none";
    ProductDialogue.product3DViewerDOM.style.display = "block";

    if (document.getElementById("sketchFab_iframe").src !== jsonObj.embed_link) {
        document.getElementById("sketchFab_iframe").src = jsonObj.embed_link;
    }
    return true;
};

ProductDialogue.TryOpen360 = function (jsonObj) {
    if (jsonObj.type !== "360" || !jsonObj.url) {
        ProductDialogue.productSlideshowDOM.style.display = "block";
        ProductDialogue.product360ViewerDOM.style.display = "none";
        return false;
    }

    ProductDialogue.productSlideshowDOM.style.display = "none";
    ProductDialogue.product360ViewerDOM.style.display = "block";
    
    var imagesContainer = ProductDialogue.product360ViewerDOM.children [0];
    var i;
    for (i = imagesContainer.children.length - 1; i >= 0; i--) {
        imagesContainer.removeChild (imagesContainer.children [i]);
    }
    
    var lastIndex = jsonObj.url.lastIndexOf ("*");
    var firstIndex = lastIndex;
    var numCount = 1;
    while (jsonObj.url[firstIndex - 1] === "*") {
        firstIndex--;
        numCount++;
    }
    var firstPart = jsonObj.url.slice (0, firstIndex);
    var lastPart = jsonObj.url.slice (lastIndex + 1, jsonObj.url.length);
    
    var li, img, indStr;
    for (i = jsonObj.start_index; i < jsonObj.start_index + jsonObj.frames_count; i++) {
        indStr = ProductDialogue.NumberToStringFormat (i, numCount);
        li = document.createElement ("li");
        img = document.createElement ("img");
        img.src = firstPart + indStr + lastPart;
        img.alt = indStr;
        li.appendChild (img);
        imagesContainer.appendChild (li);
        
        // if (i === jsonObj.start_frame) {
        //     ProductDialogue.product360ViewerDOM.setAttribute ("data-current", indStr);
        // }
    }
    
    $('#angle-view').angle ({
        speed: 3,
        previous: '.prev-image',
        next: '.next-image'
    });
    
    return true;
};

ProductDialogue.NumberToStringFormat = function (num, count) {
    var result = "";
    while (count) {
        result = num % 10 + result;
        num = Math.floor (num / 10);
        count--;
    }
    return result;
};

//.. Helpers

ProductDialogue.GetJSONObj = function (id) {
    if (!ProductJSON) {
        return null;
    }
    for (let i = 0; i < ProductJSON.product_points.length; i++) {
        if (ProductJSON.product_points[i].point_id === id) {
            return ProductJSON.product_points[i];
        }
    }
    return null;
};

ProductDialogue.CheckProductHasSize = function () {
    for (let i = 0; i < ProductDialogue.productData.options.length; i++) {
        if (ProductDialogue.productData.options[i].name.toLowerCase().indexOf("size") !== -1) {
            return true;
        }
    }
    return false;
};

//remove this method
ProductDialogue.CleanArray = function (arr) {
    var newArr = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== undefined) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
};

//refactor after we redo the product data such that we search the variant attribute array and do not have a set length of variant.options
ProductDialogue.GetColorName = function (data, variant) {
    let color = "color";

    let index = -1;
    for (let i = 0; i < data.options.length; i++) {
        if (data.options[i].name.toLowerCase().indexOf(color) !== -1) {
            index = i;
            break;
        }
    }
    return (index === 0) ? variant.option1 : (index == 1) ? variant.option2 : (index == 2) ? variant.option3 : null;
};

ProductDialogue.UpdateImages = function () {

    var imagesList = (ProductDialogue.productData.variant_images[ProductDialogue.currentVariant.id].length === 0) ? ProductDialogue.productData.allImages : ProductDialogue.productData.variant_images[ProductDialogue.currentVariant.id];

    var ol = document.getElementsByClassName("carousel-indicators")[0];
    var li = document.getElementById("carousel_thumbnail_prefab");
    li.style.display = 'none';

    var childsCount = ol.children.length;
    for (let j = childsCount - 1; j >= 0; j--) {
        ol.removeChild(ol.children[j]);
    }

    var hsd = document.getElementsByClassName("hsd-content")[0];
    var bigImageContainer = hsd.getElementsByClassName("carousel-inner")[0];
    var bigImagePrefab = document.getElementById("carousel_item_prefab");
    bigImagePrefab.style.display = 'none';

    childsCount = bigImageContainer.children.length;
    for (let j = childsCount - 1; j >= 0; j--) {
        bigImageContainer.removeChild(bigImageContainer.children[j]);
    }

    for (let i = 0; i < imagesList.length; i++) {
        var newli = li.cloneNode();
        newli.id = "";
        ol.appendChild(newli);
        newli.setAttribute("data-slide-to", i);
        var image = document.createElement("img");
        image.className = "d-block";
        image.setAttribute("src", imagesList[i]);
        newli.appendChild(image);
        newli.style.display = 'block';
        if (i === 0) {
            newli.classList.add("active");
        }

        var newDiv = bigImagePrefab.cloneNode();
        newDiv.id = "";
        bigImageContainer.appendChild(newDiv);
        var imageB = document.createElement("img");
        imageB.className = "d-block w-100";
        imageB.setAttribute("src", imagesList[i]);
        newDiv.appendChild(imageB);
        newDiv.style.display = 'block';
        if (i === 0) {
            newDiv.classList.add("active");
        }
    }

    $("#carousel-thumb").carousel("pause").removeData();
    $("#carousel-thumb").carousel(0);
    $("#carousel-thumb").carousel("pause");
};

//.. Variant Assignment 

ProductDialogue.AssignPrice = function () {
    ProductDialogue.productSalePriceDOM.innerHTML = "CA " + Formatter.prototype.formatPrice(ProductDialogue.currentVariant.price);
};

ProductDialogue.AssignStartingVariant = function (jsonObj, pd) {
    if (!jsonObj.starting_variant) {
        ProductDialogue.currentVariant = pd.variants[0];
        return;
    }
    for (let i = 0; i < pd.variants.length; i++) {
        if (jsonObj.starting_variant === pd.variants[i].id) {
            let selectedColorClassName = "selected-color";

            if (ProductDialogue.currentColor.classList.contains(selectedColorClassName)) {
                ProductDialogue.currentColor.classList.remove(selectedColorClassName);
            }

            ProductDialogue.currentVariant = pd.variants[i];
            ProductDialogue.currentColorName = ProductDialogue.GetColorName(pd, ProductDialogue.currentVariant);
            ProductDialogue.UpdateCurrentVariant(ProductDialogue.currentColorName, pd);
            ProductDialogue.PopulateSizes(ProductDialogue.currentColorName);
            ProductDialogue.currentColor = document.getElementById(ProductDialogue.currentColorName);

            if (!ProductDialogue.currentColor.classList.contains(selectedColorClassName)) {
                ProductDialogue.currentColor.classList.add(selectedColorClassName);
            }
            break;
        }
    }
};

//refactor after we redo the product data such that we search the variant attribute array and do not have a set length of variant.options
ProductDialogue.UpdateCurrentVariant = function (colorName, data) {
    let index = -1;
    let color = "color";

    if (!colorName) {
        return data.variants[0];
    }

    colorName = colorName.toString().toLowerCase();
    for (let i = 0; i < data.options.length; i++) {
        if (data.options[i].name.toLowerCase().indexOf(color) !== -1) {
            index = i;
            break;
        }
    }
    if (index == -1) {
        return data.variants[0];
    }

    for (let i = 0; i < data.variants.length; i++) {
        switch (index) {
            case 0:
                if (data.variants[i].option1.toLowerCase() === colorName) {
                    return data.variants[i];
                }
                break;

            case 1:
                if (data.variants[i].option2.toLowerCase() === colorName) {
                    return data.variants[i];
                }
                break;

            case 2:
                if (data.variants[i].option3.toLowerCase() === colorName) {
                    return data.variants[i];
                }
                break;
        }
    }
    return data.variants[0];
};

//.. Data Population

ProductDialogue.PopulatePDPValues = function () {
    ProductDialogue.productDialogueDefaultContainerDOM.style.display = "block";
    ProductDialogue.productDescriptionDOM.innerHTML = ProductDialogue.productData.description;
    ProductDialogue.productDescriptionDOM.parentElement.scrollTop = 0;
    ProductDialogue.productTitleDOM.innerHTML = ProductDialogue.productData.title;
};

//refactor
ProductDialogue.PopulateSwatches = function (jsonObj) {
    //note: we must not delete the the "PREFAB" object to use/clone it later, which is 
    //also a child of the container, and its the first element, which means the while loop starts 
    //deleting from below and doesnt delete the last one which is our prefab. However better to check with ID and not sorting order
    while (ProductDialogue.productColorsContainerDOM.lastChild) {
        ProductDialogue.productColorsContainerDOM.removeChild(ProductDialogue.productColorsContainerDOM.lastChild);
    }

    for (let i = 0; i < ProductDialogue.productData.options.length; i++) {
        if (ProductDialogue.productData.options[i].name.toLowerCase().indexOf("color") !== -1) {
            ProductDialogue.hasSingleColorSwatch = ProductDialogue.productData.options[i].values.length === 1;

            var defaultIndex = 0;

            for (let n = 0; n < ProductDialogue.productData.options[i].values.length; n++) {
                if (ProductDialogue.productData.options[i].swatches === null || ProductDialogue.productData.options[i].swatches[n] === "") {
                    defaultIndex++;
                    continue;
                }

                var newColor = ProductDialogue.productColorsPrefabDOM.cloneNode(true);
                newColor.addEventListener('click', function (event) {
                    ProductDialogue.SetColor(event, newColor);
                });
                var selectedColorClassName = "selected-color";

                if (n === defaultIndex) {
                    ProductDialogue.currentColor = newColor;

                    if (!ProductDialogue.currentColor.classList.contains(selectedColorClassName)) {
                        ProductDialogue.currentColor.classList.add(selectedColorClassName);
                    }

                    ProductDialogue.currentColorName = ProductDialogue.productData.options[i].values[defaultIndex];
                    ProductDialogue.currentColorName = ProductDialogue.productData.options[i].values[defaultIndex];

                } else if (newColor.classList.contains(selectedColorClassName)) {
                    newColor.classList.remove(selectedColorClassName);
                }

                var swatchUrl = ProductDialogue.productData.options[i].swatches[n].trim();
                if (!swatchUrl.startsWith("https:")) {
                    swatchUrl = "https:" + swatchUrl;
                }
                ProductDialogue.PopulateSwatchURL(newColor, swatchUrl);

                newColor.id = ProductDialogue.productData.options[i].values[n];
                ProductDialogue.productColorsContainerDOM.appendChild(newColor);
            }

            if (defaultIndex === ProductDialogue.productData.options[i].values.length || jsonObj.hide_swatches) {
                ProductDialogue.currentColorName = ProductDialogue.productData.options[i].values[0];
                ProductDialogue.productColorsContainerDOM.style.display = 'none';
            } else {
                ProductDialogue.productColorsContainerDOM.style.display = 'block';
            }
        }
    }
};

//refactor
ProductDialogue.PopulateSizes = function (colorName) {

    var hasSize = ProductDialogue.CheckProductHasSize();

    if (!hasSize) {
        ProductDialogue.productSizesContainerDOM.parentNode.parentNode.style.display = "none";
    } else {
        ProductDialogue.productSizesContainerDOM.parentNode.parentNode.style.display = "inline-block";
    }

    while (ProductDialogue.productSizesContainerDOM.lastChild) {
        ProductDialogue.productSizesContainerDOM.removeChild(ProductDialogue.productSizesContainerDOM.lastChild);
    }

    var defaultSizeDOM;

    ProductDialogue.currentColorName = colorName;

    defaultSizeDOM = ProductDialogue.productSizePrefabDOM.cloneNode(true);

    ProductDialogue.productSizesContainerDOM.appendChild(defaultSizeDOM);
    var def1 = defaultSizeDOM.cloneNode(true);

    ProductDialogue.sizesDictionary = {};


    if (ProductDialogue.productData.options[0].name.toLowerCase() === "size") {
        for (var a = 0; a < ProductDialogue.productData.options[0].values.length; a++) {
            ProductDialogue.sizesDictionary[ProductDialogue.productData.options[0].values[a]] = a;
        }

        if (ProductDialogue.productData.options[0].values.length === 0) {
            ProductDialogue.sizesDictionary["OS"] = 0;
        }
    }

    if (typeof ProductDialogue.productData.options[1] !== 'undefined' && ProductDialogue.productData.options[1].name.toLowerCase() === "size") {
        for (var b = 0; b < ProductDialogue.productData.options[1].values.length; b++) {
            ProductDialogue.sizesDictionary[ProductDialogue.productData.options[1].values[b]] = b;
        }

        if (ProductDialogue.productData.options[1].values.length === 0) {
            ProductDialogue.sizesDictionary["OS"] = 0;
        }
    }

    var sortedSizeofCurrentVariant = [];

    var qty = 0;

    for (let i = 0; i < ProductDialogue.productData.variants.length; i++) {
        var opt1 = ProductDialogue.productData.variants[i].option1;
        var opt2 = ProductDialogue.productData.variants[i].option2;
        var sizeOption;

        if (ProductDialogue.productData.options[0].name.toLowerCase().indexOf("color") !== -1 && (colorName === opt1 || colorName === undefined)) {
            sizeOption = opt2;

            if (sizeOption === null) {
                sizeOption = "OS";
            }
        } else if (typeof ProductDialogue.productData.options[1] !== 'undefined' && ProductDialogue.productData.options[1].name.toLowerCase().indexOf("color") !== -1 && (colorName === opt1 || colorName === undefined)) // 
            sizeOption = opt1;
        else {
            continue;
        }

        var index = ProductDialogue.sizesDictionary[sizeOption];

        qty = 0;

        if (ProductDialogue.productData.variants[i].id in BagDialogue.items) {
            qty = parseInt(BagDialogue.items[ProductDialogue.productData.variants[i].id].quantity);
        }

        var obj = {};
        obj.sizeName = sizeOption;
        obj.isActive = ProductDialogue.productData.variants[i].inventory_quantity - qty > 0;

        sortedSizeofCurrentVariant[index] = obj;
    }

    if (typeof ProductDialogue.currentVariant === 'undefined') {
        ProductDialogue.currentVariant = ProductDialogue.productData.variants[0];
    }

    if (ProductDialogue.currentVariant === null) {
        ProductDialogue.currentVariant = ProductDialogue.productData.variants[0];
    }

    var sortedArr = ProductDialogue.CleanArray(sortedSizeofCurrentVariant);

    var firsIsOutOfStock = false;

    for (var y = 0; y < sortedArr.length; y++) {
        var newSize = ProductDialogue.productSizePrefabDOM.cloneNode(true);
        newSize.innerHTML = sortedArr[y].sizeName;
        newSize.value = sortedArr[y].sizeName;
        ProductDialogue.productSizesContainerDOM.appendChild(newSize);

        if (!sortedArr[y].isActive) {
            newSize.innerHTML = sortedArr[y].sizeName + " OUT OF STOCK";

            if (y === 0) {
                firsIsOutOfStock = true;
                newSize.setAttribute("disabled", "");
            }
        } else {
            newSize.removeAttribute("disabled");
        }
    }

    if (sortedArr.length > 0) {
        if (colorName !== undefined) {
            console.log("disable the color swatch " + colorName);
        }
    }

    if (sortedArr.length === 1) {
        var defName = sortedArr[0].sizeName;
        if (firsIsOutOfStock) {
            defName += " OUT OF STOCK";
        }
        ProductDialogue.productSizesContainerDOM.value = defName;
        ProductDialogue.currentSize = sortedArr[0].sizeName;
    } else {
        ProductDialogue.productSizesContainerDOM.value = "default";
    }

    ProductDialogue.currentVariant = ProductDialogue.UpdateCurrentVariant(colorName, ProductDialogue.productData);
    ProductDialogue.productPriceDOM.innerHTML = Formatter.prototype.formatPrice(ProductDialogue.currentVariant.price);
};

ProductDialogue.PopulateSwatchURL = function (node, url) {
    if (!node || !url) {
        return;
    }

    url = url.replace(/\n/g, "\\n");
    node.src = url;

    node.onerror = function (event) {
        event.target.src = "";
    };
};

//.. Bag Item

ProductDialogue.CreateBagItem = function () {
    let productColor = ProductDialogue.currentColorName ? ProductDialogue.currentColorName : '';
    var bagItem = {};
    bagItem.imageURL = ProductDialogue.imagesList[0].src;
    bagItem.itemTitle = ProductDialogue.productTitleDOM.innerHTML;
    bagItem.quantity = 1;
    bagItem.color = productColor;
    bagItem.size = ProductDialogue.currentSize;
    bagItem.product_id = ProductDialogue.currentVariant.product_id;
    bagItem.id = ProductDialogue.currentVariant.id;
    bagItem.itemPrice = ProductDialogue.currentVariant.price;
    bagItem.totalPriceItem = ProductDialogue.currentVariant.price;
    return bagItem;
};

//.. Open & Close & Add To Bag

ProductDialogue.Open = function (hotspotId, pd) {
    ProductDialogue.ClearValues();
    ProductDialogue.isOpen = true;
    var jsonObj = ProductDialogue.GetJSONObj(hotspotId);

    ProductDialogue.type = jsonObj.type;
    ProductDialogue.hotspotId = hotspotId;
    ProductDialogue.productData = pd;
    // ServisBotController.prototype.OpenPDPEvent(pd.id);
    
    ProductDialogue.view.style.display = "block";
    ProductDialogue.root.className = "dialog_open dialog_opacity_transition main_dialog_depth fade-in";
    
    ProductDialogue.AssignStartingVariant(jsonObj, pd);
    ProductDialogue.PopulatePDPValues();
    ProductDialogue.AssignPrice();
    
    if (!ProductDialogue.TryOpen360 (jsonObj)) {
        ProductDialogue.UpdateImages();
    }
};

ProductDialogue.Close = function () {
    ProductDialogue.isOpen = false;
    ProductDialogue.view.style.display = "none";
    ProductDialogue.root.className = "dialog_close";
    ProductDialogue.productDialogueDefaultContainerDOM.style.display = "none";

    $('[data-toggle="popover"]').popover('hide');

    if (ProductDialogue.hotspotId) {
        AmplitudeAnalytics.prototype.LogHotSpotClosed(ProductDialogue.hotspotId, ProductDialogue.type);
    }
};

ProductDialogue.AddToBag = function () {
    if(PdpdialogController.isUsingUrl)
    {
        window.open(ProductDialogue.productData.url, '_blank');
        return;
    }
    console.log("add to bag");
    var hasSize = ProductDialogue.CheckProductHasSize();
    if (hasSize && !ProductDialogue.currentSize) {
        console.log("no size selected");
        $(function () {
            $('[data-toggle="popover"]').popover();
        });
        return;
    }

    var isInBag = ProductDialogue.currentVariant.id in BagDialogue.items;
    var selectedQuantity = parseInt(ProductDialogue.productQuantityDOM.value);
    selectedQuantity = (isInBag) ? selectedQuantity + parseInt(BagDialogue.items[ProductDialogue.currentVariant.id].quantity) : selectedQuantity;
    var quantityLimit = ProductDialogue.currentVariant.inventory_quantity;

    if (selectedQuantity > quantityLimit) {
        console.log("qty not available");
        ConfirmationPopup.Open("The requested quantity for " + ProductDialogue.productTitleDOM.innerHTML + " is not available.");
        setTimeout(function () {
            ConfirmationPopup.Close();
        }, 2500);
    } else {
        console.log("added to bag");
        var bagItem = ProductDialogue.CreateBagItem();
        ShoppingBag.prototype.AddToCart(bagItem);
        ConfirmationPopup.Open(bagItem.itemTitle + " has been added to your bag.");
        BagDialogue.checkout_title.innerHTML = "Shopping cart" + " (" + BagDialogue.itemsCount + ")";
        setTimeout(function () {
            ConfirmationPopup.Close();
            ProductDialogue.Close();
        }, 2500);

        //CHECKOUT SERVICE
        var lineItem = CheckoutServiceRequests.prototype.LineItem(ProductDialogue.currentVariant.sku, bagItem.quantity, bagItem.itemPrice, ProductDialogue.currentVariant.title, ProductDialogue.currentVariant.id);
        CheckoutServiceController.prototype.CartItem(lineItem);
        AmplitudeAnalytics.prototype.LogItemAddedToCart(ProductDialogue.currentVariant.product_id, bagItem.id, bagItem.itemPrice, bagItem.quantity);
    }
};

var RayCastDetector={},ProdRequests=[];RayCastDetector.ProductPointClicked=function(t){if(rotationAngleSum>5||uiClicked)return!1;for(var o=this.GetRayFromScreenPosition(t),e=new pc.Vec3,i=0;i<productPoints.length;++i){var r=productPoints[i];if(r.script.boundingSphereShape.boundingSphere.intersectsRay(o,e)){var n=r.script.productPoint.pointData.point_id,p=(r.script.productPoint.pointData.variantIds,r.script.productPoint.pointData.position),a=ProductDialogue.GetJSONObj(n),c=a.type;if(console.log(a.type),isUIOpen)return;if("model"==c&&AmplitudeAnalytics.prototype.Log3DHotspotClicked(n,c,r.script.productPoint.pointData.product_ids[0],p),"video"==c)AmplitudeAnalytics.prototype.LogHotSpotClicked(n,c,r.script.productPoint.pointData.url,p),VideoHotSpotController.prototype.Open(a.url);else{var u=r.script.productPoint.pointData.product_ids[0];Spinner.Open(),DataManager.prototype.LoadProductByProductID(u,function(){AmplitudeAnalytics.prototype.LogHotSpotClicked(n,c,u,p),Spinner.Close(),ProductDialogue.Open(n,DataManager.prototype.GetProductByProductType(u))},function(){Spinner.Close(),SpinnerPopup.Open("We could not open this item right now, please try again later")})}return!0}}return!1},RayCastDetector.CheckInArray=function(t,o){for(var e=0;e<o.length;e++)if(o[e].type===t)return!0;return!1},RayCastDetector.GetRayFromScreenPosition=function(t){var o={};o.x=t.x/inputPositionCoef,o.y=t.y/inputPositionCoef;var e=new pc.Ray,i=camera.camera;return i.screenToWorld(o.x,o.y,i.farClip,e.direction),e.origin.copy(i.entity.getPosition()),e.direction.sub(e.origin).normalize(),e},RayCastDetector.OpenById=function(t){var o,e,i,r,n,p=ProductDialogue.GetJSONObj(t);console.log("open by id: "+t);for(var a=0;a<productPoints.length;++a)if((r=productPoints[a]).script.productPoint.pointData.point_id===t){o=r.script.productPoint.pointData.product_ids[0],e=r.script.productPoint.pointData.position,i=p.type,n=r.script.productPoint.pointData.variantIds;break}if(o&&e&&i)if("model"==i&&AmplitudeAnalytics.prototype.Log3DHotspotClicked(t,i,r.script.productPoint.pointData.product_ids[0],e),"video"==i)console.log("opening a video dialogue"),AmplitudeAnalytics.prototype.LogHotSpotClicked(t,i,r.script.productPoint.pointData.url,e),ProductDialogue.open(t,r.script.productPoint.pointData.url,i);else{var c=r.script.productPoint.pointData.product_ids[0];if(RayCastDetector.CheckInArray(c,productDatas))return"model"!==i&&AmplitudeAnalytics.prototype.LogHotSpotClicked(t,i,c,e),ProductDialogue.open(t,DataManager.prototype.GetProductByProductType(c),i,n),!0;for(var u=0;u<ProdRequests.length;u++)if(ProdRequests[u]===c)return!0;ProdRequests.push(c),Spinner.Open(),DataManager.prototype.LoadProductByProductID(c,function(){AmplitudeAnalytics.prototype.LogHotSpotClicked(t,i,c,e),Spinner.Close(),ProductDialogue.open(t,DataManager.prototype.GetProductByProductType(c),i)},function(){Spinner.Close(),SpinnerPopup.Open("We could not open this item right now, please try again later")})}},RayCastDetector.GetHotSpotCoordinates=function(t){for(var o,e=0;e<productPoints.length;++e)if(pickableShape=productPoints[e],pickableShape.script.productPoint.pointData.point_id===t){o=pickableShape.script.productPoint.pointData.position;break}return o};var musicAudioSource,AppMusicManager=pc.createScript("AppMusicManager");AppMusicManager.attributes.add("URL",{type:"string",default:""}),AppMusicManager.attributes.add("isStartMusicOnLoad",{type:"boolean",title:"Start Music On Load",default:!0}),AppMusicManager.attributes.add("startingVolume",{type:"number",title:"Starting Volume 0-1",default:.33}),AppMusicManager.attributes.add("startingVolume2",{type:"number",title:"Starting Volume 1-2",default:1.5});var isMusicStartingLoaded,bgMusicStartVolume,bgMusic,hasBgMusicStarted,bgMusicIsMuted=!1;AppMusicManager.URL="",AppMusicManager.prototype.initialize=function(){musicAudioSource=this.entity.sound,hasBgMusicStarted=!1,bgMusicIsMuted=!1,bgMusicStartVolume=this.startingVolume,isMusicStartingLoaded=this.isStartMusicOnLoad,this.ResetBgMusicVolume()},AppMusicManager.prototype.SetBgMusicVolume=function(t){musicAudioSource.volume=t},AppMusicManager.prototype.ResetBgMusicVolume=function(){AppMusicManager.prototype.SetBgMusicVolume(bgMusicStartVolume)},AppMusicManager.prototype.AssignOnClick=function(){var t=document.getElementById("mute-button"),u=document.getElementById("mute-icon");t.addEventListener("click",function(){bgMusicIsMuted?(u.innerHTML="volume_up",hasBgMusicStarted?musicAudioSource.resume("main"):(hasBgMusicStarted=!0,musicAudioSource.play("main")),AmplitudeAnalytics.prototype.LogUnMuteClicked()):(u.innerHTML="volume_off",hasBgMusicStarted?musicAudioSource.pause("main"):musicAudioSource.stop("main"),AmplitudeAnalytics.prototype.LogMuteClicked()),bgMusicIsMuted=!bgMusicIsMuted}),isMusicStartingLoaded?(u.innerHTML="volume_up",musicAudioSource.play("main"),hasBgMusicStarted=!0,bgMusicIsMuted=!1):(hasBgMusicStarted=!1,bgMusicIsMuted=!0)};var Ui=pc.createScript("ui");Ui.attributes.add("baseCSS",{type:"asset",assetType:"css",title:"base CSS"}),Ui.attributes.add("mainCSS",{type:"asset",assetType:"css",title:"Main CSS"}),Ui.attributes.add("popupHTML",{type:"asset",assetType:"html",title:"Pop Up HTML"}),Ui.attributes.add("spinnerPopupHTML",{type:"asset",assetType:"html",title:"Spinner Pop Up HTML"}),Ui.attributes.add("spinnerHTML",{type:"asset",assetType:"html",title:"Spinner HTML"}),Ui.attributes.add("details_popup",{type:"asset",assetType:"html",title:"Pop-up  HTML"}),Ui.attributes.add("uiMainJS",{type:"asset",assetType:"script",title:"UI Main JS"}),Ui.attributes.add("uiWindowsJS",{type:"asset",assetType:"html",title:"windows-debug"});var isUIOpen,uiDiv,clientWidth,innerWidthOfWindow,clientHeight,innerHeightOfWindow,bodyHtml,bodyWidth,bodyHeight,screenRatio,uiClicked=!1,uiDown=!1,resetUIClick=!1,setHTMLFixed=!1,ua=navigator.userAgent.toLowerCase(),isAndroid=ua.indexOf("android")>-1,currentLoadingVideos=[],pendingVideos=[],maxLoadingVideosAtOnce=2,currentLoadingImages=[],pendingImages=[],maxLoadingImagesAtOnce=5;Ui.prototype.initialize=function(){isLandscape=graphicDevice.width>graphicDevice.height,this.AddCSS(this.mainCSS),this.AddCSS(this.baseCSS),(uiDiv=document.createElement("div")).id="UI",uiDiv.style.display="none",uiDiv.className="ghost-ui",document.body.appendChild(uiDiv),window.onSplashHide=this.EnableUI,this.AddHtmlToUI(this.popupHTML).className="dialog_close",this.AddHtmlToUI(this.spinnerPopupHTML).className="dialog_close",this.AddHtmlToUI(this.spinnerHTML).className="dialog_close",UI.bagDialogueBtn=document.getElementById("open_bag_btn"),UI.menuDropdownBtn=document.getElementById("menu_btn"),ConfirmationPopup.InitValues(),SpinnerPopup.InitValues(),Spinner.InitValues();for(var e=document.getElementsByClassName("preventCanvasEvents"),t=0;t<e.length;t++)e[t].addEventListener("mousedown",this.MouseDown),e[t].addEventListener("mouseup",this.MouseUp),e[t].addEventListener("touchstart",this.TouchStart),e[t].addEventListener("touchend",this.TouchEnd);$("#co_phone").keydown(function(e){var t=e.charCode||e.keyCode||0;return $text=$(this),8!==t&&9!==t&&(3===$text.val().length&&$text.val($text.val()+"-"),7===$text.val().length&&$text.val($text.val()+"-")),8==t||9==t||46==t||t>=48&&t<=57||t>=96&&t<=105}),isAndroid&&(window.addEventListener("orientationchange",function(){BagDialogue.viewport&&(BagDialogue.viewport.content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"),BagDialogue.currentFocusedInput&&(BagDialogue.currentFocusedInput.blur(),BagDialogue.currentFocusedInput=!1)}),BagDialogue.viewport=this.AddMeta("viewport","width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no")),window.addEventListener("orientationchange",function(){UpdateHotspots()});var i=document.createElement("script");i.src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js",document.head.appendChild(i),(i=document.createElement("script")).src="https://s3.amazonaws.com/cdn.nextretail.com/goop/1/jquery.angle1.js",i.type="text/javascript",document.head.appendChild(i);var n=document.createElement("link");n.href="https://s3.amazonaws.com/cdn.nextretail.com/goop/1/css/angle.css",n.type="text/css",n.rel="stylesheet",document.head.appendChild(n);document.getElementById("addToBag-btn-mobile")},videoDOMDictionary={},Ui.prototype.AttachIECss=function(){var e=document.createElement("link");e.rel="stylesheet",e.href=this.ieCSS.getFileUrl(),e.type="text/css";var t=document.createElement("div");t.appendChild(e),t.innerHTML="\x3c!--[if IE]>"+t.innerHTML+"<![endif]--\x3e",document.head.appendChild(t)},Ui.prototype.AddMeta=function(e,t){var i=document.createElement("meta");return i.name=e,i.content=t,document.head.appendChild(i),i},Ui.prototype.EnableUI=function(){uiDiv.style.display="block",setHTMLFixed=!0},Ui.prototype.AddCSS=function(e){var t=document.createElement("link");t.href=e.getFileUrl(),t.rel="stylesheet",document.head.appendChild(t)},Ui.prototype.AddHtmlToUI=function(e){var t=document.createElement("div");return t.innerHTML=e.resource||"",uiDiv.appendChild(t),t},Ui.prototype.AddScript=function(e){var t=document.createElement("script");t.innerHTML=e,document.body.appendChild(t)},Ui.prototype.MouseDown=function(e){uiDown=!0,uiClicked=!0},Ui.prototype.click=function(e){uiDown=!0,uiClicked=!0},Ui.prototype.MouseUp=function(e){resetUIClick=!0},Ui.prototype.TouchStart=function(e){uiDown=!0,uiClicked=!0},Ui.prototype.TouchEnd=function(e){resetUIClick=!0};var ConfirmationPopup={InitValues:function(){ConfirmationPopup.dialogueDOM=document.getElementById("confirmation_popup"),ConfirmationPopup.text=document.getElementById("popup-information"),ConfirmationPopup.closeBtn=document.getElementById("popup-close-btn"),ConfirmationPopup.closeBtn.addEventListener("click",ConfirmationPopup.Close),ConfirmationPopup.dialogueDOM.style.display="none"},Open:function(o){o&&(this.text.innerHTML=o),this.dialogueDOM.style.display="block",this.dialogueDOM.parentNode.className="dialog_open dialog_opacity_transition overlay_dialog_depth"},Close:function(){ConfirmationPopup.dialogueDOM.style.display="none",ConfirmationPopup.dialogueDOM.parentNode.className="dialog_close"}};var videoPointInstance,VideoProductPoint=pc.createScript("videoProductPoint");VideoProductPoint.prototype.initialize=function(){videoPointInstance=this.entity,this.productDatas=[],this.defaultMinScale=.023,this.defaultMaxScale=.023,this.minVisDist=4,this.maxVisDist=7,this.mouseOnPoint=!1;var t=this.entity.sprite.color;this.tempColor=t,this.fullOpaque=t,this.fullTransparent=new pc.Color(t.r,t.g,t.b,0),this.pointColor=t,this.pointBgColor=t,this.entity.element.on("mousedown",this.onTapped,this.entity)},VideoProductPoint.prototype.GetProductData=function(t){return productDatas[t]},VideoProductPoint.prototype.GetProductDatas=function(){return productDatas},VideoProductPoint.prototype.GetPointID=function(){return this.pointData.point_id};var CheckoutServiceRequests=pc.createScript("CheckoutServiceRequests");CheckoutServiceRequests.prototype.initialize=function(){},CheckoutServiceRequests.prototype.update=function(e){},CheckoutServiceRequests.prototype.Address=function(e,t,r,o,c,i,u,s,n,p,a,d,v){var R={};return R.first_name=e,R.last_name=t,R.company=r,R.phone=o,R.email=c,R.address1=i,R.address2=u,R.city=s,R.province=n,R.province_code=p,R.zip=a,R.country=d,R.country_code=v,R},CheckoutServiceRequests.prototype.CreditCard=function(e,t,r,o,c,i,u){var s={};return s.first_name=e,s.last_name=t,s.number=r,s.cvv=o,s.brand=c,s.expiry_month=i,s.expiry_year=u,s},CheckoutServiceRequests.prototype.LineItem=function(e,t,r,o,c){var i={};return i.variant_id=e,i.quantity=t,i.price=r,i.name=o,i.product_id=c,i},CheckoutServiceRequests.prototype.ShippingRate=function(e,t,r){var o={};return o.id=e,o.price=t,o.title=r,o},CheckoutServiceRequests.prototype.AddItemsToCartRequest=function(e,t,r,o){var c={};return c.cart_id=e,c.vendor=t,c.store_id=r,c.products=[],c.products.push(o),c},CheckoutServiceRequests.prototype.UpdateItemQuantityRequest=function(e,t){var r={};return r.cart_id=e,r.products=[],r.products.push(t),r},CheckoutServiceRequests.prototype.CreateCartRequest=function(e,t,r){var o={};return o.vendor=e,o.store_id=t,o.products=[],o.products.push(r),o},CheckoutServiceRequests.prototype.CreateOrderRequest=function(e,t,r,o,c,i,u,s){var n={};return n.token=e,n.ecommerce_id=t,n.cart_id=r,n.vendor=o,n.store_id=c,n.shipping_method=i,n.credit_card=u,n.billing_address=s,n},CheckoutServiceRequests.prototype.SetShippingRate=function(e,t,r,o,c,i,u){var s={};return s.token=e,s.ecommerce_id=t,s.cart_id=r,s.vendor=o,s.store_id=c,s.shipping_method=i,s.billing_address=u,s},CheckoutServiceRequests.prototype.GetCartItemsRequest=function(e){var t={};return t.cart_id=e,t},CheckoutServiceRequests.prototype.GetCartRequest=function(e){var t={};return t.cart_id=e,t},CheckoutServiceRequests.prototype.GetShippingRatesRequest=function(e,t,r,o,c,i){var u={};return u.token=e,u.ecommerce_id=t,u.cart_id=r,u.email=o,u.line_items=c,u.shipping_address=i,u},CheckoutServiceRequests.prototype.RemoveItemsFromCartRequest=function(e,t){var r={};return r.cart_id=e,r.products=[],r.products.push(t),r},CheckoutServiceRequests.prototype.SetCartRequest=function(e,t,r,o){var c={};c.token=e,c.ecommerce_id=t,c.cart_id=r,c.line_items=[];for(var i=0;i<o.length;i++)c.line_items.push(o[i]);return c},CheckoutServiceRequests.prototype.AddItemsToCartResponse=function(e){var t={};return t.cart_id=e,t},CheckoutServiceRequests.prototype.CreateCartResponse=function(e){var t={};return t.cart_id=e,t},CheckoutServiceRequests.prototype.CreateOrderResponse=function(e,t,r,o){var c={};return c.order_id=e,c.email=t,c.currency=r,c.total=o,c},CheckoutServiceRequests.prototype.GetCartItemsResponse=function(e,t){var r={};return r.cart_id=e,r.products=t,r},CheckoutServiceRequests.prototype.GetCartResponse=function(e){var t={};return t.cart=e,t},CheckoutServiceRequests.prototype.GetShippingRatesResponse=function(e,t,r){var o={};return o.token=e,o.ecommerce_id=t,o.shipping_rates=r,o},CheckoutServiceRequests.prototype.RemoveItemsFromCartResponse=function(e){var t={};return t.cart_id=e,t};var CheckoutServiceController=pc.createScript("CheckoutServiceController");CheckoutServiceController.attributes.add("endpoint",{type:"string",default:""}),CheckoutServiceController.attributes.add("vendor",{type:"string",default:"next_rev"}),CheckoutServiceController.attributes.add("store_id",{type:"string",default:"001"}),CheckoutServiceController.attributes.add("promo",{type:"string",default:""});var Checkout={};CheckoutServiceController.prototype.initialize=function(e){Checkout.promotion={},Checkout.promotion.name=this.promo,Checkout.promotion.active=!1,Checkout.endpoint=this.endpoint,Checkout.vendor=this.vendor,Checkout.store_id=this.store_id,Checkout.cart_id="",Checkout.token="",Checkout.ecommerce_id="",Checkout.shipping_method="",Checkout.email="",Checkout.lineItems=[],Checkout.shipping_address={},Checkout.billing_address={},Checkout.credit_card={},Checkout.shipping_rates={},Checkout.tax=0},CheckoutServiceController.prototype.update=function(e){},CheckoutServiceController.prototype.CartItem=function(e){var t=parseInt(e.quantity);if(""===Checkout.cart_id)log("Create with cart item"),CheckoutServiceController.prototype.CreateCart(e);else if(0===t)log("Remove cart item"),CheckoutServiceController.prototype.RemoveItemsFromCart(e);else if(t>=1){for(var o=0;o<Checkout.lineItems.length;o++)if(Checkout.lineItems[o].variant_id===e.variant_id)return log("update cart item"),void CheckoutServiceController.prototype.UpdateCartItem(e);log("Add cart item"),CheckoutServiceController.prototype.AddItemsToCart(e)}},CheckoutServiceController.prototype.UpdateCartItem=function(e){var t=CheckoutServiceRequests.prototype.UpdateItemQuantityRequest(Checkout.cart_id,e),o=JSON.stringify(t);Apigateway.PutRequest(Checkout.endpoint,"/checkout/carts/"+Checkout.cart_id+"/items",o,CheckoutServiceController.prototype.AddItemsToCartCallback)},CheckoutServiceController.prototype.AddItemsToCart=function(e){var t=CheckoutServiceRequests.prototype.AddItemsToCartRequest(Checkout.cart_id,Checkout.vendor,Checkout.store_id,e),o=JSON.stringify(t);Checkout.lineItems.push(e),Apigateway.PostRequest(Checkout.endpoint,"/checkout/carts/"+Checkout.cart_id+"/items",o,CheckoutServiceController.prototype.AddItemsToCartCallback),GoogleAnalytics.prototype.AddItemsToCart(e)},CheckoutServiceController.prototype.CreateCart=function(e){var t=CheckoutServiceRequests.prototype.CreateCartRequest(Checkout.vendor,Checkout.store_id,e),o=JSON.stringify(t);Checkout.lineItems.push(e),Apigateway.PostRequest(Checkout.endpoint,"/checkout/carts",o,CheckoutServiceController.prototype.CreateCartCallback),GoogleAnalytics.prototype.AddItemsToCart(e)},CheckoutServiceController.prototype.RemoveItemsFromCart=function(e){for(var t=CheckoutServiceRequests.prototype.RemoveItemsFromCartRequest(Checkout.cart_id,e),o=JSON.stringify(t),r=0,c=0;c<Checkout.lineItems.length;c++)if(console.log(Checkout.lineItems[c].product_id+" | "+e.variant_id),Checkout.lineItems[c].product_id===e.variant_id){r=c;break}Checkout.lineItems.splice(r,1),Apigateway.DeleteRequest(Checkout.endpoint,"/checkout/carts/"+Checkout.cart_id+"/items",o,CheckoutServiceController.prototype.RemoveItemsFromCartCallback),GoogleAnalytics.prototype.RemoveItemsFromCart(e)},CheckoutServiceController.prototype.CreateOrder=function(){var e=CheckoutServiceRequests.prototype.CreateOrderRequest(Checkout.token,Checkout.ecommerce_id,Checkout.cart_id,Checkout.vendor,Checkout.store_id,Checkout.shipping_method,Checkout.credit_card,Checkout.billing_address),t=JSON.stringify(e);Apigateway.PostRequest(Checkout.endpoint,"/checkout/orders",t,CheckoutServiceController.prototype.CreateOrderCallback)},CheckoutServiceController.prototype.GetCart=function(){var e=JSON.stringify(t),t=CheckoutServiceRequests.prototype.GetCartRequest(Checkout.cart_id);Apigateway.GetRequest(Checkout.endpoint,"/checkout/carts/"+Checkout.cart_id,e,CheckoutServiceController.prototype.GetCartCallback)},CheckoutServiceController.prototype.GetCartItems=function(){var e=CheckoutServiceRequests.prototype.GetCartItemsRequest(Checkout.cart_id),t=JSON.stringify(e);Apigateway.GetRequest(Checkout.endpoint,"/checkout/carts/"+Checkout.cart_id+"/items",t,CheckoutServiceController.prototype.GetCartItemsCallback)},CheckoutServiceController.prototype.GetShippingRates=function(){var e=CheckoutServiceRequests.prototype.GetShippingRatesRequest(Checkout.token,Checkout.ecommerce_id,Checkout.cart_id,Checkout.email,Checkout.lineItems,Checkout.shipping_address),t=JSON.stringify(e);Apigateway.PostRequest(Checkout.endpoint,"/checkout/carts/"+Checkout.cart_id+"/shipping_rates",t,CheckoutServiceController.prototype.GetShippingRatesCallback)},CheckoutServiceController.prototype.SetShippingRate=function(){var e=CheckoutServiceRequests.prototype.SetShippingRate(Checkout.token,Checkout.ecommerce_id,Checkout.cart_id,Checkout.vendor,Checkout.store_id,Checkout.shipping_method,Checkout.billing_address),t=JSON.stringify(e);Apigateway.PostRequest(Checkout.endpoint,"/checkout/shipping_method",t,CheckoutServiceController.prototype.SetShippingRateCallback)},CheckoutServiceController.prototype.SetCart=function(){var e=CheckoutServiceRequests.prototype.SetCartRequest(Checkout.token,Checkout.ecommerce_id,Checkout.cart_id,Checkout.lineItems),t=JSON.stringify(e);Apigateway.PostRequest(Checkout.endpoint,"/checkout/carts/"+Checkout.cart_id,t,CheckoutServiceController.prototype.SetCartCallback)},CheckoutServiceController.prototype.AddItemsToCartCallback=function(e,t){var o={};o.cart_id=e.cart_id,CheckoutServiceController.prototype.UpdateCartId(o.cart_id)},CheckoutServiceController.prototype.CreateCartCallback=function(e,t){var o={};o.cart_id=e.cart_id,Checkout.cart_id=o.cart_id},CheckoutServiceController.prototype.CreateOrderCallback=function(e,t){if(t){var o={};o.order_id=e.order_id,o.email=e.email,o.currency=e.currency,o.total=e.total,AmplitudeAnalytics.prototype.LogPurchase(Checkout.cart_id,o.order_id,o.total,o.currency,Checkout.tax,Checkout.shipping_method,Checkout.lineItems),Checkout.cart_id="",Checkout.ecommerce_id="",Checkout.token="",GoogleAnalytics.prototype.Order(o.order_id,o.total,o.currency,Checkout.tax,Checkout.shipping_method,Checkout.lineItems,""),BillingTab.prototype.OnOrder(e.order_id,t)}else BillingTab.prototype.OnOrder(null,!1)},CheckoutServiceController.prototype.GetCartCallback=function(e,t){e.cart},CheckoutServiceController.prototype.GetCartItemsCallback=function(e,t){var o={};o.cart_id=e.cart_id,o.products=e.products},CheckoutServiceController.prototype.GetShippingRatesCallback=function(e,t){var o={};o.token=e.token,o.ecommerce_id=e.ecommerce_id,o.shipping_rates=e.shipping_rates,o.tax_lines=e.tax_lines,Checkout.token=e.token,Checkout.ecommerce_id=e.ecommerce_id,Checkout.shipping_rates=e.shipping_rates;for(var r=0,c=0;c<o.tax_lines.length;c++)r+=parseFloat(o.tax_lines[c].price);Checkout.tax=r,ShippingMethodsTab.prototype.UpdateShippingAddress(e),ShippingMethodsTab.prototype.UpdateTaxLines(r),GoogleAnalytics.prototype.Event("Get Shipping Rates")},CheckoutServiceController.prototype.RemoveItemsFromCartCallback=function(e,t){e.cart_id},CheckoutServiceController.prototype.SetShippingRateCallback=function(e,t){CheckoutServiceController.prototype.CreateOrder()},CheckoutServiceController.prototype.SetCartCallback=function(e,t){Checkout.token=e.token,Checkout.ecommerce_id=e.ecommerce_id,Checkout.cart_id=e.cart_id,CheckoutServiceController.prototype.GetShippingRates()},CheckoutServiceController.prototype.UpdateShippingAddress=function(e){Checkout.shipping_address=e},CheckoutServiceController.prototype.UpdateBillingAddress=function(e){Checkout.billing_address=e},CheckoutServiceController.prototype.UpdateCreditCard=function(e){Checkout.credit_card=e},CheckoutServiceController.prototype.UpdateEmail=function(e){Checkout.email=e},CheckoutServiceController.prototype.UpdateShippingMethod=function(e){Checkout.shipping_method=e},CheckoutServiceController.prototype.UpdateEcommerceId=function(e){Checkout.ecommerce_id=e},CheckoutServiceController.prototype.UpdateCartId=function(e){Checkout.cart_id=e},CheckoutServiceController.prototype.Redirect=function(e){window.location=e},CheckoutServiceController.prototype.SameAsShippingAddress=function(){Checkout.billing_address=Checkout.shipping_address},CheckoutServiceController.prototype.UpdatePromotion=function(e){!0===e&&(Checkout.promotion.active=e)},CheckoutServiceController.prototype.GetTotal=function(){for(var e=0,t=0;t<Checkout.lineItems.length;t++)e+=parseFloat(Checkout.lineItems[t].price);for(var o=0,r=0;r<Checkout.shipping_rates.length;r++)Checkout.shipping_rates[r].title==Checkout.shipping_method&&(o+=parseFloat(Checkout.shipping_rates[r].price));var c=e+o+parseFloat(Checkout.tax);return Formatter.prototype.formatPrice(c)};var Apigateway=pc.createScript("ApiGateway");Apigateway.prototype.initialize=function(){},Apigateway.prototype.update=function(e){},Apigateway.GenerateRequest=function(e,t,s,n){var a=new XMLHttpRequest,r=e+t;return a.open(s,r),a.onreadystatechange=function(){if(4==this.readyState)if(200==this.status){if(n)if(this.responseText){var e=JSON.parse(this.responseText);n(e,!0)}else n(null,!0)}else 400!=this.status&&500!=this.status||n&&n(null,!1)},a},Apigateway.GetRequest=function(e,t,s,n){console.log(s);var a=this.GenerateRequest(e,t,"GET",n);return a.send(s),a.responseText},Apigateway.PostRequest=function(e,t,s,n){console.log(s);var a=this.GenerateRequest(e,t,"POST",n);return a.send(s),a.responseText},Apigateway.DeleteRequest=function(e,t,s,n){console.log(s);var a=this.GenerateRequest(e,t,"DELETE",n);return a.send(s),a.responseText},Apigateway.PutRequest=function(e,t,s,n){console.log(s);var a=this.GenerateRequest(e,t,"PUT",n);return a.send(s),a.responseText},Apigateway.HeadRequest=function(e,t,s,n){console.log(s);var a=this.GenerateRequest(e,t,"HEAD",n);return a.send(s),a.responseText};var CredCardValidator=pc.createScript("CreditCardValidator");CredCardValidator.prototype.initialize=function(){},CredCardValidator.prototype.update=function(t){},CredCardValidator.prototype.Test=function(){var t=["378282246310005","4012888888881881","6011111111111117","4222222222222","5019143686976016","5019717010103742","6331101999990016","30130781021802","5147004213414803","6011491706918120","379616680189541","4916111026621797"];for(i=0;i<t.length;i++){log("card "+i+" : "+t[i]);var r=this.Luhn10(t[i]);log("is valid: "+r);var n=this.GetBrand(t[i]);log("brand: "+n),log("----")}},CredCardValidator.prototype.isValidExpiryDate=function(t){var r=(t=t.toString()).split("/"),n=r[0],e="20"+r[1];t=n.toString()+"/"+e.toString();return/(0?[1-9]|1[0-2])\/(\d{2})/.test(t)},CredCardValidator.prototype.FormatNumber=function(t){var r="";t=(t=t.toString()).replace(/\D/g,"");for(var n=0;n<t.length&&n<19;n++)n%4==0&&0!==n&&(r+="-"),r+=t[n];return r},CredCardValidator.prototype.Luhn10=function(t){if(!t)return!1;if(/[^0-9-\s]+/.test(t))return!1;for(var r=0,n=!1,e=(t=t.replace(/\D/g,"")).length-1;e>=0;e--){var a=t.charAt(e),i=parseInt(a,10);n&&(i*=2)>9&&(i-=9),r+=i,n=!n}return r%10==0},CredCardValidator.prototype.GetBrand=function(t){return this.IsTroy(t)?"Troy":this.IsVerve(t)?"Verve":this.IsBankCard(t)?"BankCard":this.IsVisaElectron(t)?"VisaElectron":this.IsJCB(t)?"JCB":this.IsDankort(t)?"Dankort":this.IsMIR(t)?"MIR":this.IsSwitch(t)?"Solo":this.IsSolo(t)?"Switch":this.IsInstaPayment(t)?"InstaPayment":this.IsInterPayment(t)?"InterPayment":this.IsDiscoverCard(t)?"DI":this.IsMasterCard(t)?"MC":this.IsRUPay(t)?"RuPay":this.IsDinersClub(t)?"DinersClub":this.IsAmericanExpress(t)?"AE":this.IsChinaUnionPay(t)?"ChinaUnionPay":this.IsMaestro(t)?"Maestro":this.IsVisa(t)?"VI":this.IsUATP(t)?"UATP":"Error"},CredCardValidator.prototype.IsAmericanExpress=function(t){return this.DoesLengthEqual(t,15)&&this.ContainsINNValue(t,[34,37])},CredCardValidator.prototype.IsBankCard=function(t){return this.DoesLengthEqual(t,16)&&(this.ContainsINNValue(t,[5610])||this.ContainsINNRange(t,560221,560225))},CredCardValidator.prototype.IsChinaUnionPay=function(t){return this.IsLengthBetween(t,16,19)&&this.ContainsINNValue(t,[62])},CredCardValidator.prototype.IsDinersClub=function(t){if(this.DoesLengthEqual(t,16)&&this.ContainsINNValue(t,[54]))return!0;return!(!this.DoesLengthEqual(t,14)||!this.ContainsINNValue(t,[36]))||!(!this.DoesLengthEqual(t,14)||!this.ContainsINNRange(t,300,305))},CredCardValidator.prototype.IsDiscoverCard=function(t){return this.IsLengthBetween(t,16,19)&&(this.ContainsINNValue(t,[6011,644,645,648,649,65])||this.ContainsINNRange(t,622126,622925))},CredCardValidator.prototype.IsRUPay=function(t){return this.DoesLengthEqual(t,16)&&this.ContainsINNValue(t,[60,6051])},CredCardValidator.prototype.IsInterPayment=function(t){return this.IsLengthBetween(t,16,19)&&this.ContainsINNValue(t,[636])},CredCardValidator.prototype.IsInstaPayment=function(t){return this.DoesLengthEqual(t,16)&&this.ContainsINNValue(t,[637,638,639])},CredCardValidator.prototype.IsJCB=function(t){return this.IsLengthBetween(t,16,19)&&this.ContainsINNRange(t,3528,3589)},CredCardValidator.prototype.IsMaestro=function(t){return this.IsLengthBetween(t,12,19)&&this.ContainsINNValue(t,[50,56,57,58,67,639])},CredCardValidator.prototype.IsDankort=function(t){return this.DoesLengthEqual(t,16)&&this.ContainsINNValue(t,[5019,4571])},CredCardValidator.prototype.IsMIR=function(t){return this.DoesLengthEqual(t,16)&&this.ContainsINNRange(t,2200,2204)},CredCardValidator.prototype.IsMasterCard=function(t){return this.DoesLengthEqual(t,16)&&(this.ContainsINNRange(t,51,55)||this.ContainsINNRange(t,2221,2720))},CredCardValidator.prototype.IsTroy=function(t){return this.DoesLengthEqual(t,16)&&this.ContainsINNRange(t,979200,979289)},CredCardValidator.prototype.IsVisa=function(t){return this.ContainsINNValue(t,[4])&&(this.DoesLengthEqual(13)||this.DoesLengthEqual(16)||this.DoesLengthEqual(19))},CredCardValidator.prototype.IsVisaElectron=function(t){return this.DoesLengthEqual(t,16)&&this.ContainsINNValue(t,[4026,417500,4508,4844,4913,4917])},CredCardValidator.prototype.IsUATP=function(t){return this.DoesLengthEqual(t,15)&&this.ContainsINNValue(t,[1])},CredCardValidator.prototype.IsVerve=function(t){return(this.DoesLengthEqual(t,16)||this.DoesLengthEqual(19))&&(this.ContainsINNRange(t,506099,506198)||this.ContainsINNRange(t,650002,650027))},CredCardValidator.prototype.IsSolo=function(t){return this.ContainsINNValue(t,[4903,4905,4936,564182,633110,6333,6759])&&(this.DoesLengthEqual(16)||this.DoesLengthEqual(18)||this.DoesLengthEqual(19))},CredCardValidator.prototype.IsSwitch=function(t){return this.ContainsINNValue(t,[4903,4905,4936,564182,633110,6333,6759])&&(this.DoesLengthEqual(16)||this.DoesLengthEqual(18)||this.DoesLengthEqual(19))},CredCardValidator.prototype.IsLengthBetween=function(t,r,n){return t.length>=r&&t.length<=n},CredCardValidator.prototype.DoesLengthEqual=function(t,r){return t.length===r},CredCardValidator.prototype.ContainsINNValue=function(t,r){var e=0,a=0;for(n=0;n<r.length;n++){if(e=t.substring(0,String(r[n]).length),null===(a=Number(r[n])))return!1;if(Number(e)===a)return!0}return!1},CredCardValidator.prototype.ContainsINNRange=function(t,r,n){var e=t.substring(0,String(r).length),a=Number(e);return a>=r&&a<=n};var GoogleMaps=pc.createScript("GoogleMaps");GoogleMaps.prototype.initialize=function(){},GoogleMaps.prototype.update=function(e){},GoogleMaps.prototype.ZipCodeLookup=function(e,s){log("zipcode "+e);var t=String(e);if(this.APICall(e,s),5!==String(t).length)return void 0!==s&&s(null),null},GoogleMaps.prototype.IsValidAddress=function(e,s,t,o,n,a){s=s&&""!==s?s.replace(/[\W_]+/g," ")+"+":"";var l=(e=e.replace(/[\W_]+/g," "))+"+"+s+(t=t.replace(/[\W_]+/g," "))+"+"+o+"+"+(n=n.replace(/[\W_]+/g," "));l=l.replace(new RegExp(" ","g"),"+"),this.APICall(l,a)},GoogleMaps.prototype.APICall=function(e,s){var t=new XMLHttpRequest,o="https://maps.googleapis.com/maps/api/geocode/json?address="+e+"&key=AIzaSyC_dDTE-TnlDKbemFQMCpSuOQDHTLojVG8";t.open("GET",o),t.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e={};try{var t=JSON.parse(this.responseText);if("ZERO_RESULTS"==t.status||0===t.results.length)e=null;else{for(var o,n,a,l,r,p,d,c=0;c<t.results[0].address_components.length;c++)"street_number"===t.results[0].address_components[c].types[0]&&(o=t.results[0].address_components[c].long_name),"route"===t.results[0].address_components[c].types[0]&&(n=t.results[0].address_components[c].long_name),"locality"===t.results[0].address_components[c].types[0]&&(a=t.results[0].address_components[c].long_name),"administrative_area_level_2"===t.results[0].address_components[c].types[0]&&(l=t.results[0].address_components[c].long_name),"administrative_area_level_1"===t.results[0].address_components[c].types[0]&&(r=t.results[0].address_components[c].long_name),"country"===t.results[0].address_components[c].types[0]&&(p=t.results[0].address_components[c].long_name),"postal_code"===t.results[0].address_components[c].types[0]&&(d=t.results[0].address_components[c].long_name);e.streetnumber=o,e.street=n,e.city=a,e.township=void 0,e.county=l,e.state=r,e.zip=d,e.country=p}GoogleMaps.prototype.Callback(e,s)}catch(e){GoogleMaps.prototype.Callback(null,s),console.log(e)}}},t.send()},GoogleMaps.prototype.Callback=function(e,s){return e?!0===e?(s(e),!0):e?(s(e),!0):(s(null),!1):(s(null),!1)};var EmailValidator=pc.createScript("EmailValidator");EmailValidator.prototype.initialize=function(){},EmailValidator.prototype.update=function(t){},EmailValidator.prototype.Validate=function(t){if(!t)return!1;log("EmailValidator.prototype.Validate called");var a=new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");if(t.length<5||t.length>61)return!1;if("string"!=typeof t)return!1;if(!a.test(t))return!1;var i=t.split("@")[1];EmailValidator.prototype.Connect(i,EmailValidator.prototype.ValidationCallback);return!0},EmailValidator.prototype.ValidationCallback=function(t){},EmailValidator.prototype.Connect=function(t,a){var i=new XMLHttpRequest;return log(t),i.open("GET","https://"+t,!1),i.onreadystatechange=function(){4!=this.readyState||200!=this.status&&401!=this.status?4===this.readyState&&200!==this.status&&a(!0):a(!0)},i};var ClientId,GoogleAnalytics=pc.createScript("GoogleAnalytics");GoogleAnalytics.prototype.initialize=function(){this.StartSession()},GoogleAnalytics.prototype.gItem=function(t){var e={};return e.name=t.name,e.id=t.variant_id,e.price=t.price,e.quantity=t.quantity,e},GoogleAnalytics.prototype.StartSession=function(){try{ClientId=String(Math.round(1e7*Math.random())),gtag("set",{client_id:ClientId}),this.Event("session_started")}catch(t){}},GoogleAnalytics.prototype.Event=function(t){try{gtag("event",String(t))}catch(t){}},GoogleAnalytics.prototype.AddPaymentInfo=function(){try{gtag("event","add_payment_info")}catch(t){}},GoogleAnalytics.prototype.AddItemsToCart=function(t){try{var e=[],o=GoogleAnalytics.prototype.gItem(t);e.push(o),gtag("event","add_to_cart",{value:t.price,currency:"USD",items:e})}catch(t){}},GoogleAnalytics.prototype.RemoveItemsFromCart=function(t){try{var e=[],o=GoogleAnalytics.prototype.gItem(t);e.push(o),gtag("event","remove_from_cart",{value:t.price,currency:"USD",items:e})}catch(t){}},GoogleAnalytics.prototype.ViewItem=function(t){try{var e=[],o=GoogleAnalytics.prototype.gItem(t);e.push(o),gtag("event","view_item",{items:e})}catch(t){}},GoogleAnalytics.prototype.VantagePoint=function(t){try{gtag("event","vantage_point",{id:String(t)})}catch(t){}},GoogleAnalytics.prototype.Order=function(t,e,o,n,a,i,c){try{gtag("event","purchase",{transaction_id:id,value:e,currency:o,tax:n,shipping:a,items:i,coupon:c})}catch(t){console.warn(t)}};var Formatter=pc.createScript("Formatter");Formatter.prototype.initialize=function(){},Formatter.prototype.formatPrice=function(r){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2}).format(r)};var DetailsPopup={InitValues:function(){DetailsPopup.dialogueDOM=document.getElementById("details_popup"),DetailsPopup.closeBtn=document.getElementById("details-close-btn"),DetailsPopup.closeBtn.addEventListener("click",DetailsPopup.Close),DetailsPopup.dialogueDOM.style.display="none"},Open:function(e){e&&(DetailsPopup.text.innerHTML=e),DetailsPopup.dialogueDOM.style.display="block",DetailsPopup.dialogueDOM.parentNode.className="dialog_open dialog_opacity_transition overlay_dialog_depth"},Close:function(){DetailsPopup.dialogueDOM.style.display="none",DetailsPopup.dialogueDOM.parentNode.className="dialog_close"}};var AmplitudeAnalytics=pc.createScript("AmplitudeAnalytics"),isDebugMode=!1;AmplitudeAnalytics.prototype.initialize=function(){name=name.replace(/[\[\]]/g,"\\$&");var t=new RegExp("[?&]debug(=([^&#]*)|&|#|$)").exec(window.location.href);isDebugMode=!(!t||!t[2])&&"true"==decodeURIComponent(t[2].replace(/\+/g," "))},AmplitudeAnalytics.prototype.LogEvent=function(t,e){e||(e={}),isDebugMode&&console.log("[AMPLITUDE] "+t+" "+JSON.stringify(e));try{amplitude.getInstance().logEvent(t,e)}catch(t){isDebugMode||console.warn(t)}},AmplitudeAnalytics.prototype.LogLoadingCompleted=function(){this.LogEvent("loading_complete")},AmplitudeAnalytics.prototype.LogStartButtonClicked=function(){this.LogEvent("start_button_clicked")},AmplitudeAnalytics.prototype.LogQuickNavClicked=function(t){if(!t)throw"Parameter 'button' cannot be empty.";this.LogEvent("quick_nav_clicked",{value:t})},AmplitudeAnalytics.prototype.LogMovedToVantagePoint=function(t,e){if(t<0)throw"Parameter 'id' must be a positive integer.";if(!e)throw"Parameter 'position' cannot be null.";this.LogEvent("moved_to_vantage_point",{id:t,position:JSON.stringify(e)})},AmplitudeAnalytics.prototype.Log3DHotspotClicked=function(t,e,o,n){if(t<0)throw"Parameter 'id' must be a positive integer.";if(!e)throw"Parameter 'type' cannot be null.";if(!o)throw"Parameter 'value' cannot be null.";if(!n)throw"Parameter 'position' cannot be null.";this.LogEvent("3D_hotspot_clicked",{id:t,type:e,value:o,position:JSON.stringify(n)})},AmplitudeAnalytics.prototype.LogHotSpotClicked=function(t,e,o,n){if(t<0)throw"Parameter 'id' must be a positive integer.";if(!e)throw"Parameter 'type' cannot be null.";if(!o)throw"Parameter 'value' cannot be null.";if(!n)throw"Parameter 'position' cannot be null.";this.LogEvent("hotspot_clicked",{id:t,type:e,value:o,position:JSON.stringify(n)})},AmplitudeAnalytics.prototype.LogSwatchClicked=function(t,e,o){if(!t)throw"Parameter 'productId' cannot be null.";if(!e)throw"Parameter 'variantId' cannot be null.";if(!o)throw"Parameter 'value' cannot be null.";this.LogEvent("swatch_clicked",{product_id:t,variant_id:e,value:o})},AmplitudeAnalytics.prototype.LogSizeSelected=function(t,e,o){if(!t)throw"Parameter 'productId' cannot be null.";if(!e)throw"Parameter 'variantId' cannot be null.";if(!o)throw"Parameter 'value' cannot be null.";this.LogEvent("size_selected",{product_id:t,variant_id:e,value:o})},AmplitudeAnalytics.prototype.LogQuantityChanged=function(t,e,o){if(!t)throw"Parameter 'productId' cannot be null.";if(!e)throw"Parameter 'variantId' cannot be null.";if(!o)throw"Parameter 'value' cannot be null.";this.LogEvent("quantity_changed",{product_id:t,variant_id:e,value:o})},AmplitudeAnalytics.prototype.LogProductImageViewed=function(t,e,o){if(!t)throw"Parameter 'productId' cannot be null.";if(!e)throw"Parameter 'variantId' cannot be null.";if(!o)throw"Parameter 'value' cannot be null.";this.LogEvent("product_image_viewed",{product_id:t,variant_id:e,value:o})},AmplitudeAnalytics.prototype.LogHotSpotClosed=function(t,e){if(t<0)throw"Parameter 'id' must be a positive integer.";if(!e)throw"Parameter 'type' cannot be null.";this.LogEvent("hotspot_closed",{id:t,type:e})},AmplitudeAnalytics.prototype.LogProductDetailsClicked=function(t,e,o){if(!t)throw"Parameter 'productId' cannot be null.";if(!e)throw"Parameter 'variantId' cannot be null.";this.LogEvent("product_details_clicked",{product_id:t,variant_id:e})},AmplitudeAnalytics.prototype.LogShoppingBagOpened=function(){this.LogEvent("shopping_bag_opened")},AmplitudeAnalytics.prototype.LogShoppingBagClosed=function(){this.LogEvent("shopping_bag_closed")},AmplitudeAnalytics.prototype.LogItemAddedToCart=function(t,e,o,n){if(!t)throw"Parameter 'productId' cannot be null.";if(!e)throw"Parameter 'variantId' cannot be null.";if(!o)throw"Parameter 'price' cannot be null.";if(n<=0)throw"Parameter 'quantity' must be a positive integer.";this.LogEvent("add_to_cart",{product_id:t,variant_id:e,price:o,quantity:n})},AmplitudeAnalytics.prototype.LogItemRemovedFromCart=function(t,e,o,n){if(!t)throw"Parameter 'productId' cannot be null.";if(!e)throw"Parameter 'variantId' cannot be null.";if(!o)throw"Parameter 'price' cannot be null.";if(n<=0)throw"Parameter 'quantity' must be a positive integer.";this.LogEvent("remove_from_cart",{product_id:t,variant_id:e,price:o,quantity:n})},AmplitudeAnalytics.prototype.LogCheckoutStarted=function(t){if(!t)throw"Parameter 'cartId' must not be null.";this.LogEvent("checkout_started",{cart_id:t})},AmplitudeAnalytics.prototype.LogShippingInfoEntered=function(t){if(!t)throw"Parameter 'cartId' must not be null.";this.LogEvent("shipping_info_entered",{cart_id:t})},AmplitudeAnalytics.prototype.LogShippingRateSelected=function(t,e,o){if(!t)throw"Parameter 'cartId' must not be null.";if(!e)throw"Parameter 'value' cannot be null.";if(!o)throw"Parameter 'price' cannot be null.";this.LogEvent("shipping_rate_selected",{cart_id:t,value:e,price:o})},AmplitudeAnalytics.prototype.LogPurchase=function(t,e,o,n,i,a,r){if(!t)throw"Parameter 'cartId' must not be null.";if(!e)throw"Parameter 'transactionId' must not be null.";if(!o)throw"Parameter 'value' cannot be null.";if(!n)throw"Parameter 'currency' cannot be null.";if(!i)throw"Parameter 'tax' cannot be null.";if(!a)throw"Parameter 'shipping' cannot be null.";if(!r||r.length<1)throw"Parameter 'items' cannot be null or empty.";var c="";r.forEach(function(t){c+=JSON.stringify(t)+","}),c=c.slice(0,-1),this.LogEvent("purchase",{cart_id:t,transaction_id:e,value:o,currency:n,tax:i,shipping:a,items:c})},AmplitudeAnalytics.prototype.LogMuteClicked=function(){this.LogEvent("mute_clicked")},AmplitudeAnalytics.prototype.LogUnMuteClicked=function(){this.LogEvent("unmute_clicked")},AmplitudeAnalytics.prototype.LogSkipInstructions=function(){this.LogEvent("skip_instructions")},AmplitudeAnalytics.prototype.LogBrowseInstructions=function(){this.LogEvent("browse_instructions")},AmplitudeAnalytics.prototype.LogMoveInstructionsNext=function(){this.LogEvent("move_instructions_next")},AmplitudeAnalytics.prototype.LogMoveInstructionsIcon=function(){this.LogEvent("move_instructions_icon")},AmplitudeAnalytics.prototype.LogPDPInstructions=function(){this.LogEvent("pdp_instructions")},AmplitudeAnalytics.prototype.LogShopNowClicked=function(){this.LogEvent("shop_now_clicked")},AmplitudeAnalytics.prototype.LogTopBarClicked=function(){this.LogEvent("top_bar_clicked")};var CheckoutHelper=pc.createScript("CheckoutHelper");CheckoutHelper.prototype.ResetDialog=function(){this.ResetInputFields(BagDialogue.co_firstName_DOM,BagDialogue.co_lastName_DOM,BagDialogue.co_email_DOM,BagDialogue.co_phone_DOM),this.ResetInputFields(BagDialogue.co_address1_DOM,BagDialogue.co_address2_DOM,BagDialogue.co_city_DOM,BagDialogue.co_zipCode_DOM,BagDialogue.co_state_DOM),this.ResetInputFields(BagDialogue.co_creditCard_DOM,BagDialogue.co_creditCard_exp_DOM,BagDialogue.co_creditCard_cvv_DOM),this.ResetInputFields(BagDialogue.billing_address_DOM,BagDialogue.billing_address2_DOM,BagDialogue.billing_city_DOM,BagDialogue.billing_state_DOM,BagDialogue.billing_zipCode_DOM,BagDialogue.billing_state_DOM),!1===BagDialogue.billing_checkBox_sameAshipping.checked&&BagDialogue.billing_checkBox_sameAshipping.click(),BillingTab.prototype.SameAsShippingValue(),requiredFieldsCountForPlacingOrder=5,requiredAddressFieldsCount=3,BagDialogue.addressValid=!1,this.ResetOutlines(BagDialogue.co_firstName_DOM,BagDialogue.co_lastName_DOM,BagDialogue.co_email_DOM,BagDialogue.co_phone_DOM,BagDialogue.co_address1_DOM,BagDialogue.co_city_DOM,BagDialogue.co_state_DOM,BagDialogue.co_zipCode_DOM)},CheckoutHelper.prototype.ResetItemsAndValues=function(){this.ClearValues(BagDialogue.coShippingDOM,BagDialogue.coSubtotalDOM,BagDialogue.coTaxesDOM,BagDialogue.coGrandTotalDOM),this.ClearValues(BagDialogue.coGrandTotal_mobileDOM,BagDialogue.coSubtotal_mobileDOM),BagDialogue.isPlacingOrder=!1,BagDialogue.itemCounter&&(BagDialogue.itemCounter.innerHTML="("+BagDialogue.itemsCount+")")},CheckoutHelper.prototype.ClearValues=function(){for(var e=Array.prototype.slice.call(arguments),a=0;a<e.length;a++)this.ClearValue(e[a])},CheckoutHelper.prototype.ClearValue=function(e){e.value=""},CheckoutHelper.prototype.ClearPrices=function(){for(var e=Array.prototype.slice.call(arguments),a=0;a<e.length;a++)this.ClearPrice(e[a])},CheckoutHelper.prototype.ClearPrice=function(e){e.innerHTML="-"},CheckoutHelper.prototype.ResetInputFields=function(){for(var e=Array.prototype.slice.call(arguments),a=0;a<e.length;a++)this.ResetInputField(e[a])},CheckoutHelper.prototype.ResetInputField=function(e){$(e).css("border","2px solid #dadfe6");var a=e.parentNode.getElementsByTagName("span");a.length>0&&a[0].classList.remove("checkout-error-message-active")},CheckoutHelper.prototype.ResetOutlines=function(){for(var e=Array.prototype.slice.call(arguments),a=0;a<e.length;a++)this.ResetOutline(e[a])},CheckoutHelper.prototype.ResetOutline=function(e){$(e).css("border","2px solid #dadfe6")};var CheckoutValidator=pc.createScript("CheckoutValidator");CheckoutValidator.prototype.AssignBlurEventListeners=function(){for(var t=Array.prototype.slice.call(arguments),e=0;e<t.length;e++)t[e].addEventListener("blur",this.ValidateOnBlur(t[e]))},CheckoutValidator.prototype.ValidateOnBlur=function(t,e){console.log(e),(e?e(t.value):t.value)?$(t).css("border","2px solid #dadfe6"):$(t).css("border","2px solid #990000")},CheckoutValidator.prototype.AssignFocusEventListeners=function(){for(var t=Array.prototype.slice.call(arguments),e=0;e<t.length;e++)t[e].addEventListener("focus",this.ValidateOnFocus(t[e]))},CheckoutValidator.prototype.ValidateOnFocus=function(t,e){(e?e(t.value):t.value)?$(t).css("border","2px solid #dadfe6"):$(t).css("border","2px solid #990000")},CheckoutValidator.prototype.AssignChangeEventListener=function(t,e){t.addEventListener("change",e)},CheckoutValidator.prototype.AssignInputEventListener=function(t,e){t.addEventListener("input",function(t){e(t)})},CheckoutValidator.prototype.AssignClickEventListener=function(t,e){t.addEventListener("click",e)},CheckoutValidator.prototype.SetInvalidFields=function(){for(var t=Array.prototype.slice.call(arguments),e=0;e<t.length;e++)this.SetInvalid(t[e])},CheckoutValidator.prototype.SetInvalid=function(t){$(t).attr("style","border-bottom: 2px solid red !important");var e=t.parentNode.getElementsByTagName("span");e.length>0&&(e[0].classList.contains("checkout-error-message-active")||e[0].classList.add("checkout-error-message-active"))},CheckoutValidator.prototype.SetValidFields=function(){for(var t=Array.prototype.slice.call(arguments),e=0;e<t.length;e++)this.SetInvalid(t[e])},CheckoutValidator.prototype.SetValid=function(t){$(t).attr("style","border-bottom: 2px solid green !important");var e=t.parentNode.getElementsByTagName("span");e.length>0&&e[0].classList.remove("checkout-error-message-active")},CheckoutValidator.prototype.CheckValid=function(t,e){e?this.SetValid(t):this.SetInvalid(t)},CheckoutValidator.prototype.validatePhoneNumber=function(t){var e=t.replace(/-/g,"");return/^[0-9]{6,}$/.test(e)},CheckoutValidator.prototype.validateCVV=function(t){return/^[0-9]{3,4}$/.test(t)};var ShippingAddressTab=pc.createScript("ShippingAddressTab");ShippingAddressTab.prototype.initialize=function(){},ShippingAddressTab.prototype.update=function(e){},ShippingAddressTab.prototype.AssignHTML=function(){BagDialogue.co_firstName_DOM=document.getElementById("co_firstName"),BagDialogue.co_lastName_DOM=document.getElementById("co_lastName"),BagDialogue.co_email_DOM=document.getElementById("co_email"),BagDialogue.co_phone_DOM=document.getElementById("co_phone"),BagDialogue.co_address1_DOM=document.getElementById("co_address1"),BagDialogue.co_address2_DOM=document.getElementById("co_address2"),BagDialogue.co_city_DOM=document.getElementById("co_city"),BagDialogue.co_state_DOM=document.getElementById("co_state"),BagDialogue.co_zipCode_DOM=document.getElementById("co_zipCode"),BagDialogue.text_intoSpinnerDOM=document.getElementById("textIntoSpinner"),BagDialogue.shippingTitleDOM=document.getElementById("shippingTitle"),BagDialogue.closeCheckout=document.getElementById("close_btn_checkout"),BagDialogue.co_shipping_to_address=document.getElementById("shipping_to_address"),BagDialogue.co_payment_shipping_to_address=document.getElementById("payment_to_address"),BagDialogue.co_shipping_email=document.getElementById("shipping_to_email"),BagDialogue.co_shipping_phone=document.getElementById("shipping_to_phone"),BagDialogue.payment_to_phone_DOM=document.getElementById("payment_to_phone"),BagDialogue.payment_to_email_DOM=document.getElementById("payment_to_email"),BagDialogue.co_shipping_to_customer=document.getElementById("shipping_to_customer"),BagDialogue.co_payment_shipping_to_customer=document.getElementById("payment_to_customer"),BagDialogue.editShipping=document.getElementById("edit-shipping"),BagDialogue.editShipping1=document.getElementById("edit-shipping1"),BagDialogue.editPayment=document.getElementById("edit-payment"),BagDialogue.editShipping.addEventListener("click",ShippingAddressTab.prototype.editShipping),BagDialogue.editShipping1.addEventListener("click",ShippingAddressTab.prototype.editShipping1),BagDialogue.editPayment.addEventListener("click",ShippingAddressTab.prototype.editPayment),BagDialogue.closeCheckout.addEventListener("click",CheckoutDialogController.prototype.Close)},ShippingAddressTab.prototype.Open=function(){BagDialogue.checkout_tab1.style.display="block",CheckoutDialogController.prototype.SetButtonText("CONTINUE PAYMENT"),CheckoutDialogController.prototype.SetButtonState(!1),CheckoutDialogController.prototype.ChangeButtonClickListener([ShippingMethodsTab.prototype.Next,BillingTab.prototype.Next,ThankyouTab.prototype.Close],ShippingAddressTab.prototype.Next)},ShippingAddressTab.prototype.editShipping=function(){BagDialogue.checkout_tab2.style.display="none",ShippingAddressTab.prototype.Open(),CheckoutDialogController.prototype.SetButtonState(!0)},ShippingAddressTab.prototype.editShipping1=function(){BagDialogue.checkout_tab3.style.display="none",ShippingAddressTab.prototype.Open(),CheckoutDialogController.prototype.SetButtonState(!0)},ShippingAddressTab.prototype.editPayment=function(){BagDialogue.checkout_tab3.style.display="none",ShippingMethodsTab.prototype.Open(),CheckoutDialogController.prototype.SetButtonState(!0)},ShippingAddressTab.prototype.Back=function(){ShippingAddressTab.prototype.Close(),BagDialogue.checkoutModal.style.display="none",BagDialogue.bagDialogueContent.style.display="block"},ShippingAddressTab.prototype.Close=function(){BagDialogue.checkout_tab1.style.display="none"},ShippingAddressTab.prototype.Next=function(){BagDialogue.checkout_tab1.style.display="none",ShippingAddressTab.prototype.SetShippingAddress(),ShippingMethodsTab.prototype.Open()},ShippingAddressTab.prototype.Validate=function(){CheckoutValidator.prototype.CheckValid(BagDialogue.co_email_DOM,EmailValidator.prototype.Validate(BagDialogue.co_email_DOM.value)),CheckoutValidator.prototype.CheckValid(BagDialogue.co_firstName_DOM,BagDialogue.co_firstName_DOM.value),CheckoutValidator.prototype.CheckValid(BagDialogue.co_lastName_DOM,BagDialogue.co_lastName_DOM.value),CheckoutValidator.prototype.CheckValid(BagDialogue.co_phone_DOM,CheckoutValidator.prototype.validatePhoneNumber(BagDialogue.co_phone_DOM.value)),EmailValidator.prototype.Validate(BagDialogue.co_email_DOM.value)&&BagDialogue.co_firstName_DOM.value&&BagDialogue.co_lastName_DOM.value&&CheckoutValidator.prototype.validatePhoneNumber(BagDialogue.co_phone_DOM.value)||console.log("invalid user information"),CheckoutValidator.prototype.CheckValid(BagDialogue.co_address1_DOM,BagDialogue.co_address1_DOM.value),BagDialogue.co_address2_DOM.value&&CheckoutValidator.prototype.CheckValid(BagDialogue.co_address2_DOM,BagDialogue.co_address2_DOM.value),CheckoutValidator.prototype.CheckValid(BagDialogue.co_city_DOM,BagDialogue.co_city_DOM.value),CheckoutValidator.prototype.CheckValid(BagDialogue.co_state_DOM,BagDialogue.co_state_DOM.value),CheckoutValidator.prototype.CheckValid(BagDialogue.co_zipCode_DOM,BagDialogue.co_zipCode_DOM.value),BagDialogue.co_address1_DOM.value&&BagDialogue.co_city_DOM.value&&BagDialogue.co_state_DOM.value&&BagDialogue.co_zipCode_DOM.value?ShippingAddressTab.prototype.IsValidAddress():console.log("invalid address")},ShippingAddressTab.prototype.SetShippingAddress=function(){var e=BagDialogue.co_address1_DOM.value;BagDialogue.co_address2_DOM.value&&(e+=" "+BagDialogue.co_address2_DOM.value);var o=(e+", "+BagDialogue.co_city_DOM.value+", "+(BagDialogue.co_state_DOM.options[BagDialogue.co_state_DOM.selectedIndex].value+" "+BagDialogue.co_zipCode_DOM.value)).toUpperCase();BagDialogue.co_shipping_to_address.innerHTML=o,BagDialogue.co_payment_shipping_to_address.innerHTML=o;var a=(BagDialogue.co_firstName_DOM.value+" "+BagDialogue.co_lastName_DOM.value).toUpperCase();BagDialogue.co_shipping_to_customer.innerHTML=a,BagDialogue.co_payment_shipping_to_customer.innerHTML=a;var t=BagDialogue.co_email_DOM.value;BagDialogue.co_shipping_email.innerHTML=t,BagDialogue.payment_to_email_DOM.innerHTML=t;var i=BagDialogue.co_phone_DOM.value;BagDialogue.co_shipping_phone.innerHTML=i,BagDialogue.payment_to_phone_DOM.innerHTML=i},ShippingAddressTab.prototype.AssignListeners=function(){},ShippingAddressTab.prototype.IsValidAddress=function(){GoogleMaps.prototype.IsValidAddress(BagDialogue.co_address1_DOM.value,BagDialogue.co_address2_DOM.value,BagDialogue.co_city_DOM.value,BagDialogue.co_state_DOM.value,BagDialogue.co_zipCode_DOM.value,ShippingAddressTab.prototype.ValidAddressOnComplete)},ShippingAddressTab.prototype.ValidAddressOnComplete=function(e){if(null===e)CheckoutValidator.prototype.SetInvalid(BagDialogue.co_address1_DOM),BagDialogue.co_address2_DOM.value&&CheckoutValidator.prototype.SetInvalid(BagDialogue.co_address2_DOM),CheckoutValidator.prototype.SetInvalid(BagDialogue.co_city_DOM),CheckoutValidator.prototype.SetInvalid(BagDialogue.co_state_DOM),CheckoutValidator.prototype.SetInvalid(BagDialogue.co_zipCode_DOM);else{var o=BagDialogue.co_zipCode_DOM.value.toLowerCase(),a=BagDialogue.co_state_DOM.options[BagDialogue.co_state_DOM.selectedIndex].text.toLowerCase();if(CheckoutValidator.prototype.SetValid(BagDialogue.co_address1_DOM),BagDialogue.co_address2_DOM.value&&CheckoutValidator.prototype.SetValid(BagDialogue.co_address2_DOM),CheckoutValidator.prototype.CheckValid(BagDialogue.co_state_DOM,a===e.state.toLowerCase()),CheckoutValidator.prototype.CheckValid(BagDialogue.co_zipCode_DOM,o===e.zip.toLowerCase()),a===e.state.toLowerCase()||o===e.zip){CheckoutValidator.prototype.SetValid(BagDialogue.co_city_DOM),CheckoutValidator.prototype.SetValid(BagDialogue.co_state_DOM),CheckoutValidator.prototype.SetValid(BagDialogue.co_zipCode_DOM);var t=CheckoutServiceRequests.prototype.Address(BagDialogue.co_firstName_DOM.value,BagDialogue.co_lastName_DOM.value,"",BagDialogue.co_phone_DOM.value,BagDialogue.co_email_DOM.value,BagDialogue.co_address1_DOM.value,BagDialogue.co_address2_DOM.value,BagDialogue.co_city_DOM.value,"",BagDialogue.co_state_DOM.value,BagDialogue.co_zipCode_DOM.value,"","US");BagDialogue.textIntoSpinner.style.display="none",ShippingMethodsTab.prototype.ShowShippingMethodLoading(),CheckoutServiceController.prototype.UpdateShippingAddress(t),CheckoutServiceController.prototype.UpdateEmail(BagDialogue.co_email_DOM.value),CheckoutServiceController.prototype.SetCart()}}};var paymentReady,BillingTab=pc.createScript("BillingTab"),filledInputsPayment=[],filledInputsBilling=[],billingReady=!0;BillingTab.prototype.AssignHTML=function(){BagDialogue.co_creditCard_DOM=document.getElementById("co_creditCard"),BagDialogue.co_creditCard_exp_DOM=document.getElementById("co_creditCard_exp"),BagDialogue.co_creditCard_cvv_DOM=document.getElementById("co_creditCard_cvv"),BagDialogue.billing_address_DOM=document.getElementById("billing_address1"),BagDialogue.billing_address2_DOM=document.getElementById("billing_address2"),BagDialogue.billing_city_DOM=document.getElementById("billing_city"),BagDialogue.billing_state_DOM=document.getElementById("billing_state"),BagDialogue.billing_zipCode_DOM=document.getElementById("billing_zipCode"),BagDialogue.shippingRadioContainer1=document.getElementById("shipping_radio_selected1"),BagDialogue.paymentDescription=document.getElementById("payment-description"),BagDialogue.newBillingDOM=document.getElementById("new_billing"),BagDialogue.sameAsShippingDOM=document.getElementById("same_as_shipping"),BagDialogue.billing_checkBox_sameAshipping=document.getElementById("billing_checkBox_sameAshipping"),BagDialogue.billing_checkBox_sameAshipping_landscape=document.getElementById("billing_checkBox_sameAshipping_landscape")},BillingTab.prototype.Open=function(){var e=CheckoutServiceController.prototype.GetTotal();BagDialogue.coGrandTotalDOM.innerHTML=e,BagDialogue.bagGrandTotalDOM.innerHTML=e,BagDialogue.coGrandTotal_mobileDOM.innerHTML=e,CheckoutDialogController.prototype.SetButtonText("PLACE ORDER"),BagDialogue.billing_checkBox_sameAshipping.checked?(BagDialogue.sameAsShippingDOM.style.display="table",BagDialogue.newBillingDOM.style.display="none"):(BagDialogue.newBillingDOM.innerHTML=BagDialogue.billing_address_DOM.value+", "+BagDialogue.billing_city_DOM.value+BagDialogue.billing_state_DOM.value+",  "+BagDialogue.billing_zipCode_DOM.value,BagDialogue.newBillingDOM.style.display="block",BagDialogue.sameAsShippingDOM.style.display="none"),BagDialogue.shipping_method_confirmation.innerHTML=BagDialogue.shippingRadioContainer1.children[0].getElementsByTagName("span")[0].innerHTML,BillingTab.prototype.PaymentData(),CheckoutDialogController.prototype.SetButtonState(!0),BillingTab.prototype.HideBillingLoading(),BillingTab.prototype.HideBillingError(),BagDialogue.checkout_tab3.style.display="block",AmplitudeAnalytics.prototype.LogShippingRateSelected(Checkout.cart_id,Checkout.shipping_method,BagDialogue.shippingCost),CheckoutDialogController.prototype.RemoveListeners(),CheckoutDialogController.prototype.ChangeButtonClickListener([ShippingAddressTab.prototype.Next,ShippingMethodsTab.prototype.Next,ShippingMethodsTab.prototype.Validate,BillingTab.prototype.Open,ThankyouTab.prototype.Close],BillingTab.prototype.Next),CheckoutHelper.prototype.ResetInputFields(BagDialogue.co_creditCard_DOM,BagDialogue.co_creditCard_exp_DOM,BagDialogue.co_creditCard_cvv_DOM)},BillingTab.prototype.Close=function(){BagDialogue.checkout_tab3.style.display="none"},BillingTab.prototype.Back=function(){BillingTab.prototype.Close(),ShippingMethodsTab.prototype.RemoveShippingMethodList(),ShippingMethodsTab.prototype.Open()},BillingTab.prototype.Next=function(){BagDialogue.shippingTitleDOM.style.display="none",BillingTab.prototype.ShowBillingLoading(),CheckoutServiceController.prototype.SetShippingRate(),BillingTab.prototype.Close()},BillingTab.prototype.Validate=function(){if(CheckoutValidator.prototype.CheckValid(BagDialogue.co_creditCard_exp_DOM,CredCardValidator.prototype.isValidExpiryDate(BagDialogue.co_creditCard_exp_DOM.value)),CheckoutValidator.prototype.CheckValid(BagDialogue.co_creditCard_DOM,CredCardValidator.prototype.Luhn10(BagDialogue.co_creditCard_DOM.value)),CheckoutValidator.prototype.CheckValid(BagDialogue.co_creditCard_cvv_DOM,CheckoutValidator.prototype.validateCVV(BagDialogue.co_creditCard_cvv_DOM.value)),BagDialogue.co_firstName_DOM.value&&BagDialogue.co_lastName_DOM.value&&CredCardValidator.prototype.isValidExpiryDate(BagDialogue.co_creditCard_exp_DOM.value)&&CredCardValidator.prototype.Luhn10(BagDialogue.co_creditCard_DOM.value)&&CheckoutValidator.prototype.validateCVV(BagDialogue.co_creditCard_cvv_DOM.value),BillingTab.prototype.SetCreditCard(),BagDialogue.billing_checkBox_sameAshipping.checked)CheckoutServiceController.prototype.SameAsShippingAddress(),BillingTab.prototype.IsValidAddress();else{if(CheckoutValidator.prototype.CheckValid(BagDialogue.billing_address_DOM,BagDialogue.billing_address_DOM.value),BagDialogue.billing_address2_DOM.value&&CheckoutValidator.prototype.CheckValid(BagDialogue.billing_address2_DOM,BagDialogue.billing_address2_DOM.value),CheckoutValidator.prototype.CheckValid(BagDialogue.billing_city_DOM,BagDialogue.billing_city_DOM.value),CheckoutValidator.prototype.CheckValid(BagDialogue.billing_state_DOM,BagDialogue.billing_state_DOM.value),CheckoutValidator.prototype.CheckValid(BagDialogue.billing_zipCode_DOM,BagDialogue.billing_zipCode_DOM.value),!(BagDialogue.co_address1_DOM.value&&BagDialogue.co_city_DOM.value&&BagDialogue.co_state_DOM.value&&BagDialogue.co_zipCode_DOM.value))return;BillingTab.prototype.IsValidAddress()}},BillingTab.prototype.AssignListeners=function(){this.AssignOnBlur(),this.AssignOnChange(),this.AssignOnInput(),BagDialogue.co_creditCard_exp_DOM.addEventListener("keyup",this.ExpiryDateChange)},BillingTab.prototype.AssignOnBlur=function(){var e;CheckoutValidator.prototype.AssignBlurEventListeners(BagDialogue.co_creditCard_DOM,BagDialogue.co_creditCard_exp_DOM,BagDialogue.co_creditCard_cvv_DOM),CheckoutValidator.prototype.AssignBlurEventListeners(BagDialogue.billing_address_DOM,BagDialogue.billing_city_DOM,BagDialogue.billing_zipCode_DOM);var i=[BagDialogue.co_creditCard_DOM,BagDialogue.co_creditCard_exp_DOM,BagDialogue.co_creditCard_cvv_DOM],a=[BagDialogue.billing_address_DOM,BagDialogue.billing_city_DOM,BagDialogue.billing_zipCode_DOM];BagDialogue.billing_checkBox_sameAshipping.addEventListener("change",function(){e=!0,BagDialogue.billing_checkBox_sameAshipping.checked?(billingReady=!0,e=!1,BillingTab.prototype.ResetBillingInputs(),CheckoutDialogController.prototype.SetButtonState(!0)):(CheckoutDialogController.prototype.SetButtonState(!1),a.forEach(function(i){i.addEventListener("blur",function(t){if(BagDialogue.co_creditCard_DOM.focus(),BagDialogue.co_creditCard_DOM.blur(),e=!1,""===i.value){i.parentElement.getElementsByTagName("span")[0].style.color="red",i.parentElement.getElementsByTagName("span")[0].style.display="block",$(i).attr("style","border-bottom: 2px solid red !important");var l=filledInputsBilling.indexOf(i);-1!==l&&filledInputsBilling.splice(l,1)}else i.parentElement.getElementsByTagName("span")[0].style.display="none",$(i).attr("style","border-bottom: 2px solid green !important"),filledInputsBilling.find(function(e){return e.id===i.id})?filledInputsBilling=filledInputsBilling:filledInputsBilling.push(i);filledInputsBilling.length===a.length&&"State"!==$("#billing_state option:selected").text()?(billingReady=!0,BillingTab.prototype.PrepareForValidate()):billingReady=!1})}),a.forEach(function(e){e.addEventListener("focus",function(e){CheckoutDialogController.prototype.SetButtonState(!1)})}),BagDialogue.billing_state_DOM.addEventListener("change",function(e){"State"!==$("#billing_state option:selected").text()&&($(BagDialogue.billing_state_DOM).attr("style","border-bottom: 2px solid green !important"),filledInputsBilling.length===a.length&&(billingReady=!0,BillingTab.prototype.PrepareForValidate()))}))}),i.forEach(function(a){a.addEventListener("blur",function(t){if(""===a.value){a.parentElement.getElementsByTagName("span")[0].style.color="red",a.parentElement.getElementsByTagName("span")[0].style.display="block",$(a).attr("style","border-bottom: 2px solid red !important");var l=filledInputsPayment.indexOf(a);-1!==l&&filledInputsPayment.splice(l,1)}else a.parentElement.getElementsByTagName("span")[0].style.display="none",$(a).attr("style","border-bottom: 2px solid green !important"),filledInputsPayment.find(function(e){return e.id===a.id})?filledInputsPayment=filledInputsPayment:filledInputsPayment.push(a);filledInputsPayment.length!==i.length||!1!==e&&void 0!==e?paymentReady=!1:(paymentReady=!0,BillingTab.prototype.PrepareForValidate())})}),i.forEach(function(e){e.addEventListener("focus",function(e){CheckoutDialogController.prototype.SetButtonState(!1)})})},BillingTab.prototype.PrepareForValidate=function(){paymentReady&&billingReady&&BillingTab.prototype.Validate()},BillingTab.prototype.ResetBillingInputs=function(){[BagDialogue.billing_address_DOM,BagDialogue.billing_address2_DOM,BagDialogue.billing_city_DOM,BagDialogue.billing_zipCode_DOM].forEach(function(e){e.value="",$(e).focusout()}),BagDialogue.billing_state_DOM.selectedIndex=0},BillingTab.prototype.AssignOnChange=function(){this.SetSameAsShippingValueChanged(BagDialogue.billing_checkBox_sameAshipping)},BillingTab.prototype.AssignOnInput=function(){CheckoutValidator.prototype.AssignInputEventListener(BagDialogue.co_creditCard_DOM,this.CreditCardOnEventChanged)},BillingTab.prototype.CreditCardOnEventChanged=function(){var e=event.target.value;event.target.value=CredCardValidator.prototype.FormatNumber(e)},BillingTab.prototype.IsValidAddress=function(){BagDialogue.billing_checkBox_sameAshipping.checked?GoogleMaps.prototype.IsValidAddress(BagDialogue.co_address1_DOM.value,BagDialogue.co_address2_DOM.value,BagDialogue.co_city_DOM.value,BagDialogue.co_state_DOM.value,BagDialogue.co_zipCode_DOM.value,BillingTab.prototype.ValidAddressOnComplete):GoogleMaps.prototype.IsValidAddress(BagDialogue.billing_address_DOM.value,BagDialogue.billing_address2_DOM.value,BagDialogue.billing_city_DOM.value,BagDialogue.billing_state_DOM.value,BagDialogue.billing_zipCode_DOM.value,BillingTab.prototype.ValidAddressOnComplete)},BillingTab.prototype.ValidAddressOnComplete=function(e){var i,a;BagDialogue.billing_checkBox_sameAshipping.checked?CheckoutDialogController.prototype.SetButtonState(!0):e?(i=BagDialogue.billing_zipCode_DOM.value.toLowerCase(),a=BagDialogue.billing_state_DOM.options[BagDialogue.billing_state_DOM.selectedIndex].text.toLowerCase(),CheckoutValidator.prototype.SetValid(BagDialogue.billing_address_DOM),BagDialogue.billing_address2_DOM.value&&CheckoutValidator.prototype.SetValid(BagDialogue.billing_address2_DOM),CheckoutValidator.prototype.SetValid(BagDialogue.billing_city_DOM),CheckoutValidator.prototype.CheckValid(BagDialogue.billing_state_DOM,a===e.state.toLowerCase()),CheckoutValidator.prototype.CheckValid(BagDialogue.billing_zipCode_DOM,i===e.zip.toLowerCase()),a!==e.state.toLowerCase()&&i!==e.zip||(CheckoutValidator.prototype.SetValid(BagDialogue.billing_state_DOM),CheckoutValidator.prototype.SetValid(BagDialogue.billing_zipCode_DOM),BillingTab.prototype.SetBillingAddress(),CheckoutDialogController.prototype.SetButtonState(!0))):(CheckoutValidator.prototype.SetInvalid(BagDialogue.billing_address_DOM),BagDialogue.billing_address2_DOM.value&&CheckoutValidator.prototype.SetInvalid(BagDialogue.billing_address2_DOM),CheckoutValidator.prototype.SetInvalid(BagDialogue.billing_city_DOM),CheckoutValidator.prototype.SetInvalid(BagDialogue.billing_state_DOM),CheckoutValidator.prototype.SetInvalid(BagDialogue.billing_zipCode_DOM))},BillingTab.prototype.PaymentData=function(){BagDialogue.paymentDescription.innerHTML=BagDialogue.co_creditCard_exp_DOM.value},BillingTab.prototype.SetBillingAddress=function(){var e=CheckoutServiceRequests.prototype.Address(BagDialogue.co_firstName_DOM.value,BagDialogue.co_lastName_DOM.value,"",BagDialogue.co_phone_DOM.value,BagDialogue.co_email_DOM.value,BagDialogue.billing_address_DOM.value,BagDialogue.billing_address2_DOM.value,BagDialogue.billing_city_DOM.value,"",BagDialogue.billing_state_DOM.value,BagDialogue.billing_zipCode_DOM.value,"","US");CheckoutServiceController.prototype.UpdateBillingAddress(e)},BillingTab.prototype.SetCreditCard=function(){var e=BagDialogue.co_creditCard_exp_DOM.value.split("/"),i=e[0],a="20"+e[1],t=BagDialogue.co_creditCard_DOM.value.replace(/\D/g,""),l=CredCardValidator.prototype.GetBrand(t),o=CheckoutServiceRequests.prototype.CreditCard(BagDialogue.co_firstName_DOM.value,BagDialogue.co_lastName_DOM.value,t,BagDialogue.co_creditCard_cvv_DOM.value,l,i,a);CheckoutServiceController.prototype.UpdateCreditCard(o)},BillingTab.prototype.SetSameAsShippingValueChanged=function(e){e.addEventListener("change",function(){!0===e.checked?BillingTab.prototype.SameAsShippingValue():(BillingTab.prototype.EnableAddress(!0),CheckoutHelper.prototype.ClearValues(BagDialogue.billing_address_DOM,BagDialogue.billing_address2_DOM,BagDialogue.billing_city_DOM,BagDialogue.billing_state_DOM,BagDialogue.billing_zipCode_DOM)),BagDialogue.billing_checkBox_sameAshipping.checked!==e.checked&&BagDialogue.billing_checkBox_sameAshipping.click()})},BillingTab.prototype.SameAsShippingValue=function(){BagDialogue.billing_address_DOM.value=BagDialogue.co_address1_DOM.value,BagDialogue.billing_address2_DOM.value=BagDialogue.co_address2_DOM.value,BagDialogue.billing_city_DOM.value=BagDialogue.co_city_DOM.value,BagDialogue.billing_state_DOM.selectedIndex=BagDialogue.co_state_DOM.selectedIndex,BagDialogue.billing_zipCode_DOM.value=BagDialogue.co_zipCode_DOM.value,BillingTab.prototype.EnableAddress(!1)},BillingTab.prototype.EnableAddress=function(e){document.getElementById("same_as_shipping_container").style.display=e?"block":"none"},BillingTab.prototype.ExpiryDateChange=function(e){String.fromCharCode(event.keyCode);var i=event.keyCode;-1===[8].indexOf(i)&&(event.target.value=event.target.value.replace(/^([1-9]\/|[2-9])$/g,"0$1/").replace(/^(0[1-9]|1[0-2])$/g,"$1/").replace(/^1([3-9])$/g,"01/$1").replace(/^0\/|0+$/g,"0").replace(/[^\d|^\/]*/g,"").replace(/\/\//g,"/"))},BillingTab.prototype.ShowBillingLoading=function(){CheckoutDialogController.prototype.SetButtonText("CONTINUE SHOPPING"),BagDialogue.tyPopupDOM.style.display="block",BagDialogue.loadingSpinnerTab3.style.marginTop="24%",BagDialogue.loadingSpinnerTab3.style.marginBottom="54%",BagDialogue.loadingSpinnerTab3.style.display="block",document.getElementById("tab3_content").style.display="none",CheckoutDialogController.prototype.SetButtonState(!1)},BillingTab.prototype.HideBillingLoading=function(){BagDialogue.loadingSpinnerTab3.style.display="none",document.getElementById("tab3_content").style.marginBottom="40px",document.getElementById("tab3_content").style.display="block",CheckoutDialogController.prototype.SetButtonState(!0)},BillingTab.prototype.OnOrderError=function(){BillingTab.prototype.HideBillingLoading(),document.getElementById("tab3_content").style.display="none",document.getElementById("transaction_error").style.display="block",BagDialogue.continue_placeOrderBtn.innerHTML="BACK",BagDialogue.continue_placeOrderBtn_mobile3.innerHTML="BACK",BagDialogue.bag_dialog_backBtnDOM.removeEventListener("click",BillingTab.prototype.Back)},BillingTab.prototype.HideBillingError=function(){document.getElementById("tab3_content").style.display="block",document.getElementById("transaction_error").style.display="none"},BillingTab.prototype.OnOrder=function(e,i){i?(BillingTab.prototype.Close(),ThankyouTab.prototype.Open(e,i),BillingTab.prototype.HideBillingLoading(),CheckoutHelper.prototype.ResetDialog(),CheckoutHelper.prototype.ResetItemsAndValues()):this.OnOrderError()};var ShippingMethodsTab=pc.createScript("ShippingMethodsTab");ShippingMethodsTab.prototype.AssignHTML=function(){BagDialogue.shippingRadioContainer=document.getElementById("shipping_radio_container"),BagDialogue.shippingMethodPrefab=document.getElementById("shipping_radio_prefab"),BagDialogue.selectedShippingContainer=document.getElementById("shipping_radio_selected"),BagDialogue.shippingMethodDetails=document.getElementById("shipping_details_block"),BagDialogue.shippingMethodPrefabContainer=document.getElementById("shipping_radio_prefab_container"),BagDialogue.textIntoSpinner=document.getElementById("textIntoSpinner")},ShippingMethodsTab.prototype.AssignListeners=function(){this.AssignOnClick()},ShippingMethodsTab.prototype.AssignOnClick=function(){},ShippingMethodsTab.prototype.Open=function(){CheckoutDialogController.prototype.SetButtonText("REVIEW ORDER"),CheckoutDialogController.prototype.SetButtonState(!1),BagDialogue.checkout_tab2.style.display="block",CheckoutDialogController.prototype.ChangeButtonClickListener([ShippingAddressTab.prototype.Next,BillingTab.prototype.Next,ThankyouTab.prototype.Close],ShippingMethodsTab.prototype.Next),AmplitudeAnalytics.prototype.LogShippingInfoEntered(Checkout.cart_id),ShippingMethodsTab.prototype.UpdateListeners(),ShippingMethodsTab.prototype.RemoveShippingMethodList()},ShippingMethodsTab.prototype.Close=function(){BagDialogue.checkout_tab2.style.display="none"},ShippingMethodsTab.prototype.Next=function(){ShippingMethodsTab.prototype.Close(),BillingTab.prototype.Open()},ShippingMethodsTab.prototype.Back=function(){ShippingMethodsTab.prototype.Close(),ShippingAddressTab.prototype.Open()},ShippingMethodsTab.prototype.Validate=function(){},ShippingMethodsTab.prototype.UpdateListeners=function(){CheckoutDialogController.prototype.ChangeButtonClickListener([ShippingAddressTab.prototype.Validate,BillingTab.prototype.Validate],ShippingMethodsTab.prototype.Validate)},ShippingMethodsTab.prototype.SetShippingMethodChange=function(e){e.radioBtn.addEventListener("change",function(){BagDialogue.shippingMethodSelected=!0,CheckoutDialogController.prototype.SetButtonState(!0),ShippingMethodsTab.prototype.SetShippingPrice(e.price,e),CheckoutServiceController.prototype.UpdateShippingMethod(e.id)})},ShippingMethodsTab.prototype.SetShippingPrice=function(e,i){BagDialogue.shippingCost=e,BagDialogue.coShippingDOM.innerHTML=formatter.format(BagDialogue.shippingCost),BagDialogue.coShipping_mobileDOM.innerHTML=formatter.format(BagDialogue.shippingCost),BagDialogue.selectedShippingContainer.children[0].getElementsByTagName("input")[0].checked=!0,BagDialogue.selectedShippingContainer.children[0].getElementsByTagName("input")[0].style.display="none",BagDialogue.selectedShippingContainer.children[0].getElementsByTagName("span")[0].innerHTML=i.title,BagDialogue.selectedShippingContainer.children[0].getElementsByTagName("span")[2].innerHTML=formatter.format(i.price),BagDialogue.shippingRadioContainer1.children[0].getElementsByTagName("input")[0].checked=!0,BagDialogue.shippingRadioContainer1.children[0].getElementsByTagName("input")[0].style.display="none",BagDialogue.shippingRadioContainer1.children[0].getElementsByTagName("span")[0].innerHTML=i.title,BagDialogue.shippingRadioContainer1.children[0].getElementsByTagName("span")[2].innerHTML=formatter.format(i.price),ShoppingBag.prototype.UpdateTotal(e)},ShippingMethodsTab.prototype.RemoveShippingMethodList=function(){for(;BagDialogue.shippingRadioContainer.children.length>1;)BagDialogue.shippingRadioContainer.removeChild(BagDialogue.shippingRadioContainer.children[1]);BagDialogue.shippingMethods=[],BagDialogue.shippingMethodSelected=!1},ShippingMethodsTab.prototype.ShowShippingMethodLoading=function(){BagDialogue.loadingSpinner.style.display="block",BagDialogue.shippingRadioContainer.style.display="none",BagDialogue.shippingMethodDetails.classList.contains("shipping-method-details-on-loading")||BagDialogue.shippingMethodDetails.classList.add("shipping-method-details-on-loading"),CheckoutDialogController.prototype.SetButtonState(!1)},ShippingMethodsTab.prototype.HideShippingMethodLoading=function(){BagDialogue.loadingSpinner.style.display="none",BagDialogue.shippingRadioContainer.style.display="block",BagDialogue.shippingMethodDetails.classList.contains("shipping-method-details-on-loading")&&BagDialogue.shippingMethodDetails.classList.remove("shipping-method-details-on-loading"),CheckoutDialogController.prototype.SetButtonState(!0)},ShippingMethodsTab.prototype.UpdateTaxLines=function(e){e&&(e="$"+e.toString(),BagDialogue.coTaxes_mobileDOM.value=e,BagDialogue.coTaxesDOM.value=e,BagDialogue.coTaxes_mobileDOM.innerHTML=e,BagDialogue.coTaxesDOM.innerHTML=e)},ShippingMethodsTab.prototype.UpdateShippingAddress=function(e){var i;ShippingMethodsTab.prototype.HideShippingMethodLoading();for(var t=0;t<e.shipping_rates.length;t++){(i=BagDialogue.shippingMethodPrefab).removeAttribute("id");var o=e.shipping_rates[t].title,p=e.shipping_rates[t].price,n=e.shipping_rates[t].id,a=i.getElementsByTagName("input")[0],g=i.getElementsByTagName("span"),h=g[0].childNodes[0],l=g[2].childNodes[0];a.checked=!1,h.textContent=o+" ",l.textContent=Formatter.prototype.formatPrice(p),BagDialogue.shippingRadioContainer.appendChild(i);var s={};s.elementDOM=i,s.radioBtn=a,s.price=p,s.name=o,s.id=n,ShippingMethodsTab.prototype.SetShippingMethodChange(s),BagDialogue.shippingMethods.push(s)}var r=e.shipping_rates[0];BagDialogue.shippingMethodSelected=!0,ShippingMethodsTab.prototype.SetShippingPrice(r.price,r),BagDialogue.shippingRadioContainer.children[0].getElementsByTagName("input")[0].checked=!0,CheckoutServiceController.prototype.UpdateShippingMethod(r.id),ShippingMethodsTab.prototype.HideShippingMethodLoading(),CheckoutDialogController.prototype.SetButtonState(!0)};var ShoppingBag=pc.createScript("ShoppingBag");ShoppingBag.prototype.initialize=function(){},ShoppingBag.prototype.update=function(e){},ShoppingBag.prototype.AssignHTML=function(){BagDialogue.quantity=5,BagDialogue.bagDialogueContent=document.getElementById("bag_dialogue_content"),BagDialogue.bagitemContainerDOM=document.getElementById("bag_items_list"),BagDialogue.emptyContainerDOM=document.getElementById("empty-bag-text"),BagDialogue.bagitemDOM=document.getElementById("bagitemPrefab"),BagDialogue.bagitemDOM.style.display="none",BagDialogue.bagitemImageDOM=document.getElementById("bagItemImage"),BagDialogue.bagItemsList=document.getElementById("bag_items_list")},ShoppingBag.prototype.GetItemCount=function(){var e=0;for(var t in BagDialogue.items)BagDialogue.items.hasOwnProperty(t)&&(e+=Number(BagDialogue.items[t].quantity));BagDialogue.itemsCount=e},ShoppingBag.prototype.GetTotal=function(){var e=0;for(var t in BagDialogue.items)BagDialogue.items.hasOwnProperty(t)&&(e+=Number(BagDialogue.items[t].quantity)*Number(BagDialogue.items[t].itemPrice));BagDialogue.subTotalPrice=e},ShoppingBag.prototype.UpdateTotal=function(e){if(e){var t=AddPriceString(0,BagDialogue.subTotalPrice.toString());BagDialogue.grandTotal=AddPriceString(0,AddPriceString(0,t,BagDialogue.shippingCost),BagDialogue.taxesAmount),BagDialogue.coSubtotalDOM.innerHTML=formatter.format(t),BagDialogue.coSubtotal_mobileDOM.innerHTML=formatter.format(t),console.log("this.grandTotal : "+BagDialogue.grandTotal),console.log("formatter.format(this.grandTotal) : "+formatter.format(BagDialogue.grandTotal)),BagDialogue.bagGrandTotalDOM.innerHTML=formatter.format(BagDialogue.grandTotal),BagDialogue.coGrandTotalDOM.innerHTML=formatter.format(BagDialogue.grandTotal),BagDialogue.coGrandTotal_mobileDOM.innerHTML=formatter.format(BagDialogue.grandTotal)}},ShoppingBag.prototype.AddToCart=function(e){var t;console.log("this is bag item"),console.log(e);var a=document.getElementById("bagItemsCount");if(BagDialogue.itemsCount+=Number(e.quantity),a.innerHTML="("+BagDialogue.itemsCount+")",e.id in BagDialogue.items){var i=parseInt(BagDialogue.items[e.id].quantity);i+=parseInt(e.quantity),BagDialogue.items[e.id].quantity=i.toString(),BagDialogue.item=BagDialogue.items[e.id],(t=BagDialogue.itemsDOM[e.id]).price.innerHTML=formatter.format(BagDialogue.item.quantity*e.itemPrice),t.quantity.value=i}else{BagDialogue.specificItemsCount++,BagDialogue.items[e.id]=e,BagDialogue.item=BagDialogue.items[e.id],(t=BagDialogue.bagitemDOM.cloneNode(!0)).style.display="flex",t.id=t.id+BagDialogue.itemsCount,BagDialogue.bagitemContainerDOM.insertBefore(t,BagDialogue.bagitemContainerDOM.children[BagDialogue.specificItemsCount+1]),t.quantityMinusBtn=t.getElementsByClassName("btn btn-spinner btn-sm minus-btn")[0],t.quantityPlusBtn=t.getElementsByClassName("btn btn-spinner btn-sm plus-btn")[0];var o=t.getElementsByClassName("bag-color-swatch"),g=t.getElementsByClassName("bag-product-size ");t.colorName=o[0],t.sizeName=g[0],t.name=t.getElementsByClassName("bag-product-title")[0],t.image=t.getElementsByTagName("img")[0],t.price=t.getElementsByTagName("span")[0],t.totalPrice=document.getElementById("co_grandTotal"),t.quantity=t.getElementsByTagName("select")[0],t.quantity.value=parseInt(e.quantity),t.colorName.innerHTML=" "+BagDialogue.item.color,void 0===BagDialogue.item.size?t.sizeName.parentNode.style.display="none":(t.sizeName.parentNode.style.display="block",t.sizeName.innerHTML=" "+BagDialogue.item.size),t.name.innerHTML=BagDialogue.item.itemTitle,t.image.src=BagDialogue.item.imageURL,t.price.innerHTML=formatter.format(BagDialogue.item.totalPriceItem),t.quantity.addEventListener("change",function(i){var o=Number(t.quantity.value);0===o?(BagDialogue.specificItemsCount--,BagDialogue.bagitemContainerDOM.removeChild(t),delete BagDialogue.itemsDOM[e.id],delete BagDialogue.items[e.id],AmplitudeAnalytics.prototype.LogItemRemovedFromCart(e.product_id,e.id,e.itemPrice,"1")):(BagDialogue.items[e.id].quantity=o,AmplitudeAnalytics.prototype.LogQuantityChanged(e.product_id,e.id,String(o))),ShoppingBag.prototype.GetItemCount();var g=CheckoutServiceRequests.prototype.LineItem(e.id,o,e.itemPrice,BagDialogue.item.itemTitle);CheckoutServiceController.prototype.CartItem(g),ShoppingBag.prototype.GetTotal(),t.price.innerHTML=formatter.format(t.quantity.value*Number(e.itemPrice)),ShoppingBag.prototype.UpdateTotal(e.itemPrice),a.innerHTML="("+BagDialogue.itemsCount+")",BagDialogue.checkout_title.innerHTML="Shopping cart ("+BagDialogue.itemsCount+")",BagDialogue.itemsCount>0?(BagDialogue.emptyContainerDOM.style.display="none",BagDialogue.bagDialogueContent.style.display="block"):(BagDialogue.emptyContainerDOM.style.display="table",BagDialogue.bagDialogueContent.style.display="none"),BagDialogue.specificItemsCount<3&&BagDialogue.bagItemsList.classList.remove("bag_items_scroll")}),BagDialogue.itemsDOM[e.id]=t,BagDialogue.specificItemsCount>2&&BagDialogue.bagItemsList.classList.add("bag_items_scroll")}BagDialogue.subTotalPrice+=Number(e.itemPrice)*Number(e.quantity),ShoppingBag.prototype.UpdateTotal(e.itemPrice),t.totalPrice.innerHTML=e.totalPriceItem};var ThankyouTab=pc.createScript("ThankyouTab");ThankyouTab.prototype.initialize=function(){},ThankyouTab.prototype.update=function(e){},ThankyouTab.prototype.AssignHTML=function(){BagDialogue.tyPopupDOM=document.getElementById("co_thankyou"),BagDialogue.orderAddress=document.getElementById("order_address"),BagDialogue.orderCustomerName=document.getElementById("order_customer_name"),BagDialogue.orderPhone=document.getElementById("order_phone"),BagDialogue.orderEmail=document.getElementById("order_email"),BagDialogue.orderNumber=document.getElementById("ty_order_number_string"),BagDialogue.shipping_method_confirmation=document.getElementById("shipping_method_confirmation")},ThankyouTab.prototype.AssignListeners=function(){this.AssignOnClick()},ThankyouTab.prototype.Open=function(e,o){BagDialogue.tyPopupDOM.style.display="block",BagDialogue.tyPopupDOM.className="show",BagDialogue.checkout_title.innerHTML="Thank You",BagDialogue.orderAddress.innerHTML=BagDialogue.co_shipping_to_address.innerHTML,BagDialogue.orderCustomerName.innerHTML=BagDialogue.co_firstName_DOM.value.toUpperCase()+" "+BagDialogue.co_lastName_DOM.value.toUpperCase(),BagDialogue.orderPhone.innerHTML=BagDialogue.co_phone_DOM.value,BagDialogue.orderEmail.innerHTML=BagDialogue.co_email_DOM.value,BagDialogue.orderNumber.innerHTML="ORDER #"+e,CheckoutDialogController.prototype.ChangeButtonClickListener([BillingTab.prototype.Next,ShippingAddressTab.prototype.Next,ShippingMethodsTab.prototype.Next],ThankyouTab.prototype.Close)},ThankyouTab.prototype.Close=function(){BagDialogue.tyPopupDOM.style.display="none",BagDialogue.tyPopupDOM.className="",CheckoutDialogController.prototype.Close()},ThankyouTab.prototype.Back=function(){ThankyouTab.prototype.Close(),CheckoutDialogController.prototype.Close()},ThankyouTab.prototype.AssignOnClick=function(){};var CheckoutDialogController=pc.createScript("CheckoutDialogController"),BagDialogue={};CheckoutDialogController.attributes.add("checkoutHTML",{type:"asset",assetType:"html",title:"Checkout HTML"}),CheckoutDialogController.attributes.add("checkoutCSS",{type:"asset",assetType:"css",title:"Checkout CSS"}),CheckoutDialogController.attributes.add("yourBagHTML",{type:"asset",assetType:"html",title:"Your Bag HTML"}),CheckoutDialogController.attributes.add("yourBagCSS",{type:"asset",assetType:"css",title:"Your Bag CSS"}),CheckoutDialogController.prototype.initialize=function(){CheckoutDialogController.HTML={},CheckoutDialogController.CSS={},CheckoutDialogController.HTML.base=this.checkoutHTML,CheckoutDialogController.HTML.bag=this.yourBagHTML,CheckoutDialogController.CSS.base=this.checkoutCSS,CheckoutDialogController.CSS.bag=this.yourBagCSS,CheckoutDialogController.prototype.AssignHTML(),ShoppingBag.prototype.AssignHTML(),ShippingAddressTab.prototype.AssignHTML(),ShippingMethodsTab.prototype.AssignHTML(),BillingTab.prototype.AssignHTML(),ThankyouTab.prototype.AssignHTML(),CheckoutDialogController.prototype.AssignListeners(),ShippingAddressTab.prototype.AssignListeners(),ShippingMethodsTab.prototype.AssignListeners(),BillingTab.prototype.AssignListeners(),ThankyouTab.prototype.AssignListeners(),CheckoutHelper.prototype.ResetDialog(),CheckoutHelper.prototype.ResetItemsAndValues(),CheckoutDialogController.prototype.AssignInitalValues(),CheckoutDialogController.prototype.Close(),ShoppingBag.prototype.UpdateTotal(0),BagDialogue.oldScreenWidth=window.innerWidth,BagDialogue.checkoutDropDownOpened=!1},CheckoutDialogController.prototype.update=function(e){},CheckoutDialogController.prototype.AssignHTML=function(){HtmlCssLoader.prototype.AddHtmlToUI(CheckoutDialogController.HTML.base,"Checkout"),HtmlCssLoader.prototype.AddCSS(CheckoutDialogController.CSS.base,"Checkout CSS"),HtmlCssLoader.prototype.AddHtmlToUI(CheckoutDialogController.HTML.bag,"bag_dialog_root"),HtmlCssLoader.prototype.AddCSS(CheckoutDialogController.CSS.bag,"Your Bag css"),BagDialogue.root=document.getElementById("bag_dialog_root"),BagDialogue.dialogueDOM=document.getElementById("bag_dialog"),BagDialogue.dialogOpenTypeParent=document.getElementById("fullHeightModalRight"),BagDialogue.dialogOpenTypeChild=document.getElementById("modal_right"),BagDialogue.checkoutModal=document.getElementById("checkout_modal"),BagDialogue.checkoutContent=document.getElementById("checkout_dialog"),BagDialogue.loadingSpinner=document.getElementById("loading_spinner"),BagDialogue.loadingSpinnerTab3=document.getElementById("loading_spinner_tab3"),this.OrderSummaryHTML(),this.CheckoutHTML(),document.getElementById("coItemPrefab").style.display="none",BagDialogue.checkoutModal.style.display="none",BagDialogue.itemCounter=document.getElementById("bagItemCount")},CheckoutDialogController.prototype.OrderSummaryHTML=function(){BagDialogue.orderSummary_subtotalDOM=document.getElementById("orderSummary_subtotal"),BagDialogue.orderSummary_shippingDOM=document.getElementById("orderSummary_shipping"),BagDialogue.orderSummary_taxesDOM=document.getElementById("orderSummary_taxes"),BagDialogue.orderSummary_grandTotalDOM=document.getElementById("orderSummary_grandTotal"),BagDialogue.bagSubtotalDOM=document.getElementById("bag_orderSummary_subtotal"),BagDialogue.bagGrandTotalDOM=document.getElementById("bag_orderSummary_grandTotal"),BagDialogue.checkoutButton=document.getElementById("checkout"),BagDialogue.coShippingDOM=document.getElementById("co_shipping"),BagDialogue.coSubtotalDOM=document.getElementById("co_subtotal"),BagDialogue.coTaxesDOM=document.getElementById("co_taxes"),BagDialogue.coGrandTotalDOM=document.getElementById("co_grandTotal"),BagDialogue.coSubtotal_mobileDOM=document.getElementById("co_subtotal_mobile"),BagDialogue.coShipping_mobileDOM=document.getElementById("co_shipping_mobile"),BagDialogue.coTaxes_mobileDOM=document.getElementById("co_taxes_mobile"),BagDialogue.coGrandTotal_mobileDOM=document.getElementById("co_grandTotal_mobile"),BagDialogue.coGrandTotal_mobile_portraitDOM=document.getElementById("co_grand_mobile_portrait"),BagDialogue.coSubtotal_mobileDOM1=document.getElementById("co_subtotal_mobile1"),BagDialogue.coShipping_mobileDOM1=document.getElementById("co_shipping_mobile1"),BagDialogue.coTaxes_mobileDOM1=document.getElementById("co_taxes_mobile1"),BagDialogue.coGrandTotal_mobileDOM1=document.getElementById("co_grandTotal_mobile1")},CheckoutDialogController.prototype.CheckoutHTML=function(){BagDialogue.checkout_title=document.getElementById("yb_dialogue_title"),BagDialogue.checkout_tab1=document.getElementById("checkout_tab1"),BagDialogue.checkout_tab2=document.getElementById("checkout_tab2"),BagDialogue.checkout_tab3=document.getElementById("checkout_tab3"),BagDialogue.continue_shoppingBtn=document.getElementById("continue_shopping"),BagDialogue.continue_placeOrderBtn=document.getElementById("myBag_continue_placeOrder").children[0]},CheckoutDialogController.prototype.AssignInitalValues=function(){BagDialogue.invalidFieldsCount=0,BagDialogue.bagitem={},BagDialogue.itemsCount=0,BagDialogue.specificItemsCount=0,BagDialogue.subTotalPrice=0,BagDialogue.taxesAmount="-",BagDialogue.shippingCost="",BagDialogue.checkoutPhase=1,BagDialogue.checkout={},BagDialogue.items={},BagDialogue.itemsDOM={},BagDialogue.shippingMethods=[]},CheckoutDialogController.prototype.AssignListeners=function(){this.AssignOnClick()},CheckoutDialogController.prototype.AssignOnClick=function(){CheckoutValidator.prototype.AssignClickEventListener(BagDialogue.continue_shoppingBtn,this.Close),CheckoutValidator.prototype.AssignClickEventListener(BagDialogue.dialogOpenTypeParent.getElementsByClassName("bag-black-bg")[0],HeaderController.prototype.ToggleBagDialog),CheckoutValidator.prototype.AssignClickEventListener(BagDialogue.checkoutButton,CheckoutDialogController.prototype.StartCheckout)},CheckoutDialogController.prototype.Open=function(){BagDialogue.isOpen=!0,BagDialogue.checkoutModal.style.display="none",BagDialogue.itemsCount>0?(BagDialogue.emptyContainerDOM.style.display="none",BagDialogue.bagDialogueContent.style.display="block"):(BagDialogue.emptyContainerDOM.style.display="table",BagDialogue.bagDialogueContent.style.display="none"),BagDialogue.dialogOpenTypeParent.style.display="block";BagDialogue.itemsCount,BagDialogue.checkout_title.innerHTML="Shopping cart ("+BagDialogue.itemsCount+")",ShippingAddressTab.prototype.Close(),ShippingMethodsTab.prototype.Close(),BillingTab.prototype.Close(),ThankyouTab.prototype.Close(),CheckoutDialogController.prototype.SetButtonState(!0),ShoppingBag.prototype.UpdateTotal(0),AmplitudeAnalytics.prototype.LogShoppingBagOpened()},CheckoutDialogController.prototype.Close=function(){BagDialogue.isOpen=!1,BagDialogue.dialogOpenTypeParent.style.display="none",BagDialogue.checkoutModal.style.display="none",BagDialogue.textIntoSpinner.style.display="block",BagDialogue.shippingRadioContainer.style.display="none",BagDialogue.shippingTitleDOM.style.display="block",CheckoutHelper.prototype.ResetDialog(),CheckoutHelper.prototype.ResetItemsAndValues(),AmplitudeAnalytics.prototype.LogShoppingBagClosed(),ShippingMethodsTab.prototype.RemoveShippingMethodList(),CheckoutDialogController.prototype.RemoveListeners(),BagDialogue.currentFocusedInput=!1,document.getElementsByClassName("modal-backdrop")[0]&&document.getElementsByClassName("modal-backdrop")[0].parentNode.removeChild(document.getElementsByClassName("modal-backdrop")[0])},CheckoutDialogController.prototype.FillBagItems=function(){var e,o,t=BagDialogue.items,a=document.getElementById("coItemPrefab"),l=document.getElementById("co_items_list"),i=document.getElementById("bagItemsCount"),n=document.getElementById("bagItemsPrice"),g=0;for(var r in t)(e=a.cloneNode(!0)).style.display="flex",e.id=e.id+r,l.appendChild(e),e.name=$(e).find("#coItemTitle"),e.image=$(e).find("#coItemImg"),e.sizeName=$(e).find("#coItemSize"),e.colorName=$(e).find("#coItemColor"),e.quantity=$(e).find("#coItemQty"),e.price=$(e).find("#coItemPrice"),e.quantity.innerHTML=parseInt(t[r].quantity),e.colorName.innerHTML=" "+t[r].color,e.name.innerHTML=t[r].itemTitle,e.image.src=t[r].imageURL,e.price.innerHTML=formatter.format(t[r].totalPriceItem),g++;o=g>1?"Items":"Item",i.innerHTML=g+" "+o+" |",n.innerHTML=BagDialogue.coSubtotalDOM.innerHTML},CheckoutDialogController.propertyIsEnumerable.CreateBagItem=function(){var e=prefab.cloneNode(!0);e.price=$(e).find("#item-price")},CheckoutDialogController.prototype.RemoveBagItems=function(){for(var e=document.getElementById("co_items_list"),o=e.children.length-1;o>0;o--)e.removeChild(e.children[o])},CheckoutDialogController.prototype.StartCheckout=function(){0!==BagDialogue.specificItemsCount&&(BagDialogue.isOpen=!0,BagDialogue.dialogOpenTypeParent.style.display="none",BagDialogue.checkoutModal.style.display="block",BagDialogue.bagDialogueContent.style.display="none",CheckoutDialogController.prototype.RemoveBagItems(),CheckoutDialogController.prototype.FillBagItems(),ShippingAddressTab.prototype.Open(),ShoppingBag.prototype.UpdateTotal(0),AmplitudeAnalytics.prototype.LogCheckoutStarted(Checkout.cart_id))},CheckoutDialogController.prototype.isPromotionChecked=function(){if(document.getElementById("checkboxDesktop2"))return document.getElementById("checkboxDesktop2").checked||document.getElementById("checkboxMobile").checked},CheckoutDialogController.prototype.RemoveListeners=function(){BagDialogue.continue_placeOrderBtn.removeEventListener("click",ShippingAddressTab.prototype.Validate),BagDialogue.continue_placeOrderBtn.removeEventListener("click",ShippingMethodsTab.prototype.Validate),BagDialogue.continue_placeOrderBtn.removeEventListener("click",BillingTab.prototype.Validate),BagDialogue.continue_placeOrderBtn.removeEventListener("click",ThankyouTab.prototype.Validate)},CheckoutDialogController.prototype.setInputsClick=function(e){e.addEventListener("click",function(){var o=$(window).height(),t=$(window).width();BagDialogue.viewport.setAttribute("content","height="+o+"px, width="+t+"px, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=no"),BagDialogue.currentFocusedInput=e,e.scrollIntoView()})},CheckoutDialogController.prototype.checkFocused=function(e){e.addEventListener("focusout",function(){e.scrollIntoView(!1)})},CheckoutDialogController.prototype.SetButtonState=function(e){BagDialogue.continue_placeOrderBtn.disabled=!e,BagDialogue.continue_placeOrderBtn.style.background=e?"rgba(0, 0, 0, 0.8)":"rgba(0, 0, 0, 0.3)"},CheckoutDialogController.prototype.SetButtonText=function(e){BagDialogue.continue_placeOrderBtn.innerHTML=e},CheckoutDialogController.prototype.ChangeButtonClickListener=function(e,o){if(console.log("%%%%%%%%"),void 0!==e)if(Array.isArray(e))for(var t=0;t<e.length;t++)CheckoutDialogController.prototype.RemoveButtonClickListener(e[t]);else CheckoutDialogController.prototype.RemoveButtonClickListener(e);console.log(e),console.log(o),CheckoutDialogController.prototype.AddButtonClickListener(o)},CheckoutDialogController.prototype.RemoveButtonClickListener=function(e){BagDialogue.continue_placeOrderBtn.removeEventListener("click",e)},CheckoutDialogController.prototype.AddButtonClickListener=function(e){CheckoutValidator.prototype.AssignClickEventListener(BagDialogue.continue_placeOrderBtn,e)};var SpinnerPopup={InitValues:function(){SpinnerPopup.dialogueDOM=document.getElementById("spinner_popup"),SpinnerPopup.text=document.getElementById("spinner_popup-information"),SpinnerPopup.closeBtn=document.getElementById("spinner_popup-close-btn"),SpinnerPopup.closeBtn.addEventListener("click",SpinnerPopup.Close),SpinnerPopup.dialogueDOM.style.display="none"},Open:function(e){e&&(this.text.innerHTML=e),this.dialogueDOM.style.display="block",this.dialogueDOM.style.zIndex="1",this.dialogueDOM.parentNode.className="dialog_open dialog_opacity_transition overlay_dialog_depth"},Close:function(){SpinnerPopup.dialogueDOM.style.display="none",SpinnerPopup.dialogueDOM.parentNode.className="dialog_close"}};var Spinner={InitValues:function(){Spinner.gif=document.getElementById("spinner")},Open:function(){Spinner.gif.style.display="block",Spinner.gif.parentNode.className="dialog_open dialog_opacity_transition overlay_dialog_depth"},Close:function(){Spinner.gif.style.display="none",Spinner.gif.parentNode.className="dialog_close"}};var NuxControllerDiv,welcomeDiv,instructionsDiv,activeInstructions,activeInstructionsNumber,isRotatingTowards,instructionVantagePoint,NuxController=pc.createScript("NuxController");NuxController.attributes.add("WelcomeScreenHTML",{type:"asset",assetType:"html",title:"Welcome Screen HTML"}),NuxController.attributes.add("WelcomeScreenCSS",{type:"asset",assetType:"css",title:"Welcome Screen CSS"}),NuxController.attributes.add("InstructionsHTML",{type:"asset",assetType:"html",title:"Instructions HTML"}),NuxController.attributes.add("InstructionsCSS",{type:"asset",assetType:"css",title:"Instructions CSS"}),NuxController.attributes.add("instructionsdelay",{type:"number",title:"Instructions Delay"}),NuxController.attributes.add("vantagePointId",{type:"number",title:"Vantage Point Id"}),NuxController.attributes.add("hotspotId",{type:"number",title:"Hotspot Id"}),NuxController.attributes.add("PDPTimeout",{type:"number",title:"PDP Timeout"}),NuxController.attributes.add("camera",{type:"entity",title:"Main Camera"}),NuxController.attributes.add("xRot",{type:"number",title:"X Rotation for Hotspot"}),NuxController.attributes.add("yRot",{type:"number",title:"Y Rotation for Hotspot"}),NuxController.attributes.add("rotSpeed",{type:"number",title:"rotationSpeed"}),NuxController.prototype.initialize=function(){isRotatingTowards=!1,this.CreateHTML(),this.AddCSS(this.WelcomeScreenCSS),this.AddCSS(this.InstructionsCSS),welcomeDiv=this.AddHTML(this.WelcomeScreenHTML),instructionsDiv=this.AddHTML(this.InstructionsHTML),this.AssignEventListeners(),NuxControllerDiv.style.display="block",welcomeDiv.style.display="block",setTimeout(this.OpenInstructions,1e3*this.instructionsdelay),canMove=!1,instructionVantagePoint=this.vantagePointId},NuxController.prototype.update=function(){if(isRotatingTowards){var t=this.camera.getRotation(),e=(new pc.Quat).setFromEulerAngles(this.xRot,this.yRot,0);t.slerp(t,e,this.rotSpeed),this.camera.setRotation(t)}},NuxController.prototype.CreateHTML=function(){(NuxControllerDiv=document.createElement("div")).id="NuxController",NuxControllerDiv.style.display="none",document.body.appendChild(NuxControllerDiv)},NuxController.prototype.AddHTML=function(t){var e=document.createElement("div");return e.innerHTML=t.resource||"",e.style.display="none",NuxControllerDiv.appendChild(e),e},NuxController.prototype.AddCSS=function(t){var e=document.createElement("link");e.href=t.getFileUrl(),e.rel="stylesheet",document.head.appendChild(e)},NuxController.prototype.AssignEventListeners=function(){var t=document.getElementById("skipInstructions");t.addEventListener("click",function(){AmplitudeAnalytics.prototype.LogSkipInstructions(),NuxController.prototype.CloseInstructions()}),(t=document.getElementById("ibtn1")).addEventListener("click",NuxController.prototype.Instructions1),(t=document.getElementById("ibtn2")).addEventListener("click",NuxController.prototype.Instructions2),(t=document.getElementById("ibtn3")).addEventListener("click",NuxController.prototype.Instructions3),(t=document.getElementById("instructionVantagePoint")).addEventListener("click",function(){AmplitudeAnalytics.prototype.LogMoveInstructionsIcon(),NuxController.prototype.Instructions3()});var e=this.hotspotId,o=1e3*this.PDPTimeout;(t=document.getElementById("instructionHotSpot")).addEventListener("click",function(){RayCastDetector.OpenById(e),NuxController.prototype.CloseInstructions(),setTimeout(NuxController.prototype.CloseHotSpot,o),AmplitudeAnalytics.prototype.LogPDPInstructions()})},NuxController.prototype.OpenInstructions=function(){welcomeDiv.style.display="none",instructionsDiv.style.display="block",document.getElementById("ibtn1").click()},NuxController.prototype.CloseInstructions=function(){isRotatingTowards=!1,canMove=!0,instructionsDiv.style.display="none"},NuxController.prototype.Instructions1=function(){isRotatingTowards=!1,NuxController.prototype.Controls(1),document.getElementById("nextInstructionBtn").className="nextInstruction slide-up",document.getElementById("nextInstructionBtn").removeEventListener("click",NuxController.prototype.Instructions3),document.getElementById("nextInstructionBtn").addEventListener("click",function(){AmplitudeAnalytics.prototype.LogBrowseInstructions(),NuxController.prototype.Instructions2()}),setTimeout(function(){"item slide-in"==document.getElementById("instructions1").className&&(NuxController.prototype.SetSlideInOffset("instructions2"),NuxController.prototype.SetSlideInOffset("instructions3"))},500)},NuxController.prototype.Instructions2=function(){isRotatingTowards=!1,NuxController.prototype.Controls(2),"nextInstruction slide-up"!==document.getElementById("nextInstructionBtn").className&&(document.getElementById("nextInstructionBtn").className="nextInstruction slide-up"),document.getElementById("nextInstructionBtn").removeEventListener("click",NuxController.prototype.Instructions2),document.getElementById("nextInstructionBtn").addEventListener("click",function(){AmplitudeAnalytics.prototype.LogMoveInstructionsNext(),NuxController.prototype.Instructions3()}),setTimeout(function(){"item slide-in"==document.getElementById("instructions2").className&&(NuxController.prototype.SetSlideInOffset("instructions1"),NuxController.prototype.SetSlideInOffset("instructions3"))},500)},NuxController.prototype.Instructions3=function(){SwitchToPointById(instructionVantagePoint),isRotatingTowards=!0,NuxController.prototype.Controls(3),document.getElementById("nextInstructionBtn").className="nextInstruction slide-down",setTimeout(function(){"item slide-in"==document.getElementById("instructions3").className&&(NuxController.prototype.SetSlideInOffset("instructions1"),NuxController.prototype.SetSlideInOffset("instructions2"))},500)},NuxController.prototype.Controls=function(t){if(t){var e="instructions"+t;if(!activeInstructions)return(activeInstructions=document.getElementById(e)).className="item slide-in",document.getElementById("ibtn"+t).style.color="white",void(activeInstructionsNumber=t);activeInstructions.id!=e&&(document.getElementById("ibtn"+activeInstructionsNumber).style.color="",activeInstructions.className="item slide-out",(activeInstructions=document.getElementById(e)).className="item slide-in",document.getElementById("ibtn"+t).style.color="white",activeInstructionsNumber=t)}},NuxController.prototype.SetSlideInOffset=function(t){document.getElementById(t).className="item slide-in-offset"},NuxController.prototype.CloseHotSpot=function(){BagDialogue.isOpen&&CheckoutDialogController.prototype.Close(),ProductDialogue.isOpen&&ProductDialogue.Close()};var GoogleFonts=pc.createScript("GoogleFonts");GoogleFonts.attributes.add("fonts",{type:"string",title:"Font Names",array:!0}),GoogleFonts.prototype.initialize=function(){this.LoadCSS(this.fonts)},GoogleFonts.prototype.LoadCSS=function(t){for(var o=0;o<t.length;o++){t[o]=t[o].replace(" ","+");var e=document.createElement("link");e.type="text/css",e.rel="stylesheet",e.id="google font",e.href="https://fonts.googleapis.com/css?family=".concat(t[o]),document.head.appendChild(e)}};var CubeShader={shaderName:"360_cube",mainTexProp:"_MainTex",colorProp:"_Color",effectProp:"_EffectCoef",oldPointProp:"_OldPoint",hiddenTexIndexOldProp:"_hiddenTexIndexOld",newPointProp:"_NewPoint",hiddenTexIndexNewProp:"_hiddenTexIndexNew",isTopProp:"_isTop",transitionProp:"_TransitionValue",initMaterialDefaultValues:function(e,r){var t=r._diffuseMap,a=r._diffuse;e.name=CubeShader.shaderName,e.setShader(cubeShader),null!==t&&e.setParameter(CubeShader.mainTexProp,t),e.setParameter(CubeShader.colorProp,ColorToArray(a)),e.setParameter(CubeShader.effectProp,0),e.setParameter(CubeShader.transitionProp,1)},newPointPreSettingsAtAppStart:function(e){for(var r=new pc.Vec4(0,0,0,0),t=GetShaderOldTextureNames(),a=0;a<e.length;a++){var d=e[a],n=newViewPoint.GetCameraPosition(),o=newViewPoint.GetCameraRotation(),i=new pc.Vec4(n.x,n.y,n.z,o.y);d.setParameter(CubeShader.mainTexProp,void 0),d.setParameter(CubeShader.oldPointProp,Vec4ToArray(r)),d.setParameter(CubeShader.newPointProp,Vec4ToArray(i)),d.setParameter(t[0],void 0),d.setParameter(t[1],void 0),d.setParameter(t[2],void 0),d.setParameter(t[3],void 0),d.setParameter(CubeShader.effectProp,1)}},newPointPreSettingsAtPointSwitch:function(e){CubeShader.hiddenHorizontalTextureIndexOld=CubeShader.hiddenHorizontalTextureIndexNew;for(var r=GetShaderOldTextureNames(),t=GetShaderNewTextureNames(),a=0;a<e.length;a++){var d=e[a];d.setParameter(CubeShader.oldPointProp,d.getParameter(CubeShader.newPointProp).data);var n=newViewPoint.GetCameraPosition(),o=newViewPoint.GetCameraRotation(),i=new pc.Vec4(n.x,n.y,n.z,o.y);d.setParameter(CubeShader.newPointProp,Vec4ToArray(i)),d.setParameter(CubeShader.hiddenTexIndexOldProp,CubeShader.hiddenHorizontalTextureIndexOld),d.setParameter(r[0],d.getParameter(t[0]).data),d.setParameter(r[1],d.getParameter(t[1]).data),d.setParameter(r[2],d.getParameter(t[2]).data),d.setParameter(r[3],d.getParameter(t[3]).data),d.setParameter(CubeShader.transitionProp,0)}},newPointSettings:function(e){var r=GetShaderNewTextureNames(),t=newViewPoint.GetCameraRotation().y,a=GetCameraRotation().clone();a.y=FormatAngleIn180Range(a.y+180),a.y=FormatAngleIn180Range(a.y-t+90);var d=GetHorizontalTextureIndexByAngle(a.y);CubeShader.hiddenHorizontalTextureIndexNew=d;var n=a.x>0;CubeShader.hiddenVerticalTextureIndex=n?5:4;for(var o=0;o<e.length;o++){var i=e[o];i.setParameter(CubeShader.hiddenTexIndexNewProp,CubeShader.hiddenHorizontalTextureIndexNew),i.setParameter(r[0],curTestTextures.new[(CubeShader.hiddenHorizontalTextureIndexNew+1)%4]),i.setParameter(r[1],curTestTextures.new[(CubeShader.hiddenHorizontalTextureIndexNew+2)%4]),i.setParameter(r[2],curTestTextures.new[(CubeShader.hiddenHorizontalTextureIndexNew+3)%4]),n?(i.setParameter(CubeShader.isTopProp,!0),i.setParameter(r[3],curTestTextures.new[4])):(i.setParameter(CubeShader.isTopProp,!1),i.setParameter(r[3],curTestTextures.new[5]))}},update:function(e,r){CubeShader.UpdateShaderVerticalHiddenTextures(r,CubeShader.hiddenVerticalTextureIndex,GetShaderOldTextureNames(),curTestTextures.old),CubeShader.hiddenVerticalTextureIndex=CubeShader.UpdateShaderVerticalHiddenTextures(r,CubeShader.hiddenVerticalTextureIndex,GetShaderNewTextureNames(),curTestTextures.new),CubeShader.hiddenHorizontalTextureIndexOld=CubeShader.UpdateShaderHorizontalHiddenTextures(r,CubeShader.hiddenHorizontalTextureIndexOld,CubeShader.hiddenTexIndexOldProp,oldViewPoint,GetShaderOldTextureNames(),curTestTextures.old),CubeShader.hiddenHorizontalTextureIndexNew=CubeShader.UpdateShaderHorizontalHiddenTextures(r,CubeShader.hiddenHorizontalTextureIndexNew,CubeShader.hiddenTexIndexNewProp,newViewPoint,GetShaderNewTextureNames(),curTestTextures.new)},UpdateShaderVerticalHiddenTextures:function(e,r,t,a){if(void 0!==a[0]){var d=GetCameraRotation().clone(),n=d.x>0?5:4;if(r!==n){for(var o=0;o<e.length;o++){var i=e[o];i.setParameter(CubeShader.isTopProp,d.x>0),i.setParameter(t[3],a[9-n])}return n}return r}},UpdateShaderHorizontalHiddenTextures:function(e,r,t,a,d,n){if(void 0!==n[0]){var o=a.GetCameraRotation().y,i=GetCameraRotation().clone();i.y=FormatAngleIn180Range(i.y+180),i.y=FormatAngleIn180Range(i.y-o+90);var u=GetHorizontalTextureIndexByAngle(i.y);if(r!==u){for(var P=0;P<e.length;P++){var h=e[P];h.setParameter(t,u),h.setParameter(d[0],n[(u+1)%4]),h.setParameter(d[1],n[(u+2)%4]),h.setParameter(d[2],n[(u+3)%4])}return u}return r}}};var CubemapShader={shaderName:"360_cube_map",mainTexProp:"_MainTex",colorProp:"_Color",effectProp:"_EffectCoef",oldPointProp:"_OldPoint",oldRotationMatrixProp:"_OldRotMat",oldCubemapProp:"_OldCubemap",newPointProp:"_NewPoint",newRotationMatrixProp:"_NewRotMat",newCubemapProp:"_NewCubemap",transitionProp:"_TransitionValue",initMaterialDefaultValues:function(e,a){var r=a._diffuseMap,t=a._diffuse;e.name=CubemapShader.shaderName,e.setShader(cubeMapShader),null!==r&&e.setParameter(CubemapShader.mainTexProp,r),e.setParameter(CubemapShader.colorProp,Vec3ToArray(t)),e.setParameter(CubemapShader.effectProp,0),e.setParameter(CubemapShader.transitionProp,1)},newPointPreSettingsAtAppStart:function(e){for(var a={cubemap:!0,rgbm:!0,fixCubemapSeams:!0,mipmaps:!1,addressU:pc.ADDRESS_CLAMP_TO_EDGE,addressV:pc.ADDRESS_CLAMP_TO_EDGE},r=new pc.Texture(application.graphicsDevice,a),t=new pc.Texture(application.graphicsDevice,a),o=new pc.Vec3,p=new pc.Mat3,n=0;n<e.length;n++){var m=e[n];m.setParameter(CubemapShader.mainTexProp,void 0),m.setParameter(CubemapShader.oldPointProp,Vec3ToArray(o)),m.setParameter(CubemapShader.newPointProp,Vec3ToArray(newViewPoint.GetCameraPosition())),m.setParameter(CubemapShader.oldRotationMatrixProp,p.data),m.setParameter(CubemapShader.newRotationMatrixProp,newViewPoint.GetCameraRotationMatrix().data),m.setParameter(CubemapShader.oldCubemapProp,r),m.setParameter(CubemapShader.newCubemapProp,t),m.setParameter(CubemapShader.effectProp,1)}},newPointPreSettingsAtPointSwitch:function(e){for(var a=0;a<e.length;a++){var r=e[a];r.setParameter(CubemapShader.oldPointProp,r.getParameter(CubemapShader.newPointProp).data),r.setParameter(CubemapShader.newPointProp,Vec3ToArray(newViewPoint.GetCameraPosition())),r.setParameter(CubemapShader.oldRotationMatrixProp,r.getParameter(CubemapShader.newRotationMatrixProp).data),r.setParameter(CubemapShader.newRotationMatrixProp,newViewPoint.GetCameraRotationMatrix().data);var t=r.getParameter(CubemapShader.oldCubemapProp).data;r.setParameter(CubemapShader.oldCubemapProp,r.getParameter(CubemapShader.newCubemapProp).data),r.setParameter(CubemapShader.newCubemapProp,t),r.setParameter(CubemapShader.transitionProp,0)}},newPointSettings:function(e){var a,r=[];r.push(curImages.new[1]),r.push(curImages.new[3]),r.push(curImages.new[4]),r.push(curImages.new[5]),r.push(curImages.new[0]),r.push(curImages.new[2]);for(var t=0;t<e.length;t++){var o=e[t];0===t&&(a=o.getParameter(CubemapShader.newCubemapProp).data).setSource(r),o.setParameter(CubemapShader.newCubemapProp,a)}},update:function(e,a){}};var BookAppointment=pc.createScript("bookAppointment"),BookAppointmentModal={};BookAppointment.attributes.add("book_appointment_HTML",{type:"asset",assetType:"html",title:"Book Appointment HTML"}),BookAppointment.attributes.add("book_appointment_CSS",{type:"asset",assetType:"css",title:"Book Appointment CSS"}),BookAppointment.attributes.add("toEmail",{type:"string",title:"From Email"}),BookAppointment.prototype.initialize=function(){BookAppointment.HTML={},BookAppointment.CSS={},BookAppointment.HTML.base=this.book_appointment_HTML,BookAppointment.CSS.base=this.book_appointment_CSS,BookAppointment.ToEmail=this.from,HtmlCssLoader.prototype.AddHtmlToUI(BookAppointment.HTML.base,"Book Appointment HTML"),HtmlCssLoader.prototype.AddCSS(BookAppointment.CSS.base,"Book Appointment CSS"),this.AssignHTML(),this.AssignOnClick(),BookAppointmentModal.details.container.style.display="block",BookAppointmentModal.thankyou.container.style.display="none",BookAppointment.isOpen=!0,BookAppointment.prototype.Close()},BookAppointment.prototype.AssignHTML=function(){BookAppointmentModal.base=document.getElementById("book_dialog_container"),BookAppointmentModal.closeBtn=document.getElementById("book-dialog-close"),BookAppointmentModal.close=document.getElementById("bk_apt_dialog-close"),BookAppointmentModal.dropDownMenuBookBtn=document.getElementById("book_box"),BookAppointmentModal.quickNavBookBtn=document.getElementById("qn_book_btn"),BookAppointmentModal.bookbtn=document.getElementById("bk_apt_book-btn"),BookAppointmentModal.thankyou={},BookAppointmentModal.thankyou.container=document.getElementById("book_appointment_thankyou"),BookAppointmentModal.details={},BookAppointmentModal.details.container=document.getElementById("bk_apt_form"),BookAppointmentModal.details.header=document.getElementById("book_appointment_details"),BookAppointmentModal.details.firstname=document.getElementById("bk_apt_firstname"),BookAppointmentModal.details.lastname=document.getElementById("bk_apt_lastname"),BookAppointmentModal.details.email=document.getElementById("bk_apt_email"),BookAppointmentModal.details.phone=document.getElementById("bk_apt_phone"),BookAppointmentModal.details.text=document.getElementById("bk_apt_text")},BookAppointment.prototype.AssignOnClick=function(){CheckoutValidator.prototype.AssignClickEventListener(BookAppointmentModal.bookbtn,BookAppointment.prototype.Validate),CheckoutValidator.prototype.AssignClickEventListener(BookAppointmentModal.close,BookAppointment.prototype.Close),CheckoutValidator.prototype.AssignClickEventListener(BookAppointmentModal.dropDownMenuBookBtn,BookAppointment.prototype.Open)},BookAppointment.prototype.Send=function(){var o="1819f77b-402d-488d-bf1a-24e47c97dba9",t=BookAppointment.ToEmail;Email.send({SecureToken:o,To:t,From:BookAppointmentModal.details.email.value,Subject:BookAppointmentModal.details.firstname.value+" has requested a new appointment!",Body:BookAppointmentModal.details.firstname.value+" "+BookAppointmentModal.details.lastname.value+" <br> Phone: "+BookAppointmentModal.details.phone.value+"<br> Email: "+BookAppointmentModal.details.email.value+"<br> Message: "+BookAppointmentModal.details.text.value}),Email.send({SecureToken:o,To:BookAppointmentModal.details.email.value,From:t,Subject:"Booking confirmation",Body:"Dear "+BookAppointmentModal.details.firstname.value+",<br/>We have recieved your appointment email. <br/> An Interior Designer will reach out shortly...<br/><br/> Thank you, <br/> NextRetail Team"})},BookAppointment.prototype.Validate=function(){CheckoutValidator.prototype.CheckValid(BookAppointmentModal.details.firstname,BookAppointmentModal.details.firstname.value),CheckoutValidator.prototype.CheckValid(BookAppointmentModal.details.lastname,BookAppointmentModal.details.lastname.value),CheckoutValidator.prototype.CheckValid(BookAppointmentModal.details.email,BookAppointmentModal.details.email.value),CheckoutValidator.prototype.CheckValid(BookAppointmentModal.details.phone,BookAppointmentModal.details.phone.value),BookAppointmentModal.details.firstname.value&&BookAppointmentModal.details.lastname.value&&BookAppointmentModal.details.email.value&&BookAppointmentModal.details.phone.value&&(BookAppointmentModal.details.container.style.display="none",BookAppointmentModal.bookbtn.style.display="none",BookAppointmentModal.thankyou.container.style.display="block",BookAppointmentModal.details.header.style.display="none",this.Send())},BookAppointment.prototype.Close=function(){BookAppointment.isOpen=!1,BookAppointmentModal.base.style.display="none",BookAppointmentModal.details.container.style.display="block",BookAppointmentModal.bookbtn.style.display="block",BookAppointmentModal.thankyou.container.style.display="none",BookAppointmentModal.details.header.style.display="block"},BookAppointment.prototype.Open=function(){MenuDropdown.Close(),BookAppointment.isOpen=!0,BookAppointmentModal.base.style.display="block",BookAppointmentModal.base.style.className="dialog_open dialog_opacity_transition main_dialog_depth",BookAppointmentModal.details.header.style.display="block",BookAppointmentModal.details.container.style.display="block",BookAppointmentModal.bookbtn.style.display="block",BookAppointmentModal.thankyou.container.style.display="none"};var MenuDropdown={InitValues:function(n){MenuDropdown.root=n,MenuDropdown.GetHtmlElements(),MenuDropdown.SetClickListeners(),MenuDropdown.isOpen=!1,MenuDropdown.root.style.display="none"},GetHtmlElements:function(){MenuDropdown.blackBG=document.getElementById("menu_black_bg")},SetClickListeners:function(){CheckoutValidator.prototype.AssignClickEventListener(UI.menuDropdownBtn,MenuDropdown.Open),CheckoutValidator.prototype.AssignClickEventListener(MenuDropdown.blackBG,MenuDropdown.Close)},Open:function(){isUIOpen=!0,MenuDropdown.isOpen=!0},Close:function(){isUIOpen=!1,MenuDropdown.isOpen=!1}};var HtmlCssLoader=pc.createScript("HtmlCssLoader");HtmlCssLoader.prototype.initialize=function(){},HtmlCssLoader.prototype.update=function(e){},HtmlCssLoader.prototype.AddHtmlToUI=function(e,t,d){var o=document.createElement("div");return o.id=t,o.innerHTML=e.resource,d?document.body.appendChild(o):uiDiv.appendChild(o),o},HtmlCssLoader.prototype.AddCSS=function(e,t){var d=document.createElement("link");d.id=t,d.href=e.getFileUrl(),d.rel="stylesheet",document.head.appendChild(d)},HtmlCssLoader.prototype.AddScript=function(e,t){var d=document.createElement("script");d.innerHTML=e,d.id=t,document.body.appendChild(d)};// QuickNavController.js
var QuickNavController = pc.createScript('QuickNavController');

QuickNavController.attributes.add ('QuickNavHTML', { type: 'asset', assetType:'html',title: 'QuickNav HTML',class: 'preventCanvasEvents'});
QuickNavController.attributes.add ('QuickNavCSS', { type: 'asset', assetType:'css',title: 'QuickNav CSS'});


QuickNavController.isOpen = false;

// initialize code called once per entity
QuickNavController.prototype.initialize = function() {
    
    QuickNavController.HTML = {};
    QuickNavController.CSS = {};
    QuickNavController.HTML.base = this.QuickNavHTML;
    QuickNavController.CSS.base = this.QuickNavCSS;
    //QuickNavController.CSS.base = this.QuickNavCSS;
    
    
    setTimeout( function() { 
        HtmlCssLoader.prototype.AddHtmlToUI (QuickNavController.HTML.base, 'Quick Nav HTML', true);
        QuickNavController.prototype.AssignOnClick();
    }, 1000);
    HtmlCssLoader.prototype.AddCSS (QuickNavController.CSS.base, 'Quick Nav CSS');
};

// update code called every frame
QuickNavController.prototype.update = function(dt) {
    
};

QuickNavController.prototype.AssignOnClick = function()
{
    var quickNav_1 = document.getElementsByClassName("quickNav_1");    
    var quickNav_2 = document.getElementsByClassName("quickNav_2");
    var quickNav_3 = document.getElementsByClassName("quickNav_3");
    var quickNav_4 = document.getElementsByClassName("quickNav_4");
    var quickNav_5 = document.getElementsByClassName("quickNav_5");
    var quickNav_6 = document.getElementsByClassName("quickNav_6");
    var quickNav_Nux = document.getElementById("quickNav_Nux");

    if(quickNav_1) {
        for(let i = 0; i < quickNav_1.length; i++)
        {
            quickNav_1[i].addEventListener('click' , function() { QuickNavController.prototype.Navigate('0', handBagsRotation, position_handBags); });
        }
    }
    
    if(quickNav_2){
        for(let i = 0; i < quickNav_2.length; i++)
        {
            quickNav_2[i].addEventListener('click' , function() { QuickNavController.prototype.Navigate('1', dayWearRotation, position_dayWear); });
        }
    }
    
    if(quickNav_3){
        for(let i = 0; i < quickNav_3.length; i++)
        {
            quickNav_3[i].addEventListener('click' , function() { QuickNavController.prototype.Navigate('2', eveningRotation, position_evening); });
        }
    }
    
    if(quickNav_Nux)
    {
        quickNav_Nux.addEventListener('click', function()
        {
            SinglePageNuxController.prototype.OpenInstructions();
        });
    }
};

QuickNavController.prototype.Navigate = function(id, rot, position)
{
    AmplitudeAnalytics.prototype.LogQuickNavClicked(id);
    var quat = new pc.Quat ().setFromEulerAngles (rot.x, rot.y, 0);
    SwitchToPoint(position, quat);
};

var isRotatingTowards,SinglePageNuxController=pc.createScript("SinglePageNuxController");SinglePageNuxController.attributes.add("WelcomeScreenHTML",{type:"asset",assetType:"html",title:"Welcome Screen HTML"}),SinglePageNuxController.attributes.add("WelcomeScreenCSS",{type:"asset",assetType:"css",title:"Welcome Screen CSS"}),SinglePageNuxController.attributes.add("InstructionsHTML",{type:"asset",assetType:"html",title:"Instructions HTML"}),SinglePageNuxController.attributes.add("InstructionsCSS",{type:"asset",assetType:"css",title:"Instructions CSS"}),SinglePageNuxController.attributes.add("instructionsdelay",{type:"number",title:"Instructions Delay"}),SinglePageNuxController.prototype.initialize=function(){this.CreateHTML(),this.AddCSS(this.WelcomeScreenCSS),this.AddCSS(this.InstructionsCSS),SinglePageNuxController.welcomeDiv=this.AddHTML(this.WelcomeScreenHTML),SinglePageNuxController.instructionsDiv=this.AddHTML(this.InstructionsHTML),this.AssignEventListeners(),SinglePageNuxController.base.style.display="block",SinglePageNuxController.welcomeDiv.style.display="block",setTimeout(this.OpenInstructions,1e3*this.instructionsdelay),canMove=!1,canRotate=!0},SinglePageNuxController.prototype.CreateHTML=function(){SinglePageNuxController.base=document.createElement("div"),SinglePageNuxController.base.id="SinglePageNuxController",SinglePageNuxController.base.style.display="none",document.body.appendChild(SinglePageNuxController.base)},SinglePageNuxController.prototype.AddHTML=function(e){var t=document.createElement("div");return t.innerHTML=e.resource||"",t.style.display="none",SinglePageNuxController.base.appendChild(t),t},SinglePageNuxController.prototype.AddCSS=function(e){var t=document.createElement("link");t.href=e.getFileUrl(),t.rel="stylesheet",document.head.appendChild(t)},SinglePageNuxController.prototype.AssignEventListeners=function(){document.getElementById("SPskipInstructions").addEventListener("click",function(){AmplitudeAnalytics.prototype.LogSkipInstructions(),SinglePageNuxController.prototype.CloseInstructions()})},SinglePageNuxController.prototype.OpenInstructions=function(){SinglePageNuxController.welcomeDiv.style.display="none",SinglePageNuxController.instructionsDiv.style.display="block"},SinglePageNuxController.prototype.CloseInstructions=function(){console.log("close instructions"),canMove=!0,canRotate=!0,isRotatingTowards=!1,SinglePageNuxController.instructionsDiv.style.display="none"};var HeaderController=pc.createScript("headerController");HeaderController.attributes.add("headerHTML",{type:"asset",assetType:"html",title:"Header HTML"}),HeaderController.attributes.add("headerCSS",{type:"asset",assetType:"css",title:"Header CSS"}),HeaderController.attributes.add("bagUrl",{type:"string",title:"Bag URL"}),HeaderController.attributes.add("webUrl",{type:"string",title:"Web URL"}),HeaderController.prototype.initialize=function(){HeaderController.HTML={},HeaderController.CSS={},HeaderController.HTML.base=this.headerHTML,HeaderController.CSS.base=this.headerCSS,HeaderController.BagUrl=this.bagUrl,HeaderController.WebUrl=this.webUrl,console.log(HeaderController.WebUrl),this.AssignHTML()},HeaderController.prototype.update=function(e){},HeaderController.prototype.AssignHTML=function(){setTimeout(function(){HtmlCssLoader.prototype.AddHtmlToUI(HeaderController.HTML.base,"Header",!0),HeaderController.prototype.AssignOnClick(),AppMusicManager.prototype.AssignOnClick()},1e3),HtmlCssLoader.prototype.AddCSS(HeaderController.CSS.base,"Header CSS")},HeaderController.prototype.AssignOnClick=function(){var e=document.getElementById("open_bag_btn");CheckoutValidator.prototype.AssignClickEventListener(e,HeaderController.prototype.ToggleBagDialog),HeaderController.BagUrl&&(e.dataset.target="");var r=document.getElementById("header_logo");CheckoutValidator.prototype.AssignClickEventListener(r,HeaderController.prototype.TopBarRedirect)},HeaderController.prototype.ToggleBagDialog=function(){if(HeaderController.BagUrl)return window.open(HeaderController.BagUrl,"_blank"),void AmplitudeAnalytics.prototype.LogShoppingBagOpened();BagDialogue.isOpen?CheckoutDialogController.prototype.Close():CheckoutDialogController.prototype.Open()},HeaderController.prototype.TopBarRedirect=function(){AmplitudeAnalytics.prototype.LogTopBarClicked(),window.open(HeaderController.WebUrl,"_blank")};var PdpdialogController=pc.createScript("pdpdialogController");PdpdialogController.attributes.add("pdpHTML",{type:"asset",assetType:"html",title:"PDP HTML"}),PdpdialogController.attributes.add("pdpCSS",{type:"asset",assetType:"css",title:"PDP CSS"}),PdpdialogController.attributes.add("isUsingUrl",{type:"boolean",title:"URL Redirect",default:!1}),PdpdialogController.prototype.initialize=function(){PdpdialogController.HTML={},PdpdialogController.CSS={},PdpdialogController.HTML.base=this.pdpHTML,PdpdialogController.CSS.base=this.pdpCSS,PdpdialogController.isUsingUrl=this.isUsingUrl,setTimeout(function(){var o=HtmlCssLoader.prototype.AddHtmlToUI(PdpdialogController.HTML.base,"PDP",!0);o.className="dialog_close",ProductDialogue.AssignRoot(o),ProductDialogue.Init()},1e3),HtmlCssLoader.prototype.AddCSS(PdpdialogController.CSS.base,"PDP CSS")},PdpdialogController.prototype.update=function(o){};var VideoHotSpotController=pc.createScript("videoHotSpotController");VideoHotSpotController.attributes.add("videoHotSpotHTML",{type:"asset",assetType:"html",title:"Video Hot Spot HTML"}),VideoHotSpotController.attributes.add("videoHotSpotCSS",{type:"asset",assetType:"css",title:"Video Hot Spot CSS"}),VideoHotSpotController.prototype.initialize=function(){VideoHotSpotController.HTML={},VideoHotSpotController.CSS={},VideoHotSpotController.HTML.base=this.videoHotSpotHTML,VideoHotSpotController.CSS.base=this.videoHotSpotCSS,this.AssignHTML(),VideoHotSpotController.isOpen=!1},VideoHotSpotController.prototype.AssignHTML=function(){HtmlCssLoader.prototype.AddHtmlToUI(VideoHotSpotController.HTML.base,"VideoHotSpot",!0),HtmlCssLoader.prototype.AddCSS(VideoHotSpotController.CSS.base,"VideoHotSpot CSS"),VideoHotSpotController.HTML.modal=document.getElementById("videoHotSpotModal"),VideoHotSpotController.HTML.iframe=document.getElementById("videoHotSpotIframe"),VideoHotSpotController.HTML.closeBtn=document.getElementById("videoHotspotCloseBtn"),VideoHotSpotController.HTML.closeBtn.addEventListener("click",function(o){VideoHotSpotController.prototype.Close()}),$("#videoHotSpotModal").modal("hide")},VideoHotSpotController.prototype.Open=function(o){VideoHotSpotController.HTML.iframe.src=o,$("#videoHotSpotModal").modal("show"),VideoHotSpotController.isOpen=!0,AppMusicManager.prototype.SetBgMusicVolume(.09)},VideoHotSpotController.prototype.Close=function(){VideoHotSpotController.HTML.iframe.src="",VideoHotSpotController.isOpen=!1,$("#videoHotSpotModal").modal("hide"),AppMusicManager.prototype.ResetBgMusicVolume()};var MultiPdpcontroller=pc.createScript("multiPdpcontroller");MultiPdpcontroller.attributes.add("multiPDPHTML",{type:"asset",assetType:"html",title:"MultiPDP HTML"}),MultiPdpcontroller.attributes.add("multiPDPCSS",{type:"asset",assetType:"css",title:"MultiPDP CSS"}),MultiPdpcontroller.prototype.initialize=function(){MultiPdpcontroller.HTML={},MultiPdpcontroller.CSS={},MultiPdpcontroller.HTML.base=this.multiPDPHTML,MultiPdpcontroller.CSS.base=this.multiPDPCSS,this.AssignHTML(),this.Close()},MultiPdpcontroller.prototype.AssignHTML=function(){HtmlCssLoader.prototype.AddHtmlToUI(MultiPdpcontroller.HTML.base,"MultiPDP",!0),HtmlCssLoader.prototype.AddCSS(MultiPdpcontroller.CSS.base,"MultiPDP CSS")},MultiPdpcontroller.prototype.Open=function(){},MultiPdpcontroller.prototype.Close=function(){};// ServisBotController.js
var ServisBotController = pc.createScript('servisBotController');

ServisBotController.attributes.add ('ServisBotEndpoint', { type: 'string',title: 'ServisBot Endpoint'});
ServisBotController.attributes.add ('ServisBotSettings', { type: 'string',title: 'ServisBot Settings'});
ServisBotController.attributes.add ('AutoDisplay', { type: 'number', title: 'Auto Display Delay (s)', default: 10});
ServisBotController.IsInitalized = false;
ServisBotController.IsJSLoaded = false;
var ServisBotApi = null;
var ServisBot = null;

// initialize code called once per entity
ServisBotController.prototype.initialize = function() {
    ServisBotController.endpoint = this.ServisBotEndpoint;
    ServisBotController.settings = this.ServisBotSettings;
    ServisBotController.autoDisplay = this.AutoDisplay;
    
    this.LoadJS(ServisBotController.endpoint, 'ServisBot Endpoint');
    window.localStorage.clear();
    setTimeout(function() { 
        //ServisBotController.prototype.LoadJSRaw(ServisBotController.settings, 'ServisBot Settings'); 
        //setTimeout( function() { ServisBotController.prototype.AssignEventListener(); }, 500);
    }, 1000);
};

// update code called every frame
ServisBotController.prototype.update = function(dt) {
    if(!ServisBot) { return; }
    if(!ServisBotController.IsJSLoaded)
    {
        ServisBotController.IsJSLoaded = true;
        this.LoadJSRaw(ServisBotController.settings, 'ServisBot Settings'); 
    }
    
    if(!ServisBotApi) { return; }
    if(!ServisBotController.IsInitalized)
    {
        ServisBotController.IsInitalized = true;
        ServisBotController.prototype.AssignEventListener();
    }
};

ServisBotController.prototype.LoadJS = function(url, id)
{
    var script = document.createElement ('script');
    script.src = url;
    script.id = id;
    document.body.appendChild(script);
};

ServisBotController.prototype.LoadJSRaw = function(content, id)
{
    var script = document.createElement ('script');
    script.id = id;
    script.innerHTML = content;
    document.body.appendChild(script);
};

ServisBotController.prototype.Popup = function()
{
    if(!ServisBotApi) { return; }
    const messengerHasNeverOpened = ! window.localStorage['messengerState'];
    if(messengerHasNeverOpened){
        ServisBotApi.toggle();
    }
};

ServisBotController.prototype.OpenPDPEvent = function(productId)
{
    if(!ServisBotApi) { return; }
    const context =  {
        "alias":"open-product",
        "body":{
            "productId": productId 
        }
    };
    ServisBotApi.pageEvent(context);
};

ServisBotController.prototype.AddToCart = function(productId)
{
    if(!ServisBotApi) { return; }
    const context = {  
        "alias":"add-to-cart",
        "body":{
            "productId": productId 
        }
    };
    ServisBotApi.pageEvent(context);
};

ServisBotController.prototype.AssignEventListener = function()
{
    if(!ServisBotApi) { return; }
    ServisBotApi.on('notification', function(message) {
        let hId = Search.prototype.GetHotspotIdByProductId(message);
        if(hId === null) { return; }
        Search.prototype.SwitchToPointByHotspotId(hId);
        ServisBotApi.toggle();
    });
};

// Search.js
var Search = pc.createScript('search');

// initialize code called once per entity
Search.prototype.initialize = function() {
    /*
    setTimeout( function() { 
        let message = "YdaH9OnH3cozq78UUJICY";
        let hId = Search.prototype.GetHotspotIdByProductId(message);
        console.log(hId);
        if(hId === null) { return; }
        Search.prototype.SwitchToPointByHotspotId(hId);
    }, 1000);
    */
};

// update code called every frame
Search.prototype.update = function(dt) {
    
};

Search.prototype.GetHotspotIdByProductId = function(prodId)
{
    for(let i = 0; i < ProductJSON.product_points.length; i++)
    {
        if(ProductJSON.product_points[i].product_ids.length <= 0) { continue; }
        for(let n = 0; n < ProductJSON.product_points[i].product_ids.length; n++){
            if(ProductJSON.product_points[i].product_ids[n] == prodId)
            {
                return ProductJSON.product_points[i].point_id;
            }
        }
    }
    return null;
};


Search.prototype.SwitchToPointByHotspotId = function(hId) {
    var vPoint = this.GetClosestVantagePointByHotspot(hId);
    if(!vPoint) { throw "vantage point not found"; }
    var targetRotation = this.GetRotation (vPoint, hId);
    this.SwitchToPoint (vPoint, targetRotation);
};

Search.prototype.SwitchToPoint = function(viewPoint, rotateTo, transitionTime, switchComplete) {
    targetNewPoint = viewPoint;
    lowQualityTexturesLoaded = false;

    onSwitchComplete = switchComplete;
    LoadManager.prototype.DownloadPointTextures (targetNewPoint, true, true, undefined, function (category, instant, otherData) {
        TexturesLoadPreCompleteAtSwitch ();
        AllLowTexturesComplete (category, instant, otherData);
        if (typeof rotateTo !== 'undefined') {
            RotateTo (rotateTo);
        }
    });
    AmplitudeAnalytics.prototype.LogMovedToVantagePoint(viewPoint.data.id, viewPoint.data.floor_pos);
};

Search.prototype.SwitchToPointById = function(vId, rotateTo) {
    if(rotateTo){
        for (var i = 0; i < viewPoints.length; i++) {
            var curPoint = viewPoints [i].script.viewPoint360;
            if(curPoint.data.id == vId)
            {
                this.SwitchToPoint (curPoint, rotateTo);
                return;
            }
        }
    }
    else
    {
        console.log(vId);
        var viewPoint = this.GetViewPointByID (vId);
        if (viewPoint) {
            this.SwitchToPoint(viewPoint);
        }
    }
};

Search.prototype.GetViewPointByID = function(id) {
    var curPoint;
    for (var i = 0; i < viewPoints.length; i++) {
        curPoint = viewPoints [i].script.viewPoint360;
        if (curPoint.data.id === id) {
            return curPoint;
        }
    }
};

Search.prototype.GetClosestVantagePointByHotspot = function(hId) {
    var pointData = this.GetHotSpotById(hId);
    if(pointData === null) { throw "Hot Spot with id: " + hId.toString() + " not found."; }

    var minDist = 0;
    var minIndex = -1;
    var vPoint;
    
    for(var i = 0; i < viewPoints.length; i++)
    {
        var curPoint = viewPoints [i].script.viewPoint360;
        var vpPos = curPoint.GetCameraPosition();
        var dist = this.GetDistance (pointData.position, vpPos);
        if(dist < minDist || minIndex === -1)
        {
            minDist = dist;
            minIndex = curPoint.data.id;
            vPoint = curPoint;
        }
    }
    
    if(minIndex <= -1 || !vPoint) { throw "invalid index error"; }
    if(viewPoints.length === 0) { throw "invalid viewpoint length"; }
    return vPoint;
};

Search.prototype.GetRotation = function (vPoint, hId) {
    var pointData = this.GetHotSpotById (hId);
    var vPointPos = vPoint.GetCameraPosition();
    var vVector3 = new pc.Vec3 (vPointPos.x, vPointPos.y, vPointPos.z);
    var pVector3 = pointData.position;
    var diff = new pc.Vec3 ().sub2 (pVector3, vVector3).normalize ();
    console.log (vVector3);
    console.log (pVector3);
    console.log (diff);
    
    var quat = this.LookRotation (diff, pc.Vec3.UP);
    var resultRotation = this.NullifyEulerRozationZ (quat.getEulerAngles ());
    console.log (resultRotation);
    resultRotation.x *= -1;
    resultRotation.y += 180;
    
    console.log (resultRotation);
    return new pc.Quat ().setFromEulerAngles (resultRotation.x, resultRotation.y, resultRotation.z);
};

Search.prototype.GetHotSpotById = function(hId) {
    for (var i = 0; i < productPoints.length; ++i) {
        pickableShape = productPoints[i];
        if(pickableShape.script.productPoint.pointData.point_id === hId)
        {
            return pickableShape.script.productPoint.pointData;
        }
    }
    return null;
};

Search.prototype.GetDistance = function(pos1, pos2) {
    var diffVector = {};
    if(!pos1) { throw "invalid position1: " + pos1.toString(); }
    if(!pos2) { throw "invalid position2: " + pos2.toString(); }
    
    diffVector.x = pos1.x - pos2.x;
    diffVector.y = pos1.y - pos2.y;
    diffVector.z = pos1.z - pos2.z;
    
    var dist = Math.sqrt(Math.pow(diffVector.x, 2) + Math.pow(diffVector.y, 2) + Math.pow(diffVector.z, 2));
    return Math.abs(dist);
};

Search.prototype.LookRotation = function(forward, up) {
    forward = forward.normalize();

    var vector = forward.normalize();
    var vector2 = (new pc.Vec3()).cross(up, vector).normalize();
    var vector3 = (new pc.Vec3()).cross(vector, vector2);
    var m00 = vector2.x;
    var m01 = vector2.y;
    var m02 = vector2.z;
    var m10 = vector3.x;
    var m11 = vector3.y;
    var m12 = vector3.z;
    var m20 = vector.x;
    var m21 = vector.y;
    var m22 = vector.z;

    var num8 = (m00 + m11) + m22;
    var quaternion = new pc.Quat ();
    if (num8 > 0.0) {
        var num = Math.sqrt(num8 + 1.0);
        quaternion.w = num * 0.5;
        num = 0.5 / num;
        quaternion.x = (m12 - m21) * num;
        quaternion.y = (m20 - m02) * num;
        quaternion.z = (m01 - m10) * num;
        return quaternion;
    }
    if ((m00 >= m11) && (m00 >= m22)) {
        var num7 = Math.sqrt(((1.0 + m00) - m11) - m22);
        var num4 = 0.5 / num7;
        quaternion.x = 0.5 * num7;
        quaternion.y = (m01 + m10) * num4;
        quaternion.z = (m02 + m20) * num4;
        quaternion.w = (m12 - m21) * num4;
        return quaternion;
    }
    if (m11 > m22) {
        var num6 = Math.sqrt(((1.0 + m11) - m00) - m22);
        var num3 = 0.5 / num6;
        quaternion.x = (m10 + m01) * num3;
        quaternion.y = 0.5 * num6;
        quaternion.z = (m21 + m12) * num3;
        quaternion.w = (m20 - m02) * num3;
        return quaternion;
    }
    var num5 = Math.sqrt(((1.0 + m22) - m00) - m11);
    var num2 = 0.5 / num5;
    quaternion.x = (m20 + m02) * num2;
    quaternion.y = (m21 + m12) * num2;
    quaternion.z = 0.5 * num5;
    quaternion.w = (m01 - m10) * num2;
    return quaternion;
};

Search.prototype.GetCameraRotation = function () {
    return this.NullifyEulerRozationZ (camera.getEulerAngles ());
};

Search.prototype.NullifyEulerRozationZ = function (rotation) {
    var horizontalSign = Math.abs (rotation.x) > 90 ? -1 : 1;
    rotation.x = FormatAngleIn180Range (rotation.x - rotation.z);
    rotation.y = FormatAngleIn180Range (horizontalSign * (rotation.y + rotation.z));
    rotation.z = 0;
    return rotation;
};

var Videotexture=pc.createScript("videotexture");Videotexture.attributes.add("materials",{type:"asset",assetType:"material",array:!0}),Videotexture.attributes.add("videoUrl",{type:"string"}),Videotexture.canPlay=!1,Videotexture.prototype.initialize=function(){var t=this.app,e=new pc.Texture(t.graphicsDevice,{format:pc.PIXELFORMAT_R5_G6_B5,autoMipmap:!1});e.minFilter=pc.FILTER_LINEAR,e.magFilter=pc.FILTER_LINEAR,e.addressU=pc.ADDRESS_CLAMP_TO_EDGE,e.addressV=pc.ADDRESS_CLAMP_TO_EDGE;var i=document.createElement("video");i.crossOrigin="anonymous",i.loop=!0,i.setAttribute("muted",!0),i.setAttribute("autoplay",!0),i.setAttribute("controls",!1),i.setAttribute("loop",!0),i.setAttribute("playsinline",""),i.src=this.videoUrl,i.addEventListener("canplay",function(t){e.setSource(i)});for(var o=0;o<this.materials.length;o++){var r=this.materials[o].resource;r.emissiveMap=e,r.update()}this.video=i,this.videoTexture=e,this.upload=!0,Videotexture.canPlay=!0,this.app.mouse&&this.app.mouse.on(pc.EVENT_MOUSEDOWN,this.MouseDown,this),this.app.touch&&this.app.touch.on(pc.EVENT_TOUCHSTART,this.MouseDown,this),this.firstClicked=!1},Videotexture.prototype.MouseDown=function(t){this.firstClicked||(this.firstClicked=!0,Videotexture.prototype.Play(this.video,this.videoUrl))},Videotexture.prototype.update=function(t){Videotexture.canPlay&&(this.upload=!this.upload,this.upload&&this.videoTexture.upload())},Videotexture.prototype.Play=function(t,e){t.play(),this.upload=!0,Videotexture.canPlay=!0};