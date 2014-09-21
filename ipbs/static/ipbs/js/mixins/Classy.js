;(function(define){
  'use strict';
  define(["underscore"], function(_){
    var defaults = {
      prefix: "text-",
      field: "context",
      selection: "$el"
    };

    return function(__super__, traits){
      traits = _.map(traits, function(trait){
        trait = _.defaults(trait, defaults);
        trait.method = trait.method || trait.field + "Changed";
        return trait;
      });
      
      var Classy;
    
      var methods = {
        initialize: function(){
          _.map(traits, function(trait){
            this.model.on(
              "change:" + trait.field,
              _.bind(this[trait.method], this));
            }, this
          );
          Classy.__super__.initialize.apply(this, arguments);
        },
        
        render: function(){
          _.map(traits, function(trait){ this[trait.method]() }, this);

          Classy.__super__.render.apply(this, arguments);
        }
      };
      
      _.map(traits, function(trait){
        methods[trait.method] = function(){
          var ctx = this.model.get(trait.field),
            sel = this[trait.selection];

          sel.removeClass(trait.prefix + this.model.previous(trait.field));
      
          if(_.isNull(ctx)){
            return;
          }
          
          sel.addClass(trait.prefix + ctx);
        };
      });
      
      Classy = __super__.extend(methods);
      
      return Classy;
    };
  });
}).call(this, this.define);