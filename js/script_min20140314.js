jQuery.extend({countDown: function(e, t, n, r) {
    var i = 0, s = 0;
    var o = 0, u = 0, a = 0;
    var f = new Date;
    var l = e.getTime() - f.getTime();
    if (r && l <= 30 * 1e3) {
        r()
    }
    if (l >= 0) {
        o = e.getSeconds() - f.getSeconds();
        if (o < 0) {
            o += 60;
            i = 1
        }
        t.s.text(o);
        u = e.getMinutes() - (f.getMinutes() + i);
        if (u < 0) {
            u += 60;
            s = 1
        }
        t.m.val(u);
        a = e.getHours() - (f.getHours() + s)
    } else {
        t.s.text(0);
        n()
    }
}});
!function(e) {
    e(function() {
        var t, n = "audio/rainfade_1.mp3", r = "audio/thunderfade_1.mp3", i = "audio/loudthunderfade_1.mp3";
        var s = 7288, o = 24 * 1e3, u = 35200;
        var a, f, l, c, h, p, d;
        var v = e(".loud_thunder .volume .volume_control");
        t = function() {
            a = soundManager.createSound({id: "rain1",url: n,multiShotEvents: true,autoLoad: true,onload: function() {
                this.play({position: 0})
            },onfinish: function() {
                this.play({position: 0})
            }});
            var t = false;
            f = soundManager.createSound({id: "rain2",url: n,autoLoad: true,onload: function() {
                f.play({volume: 0,position: s})
            },multiShotEvents: true,onfinish: function() {
                this.play({position: 0})
            },onplay: function() {
                if (t) {
                    return false
                }
                var e = 3 * 1e3;
                var n = 0;
                var r = 100;
                var i = setInterval(function() {
                    f.setVolume((1 + n) * (r / 12));
                    n++;
                    if (n === 12) {
                        clearInterval(i);
                        t = true
                    }
                }, e / 12)
            }});
            l = soundManager.createSound({id: "thunder1",url: r,onload: function() {
                this.onPosition(o, function() {
                    c.play({position: 0})
                })
            }});
            c = soundManager.createSound({id: "thunder2",url: r,onload: function() {
                this.onPosition(o, function() {
                    l.play({position: 0})
                })
            }});
            h = soundManager.createSound({id: "chime",url: "audio/chime.mp3"});
            p = soundManager.createSound({id: "lThunder1",url: i,onload: function() {
                this.onPosition(u, function() {
                    d.play({position: 0})
                })
            }});
            d = soundManager.createSound({id: "lThunder2",url: i,onload: function() {
                this.onPosition(u, function() {
                    p.play({position: 0})
                })
            }});
            e("#rainOn").click(function(n) {
                a.play();
                f.play({volume: 0,position: s});
                t = false;
                e(this).closest("ul").addClass("clicked");
                n.preventDefault()
            });
            e("#rainOff").click(function(t) {
                a.stop();
                f.stop();
                e(this).closest("ul").removeClass("clicked");
                t.preventDefault()
            });
            e("#thunderOff").click(function(t) {
                l.stop();
                c.stop();
                e(this).closest("ul").removeClass("clicked");
                t.preventDefault()
            });
            e("#thunderOn").click(function(t) {
                l.play({position: 0});
                e(this).closest("ul").addClass("clicked");
                t.preventDefault()
            });
            e("#loudThunderOff").click(function(t) {
                p.stop();
                d.stop();
                e(this).closest("ul").removeClass("clicked");
                t.preventDefault()
            });
            e("#loudThunderOn").click(function(t) {
                p.play({position: 0});
                e(this).closest("ul").addClass("clicked");
                t.preventDefault()
            })
        };
        soundManager.setup({url: "audio/soundmanager2_flash9.swf",preferFlash: false,flashVersion: 9,flashLoadTimeout: 1500,noSWFCache: true,debugFlash: false,onready: t});
        soundManager.ontimeout(function(e) {
            soundManager.flashLoadTimeout = 0;
            soundManager.onerror = {};
            soundManager.reboot()
        });
        e(".soft_rain .volume .volume_control").slider({value: 100,min: 0,max: 100,step: 5,slide: function(e, t) {
            a.setVolume(t.value);
            f.setVolume(t.value)
        }});
        e(".rolling_thunder .volume .volume_control").slider({value: 100,min: 0,max: 100,step: 5,slide: function(e, t) {
            l.setVolume(t.value);
            c.setVolume(t.value)
        }});
        v.slider({value: 100,min: 0,max: 100,step: 5,slide: function(e, t) {
            p.setVolume(t.value);
            d.setVolume(t.value)
        }});
        var m = {}, g = "img/slides/";
        m["classic"] = [{src: g + "classic/classic01.jpg"}, {src: g + "classic/classic02.jpg"}, {src: g + "classic/classic03.jpg"}, {src: g + "classic/classic04.jpg"}, {src: g + "classic/classic05.jpg"}, {src: g + "classic/classic06.jpg"}];
        m["animals"] = [{src: g + "animals/animals01.jpg"}, {src: g + "animals/animals02.jpg"}];
        m["architecture"] = [{src: g + "architecture/architecture01.jpg"}, {src: g + "architecture/architecture02.jpg"}];
        m["nature"] = [{src: g + "nature/nature01.jpg"}, {src: g + "nature/nature02.jpg"}];
        m["people"] = [{src: g + "people/people01.jpg"}, {src: g + "people/people02.jpg"}];
        var y = function(t) {
            var n = [];
            e.each(t, function(e, t) {
                n = n.concat(t)
            });
            var r = n.length;
            var i = [];
            for (; i.length < r; ) {
                var s = Math.floor(Math.random() * r);
                var o = n[s];
                if (e.inArray(o, i) == -1) {
                    i[i.length] = o
                }
            }
            return i
        };
        var b = {delay: 8e3,valign: "bottom",align: "center",fade: 1e3};
        var w = true;
        b.backgrounds = m["classic"];
        b.walk = function() {
            if (w) {
                e.vegas("pause");
                w = false
            }
        };
        e.vegas("slideshow", b);
        delete b.walk;
        e("#slideOn").click(function() {
            e.vegas("slideshow", b);
            e(this).closest("ul").addClass("clicked")
        });
        e("#slideOff").click(function() {
            e.vegas("pause");
            e(this).closest("ul").removeClass("clicked")
        });
        e("#sliderType").change(function() {
            var t = e(this).children("option:selected").text();
            b.backgrounds = t == "random" ? y(m) : m[t];
            e.vegas("slideshow", b);
            e(this).closest("ul").addClass("clicked");
            return false
        });
        var E, S;
        e("#breakH,#fadeH").change(function() {
            var t = e(this);
            var n = parseInt(t.val());
            if (isNaN(n)) {
                n = 0
            } else if (n < 0) {
                n = 0
            } else if (n > 12) {
                n = 12
            }
            t.val(n)
        });
        e("#breakM,#fadeM").change(function() {
            var t = e(this);
            var n = parseInt(t.val());
            if (isNaN(n)) {
                n = 1
            } else if (n < 0) {
                n = 1
            } else if (n > 59) {
                n = 59
            }
            t.val(n)
        });
        var x;
        e("#breakH,#breakM").removeAttr("disabled");
        e("#breakOn").click(function(t) {
            e("#breakH,#breakM").attr("disabled", "disabled");
            E = new Date;
            var n = parseInt(e("#breakH").val());
            var r = parseInt(e("#breakM").val());
            if (n == 0 && r == 0) {
                r = 1
            }
            E = new Date(E.getTime() + n * 60 * 60 * 1e3 + r * 60 * 1e3);
            x = setInterval(function() {
                t.preventDefault();
                var n = {};
                n.h = e("#breakH");
                n.m = e("#breakM");
                n.s = e("#breakS");
                e.countDown(E, n, function() {
                    soundManager.stopAll();
                    h.play();
                    e("#breakOff").click();
                    e(".soft_rain ul,.rolling_thunder ul,.slideshow ul,.loud_thunder ul").removeClass("clicked");
                    e.colorbox({html: e("#breakInModal").html(),width: "460px",height: "550px"})
                })
            }, 1e3);
            e(this).closest("ul").addClass("clicked");
            e("#fadeOff").click()
        });
        e("#breakOff").click(function(t) {
            clearInterval(x);
            e("#breakH,#breakM").removeAttr("disabled");
            e(this).closest("ul").removeClass("clicked");
            t.preventDefault()
        });
        e("#fadeH,#fadeM").removeAttr("disabled");
        var T;
        var N, C;
        N = function(t) {
            e("#fadeH,#fadeM").attr("disabled", "disabled");
            S = new Date;
            var n = parseInt(e("#fadeH").val());
            var r = parseInt(e("#fadeM").val());
            if (n == 0 && r == 0) {
                r = 1
            }
            var i = true;
            S = new Date(S.getTime() + n * 60 * 60 * 1e3 + r * 60 * 1e3);
            T = setInterval(function() {
                var t = {};
                t.h = e("#fadeH");
                t.m = e("#fadeM");
                t.s = e("#fadeS");
                e.countDown(S, t, function(t) {
                    e.vegas({src: "img/slides/classic/classic01.jpg",fade: 1e3,valign: "bottom",align: "center"});
                    e.vegas("pause");
                    e("#fadeOn").click(N);
                    e("#fadeOff").click(C).click()
                }, function() {
                    if (i) {
                        i = false;
                        e("#fadeOn").unbind("click");
                        e("#fadeOff").unbind("click");
                        var t = 30 * 1e3;
                        var n = 0;
                        var r = 15;
                        var s = 100;
                        var o = e(".soft_rain .volume .volume_control").slider("option", "value");
                        var u = e(".rolling_thunder .volume .volume_control").slider("option", "value");
                        var h = v.slider("option", "value");
                        var m = setInterval(function() {
                            var t = (r - (n + 1)) * (s / r);
                            console.log("volume: " + t);
                            if (t < o) {
                                e(".soft_rain .volume .volume_control").slider({value: t});
                                a.setVolume(t);
                                f.setVolume(t)
                            }
                            if (t < u) {
                                e(".rolling_thunder .volume .volume_control").slider({value: t});
                                l.setVolume(t);
                                c.setVolume(t)
                            }
                            if (t < h) {
                                v.slider({value: t});
                                p.setVolume(t);
                                d.setVolume(t)
                            }
                            n++;
                            if (n > r) {
                                clearInterval(m);
                                soundManager.stopAll();
                                e(".soft_rain .volume .volume_control").slider({value: o});
                                a.setVolume(o);
                                f.setVolume(o);
                                e(".rolling_thunder .volume .volume_control").slider({value: u});
                                l.setVolume(u);
                                c.setVolume(u);
                                v.slider({value: h});
                                p.setVolume(h);
                                d.setVolume(h);
                                e(".soft_rain ul,.rolling_thunder ul,.slideshow ul,.loud_thunder ul").removeClass("clicked")
                            }
                        }, 1)
                    }
                })
            }, 1e3);
            e(this).closest("ul").addClass("clicked");
            e("#breakOff").click();
            t.preventDefault()
        };
        C = function(t) {
            clearInterval(T);
            e("#fadeH,#fadeM").removeAttr("disabled");
            e(this).closest("ul").removeClass("clicked");
            t.preventDefault()
        };
        e("#fadeOn").click(N);
        e("#fadeOff").click(C);
        var k = true;
        e("#toggle_controls").click(function(t) {
            var n = e(this);
            if (k) {
                e("#more_rain,#options,#social_share,#see_raindrops").stop().hide(380);
                e("#rainingfm_brand").stop().show(380);
                e("#credits").addClass("active");
                n.text("Show Panels").addClass("hidden-control");
                k = false
            } else {
                e("#more_rain,#options,#social_share,#see_raindrops").stop().show(380);
                e("#rainingfm_brand").stop().hide(380);
                e("#credits").removeClass("active");
                n.text("Hide Panels").removeClass("hidden-control");
                k = true
            }
            t.preventDefault()
        });
        e(".credit").colorbox({inline: true,width: "600px"})
    });
    e(function() {
        e("li.tooltip>a").qtip({content: {text: function() {
            return e(this).parent().children("span").text()
        },title: "Help"},position: {my: "right top",at: "left top"},style: {classes: "ui-tooltip-shadow ui-tooltip-rfm"}});
        e("li.tooltip>a").click(function() {
            return false
        })
    });
    //感觉这东西有点象登陆的弹窗.
    /*
    e(setTimeout(function() {
        if (e.cookie("rfm_modal_shown") == null) {
            e.cookie("rfm_modal_shown", "yes", {expires: 90,path: "/"});
            e.colorbox({html: e("#featuresModal2014").html(),width: "440px",height: "500px",overlayClose: false})
        }
    }, 12e3));
    e(function() {
        e("#early_access").colorbox({html: e("#featuresModal2014").html(),width: "440px",height: "500px",overlayClose: false})
    })
    */

}(jQuery)
