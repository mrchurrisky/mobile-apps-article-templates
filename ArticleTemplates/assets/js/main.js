(function () {
    
    'use strict';

    require.config({
        paths: {
            d3: '../../../node_modules/d3/d3',
            domReady: '../../../node_modules/domready/ready',
            mobileSlider: 'components/mobile-range-slider',
            fastClick: '../../../node_modules/fastclick/lib/fastclick',
            fence: '../../../node_modules/fence/fence',
            smoothScroll: '../../../node_modules/smooth-scroll/dist/smooth-scroll'
        },
        shim: {
            d3: {
                exports: 'd3'
            },
            mobileSlider: {
                exports: 'MobileRangeSlider'
            }
        }
    });

    require(['app'], function (app) {
        app.init();
    });

}());