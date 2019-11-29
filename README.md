# 2Click-Privacy

Easy way to implement a 2-click solution for every external content (like YouTube videos, Google Maps) using vanilla JavaScript.

Based on [2Click-Iframe-Privacy](https://01-scripts.github.io/2Click-Iframe-Privacy/)

## Setup

```html
<script src="2ClickPrivacy.js"></script>
```

Add some CSS into one of your CSS files or include it directly:

```html
<style type="text/css">
div.privacy-msg p {
    width:200px;
    border: 1px solid black;
    padding: 5px;
    text-align:center;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    -webkit-box-shadow: 0 10px 6px -6px #777;
       -moz-box-shadow: 0 10px 6px -6px #777;
            box-shadow: 0 10px 6px -6px #777;
}
</style>
```

Now, you need to instantiate it:

```html
<script type="text/javascript">
document.addEventListener('DOMContentLoaded', _2ClickPrivacy.init(''));
</script>
```

# Usage

## For Videos

Replace `src=` with `data-src=` and add an empty attribute `src=""`, add the class `privacy-video` to the IFrame:

```html
<iframe width="560" height="315" src="" data-src="https://www.youtube-nocookie.com/embed/oHg5SJYRHA0" class="privacy-video" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
```

## For Google Maps

Replace `src=` with `data-src=` and add an empty attribute `src=""`, add the class `privacy-map` to the IFrame:

```html
<iframe src="" class="privacy-map" data-src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2684819.3977904147!2d11.4079934!3d48.91741285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sde!2sde!4v1526416354209" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
```
## For JS content


```html
<div data-2click-type="google_maps" id="map"></div>
```

config:

```
<script>
var _2ClickConfig = {
    CustomTypes: Array(
        {
            type: 'google_maps',
            callback: 'maps_init',
            description: 'Please enter a text to show before loading the content'
        }
    )
};

function maps_init() {
    // insert Google Maps init code;
}
document.addEventListener('DOMContentLoaded', _2ClickPrivacy.init(_2ClickConfig));
</script>
```

# More options

```html
<script type="text/javascript">

function ownvideo_callback() {
    // alert("Callback ausgeführt");
}

var _2ClickPrivacyConfig = {
    enableCookies: true,
    useSessionCookie: true,
    CustomTypes: Array(
        {
            type: 'ownvideo',
            class: 'privacy-ownvideo',
            callback: 'ownvideo_callback',
            description: 'Please enter a text to show before loading the content<br />'
        }
    )
};

document.addEventListener('DOMContentLoaded', _2ClickPrivacy.init(_2ClickIframePrivacyConfig));
</script>
```
