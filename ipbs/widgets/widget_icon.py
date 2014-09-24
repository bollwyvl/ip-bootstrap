# -*- coding: utf-8 -*-

import os

# Import widgets, provisioners and traitlets
from IPython.html import widgets
from IPython.utils import traitlets

import ipbs.bootstrap as bs
from ipbs.icons import Size

from mixins import InstallerMixin

class Icon(InstallerMixin, widgets.DOMWidget):
    """
    A widget which can show one or more icons
    """
    icons = traitlets.List(sync=True)
    size = traitlets.Enum(Size, sync=True)
    context = traitlets.Enum(bs.Context, sync=True)

    _view_name = traitlets.Unicode('ipbs/IconView', sync=True)
    
    def __init__(self, *args, **kwargs):
        kwargs["icons"] = list(args) + kwargs.pop("icons", [])
        super(Icon, self).__init__(**kwargs)
