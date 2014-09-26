;(function(define, require){
  'use strict';
  
  require.config({
    paths: {
      'underscore.string': '/nbextensions/ipbs/lib/underscore.string.min'
    },
    shim: {'underscore.string': {deps: ['underscore']}}
  });
  
  define(["underscore", "underscore.string"], function(_, _str){
    _.mixin(_str.exports());

    var trait_defaults = {
        prefix: "text-",
        field: "context",
        selection: "$el",
        type: "enum"
      },
      default_options = {
        skipRender: false
      },
      sizes = {
        xs: "extra_small",
        sm: "small",
        md: "medium",
        lg: "large"
      };

    var API = function(__super__, traits, options){
      options = _.defaults(options || {}, default_options);

      traits = _.map(traits, function(trait){
        trait = _.defaults(trait, trait_defaults);
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
          return Classy.__super__.initialize.apply(this, arguments);
        },
        
        render: function(){
          _.map(traits, function(trait){ this[trait.method](); }, this);

          return options.skipRender ? 
            this :
            Classy.__super__.render.apply(this, arguments);
        }
      };
      
      _.map(traits, function(trait){
        methods[trait.method] = function(){
          var ctx = this.model.get(trait.field),
            sel = this[trait.selection],
            prev =  this.model.previous(trait.field);

          if(trait.type === "boolean"){
            ctx = ctx ? trait.value : null;
            prev = prev ? trait.value : null;
          }

          sel.removeClass(trait.prefix + prev);
      
          if(!_.isNull(ctx)){
            sel.addClass(trait.prefix + ctx);
          }
          
          return this;
        };
      });
      
      Classy = __super__.extend(methods);
      
      return Classy;
    };
    

    API.makeSized = function(clsPrefixTemplate, fieldTemplate, opts){
      opts = opts || {};

      return _.map(sizes, function(field, cls){
        return _.extend({}, opts, {
          prefix: _.sprintf(clsPrefixTemplate, cls),
          field: _.sprintf(fieldTemplate, field)
        });
      });
    };
    
    return API;
  });
}).call(this, this.define, this.require);
