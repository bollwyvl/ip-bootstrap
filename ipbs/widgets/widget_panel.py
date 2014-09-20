# -*- coding: utf-8 -*-

import os

# Import widgets, provisioners and traitlets
from IPython.html import widgets
from IPython.utils.traitlets import (
    Any,
    Unicode,
    Enum
)

from .mixins import InstallerMixin
from .bootstrap import Context

class Panel(InstallerMixin, widgets.DOMWidget):
    """
    A Panel, with optional header and footer.
    """
    _view_name = Unicode('PanelView', sync=True)

    # bootstrap context color
    context = Enum(Context, default_value=Context.default, sync=True)
    
    # optional title
    title = Any(sync=True)
    body = Any(sync=True)
    heading = Any(sync=True)
    footer = Any(sync=True)
    
    def _on_body_changed(self, name, old, new):
        print name, old, new