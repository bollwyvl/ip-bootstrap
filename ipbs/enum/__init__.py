try:
    from . import enum3
    enum = enum3.enum
except SyntaxError:
    from . import enum2
    enum = enum2.enum