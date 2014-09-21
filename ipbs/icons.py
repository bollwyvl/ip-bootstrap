import json
import os

import bootstrap as bs

Size = bs.enum(**{
    "large": "lg",
    "x2": "2x",
    "x3": "3x",
    "x4": "4x",
    "x5": "5x"
})

class IconSet(object):
    _icon_file = None
    _icons = None

    
    def __init__(self):
        self._icons = self._get_icons()
    
    def __getattr__(self, name):
        return self.Icon([self._icons[name]], self)
    
    def __dir__(self):
        return self._icons.keys()
    
    class Icon(object):
        def __init__(self, icons, iconset):
            self.icons = icons
            self.iconset = iconset
        
        def __add__(self, other):
            # support + notation
            return self.__class__(
                self.icons + other.icons,
                self.iconset
            )
        
        def __getattr__(self, name):
            return self + getattr(self.iconset, name)
        
        def __dir__(self):
            return dir(self.iconset)
    
class FontAwesome(IconSet):
    _icon_file = os.path.join(
        os.path.dirname(__file__),
        "data",
        "font-awesome.json")
    _effects = ["lg"] + ["%sx" % (i + 2) for i in range(4)]
    
    def _get_icons(self):
        with open(self._icon_file, "r") as f:
            icons = json.load(f)["icons"]

        # from translated YAML
        icons = dict([
            (icon["id"].replace("-", "_"), icon) for icon in icons
        ])
        
        # sizing
        icons["width_fixed"] = dict(name="as fixed width", id="fw")
        icons["width_list_item"] = dict(name="as list item", id="li")
        for i in list(Size):
            icons["size_" + i] = dict(name="sized %s" % i, id="%s" % i)
            
        # extras
        icons["border"] = dict(name="with a border", id="border")
        icons["spin"] = dict(name="with spinner animation", id="spin")
        
        # rotate
        for i in [90, 180, 270]:
            icons["rotate_%s" % i] = dict(
                name="rotated %s degrees" % i,
                id="rotate-%s" % i
            )
        
        # flip
        for i in ["horizontal", "vertical"]:
            icons["flip_%s" % i] = dict(
                name="flipped %sly" % i,
                id="flip-%s" % i
            )
        
        #colors
        icons["context_inverse"] = dict(name="colored inversely", id="inverse")
        for i in list(bs.Context):
            icons["context_%s" % i] = dict(
                name="colored like %s" %i,
                id="%s" % i,
                prefix="text"
            )
        
        return icons
    
    class Icon(IconSet.Icon):
        def __repr__(self):
            return "fa " + (" ".join([
                "%s-%s" % (icon.get("prefix", "fa"), icon["id"])
                for icon in self.icons]))
        
        def __mul__(self, amt):
            if amt > 5:
                raise ValueError("Cannot be bigger than 5")
            # support * notation for sizing
            return self.__class__(
                self.icons + [dict(
                    name="%sx bigger" % amt,
                    id="%sx" % amt
                )],
                self.iconset
            )

        def _repr_html_(self):
            return '<i class="%s">' % unicode(self)
