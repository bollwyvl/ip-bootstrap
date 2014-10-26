# -*- coding: utf-8 -*-

import os

# Import widgets, provisioners and traitlets
from IPython.html import widgets
from IPython.utils.traitlets import (
    Any,
    Unicode,
    Enum,
)

from .mixins import InstallerMixin
from ipbs.bootstrap import (
    Context,
    Size,
    Orientation,
    Justification,
)

_module = 'nbextensions/ipbs/js/widget_button'

class Button(InstallerMixin, widgets.Button):
    """
    A Button, with optional header and footer.
    """
    _view_name = Unicode('ButtonView', sync=True)
    _view_module = Unicode(_module, sync=True)

    # bootstrap context color
    context = Enum(Context, default_value=Context.default, sync=True)
    size = Enum(Size, default_value=Size.default, sync=True)

    body = Any(sync=True)


class ButtonGroup(InstallerMixin, widgets.Box):
    """
    A Group of Buttons
    """
    _view_name = Unicode('ButtonGroupView', sync=True)
    _view_module = Unicode(_module, sync=True)

    size = Enum(Size, default_value=Size.default, sync=True)
    orientation = Enum(Orientation,
        default_value=Orientation.horizontal,
        sync=True)
    justification = Enum(Justification, sync=True)


class ButtonToolbar(InstallerMixin, widgets.Box):
    """
    A Group of Button Grops
    """
    _view_name = Unicode('ButtonToolbarView', sync=True)
    _view_module = Unicode(_module, sync=True)