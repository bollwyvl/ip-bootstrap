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
  'widgets/js/widget_box',
  'jquery',
  'underscore',
  './mixins/Classy'
],
function(manager, widget, box, $, _, Classy){
  
  var classy = Classy(box.BoxView,
    [{}].concat(
      Classy.makeSized("col-%s-", "%s", {hideEmpty: true}),
      Classy.makeSized("col-%s-offset-", "offset_%s", {hideEmpty: true}),
      Classy.makeSized("col-%s-push-", "push_%s", {hideEmpty: true}),
      Classy.makeSized("col-%s-pull-", "pull_%s", {hideEmpty: true})
    ),
    {skipRender: true}
  );

  var ColumnView = classy.extend({
    tagName: 'div',
    className: 'ipbs ColumnView',

    render: function(){
        // Called when view is rendered.
        this.$box = this.$el;
        ColumnView.__super__.render.apply(this, arguments);
        this.update();
        this.update_children([], this.model.get('children'));
        return this;
    }
        
  }); // /extend

  // Register the PanelView with the widget manager.
  manager.WidgetManager.register_widget_view(
    'ipbs/ColumnView',
    ColumnView
  );
  
  
  // Eventually, requirejs will be used directly: be ready.
  return {
    'ipbs/ColumnView': ColumnView
  };
});
}).call(this, this.define);
