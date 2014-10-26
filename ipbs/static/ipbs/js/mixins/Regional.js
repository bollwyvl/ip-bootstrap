;(function(define){
  'use strict';
  define(["underscore", "jquery"], function(_, $){
  
    /* Monkeypatch */
    $.fn.appendText = function(text) {
      return this.each(function() {
        var textNode = document.createTextNode(text);
        $(this).append(textNode);
      });
    };
  
  
    /* utilities */
    function hide(els){ return els.addClass("hide"); }
    function show(els){ return els.removeClass("hide"); }
    
    function listener(field){ return field + "Changed"; };
    
    function _childrenEmpty(key, regions){
      return _.all(regions[key].children || [], function(child){
        return _.isEmpty(this.model.get(child));
      }, this);
    }
    
    function _regionChanged(key, regions){
      return function(options){
        options = options || {};
        var that = this,
          regions$ = _.reduce(regions, function(m, v, k){
              m[k] = this["$"+k]
              return m;
            }, {}, this),
          cfg = regions[key],
          $it = regions$[key],
          it = this.model.get(key),
          prev = options.force ? [] : this.model.previous(key),
          hasChildren = !_.isEmpty(cfg.children);
      
        if(!_.isArray(it)){
          if(hasChildren){
            $it.contents()
              .filter(function(){ return this.nodeType === 3; })
              .remove();
            if(!_.isEmpty(it)){
              $it.appendText(it);
            }
          }else{
            $it.text(it);
          }
        }else{
          // going from string mode to widget mode
          if(!_.isArray(prev)){
            $it.contents()
            // never remove a region
              .not($(_.values(regions$)))
              .remove();
            prev = [];
          }

          this.do_diff(prev, it, 
            _.bind(this.removeChildModel, this),
            _.bind(function(model){
              // Called when a model is added to the children list.
              this.create_child_view(model, {
                callback: function(view){
                  $it.append(view.$el);
                  view.trigger('displayed');
                }
              });
            }, this)
          );
        }
        
        var doHide = _.isEmpty(it),
          toHide = [$it],
          parent = _.reduce(regions, function(memo, cfg, parent){
            if(_.contains(cfg.children, key)){ return parent; }
            return memo;
          }, null, this);

        if(hasChildren){
          doHide = doHide && _childrenEmpty.call(this, key, regions);
        }
        
        if(doHide){
          toHide.map(hide);
          if(parent && _.isEmpty(this.model.get(parent)) &&
              _childrenEmpty.call(this, parent, regions)){ 
            hide(regions$[parent]);
          }
        }else{
          if(parent){ show(regions$[parent]); }
          toHide.map(show);
        }
        
      }
    }
    
    return function(__super__, regions, options){
      regions = regions || {};
      options = options || {
        skipRender: false
      };
      
      var Regional;
    
      var methods = {
        initialize: function(){
          var listen = {};
            
          _(regions).map(function(region, key){
            listen["change:" + key] = _.bind(this[listener(key)], this);
          }, this);

          this.model.on(listen);
          
          Regional.__super__.initialize.apply(this, arguments);
        },

        render: function(){
          _(regions).map(function(val, key){ 
            this[listener(key)]({force: true});
          }, this);
          
          return options.skipRender ?
            this : 
            Regional.__super__.render.apply(this, arguments);
        },

        removeChildModel: function(model) {
          // never remove another region
          // if(model.views.indexOf(this.$title) !== -1){ return; }
          
          // Called when a model is removed from the children list.
          var view = this.pop_child_view(model);
          return view && view.remove();
        }
      };
      
            
      _(regions).map(function(region, key){
        methods[listener(key)] = _regionChanged(key, regions);
      }, this);
      
      Regional = __super__.extend(methods);
      
      return Regional;
    };
  });
}).call(this, this.define);