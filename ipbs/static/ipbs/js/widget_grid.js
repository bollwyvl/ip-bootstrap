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
  'widgets/js/widget', 'widgets/js/widget_box',
  './mixins/Classy'
],
function($, _, widget, box, Classy){


  var ContainerView = Classy(box.BoxView,
    [
      {},
      {field: "background", prefix: "bg-"}
    ],
    {skipRender: true}
  ).extend({
    tagName: 'div',
    className: 'ipbs ContainerView container-fluid',

    render: function(){
        // Called when view is rendered.
        this.$box = this.$el;
        ContainerView.__super__.render.apply(this, arguments);
        this.update();
        this.update_children([], this.model.get('children'));
        return this;
    }
  }); // /extend


  var RowView = Classy(box.BoxView,
    [
      {},
      {field: "background", prefix: "bg-"}
    ],
    {skipRender: true}
  ).extend({
    tagName: 'div',
    className: 'ipbs RowView row',

    render: function(){
        // Called when view is rendered.
        this.$box = this.$el;
        RowView.__super__.render.apply(this, arguments);
        this.update();
        this.update_children([], this.model.get('children'));
        return this;
    }
  }); // /extend


  var ColumnView = Classy(box.BoxView,
    [
      {},
      {field: "background", prefix: "bg-"}
    ].concat(
      Classy.makeSized("col-%s-", "%s", {hideEmpty: true}),
      Classy.makeSized("col-%s-offset-", "offset_%s", {hideEmpty: true}),
      Classy.makeSized("col-%s-push-", "push_%s", {hideEmpty: true}),
      Classy.makeSized("col-%s-pull-", "pull_%s", {hideEmpty: true})
    ),
    {skipRender: true}
  ).extend({
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


  return {
    ContainerView: ContainerView,
    RowView: RowView,
    ColumnView: ColumnView
  };
});
}).call(this, this.define);
