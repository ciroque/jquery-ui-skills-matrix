(function ($) {
    $.widget(
        "ciroque.ratingsMatrix",
        {

            options: {
                nomclick: $.noop,
                nommouseenter: $.noop,
                nommouseleave: $.noop,
                hovertileclass: "hvrtile"
            },

            _create: function () {
                this.element.addClass("rtmctr");
                var name = "ciro_rm_hvr_tile";
                var hvrtile = $("<div>", { id: name, name: name }).addClass(this.options.hovertileclass);
                hvrtile.html("<b>Why Hello There</b>").appendTo("body");
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
                        var dtl = $("<div>").addClass("rtmdtl");
                        var cat = $("<div>").addClass("rtmcat");
                        dtl.append(cat);

                        $.each(
                            rating.nominations,
                            function (si, nomination) {
                                var name = "nom" + si;
                                var nom = $("<div>", { name: name, id: name }).addClass("rtmnom");

                                nom.bind(
                                    "mouseenter." + name,
                                    function(event) {
                                        var pos = $(this).offset();
                                        var size = $(this).outerWidth() + pos.left;

                                        console.log(pos + "::" + size);

                                        $("#ciro_rm_hvr_tile")
                                            .css({ top: pos.top + "px", left: (size + 2) + "px" })
                                            .html("<div>" + nomination.name + "</div><img src=\"" + nomination.icon + "\"/>")
                                            .show();

                                        self._trigger("nommouseenter", event, nomination);
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
                                        self._trigger("nomclick", event, nomination);
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

