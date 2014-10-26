# -*- coding: utf-8 -*-

import os

# Import widgets, provisioners and traitlets
from IPython.html import widgets
from IPython.utils.traitlets import (
    Any,
    Unicode,
    Enum,
    Bool,
    Int
)

from .mixins import InstallerMixin
from ipbs import bootstrap as bs


class GridBase(InstallerMixin, widgets.Box):
    _view_module = Unicode('nbextensions/ipbs/js/widget_grid', sync=True)

    def __init__(self, *children,  **kwargs):
        kwargs["children"] = (
            list(children or []) +
            list(kwargs.pop("children", []))
        )
        super(GridBase, self).__init__(**kwargs)


class Container(GridBase):
    """
    A container
    """
    _view_name = Unicode('ContainerView', sync=True)
    
    context = Enum(bs.Context, sync=True)
    background = Enum(bs.Context, sync=True)


class Row(GridBase):
    """
    A container
    """
    _view_name = Unicode('RowView', sync=True)
    
    context = Enum(bs.Context, sync=True)
    background = Enum(bs.Context, sync=True)


def _make_op(fmt="%s"):
    _sizes = ["extra_small", "small", "medium", "large"]
    
    def _op(self, other):
        for size in _sizes:
            if getattr(self, size) is not None:
                setattr(self, fmt % size, other)
        return self
    
    return _op

_MaybeInt = lambda: Int(None, allow_none=True, sync=True)

class Column(GridBase):
    # A container that lives in a Row
    _view_name = Unicode('ColumnView', sync=True)
    
    context = Enum(bs.Context, sync=True)
    background = Enum(bs.Context, sync=True)
    
    extra_small = _MaybeInt()
    small = _MaybeInt()
    medium = Int(1, allow_none=True, sync=True)
    large = _MaybeInt()
    
    offset_extra_small = _MaybeInt()
    offset_small = _MaybeInt()
    offset_medium = _MaybeInt()
    offset_large = _MaybeInt()
    
    push_extra_small = _MaybeInt()
    push_small = _MaybeInt()
    push_medium = _MaybeInt()
    push_large = _MaybeInt()
    
    pull_extra_small = _MaybeInt()
    pull_small = _MaybeInt()
    pull_medium = _MaybeInt()
    pull_large = _MaybeInt()
    
    __mul__ = _make_op()
    __add__ = _make_op("offset_%s")
    __gt__ = _make_op("push_%s")
    __lt__ = _make_op("pull_%s")
