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
  './mixins/Roled'
],
function(manager, widget, box, Roled){
  var roled = Roled(box.BoxView);
  
  var ButtonToolbarView = roled.extend({
      tagName: 'div',
      className: 'ipbs ButtonToolbarView btn-toolbar',
      role: 'toolbar'
    }); // /extend

  manager.WidgetManager.register_widget_view(
    'ipbs/ButtonToolbarView',
    ButtonToolbarView
  );
  
  // Eventually, requirejs will be used directly: be ready.
  return {
    'ipbs/ButtonToolbarView': ButtonToolbarView
  };
});
}).call(this, this.define);