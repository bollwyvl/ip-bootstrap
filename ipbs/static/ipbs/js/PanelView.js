// the immediately-called closure and 'use strict' helps ensure hygiene
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
  'jquery',
  'underscore'
],
function(manager, widget, $, _){
  $.fn.appendText = function(text) {
      return this.each(function() {
          var textNode = document.createTextNode(text);
          $(this).append(textNode);
      });
  };
  
  function hide($el){ return $el.addClass("hide"); }
  function show($el){ return $el.removeClass("hide"); }
  
  function _regionChanged(region){
    return function(){
      var that = this,
        $it = this["$"+region],
        it = this.model.get(region),
        prev = this.model.previous(region),
        isHeading = region === "heading",
        isTitle = region === "title",
        emptyTitle = _.isEmpty(this.model.get("title")),
        emptyHeading = _.isEmpty(this.model.get("heading"));
      
      if(["heading", "footer", "title"].indexOf(region) !== -1){
        if(_.isEmpty(it) && !(isHeading && !emptyTitle)){
          if(isTitle && emptyHeading){ hide(this.$heading); }
          hide($it);
        }else{
          if(isTitle){ show(this.$heading); }
          show($it);
        }
      }
      
      if(!_.isArray(it)){
        if(isHeading){
          $it.contents()
            .filter(function(){ return this.nodeType === 3; })
            .remove();
          if(it != null){ $it.appendText(it); }
        }else{
          $it.text(it);
        }
      }else{
        if(!_.isArray(prev)){
          $it.contents()
            .filter(function(){ return this != that.$title; })
            .remove();
          prev = [];
        }

        this.do_diff(prev, it, 
          this.removeChildModel,
          _.bind(function(model){
            // Called when a model is added to the children list.
            var view = this.create_child_view(model);
            $it.append(view.$el);

            // Trigger the displayed event of the child view.
            this.after_displayed(function() {
                view.trigger('displayed');
            });
          }, this)
        );
        
        if(isHeading){
          $it.append(this.$title);
        }
      }
    };
  }
  
  var PanelView = widget.DOMWidgetView.extend({
    className: 'ipbs PanelView',

    render: function(){
      this.$el.addClass("panel").append(
        this.$heading = hide($("<div/>").addClass("panel-heading")
          .append(this.$title = hide($("<div/>").addClass("panel-title")))),
        this.$body = $("<div/>").addClass("panel-body"),
        this.$footer = hide($("<div/>").addClass("panel-footer"))
      );

      var listen = {
        "change:context": this.contextChanged,

        "change:heading": this.headingChanged,
        "change:title": this.titleChanged,
        "change:body": this.bodyChanged,
        "change:footer": this.footerChanged
      };

      
      _.bindAll(this,
        "headingChanged", "titleChanged", "bodyChanged", "footerChanged",
        "removeChildModel"
      );

      this.listenTo(this.model, listen);

      _.map(listen, function(fn){ fn.call(this); }, this);

      return this;
    },

    headingChanged: _regionChanged("heading"),
    titleChanged: _regionChanged("title"),
    bodyChanged: _regionChanged("body"),
    footerChanged: _regionChanged("footer"),

    removeChildModel: function(model) {
      // never remove the title
      if(model.views.indexOf(this.$title) !== -1){ return; }
      // Called when a model is removed from the children list.
      this.pop_child_view(model).remove();
    },
    
    

    contextChanged: function(){
      var ctx = this.model.get("context");

      this.$el.removeClass("panel-" + this.model.previous("context"));
      
      if(ctx){
        this.$el.addClass("panel-" + this.model.get("context"));
      }
    }
  }); // /extend

  // Register the PanelView with the widget manager.
  manager.WidgetManager.register_widget_view(
    'PanelView',
    PanelView
  );
  
  // Eventually, requirejs will be used directly: be ready.
  return {
    'PanelView': PanelView
  };
});
}).call(this, this.define);