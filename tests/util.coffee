casper.capturePadded = (file, sel, amt=10) ->
  @viewport 1024, 768
  get = (sel) -> 
    node = document.querySelector sel
    node.getBoundingClientRect()

  {top, left, width, height} = @evaluate get, sel
  
  @capture file, 
    top: top
    left: left
    width: width + amt
    height: height + amt
