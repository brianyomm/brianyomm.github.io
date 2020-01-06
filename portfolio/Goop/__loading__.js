 pc.script.createLoadingScreen(function (app) {

	var appIsLoaded = false;
	var updateID;
    var cssRef = "https://s3.amazonaws.com/cdn.nextretail.com/goop/1/css/loadingScreen.css";
    
	var createHTML = function () {
		var wrapper = document.createElement('div');
		wrapper.className = 'preventCanvasEvents';
		wrapper.id = 'application-splash-wrapper';
		document.body.appendChild(wrapper);

		var loadingScreen = document.createElement('div');
		loadingScreen.className = "loadingScreen";

        //inital elements
        var overlay = document.createElement('div');
        overlay.className = "greyOverlay";
        
        var center = document.createElement('div');
        center.className = "center";
        
        //logo
        var centerChild = document.createElement('div');
        centerChild.className = "loadingLogo fade-in zero";
        center.appendChild(centerChild);
        
        //text copy
        centerChild = document.createElement('div');
        centerChild.className = "welcomeCopy fade-in zero";
        centerChild.innerHTML = "IMMERSIVE";
        center.appendChild(centerChild);
        
        centerChild = document.createElement('div');
        centerChild.className = "welcomeCopy fade-in zero";
        centerChild.innerHTML = "SHOPPING EXPERIENCE";
        center.appendChild(centerChild);
        
        //progress bar 
        var progressBar = document.createElement('div');
        progressBar.className = "progressBar";
        
        var progressBarChild = document.createElement('div');
        progressBarChild.className = "progressLoadingBar";
        progressBarChild.id = "loadingBar";
        progressBar.appendChild(progressBarChild);
        
        progressBarChild = document.createElement('div');
        progressBarChild.className = "progressUnderline";
        progressBar.appendChild(progressBarChild);
        
        center.appendChild(progressBar);
        
        //loading percentage
        centerChild = document.createElement('div');
        centerChild.className = "loadingPercentage";
        centerChild.id = "loadingPercentage";
        centerChild.innerHTML = "0";
        center.appendChild(centerChild);

        //footer
        var footer = document.createElement('div');
        footer.className = "footer fade-in zero";
        
        var footerChild = document.createElement('div');
        footerChild.className = "loadingText";
        footerChild.innerHTML = "FLIP TO LANDSCAPE";
        footer.appendChild(footerChild);
        
        footerChild = document.createElement('div');
        footerChild.className = "loadingText";
        footerChild.innerHTML = "FOR A BETTER EXPERIENCE";
        footer.appendChild(footerChild);
        
        overlay.appendChild(center);
        overlay.appendChild(footer);
        loadingScreen.appendChild(overlay);
        wrapper.appendChild(loadingScreen);

        //Meta
        
		var meta = document.createElement('meta');
		meta.name = "viewport";
		meta.content = "width=device-width, initial-scale=1, shrink-to-fit=no , user-scalable=no";
		document.head.appendChild(meta);

		meta = document.createElement('meta');
		meta.name = "viewport";
		meta.content = "initial-scale=1, viewport-fit=cover";
		document.head.appendChild(meta);

		meta = document.createElement('meta');
		meta.name = "apple-mobile-web-app-capable";
		meta.content = "yes";
		document.head.appendChild(meta);
	};

	var progressBaarAnimation = function () 
    {

		app.on('preload:end', function () {
			app.off('preload:progress');
		});

		app.on('preload:progress', setProgress);
	};

	var hideSplash = function () 
    {
		if (typeof window.onSplashHide !== 'undefined') {
			window.onSplashHide();
		}

		clearInterval(updateID);

		$("#application-splash-wrapper").fadeOut(300, function () {
			var wrapper = document.getElementById('application-splash-wrapper');
			document.body.removeChild(wrapper);
			//toggleFullScreen();
		});

		AmplitudeAnalytics.prototype.LogStartButtonClicked();
	};

	var toggleFullScreen = function () {
		var doc = window.document;
		var docEl = doc.documentElement;

		var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
		var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

		if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
			requestFullScreen.call(docEl);
		} else {
			cancelFullScreen.call(doc);
		}
	};

	var setProgress = function (value) {
        value *= 100;
        value = Math.round(value);
		var bar = document.getElementById('loadingBar');
        var percentage = document.getElementById("loadingPercentage");
        percentage.innerHTML = value.toString();
        bar.style.width = value.toString() + "%";
	};

	var createCss = function () 
    {
		var style = document.createElement('link');
        style.id = 'LoadingScreenCSS';
		style.rel = 'stylesheet';
		style.href = cssRef;

		document.head.appendChild(style);

		var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
				return p.toString() === "[object SafariRemoteNotification]";
			})
			(!window['safari'] || safari.pushNotification);

		var isIosSafari;
		var nav = window.navigator;
		var ua = nav.userAgent;

		function isiOsSafari(a) {
			return ("standalone" in nav) && !nav.standalone && ua.indexOf(a) != -1 && ua.indexOf('Mac OS') != -1 && ua.indexOf('Safari') != -1;
		}

		// Check if Mobile Safari on iPhone
		if (isiOsSafari('iPhone')) {
			isIosSafari = true;
		}

		// Check if Mobile Safari on iPod
		else if (isiOsSafari('iPad')) {
			isIosSafari = true;
		}
        
        if(isSafari || (isIosSafari && !navigator.userAgent.match('CriOS')))
        {
            style = document.createElement('link');
            style.id = 'SafariLoadingScreenCSS';
            style.rel = 'stylesheet';
            //style.href = 'https://s3.amazonaws.com/nextrev-static-assets/oscar-de-la-renta/002/CSS/SafariLoadingScreen.css';

            //document.head.appendChild(style);
        }
	};

	var sceneIsLoaded = function () 
    {
		AmplitudeAnalytics.prototype.LogLoadingCompleted();
		appIsLoaded = true;
        
        setTimeout(hideSplash, 1000);
	};
    
    //.. If this was a normal project we wouldn't have to do this for adding mdb to the index.html
    var AttachCSS = function (url, id) {

        var link = document.createElement ('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.id = id;
        link.href = url;
        document.head.appendChild(link);
    };

    var LoadJS = function(url, id)
    {
        var script = document.createElement ('script');
        script.src = url;
        script.id = id;
        document.body.appendChild(script);
    };
     
    var initializeMdb = function() {

        var baseMdbUrl = "https://cdn.nextretail.com/_mdb/4.8.4/";


        //DON'T CHANGE THIS ORDER
        AttachCSS("https://use.fontawesome.com/releases/v5.8.2/css/all.css", "fontawesome");
        AttachCSS(baseMdbUrl + "css/bootstrap.min.css", "bootstrap css");
        AttachCSS(baseMdbUrl + "css/mdb.min.css", "mdb css");
        
        LoadJS(baseMdbUrl + "js/jquery-3.4.1.min.js", "jquery js");
        setTimeout(function() { LoadJS(baseMdbUrl + "js/popper.min.js", "popper js"); }, 100);
        setTimeout(function() { LoadJS(baseMdbUrl + "js/bootstrap.min.js", "bootstrap js"); }, 200);
        setTimeout(function() { LoadJS(baseMdbUrl + "js/mdb.js", "mdb js"); }, 300);
    };
     
    initializeMdb();
    createHTML();
	createCss();
	progressBaarAnimation();
	app.on('start', sceneIsLoaded);
   
});