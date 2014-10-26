# Import widgets, provisioners and traitlets
from IPython.html import widgets
from IPython.utils.traitlets import List, Enum, Unicode

import ipbs.bootstrap as bs
from ipbs.icons import Size

from .mixins import InstallerMixin


class Icon(InstallerMixin, widgets.DOMWidget):
    """
    A widget which can show one or more icons
    """
    icons = List(sync=True)
    size = Enum(Size, sync=True)
    context = Enum(bs.Context, sync=True)

    _view_name = Unicode('IconView', sync=True)
    _view_module = Unicode('nbextensions/ipbs/js/widget_icon', sync=True)

    def __init__(self, *args, **kwargs):
        kwargs["icons"] = list(args) + kwargs.pop("icons", [])
        super(Icon, self).__init__(**kwargs)
