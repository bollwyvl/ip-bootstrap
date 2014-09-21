;(function(define){
  'use strict';
  define([], function(){
    return function(__super__, opts){
      opts = opts || {};
      
      var Roled,
        selection = opts.selection || "$el";
      
      Roled = __super__.extend({
        render: function(){
          this[selection].attr({role: this.role});
          Roled.__super__.render.apply(this, arguments);
        }
      });
      
      return Roled;
    };
  });
}).call(this, this.define);