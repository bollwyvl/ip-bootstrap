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
  'widgets/js/manager',
  'widgets/js/widget',
  'widgets/js/widget_button',
  'jquery',
  'underscore',
  './mixins/Classy',
  './mixins/Regional'
],
function(manager, widget, button, $, _, Classy, Regional){
  var regional = Regional(button.ButtonView, {
        body: {children: ["description"]},
        description: {}
      }, {
        skipRender: true
      }),
    classy = Classy(regional, [
      {prefix: "btn-"},
      {prefix: "btn-", field: "size"}
    ]);
  
  var ButtonView = classy.extend({
      tagName: 'button',
      className: 'ipbs ButtonView btn',

      initialize: function(){
        var listen = {
          "change:disabled": this.disabledChanged
        };
      
        _.bindAll(this, "disabledChanged");
      
        this.listenTo(this.model, listen);
      
        return ButtonView.__super__.initialize.apply(this, arguments);
      },

      render: function(){
        this.$el.append(
          this.$body = $("<span/>").append(this.$description = $("<span/>"))
        );
        return ButtonView.__super__.render.apply(this, arguments);
      },
      
      update: function(){
        // don't do the normal button thing
        return this;
      },
    
      disabledChanged: function(){
        if(this.model.get('disabled')) {
          this.$el.attr('disabled', 'disabled');
        }else{
          this.$el.removeAttr('disabled');
        }
      }
    }); // /extend

  // Register the PanelView with the widget manager.
  manager.WidgetManager.register_widget_view(
    'ipbs/ButtonView',
    ButtonView
  );
  
  // Eventually, requirejs will be used directly: be ready.
  return {
    'ipbs/ButtonView': ButtonView
  };
});
}).call(this, this.define);