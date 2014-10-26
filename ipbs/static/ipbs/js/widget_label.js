;(function(define){
'use strict';
 /**
  * The browser-side counterpart to Panel
  *
  * @author Nicholas Bollweg
  * @copyright Nicholas Bollweg 2014
  * @version 0.1.0
  * @license BSD
  */
define([
  'jquery', 'underscore',
  'widgets/js/widget',
  './mixins/Classy'
],
function($, _, widget, Classy){


  var LabelView = Classy(widget.DOMWidgetView, [
    {prefix: "", field: "lead", type: "boolean", value: "lead"},
    {field: "align"},
    {field: "transform"},
    {}
  ]).extend({
    tagName: 'span',
    className: 'ipbs LabelView',

    initialize: function(){
      this.model.on({
        "change:value": _.bind(this.valueChanged, this),
        "change:html": _.bind(this.valueChanged, this)
      });
      return LabelView.__super__.initialize.apply(this, arguments);
    },

    render: function(){
      this.valueChanged();
      return LabelView.__super__.render.apply(this, arguments);
    },

    valueChanged: function(){
      var val = this.model.get("value"),
        method = this.model.get("html") ? "html" : "text";

      this.$el[method](val);

      return this;
    }
  }); // /extend


  return {
    LabelView: LabelView
  };
});
}).call(this, this.define);