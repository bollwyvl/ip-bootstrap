def enum(**enums):
    class Enum(object):
        class __metaclass__(type):
            def __iter__(self):
                return enums.values().__iter__()

    [setattr(Enum, *en) for en in enums.items()]

    return Enum
