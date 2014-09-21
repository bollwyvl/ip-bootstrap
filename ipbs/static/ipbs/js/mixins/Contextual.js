;(function(define){
  'use strict';
  define(["underscore"], function(_){
    return function(__super__, opts){
      opts = opts || {};
      
      var Contextual;
    
      var prefix = opts.prefix || "text-",
        field = opts.fiel || "context",
        selection = opts.selection || "$el",
        method = opts.method || field + "Changed";
    
      var methods = {
        initialize: function(){
          var listen = {};
          
          listen["change:" + field] = _.bind(this[method], this);

          this.model.on(listen);

          Contextual.__super__.initialize.apply(this, arguments);
        },
        
        render: function(){
          this[method]();

          Contextual.__super__.render.apply(this, arguments);
        }
      };
      
      methods[method] = function(){
        var ctx = this.model.get(field);

        this[selection].removeClass(prefix + this.model.previous(field));
      
        if(ctx){
          this[selection].addClass(prefix + this.model.get(field));
        }
      };
      
      Contextual = __super__.extend(methods);
      
      return Contextual;
    };
  });
}).call(this, this.define);