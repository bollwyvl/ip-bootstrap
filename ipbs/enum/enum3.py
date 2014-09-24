
# Various bootstrap constants and enums
def enum(**enums):
    """
    Make an iterable enumeration

    >>> Foo = enum(bar="bar")
    >>> Foo.bar
    'bar'
    >>> list(Foo)
    ['bar']

    """
    
    class MetaEnum(type):
        def __iter__(self):
            return enums.values().__iter__()

    class Enum(metaclass=MetaEnum):
        pass

    [setattr(Enum, *en) for en in enums.items()]
    
    return Enum