;(function ( $, window, document, undefined ) {

   
    var pluginName = "cookieInfo",
        defaults = {
            defaultText:  "Używamy plików Cookie aby podnieść możliwości strony. Przeglądając ją zgadzasz się na ich wykorzystanie.",
            okButton:     "Ok, rozumiem",        

            displayMore:  true,        
            moreButton:   "Info",  
            moreInfo:     "To niewielkie pliki tekstowe, nazywane ciasteczkami (z ang. cookie – ciastko), wysyłane przez serwis internetowy, który odwiedzamy i zapisywane na urządzeniu końcowym (komputerze, laptopie, smartfonie), z którego korzystamy podczas przeglądania stron internetowych.",
            moreURL:      "",          

            location:     "bottom",     
            makeSpace:    false,        
            spaceMargin:  "34px",       
            speedIn:      500,         
            speedOut:     400,         
            delay:        1000,        
            float:        true,         

            style:        "dark",       

            cookieExpiry: 90,           
            cookieName:   "CookieInfo", 

            ok: function(){}            

        };

   
    function Plugin( options ) {
        this.options = $.extend( {}, defaults, options );

        
        if(!document.cookie.indexOf(this.options.cookieName)){
          return false;
        }

        this._defaults = defaults;
        this._name = pluginName;

        this.create(); 
    }

    Plugin.prototype.create = function() {

      if(this.options.displayMore && this.options.moreURL == ""){
        var cookieInfoMore = '<div id="cookie-law-more-info"><div id="cookie-law-info-container"><a id="cookie-law-more-text-close" href="#">X</a><div id="cookie-law-more-text">' + this.options.moreInfo +'</div><div style="clear:both;"></div></div></div>';
        var moreButton = '<a class="cookie-law-button" id="cookie-law-button-more" href="#cookie-law-more-info">' + this.options.moreButton + '</a>';
      } else if(this.options.moreURL) {
        var cookieInfoMore = '';
        var moreButton = '<a class="cookie-law-button" id="cookie-law-button-more" href="'+ this.options.moreURL +'">' + this.options.moreButton + '</a>';
      } else {
        var cookieInfoMore = '';
        var moreButton = '';
      }

      var cookieInfoMain = '<div id="cookie-law-container-box"><div id="cookie-law-container"><div id="cookie-law-message">' + this.options.defaultText + '</div><div id="cookie-law-action" style="float:right;"><a class="cookie-law-button" id="cookie-law-button-ok" href="#">' + this.options.okButton + '</a>' + moreButton + '</div><div style="clear:both;"></div></div></div>';

     
      if(!this.options.float && this.options.location == "top"){
        var position = "absolute";
      } else {
        var position = "fixed";
      }

      
      if(this.options.makeSpace && this.options.location == "top"){
        $("body").css("margin-top",this.options.spaceMargin);
      } else if(this.options.makeSpace) {
        $("body").css("margin-bottom",this.options.spaceMargin);
      }

    
      $("body").append('<div id="jquery-cookie-law-script" class="' + this.options.style +' ' + this.options.location + ' ' + position + '">'+ cookieInfoMore + cookieInfoMain + '</div>');

      this.action(); 

    };

    Plugin.prototype.action = function() {

      var options = this.options;

      $("#cookie-law-button-ok").click(function(e) {
        e.preventDefault();

       
        document.cookie = options.cookieName + "=accepted;path=/;max-age=" + 60 * 60 * 24 * options.cookieExpiry; // multiply to get days

        $("#jquery-cookie-law-script").slideUp(options.speedOut);

        options.ok.call(options); 
      });

      if(!options.moreURL){
        $("#cookie-law-button-more").click(function(e) {
          e.preventDefault();
          $("#jquery-cookie-law-script #cookie-law-more-info").slideToggle(options.speedIn);
        });
      }

      $("#cookie-law-more-text-close").click(function(e) {
        e.preventDefault();
        $("#jquery-cookie-law-script #cookie-law-more-info").slideUp(options.speedOut);
      });

     
      function getCookie(name) {
        var re = new RegExp(name + "=([^;]+)");
        var value = re.exec(document.cookie);
        return (value != null) ? unescape(value[1]) : null;
      }

   
      if(getCookie(options.cookieName) != "accepted"){ // double check
        $("#jquery-cookie-law-script").delay(options.delay).slideDown(options.speedIn);
      }

    };

    
    $.fn[pluginName] = function ( options ) {
      new Plugin( options );
    };

})( jQuery, window, document );

