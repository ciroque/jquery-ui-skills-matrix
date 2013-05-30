(function( $ ) {
            $.widget(
               "ciroque.ratingsMatrix",
               {

                options: {
			nomclick: $.noop,
			nomhover: $.noop
                },

                _create: function() {
			this.element.addClass("rtmctr")
                },

                _init: function() {

                },

                _setOption: function( key, value ) {
                    switch( key ) {
                        default: {}
                    }

                    this._super( "_setOption", key, value );
                },

                _destroy: function() {
                },

                setRatings: function(def) {
                    var defjson = eval(def);
                    var self = this;

                    $.each(
                        defjson.ratings,
                        function(idx, rating) {
                            var dtl = $("<div>").addClass("rtmdtl");
                            var cat = $("<div>").addClass("rtmcat");
                            dtl.append(cat);

                            $.each(
                                rating.nominations,
                                function(si, nomination) {
                                    var nom = $("<div>").addClass("rtmnom");
                                    dtl.append(nom);
                                }
                            )

                            self.element.append(dtl);
                        }
                    );
                }
            });
        }( jQuery ) );

