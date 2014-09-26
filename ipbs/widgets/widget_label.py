# -*- coding: utf-8 -*-

import os

# Import widgets, provisioners and traitlets
from IPython.html import widgets
from IPython.utils.traitlets import (
    Any,
    Unicode,
    CUnicode,
    Enum,
    Bool
)

from .mixins import InstallerMixin
from ipbs import bootstrap as bs

class Label(InstallerMixin, widgets.DOMWidget):
    """
    Just some text...
    """
    _view_name = Unicode('ipbs/LabelView', sync=True)

    value = CUnicode(sync=True)
    
    html = Bool(False, sync=True)

    lead = Bool(False, sync=True)
    align = Enum(bs.Alignment, sync=True)
    # 3.2?
    transform = Enum(bs.Transformation, sync=True)

    # bootstrap context color
    context = Enum(bs.Context, default_value=bs.Context.default, sync=True)

    def __init__(self, value=None, **kwargs):
        if value is not None:
            kwargs["value"] = value
        super(Label, self).__init__(**kwargs)
    