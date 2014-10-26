;(function(define){
'use strict';
 /**
  * The browser-side counterpart to Button
  *
  * @author Nicholas Bollweg
  * @copyright Nicholas Bollweg 2014
  * @version 0.1.0
  * @license BSD
  */
define([
  'jquery', 'underscore',
  'widgets/js/widget', 'widgets/js/widget_button', 'widgets/js/widget_box',
  './mixins/Classy', './mixins/Regional', './mixins/Roled'
],
function($, _, widget, button, box, Classy, Regional, Roled){

  var regional = Regional(button.ButtonView, {
      body: {children: ["description"]},
      description: {}
    }, {
      skipRender: true
    });
  
  var ButtonView = Classy(regional, [
    {prefix: "btn-"},
    {prefix: "btn-", field: "size"}
  ]).extend({
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


  var ButtonGroupView = Classy(box.BoxView, [
    {prefix: "btn-group-", field: "size"},
    // missing hyphen not a typo!
    {prefix: "btn-group",  field: "orientation"},
    {prefix: "btn-group-", field: "justification"}
  ]).extend({
    tagName: 'div',
    className: 'ipbs ButtonGroupView'
  }); // /extend


  var ButtonToolbarView = Roled(box.BoxView)
    .extend({
      tagName: 'div',
      className: 'ipbs ButtonToolbarView btn-toolbar',
      role: 'toolbar'
    }); // /extend

  return {
    'ButtonView': ButtonView,
    'ButtonGroupView': ButtonGroupView,
    'ButtonToolbarView': ButtonToolbarView
  };
});
}).call(this, this.define);
