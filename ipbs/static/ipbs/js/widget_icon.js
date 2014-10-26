// the immediately-called closure and 'use strict' helps ensure hygiene
;(function(define){
'use strict';
 /**
  * The browser-side counterpart to Icon
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

  var classy = Classy(widget.DOMWidgetView, [
    {prefix: "fa-", field: "size"},
    {}
  ]);

  var IconView = classy.extend({
    // namespace your CSS so that you don't break other people's stuff
    className: 'ipbs IconView fa-stack',
    tagName: 'span',

    render: function(){
      this.model.on({
        "change:icons": _.bind(this.iconsChanged, this)
      });

      // call an update once the node has been added to the DOM...
      _.defer(_.bind(this.iconsChanged, this));

      return IconView.__super__.render.apply(this, arguments);
    }, // /render

    iconsChanged: function(){
      var icons = this.model.get('icons'),
        stack = this.$el.children('i'),
        attr = {"class": []};

      // exit()
      stack.slice(icons.length).remove();

      _.map(icons, function(icon, i){
        if(icon.match(/(-\dx)/)){
          icon = icon.replace(/(-\dx)/, "-stack$1");
        }else{
          icon += " fa-stack-1x";
        }
        attr["class"] = icon;
        if(stack[i]){
          // update()
          stack.eq(i).attr(attr);
        }else{
          // enter()
          this.$el.append($("<i/>", attr));
        }
      }, this);

      // call __super__.update to handle housekeeping
      return IconView.__super__.update.apply(this, arguments);
    } // /update

  }); // /extend


  return {
    IconView: IconView
  };
});
}).call(this, this.define);