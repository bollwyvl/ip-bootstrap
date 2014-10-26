# Import widgets, provisioners and traitlets
from IPython.html import widgets
from IPython.utils.traitlets import (
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
    _view_name = Unicode('LabelView', sync=True)
    _view_module = Unicode('nbextensions/ipbs/js/widget_label', sync=True)

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
