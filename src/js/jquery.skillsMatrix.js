(function ($) {
    $.widget(
        "ciroque.skillsMatrix",
        {

            options: {
                nomclick: $.noop,
                nommouseenter: $.noop,
                nommouseleave: $.noop,
                hovertileclass: "hvrtile"
            },

            _create: function () {
                this.element.addClass("skmctr");
                var name = "ciro_rm_hvr_tile";
                var hvrtile = $("<div>", { id: name, name: name }).addClass(this.options.hovertileclass);
                hvrtile
                    .html("<b>Why Hello There</b>")
                    .appendTo("body");
            },

            _init: function () {

            },

            _setOption: function (key, value) {
                switch (key) {
                    default:
                    {
                    }
                }

                this._super("_setOption", key, value);
            },

            _destroy: function () {
            },

            _evtHandlerCommon: function(self, evt, nom, trigger) {
                var pos = self.offset();
                var size = self.outerWidth() + pos.left;

                var evtArgs = {
                    pos: pos
                    ,size: size
                    ,jqo: $("#ciro_rm_hvr_tile")
                    ,nomination: nom
                }

                trigger(evtArgs);
            },

            setRatings: function (def) {

                this.element.empty();

                var defjson = jQuery.parseJSON(def);

                for (var p in defjson.keys) {
                    console.log(p + " => " + defjson[p] + "\n");
                }

                var self = this;

                $.each(
                    defjson.ratings,
                    function (idx, rating) {
                        var dtl = $("<div>").addClass("skmdtl");
                        var cat = $("<div>").addClass("skmcat");
                        dtl.append(cat);

                        $.each(
                            rating.nominations,
                            function (si, nomination) {
                                var name = "nom" + si;
                                var nom = $("<div>", { name: name, id: name }).addClass("skmnom");

                                nom.bind(
                                    "mouseenter." + name,
                                    function(event) {

                                        self._evtHandlerCommon($(this), event, nomination, function(evtArgs) {

                                            if(self._trigger("nommouseenter", event, evtArgs)) {
                                                $("#ciro_rm_hvr_tile")
                                                    .css({ top: evtArgs.pos.top + "px", left: (evtArgs.size + 2) + "px" })
                                                    .html("<div>" + nomination.name + "</div><img src=\"" + nomination.icon + "\"/>")
                                                    .show();
                                            }
                                        });
                                    }
                                );

                                nom.bind(
                                    "mouseleave." + name,
                                    function(event) {
                                        $("#ciro_rm_hvr_tile").hide();
                                        self._trigger("nommouseleave", event, nomination);
                                    }
                                );

                                nom.bind(
                                    "click." + name,
                                    function(event) {
                                        self._evtHandlerCommon($(this), event, nomination, function(evtArgs) {
                                            self._trigger("nomclick", event, evtArgs);
                                        });
                                    }
                                );

                                dtl.append(nom);
                            }
                        );

                        self.element.append(dtl);
                    }
                );
            }
        });
}(jQuery) );

