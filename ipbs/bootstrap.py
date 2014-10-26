from .enum import enum

Context = enum(**dict((name, name) for name in [
    "default",
    "primary",
    "success",
    "info",
    "warning",
    "danger",
    "link"
]))

Alignment = enum(**dict((name, name) for name in [
    "left",
    "center",
    "right",
    "justify",
    "nowrap"
]))

Transformation = enum(**dict((name, name) for name in [
    "lowercase",
    "uppercase",
    "capitalize"
]))

Size = enum(**{
    "default": None,
    "medium": "md",
    "small": "sm",
    "large": "lg",
    "extra_small": "xs"
})

Orientation = enum(**{
    "horizontal": "",
    "vertical": "-vertical"
})

Justification = enum(**{
    "default": None,
    "justified": "justified"
})
