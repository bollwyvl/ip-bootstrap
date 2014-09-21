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

class Button(InstallerMixin, widgets.Button):
    """
    A Button, with optional header and footer.
    """
    _view_name = Unicode('ipbs/ButtonView', sync=True)

    # bootstrap context color
    context = Enum(Context, default_value=Context.default, sync=True)

    body = Any(sync=True)

class ButtonGroup(InstallerMixin, widgets.Box):
    pass

class ButtonToolbar(InstallerMixin, widgets.Box):
    pass