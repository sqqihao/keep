/* Author:

 Div Party Pty Ltd - Neil Lockwood

 http://www.divparty.com.au

 */

/**
 * I extend a jQuery function for the count down callback for the breakIn timer and the fadeout timer.
 */

jQuery.extend({
    /**
     *
     * @param endDate
     * @param dom
     * @param timeOutFunction
     */
    countDown:function (endDate, dom, timeOutFunction, fadeoutFunction) {
        var borrowedMin = 0, borrowedHour = 0;
        var sec = 0, min = 0, h = 0;
        //get the time of the moment this function is called.
        var newDate = new Date();
        var gap = endDate.getTime() - (newDate.getTime());
        //this is a hook for fade out function executing 30s before timeout.
        if (fadeoutFunction && gap <= 30 * 1000) {
            fadeoutFunction();
        }
        if (gap >= 0) {
            //get remaining sec.
            sec = endDate.getSeconds() - newDate.getSeconds();

            if (sec < 0) {
                sec += 60;
                borrowedMin = 1;
            }
            dom.s.text(sec);
            //get remaining min.
            min = endDate.getMinutes() - (newDate.getMinutes() + borrowedMin);
            if (min < 0) {
                min += 60;
                borrowedHour = 1
            }
            dom.m.val(min);
            //get remaining hours.
            h = endDate.getHours() - (newDate.getHours() + borrowedHour);
        }
        else {
            dom.s.text(0);
            timeOutFunction();
        }

    }
});

/**
 * coding of raining page starts here
 */
!function ($) {

//below code executes only after the the dom object is ready. This is equivalent to jQuery(document).onReady(function(){...});
    $(function () {
        //===============Media players control starts here=======================================
        var soundManagerLoaded, rainUrl = "audio/rainfade_1.mp3", thunderUrl = "audio/thunderfade_1.mp3"
            , lThunderUrl = "audio/loudthunderfade_1.mp3";
        var rainDelayTime = 7288, thunderTriggerTime = 24 * 1000, lThunderTriggerTime = 35200;
        var rain1, rain2, thunder1, thunder2, chime, lThunder1, lThunder2;

        var $lThuVolControl=$(".loud_thunder .volume .volume_control");

        soundManagerLoaded = function () {
            //=============rain 1 plays from 0 second===========
            rain1 = soundManager.createSound({
                id:"rain1",
                url:rainUrl,
                multiShotEvents:true,
                autoLoad:true,
                onload:function () {
                    this.play({position:0})
                },
                onfinish:function () {
                    this.play({position:0});
                }
            });
            //=============rain2 starts from 7th second, only "fades in" in first time of play======
            var hasFadeIn = false;
            rain2 = soundManager.createSound({
                id:"rain2",
                url:rainUrl,
                autoLoad:true,
                onload:function () {
                    //when loading completes, play it. initially set the volume to 0 and play from the 7288th  millisecond.
                    rain2.play({volume:0, position:rainDelayTime});
                },
                multiShotEvents:true,
                onfinish:function () {
                    this.play({position:0});
                }, onplay:function () {
                    if (hasFadeIn) {
                        return false;
                    }
                    var duration = 3 * 1000;
                    var step = 0;
//                    var normalVolume = this.volume;
                    var normalVolume = 100;
                    var interval = setInterval(function () {
                        rain2.setVolume((1 + step) * (normalVolume / 12));
                        step++;
                        if (step === 12) {
                            clearInterval(interval);
                            hasFadeIn = true;
                        }
                    }, duration / 12);
                }
            });
//==========================Two thunders definition starts here=====================================
            thunder1 = soundManager.createSound({
                id:"thunder1",
                url:thunderUrl,
                onload:function () {
                    this.onPosition(thunderTriggerTime, function () {
                        thunder2.play({position:0});
                    });
                }

            });

            thunder2 = soundManager.createSound({
                id:"thunder2",
                url:thunderUrl,
                onload:function () {
                    this.onPosition(thunderTriggerTime, function () {
                        thunder1.play({position:0});
                    });
                }
            });
            chime = soundManager.createSound({
                id:"chime",
                url:"audio/chime.mp3"
            });
//==========================Two thunders definition ends here=====================================
            lThunder1 = soundManager.createSound({
                id:"lThunder1",
                url:lThunderUrl,
                onload:function () {
                    this.onPosition(lThunderTriggerTime, function () {
                        lThunder2.play({position:0});
                    });
                }

            });

            lThunder2 = soundManager.createSound({
                id:"lThunder2",
                url:lThunderUrl,
                onload:function () {
                    this.onPosition(lThunderTriggerTime, function () {
                        lThunder1.play({position:0});
                    });
                }
            });
            //===========================Two louder thunders definition starts here===========================

            //===========================Two louder thunders definition ends here===========================
            //==============below are 6 buttons to control these rain and thunder on & off.
            $("#rainOn").click(function (e) {
                rain1.play();
                rain2.play({volume:0, position:rainDelayTime});
                hasFadeIn = false;
                $(this).closest('ul').addClass("clicked");
                e.preventDefault();
            });
            $("#rainOff").click(function (e) {
                rain1.stop();
                rain2.stop();
                $(this).closest('ul').removeClass("clicked");
                e.preventDefault();
            });
            $("#thunderOff").click(function (e) {

                thunder1.stop();
                thunder2.stop();
                $(this).closest('ul').removeClass("clicked");
                e.preventDefault();
            });
            $("#thunderOn").click(function (e) {
                thunder1.play({position:0});
                $(this).closest('ul').addClass("clicked");
                e.preventDefault();
            });
            $("#loudThunderOff").click(function (e) {

                lThunder1.stop();
                lThunder2.stop();
                $(this).closest('ul').removeClass("clicked");
                e.preventDefault();
            });
            $("#loudThunderOn").click(function (e) {
                lThunder1.play({position:0});
                $(this).closest('ul').addClass("clicked");
                e.preventDefault();
            });

            //=============== Adding clicked to li above ul use code below =================//
            /*
            $("#loudThunderOff").click(function (e) {

                lThunder1.stop();
                lThunder2.stop();
                $(this).closest('ul').parent().removeClass("clicked");
                e.preventDefault();
            });
            $("#loudThunderOn").click(function (e) {
                lThunder1.play({position:0});
                $(this).closest('ul').parent().addClass("clicked");
                e.preventDefault();
            });
            */
            //=============== END Adding clicked to li above ul use code below =================//

        };
//        window.SM2_DEFER = true;
//
//        window.soundManager = new SoundManager();

        //=============global settings of SoundManager==============
        soundManager.setup({
            url:"audio/soundmanager2_flash9.swf",
//            url:'audio/',
            preferFlash:false,
            flashVersion:9,
            flashLoadTimeout:1500,
            noSWFCache:true,
            debugFlash:false,
            onready:soundManagerLoaded
        });
//        soundManager.beginDelayedInit();
        soundManager.ontimeout(function (e) {
//            // Something went wrong during init - in this example, we *assume* flashblock etc.
            soundManager.flashLoadTimeout = 0; // When restarting, wait indefinitely for flash
            soundManager.onerror = {}; // Prevent an infinite loop, in case it's not flashblock
            soundManager.reboot(); // and, go!
        });
        //===============jQuery UI slide control for sound volumes starts here=====================
        //volume controller for  rain
        $(".soft_rain .volume .volume_control").slider({
            value:100,
            min:0,
            max:100,
            step:5,
            slide:function (event, ui) {
                rain1.setVolume(ui.value);
                rain2.setVolume(ui.value);
            }
        });
        //volume controller for  thunder
        $(".rolling_thunder .volume .volume_control").slider({
            value:100,
            min:0,
            max:100,
            step:5,
            slide:function (event, ui) {
                thunder1.setVolume(ui.value);
                thunder2.setVolume(ui.value);
            }

        });
        //volume controller for  thunder
        $lThuVolControl.slider({
            value:100,
            min:0,
            max:100,
            step:5,
            slide:function (event, ui) {
                lThunder1.setVolume(ui.value);
                lThunder2.setVolume(ui.value);
            }

        });
        //===============jQuery UI slide control for sound volumes ends here=====================

        //=============global settings of SoundManager ends here==============

        //===================slider configuration starts here================

        //below are all URIs of all images..

/*

        var slides = {}, uri = "img/slides/";
        slides["classic"] = [
            {src:uri + "classic/classic01.jpg"},
            {src:uri + "classic/classic02.jpg"},
            {src:uri + "classic/classic03.jpg"},
            {src:uri + "classic/classic04.jpg"},
            {src:uri + "classic/classic05.jpg"},
            {src:uri + "classic/classic06.jpg"}
        ];
        slides["animals"] = [
            {src:uri + "animals/animals01.jpg"},
            {src:uri + "animals/animals02.jpg"}
        ];
        slides['architecture'] = [
            {src:uri + "architecture/architecture01.jpg"},
            {src:uri + "architecture/architecture02.jpg"}
        ];
        slides['nature'] = [
            {src:uri + "nature/nature01.jpg"},
            {src:uri + "nature/nature02.jpg"}
        ];
        slides['people'] = [
            {src:uri + "people/people01.jpg"},
            {src:uri + "people/people02.jpg"}
        ];
        //This method generates a new list of background images in a random order.
        var getRandomList = function (slides) {
            var originalList = [];
            $.each(slides, function (i, v) {
                originalList = originalList.concat(v);
            });
            var oLen = originalList.length;
            var result = [];
            for (; result.length < oLen;) {
                var randomIndex = Math.floor(Math.random() * oLen);
                var selectedValue = originalList[randomIndex];
                if ($.inArray(selectedValue, result) == -1) {
                    result[result.length] = selectedValue;
                }
            }
            return result;
        };
        //vegas universal options, please bear in mind that the vegas plugin works in a singleton manner.
        var vegasOpt = {delay:8000,
            valign:'bottom',
            align:'center',
            fade:1000};

        //set this needStop as a flag to indicate the slider stops only at first time of one background image loads.
        var needStop = true;
        //By default
        vegasOpt.backgrounds = slides["classic"];
        vegasOpt.walk = function () {
            if (needStop) {
                $.vegas('pause');
                needStop = false;
            }
        };
        $.vegas('slideshow', vegasOpt);
        //after the walk function used in default slide, remove it immediately.
        delete  vegasOpt.walk;
        //when click slide on button, resume the slide with options as the value before the slide paused.
        $('#slideOn').click(function () {
            $.vegas('slideshow', vegasOpt);
            $(this).closest('ul').addClass("clicked");
        });
        //simply pause it.
        $('#slideOff').click(function () {
            $.vegas('pause');
            $(this).closest('ul').removeClass("clicked");
        });

        $('#sliderType').change(function () {
            var selected = $(this).children("option:selected").text();
            vegasOpt.backgrounds = (selected == 'random') ? getRandomList(slides) : slides[selected];
            $.vegas('slideshow', vegasOpt);
            $(this).closest('ul').addClass("clicked");
            return false;
        });

*/

//        ================================Count down========================================================

        var breakTime, fadeTime;
        //validation for hours.
        $('#breakH,#fadeH').change(function () {
            var $this = $(this);
            var v = parseInt($this.val());
            if (isNaN(v)) {
                v = 0;
            } else if (v < 0) {
                v = 0;
            } else if (v > 12) {
                v = 12;
            }
            $this.val(v);

        });
        //validation for minutes.
        $('#breakM,#fadeM').change(function () {
            var $this = $(this);
            var v = parseInt($this.val());
            if (isNaN(v)) {
                v = 1;
            } else if (v < 0) {
                v = 1;
            } else if (v > 59) {
                v = 59;
            }
            $this.val(v);

        });
//        ===========Break In Time controller==============================
        var breakTimer;
        $('#breakH,#breakM').removeAttr("disabled");
        $('#breakOn').click(function (e) {
            $('#breakH,#breakM').attr("disabled", "disabled");
            breakTime = new Date();
            var breakH = parseInt($('#breakH').val());
            var breakM = parseInt($('#breakM').val());
            if (breakH == 0 && breakM == 0) {
                breakM = 1;
            }
            breakTime = new Date(breakTime.getTime() + breakH * 60 * 60 * 1000 + breakM * 60 * 1000);

            breakTimer = setInterval(function () {
                e.preventDefault();
                var dom = {};
                dom.h = $('#breakH');
                dom.m = $('#breakM');
                dom.s = $('#breakS');
                $.countDown(breakTime, dom, function () {
                    soundManager.stopAll();
                    chime.play();
                    $('#breakOff').click();
                    $(".soft_rain ul,.rolling_thunder ul,.slideshow ul,.loud_thunder ul").removeClass("clicked");
                    //fire a click event on .credit to show the credit modal.
                    $.colorbox({html:$("#breakInModal").html(), width:"460px", height:"550px"});

                });
            }, 1000);
            $(this).closest('ul').addClass("clicked");
            $('#fadeOff').click();
        });
        $('#breakOff').click(function (e) {
            clearInterval(breakTimer);
            $('#breakH,#breakM').removeAttr("disabled");
            $(this).closest('ul').removeClass("clicked");
            e.preventDefault();
        });
        // ===========Fade Out Time controller================================
        $('#fadeH,#fadeM').removeAttr("disabled");
        var fadeTimer;
        var fadeOnMethod, fadeOutMethod;
        //this method fires when fade on is clicked
        fadeOnMethod = function (e) {
            $('#fadeH,#fadeM').attr("disabled", "disabled");
            fadeTime = new Date();
            var fadeH = parseInt($('#fadeH').val());
            var fadeM = parseInt($('#fadeM').val());
            //if both H and M are zero, then set M as 1.
            if (fadeH == 0 && fadeM == 0) {
                fadeM = 1;
            }
            var fadeOut30s = true;
            fadeTime = new Date(fadeTime.getTime() + fadeH * 60 * 60 * 1000 + fadeM * 60 * 1000);
            fadeTimer = setInterval(function () {
                var dom = {};
                dom.h = $('#fadeH');
                dom.m = $('#fadeM');
                dom.s = $('#fadeS');

                $.countDown(fadeTime, dom, function (e) {

                        $.vegas({
                            src:'img/slides/classic/classic01.jpg', //todo update a 'goodnight' picture here.
                            fade:1000,
                            valign:'bottom',
                            align:'center'
                        });
                        $.vegas('pause');


                        //when timeout rebind click events on fadeOn & fadeOff buttons.
                        $('#fadeOn').click(fadeOnMethod);
                        $('#fadeOff').click(fadeOutMethod).click();


                    }, //the method executes 30s before timeout.
                    function () {
                        if (fadeOut30s) {
                            fadeOut30s = false;
                            //disable the fadeOn and fadeOut's events
                            $('#fadeOn').unbind("click");
                            $('#fadeOff').unbind("click");
                            //fadeout the rains and thunders in 30s
                            var duration = 30 * 1000;
                            var step = 0;
                            var totalStep = 15;
                            var normalVolume = 100;
                            var rainVolume = $(".soft_rain .volume .volume_control").slider("option", "value");
                            var thunderVolume = $(".rolling_thunder .volume .volume_control").slider("option", "value");
                            var lThunderVolume = $lThuVolControl.slider("option", "value");
                            var interval = setInterval(function () {
                                var v = (totalStep - (step + 1)) * (normalVolume / totalStep);
                                console.log("volume: " + v);
                                if (v < rainVolume) {
                                    $(".soft_rain .volume .volume_control").slider({ value:v });
                                    rain1.setVolume(v);
                                    rain2.setVolume(v);
                                }
                                if (v < thunderVolume) {
                                    $(".rolling_thunder .volume .volume_control").slider({ value:v });
                                    thunder1.setVolume(v);
                                    thunder2.setVolume(v);
                                }
                                if (v < lThunderVolume) {
                                    $lThuVolControl.slider({value:v});
                                    lThunder1.setVolume(v);
                                    lThunder2.setVolume(v);
                                }
                                step++;
                                if (step > totalStep) {
                                    clearInterval(interval);
                                    //reset the volume to original volume
                                    soundManager.stopAll();
                                    $(".soft_rain .volume .volume_control").slider({ value:rainVolume });
                                    rain1.setVolume(rainVolume);
                                    rain2.setVolume(rainVolume);

                                    $(".rolling_thunder .volume .volume_control").slider({ value:thunderVolume });
                                    thunder1.setVolume(thunderVolume);
                                    thunder2.setVolume(thunderVolume);

                                    $lThuVolControl.slider({value:lThunderVolume});
                                    lThunder1.setVolume(lThunderVolume);
                                    lThunder2.setVolume(lThunderVolume);
                                    $(".soft_rain ul,.rolling_thunder ul,.slideshow ul,.loud_thunder ul").removeClass("clicked");

                                }
                            }, duration / totalStep);
                        }
                    });
            }, 1000);

            $(this).closest('ul').addClass("clicked");
            $('#breakOff').click();
            e.preventDefault();

        };
        //this method fires when fade out is clicked
        fadeOutMethod = function (e) {
            clearInterval(fadeTimer);
            $('#fadeH,#fadeM').removeAttr("disabled");
            $(this).closest('ul').removeClass("clicked");

            e.preventDefault();
        };
        //default click binding
        $('#fadeOn').click(fadeOnMethod);
        $('#fadeOff').click(fadeOutMethod);
// ====================Options animation==========================
        /* //disabled autohide
        var areHidden = false, userActive, activeTimer;
        userActive = function () {
            $(document).unbind("keydown").unbind("mousemove");
            //each time when this method is fired, make sure it don't respond to any event in 0.4s so that the animation
            //of these show/hide elements conducts correctly.
            setTimeout(function () {
                $(document).bind("keydown", userActive).bind("mousemove", userActive);
            }, 400);
            if (areHidden) {
                areHidden = false;
                $("#more_rain,#options,#social_share").stop().show(380);
            }
            if (activeTimer != null) {
                clearTimeout(activeTimer);
            }
            activeTimer = setTimeout(function () {
                $("#more_rain,#options,#social_share").stop().hide(380);
                areHidden = true;

            }, 6 * 1000);

        };
        

        $(document).keydown(userActive).mousemove(userActive);

        userActive();

        var isShown = true;
        $('#toggle_controls').click(function (e) {
            var $this = $(this);
            if (isShown) {
                $("#more_rain,#options,#social_share").stop().hide(380);
                $(document).unbind("keydown").unbind("mousemove");
                $this.text("show controls").addClass("hidden-control");
                isShown = false;
            } else {
                $("#more_rain,#options,#social_share").stop().show(380);
                $(document).keydown(userActive).mousemove(userActive);
                $this.text("hide controls").removeClass("hidden-control");
                isShown = true;
            }
            e.preventDefault();
        });
        */
        var isShown = true;
        $('#toggle_controls').click(function (e) {
            var $this = $(this);
            if (isShown) {
                $("#more_rain,#options,#social_share,#rainyday_credit").stop().hide(380);
                $("#rainingfm_brand").stop().show(380);
                $("#credits").addClass("active");
                $this.text("Show Panels").addClass("hidden-control");
                isShown = false;
            } else {
                $("#more_rain,#options,#social_share,#rainyday_credit").stop().show(380);
                $("#rainingfm_brand").stop().hide(380);
                $("#credits").removeClass("active");
                $this.text("Hide Panels").removeClass("hidden-control");
                isShown = true;
            }
            e.preventDefault();
        });

        //=========================Color box starts here=========================
        $(".credit").colorbox({inline:true, width:"600px"});
        //=========================Color box ends here=========================

    });

    //================== tab slide out ============================

//    $(function () {
//        $('#more_rain').tabSlideOut({
//            tabHandle:'.reveal', //class of the element that will become your tab
//            pathToTabImage:'dev/img/more_rain.png', //path to the image for the tab //Optionally can be set using css
//            imageHeight:'135px', //height of tab image           //Optionally can be set using css
//            imageWidth:'400px', //width of tab image            //Optionally can be set using css
//            tabLocation:'bottom', //side of screen where tab lives, top, right, bottom, or left
//            speed:300, //speed of animation
//            action:'click', //options: 'click' or 'hover', action to trigger animation
//            topPos:'0px', //position from the top/ use if tabLocation is left or right
//            leftPos:'0px', //position from left/ use if tabLocation is bottom or top
//            fixedPosition:false                      //options: true makes it stick(fixed position) on scroll
//        });
//
//    });
    //===========================Tooltips=================================
    $(function () {
        $("li.tooltip>a").qtip({content:{text:function () {
            return $(this).parent().children('span').text();
        },
            title:"Help" },
            position:{my:'right top', at:'left top'},
            style:{classes:'ui-tooltip-shadow ui-tooltip-rfm' }
        });
        $("li.tooltip>a").click(function () {
            return false;
        });
    });



    //=========================== END ===============================

}(jQuery);

//===========================Rain Drops=================================
    // Awesome rain drop effect "rainyday.js" by maroslaw http://maroslaw.github.io/rainyday.js/
    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
    }
    function raindrops() {
        var image = document.getElementById('background');
        image.onload = function() {
            var engine = new RainyDay('canvas','background', window.innerWidth, window.innerHeight, 1, getURLParameter("blur") || 20);
            
            var preset = getURLParameter("preset") || 1;
            if (preset == 1) {
                engine.gravity = engine.GRAVITY_NON_LINEAR;
                engine.trail = engine.TRAIL_DROPS;
                engine.rain([ engine.preset(3, 3, 0.88), engine.preset(5, 5, 0.9), engine.preset(6, 2, 1) ], 100);
            } else if (preset == 2) {
                engine.gravity = engine.GRAVITY_NON_LINEAR;
                engine.trail = engine.TRAIL_DROPS;
                engine.VARIABLE_GRAVITY_ANGLE = Math.PI / 8;
                engine.rain([ engine.preset(0, 2, 0.5), engine.preset(4, 4, 1) ], 50);
            } else if (preset == 3) {
                engine.gravity = engine.GRAVITY_NON_LINEAR;
                engine.trail = engine.TRAIL_SMUDGE;
                engine.rain([ engine.preset(0, 2, 0.5), engine.preset(4, 4, 1) ], 50);
            }
        };
        image.src="http://raining.fm/img/slides/adelaide.jpg";
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
    }

