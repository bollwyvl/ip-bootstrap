# -*- coding: utf-8 -*-

import os

# Import widgets, provisioners and traitlets
from IPython.html import widgets
from IPython.utils.traitlets import (
    Any,
    Unicode,
    Enum
)

from mixins import InstallerMixin
from ipbs.bootstrap import Context

class Panel(InstallerMixin, widgets.DOMWidget):
    """
    A Panel, with optional header and footer.
    """
    _view_name = Unicode('ipbs/PanelView', sync=True)

    # bootstrap context color
    context = Enum(Context, default_value=Context.default, sync=True)
    
    # all of these take either a string or a list of widgets
    title = Any(sync=True)
    body = Any(sync=True)
    heading = Any(sync=True)
    footer = Any(sync=True)