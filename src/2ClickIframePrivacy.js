/*!
 * 2Click-Privacy v0.3-dev
 * based on https://github.com/01-Scripts/2Click-Iframe-Privacy
 * 
 * Licensed MIT © 2018-2019 Michael Lorer - https://www.01-scripts.de/
 * Licensed MIT  Alexander Walther - https://www.alexplus.de/
 */
 
 var _2ClickPrivacy = new function() {

    // Default-Konfiguration
    var config = {
        enableCookies: true,
        useSessionCookie: true,
        cookieNamespace: '2click_',
        showContentLabel: 'Inhalt anzeigen',
        rememberChoiceLabel: 'Auswahl merken',
        privacyPolicyLabel: 'Datenschutzerklärung',
        privacyPolicyUrl: false,
        wrapperHtml: '<div class="2click-overlay"><div class="2click-overlay-headline">{headline}</div><div class="2click-overlay-text">{text}</div><div class="2click-overlay-options"><input data-2click-button="show" type="button" value="{show}" onclick="_2ClickPrivacy.EnableContent({type}, 1); return false;" /><input data-2click-button="remember" type="button" value="{remember}" /><a href="{privacyUrl}">{privacyLabel}</div></div>',
        types: new Array(
            {
                type: 'video',
                description: 'Zum Aktivieren des Videos bitte auf den Link klicken. Durch das Aktivieren von eingebetteten Videos werden Daten an den jeweiligen Anbieter übermittelt. Weitere Informationen können unserer Datenschutzerklärung entnommen werden.<br />'
            },
            {
                type: 'map',
                description: 'Zum Aktivieren der eingebetteten Karte bitte auf den Link klicken. Durch das Aktivieren werden Daten an den jeweiligen Anbieter übermittelt. Weitere Informationen können unserer Datenschutzerklärung entnommen werden.<br />'
            },
            {
                type: 'calendar',
                description: 'Zum Aktivieren des eingebetteten Kalenders bitte auf den Link klicken. Durch das Aktivieren werden Daten an den jeweiligen Anbieter übermittelt. Weitere Informationen können unserer Datenschutzerklärung entnommen werden.<br />'
            }
        )
    };

    function replaceMe(template, data) {
        const pattern = /{\s*(\w+?)\s*}/g; // {property}
        return template.replace(pattern, (_, token) => data[token] || '');
    }

    function setCookie(name, value, days) {
        var d = new Date;
        d.setTime(d.getTime() + 24*60*60*1000*days);
        document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
    }

    function setSessionCookie(name, value) {
        document.cookie = name + "=" + value + ";path=/";
    }

    function getCookie(name) {
        var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    }

    function wrap(el, wrapper, type, text) {
        el.parentNode.insertBefore(wrapper, el);
        wrapper.className = '2click-overlay 2click-overlay-'+type;
        wrapper.style.width = el.clientWidth+'px';
        wrapper.style.height = el.clientHeight+'px';
        wrapper.innerHTML = replaceMe(config.wrapperHtml, ([config] + [type] + [text]));
        wrapper.appendChild(el);
    }

    this.EnableContent = function (type, remember = 1){
        var i;

        // Cookies globally enabled by config?
        if(config.enableCookies){
            if(remember){
                if(config.useSessionCookie){
                    setSessionCookie(config.cookieNamespace+type, '1');
                }
                else{
                    setCookie(config.cookieNamespace+type, '1', 30);
                }
            }
        }

        var x = document.querySelectorAll('div.'+type+'-msg p');
        for (i = 0; i < x.length; i++) {
            x[i].parentNode.removeChild(x[i]);
        }

        x = document.querySelectorAll('div.'+type+'-msg');
        for (i = 0; i < x.length; i++) {
            var parent = x[i].parentNode;

            // Move all children out of the element
            while (x[i].firstChild) parent.insertBefore(x[i].firstChild, x[i]);

            // Remove the empty element
            parent.removeChild(x[i]);
        }

        x = document.querySelectorAll('[data-2click-type="'+type+'"]');
        for (i = 0; i < x.length; i++) {
            x[i].src = x[i].getAttribute("data-src");
        }

        for (i = 0; i < this.config.types.length; i++) {
            if(this.config.types[i].type == type && this.config.types[i].callback) {
                window[this.config.types[i].callback]();
            }
        }
    }

    this.init = function (Userconfig) {
        // Read UserConfiguration:
        this.config = Object.assign(config, Userconfig);

        for (i = 0; i < this.config.types.length; i++) {
            var selector = document.querySelectorAll('[data-2click-type="'+this.config.types[i].type+'"]');

            var x;
            if(!getCookie(config.cookieNamespace+this.config.types[i].type)){
                for (x = 0; x < selector.length; x++) {
                    wrap(selector[x], document.createElement('div'), this.config.types[i].type, this.config.types[i].description);
                }
            }else{
                for (x = 0; x < selector.length; x++) {
                    selector[x].src = selector[x].getAttribute("data-src");
                }
            }
        }

    };
}