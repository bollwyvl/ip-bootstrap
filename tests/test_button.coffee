casper.test.begin "Button", ->
  casper.notebook_test ->
    @then ->
      @viewport 1024, 768
      @execute_cell @append_cell """
        from ipbs.widgets import Button
        btn = Button(body="Text Label!")
        """, "code"
  
    @wait_for_idle()

    @then -> @execute_cell @append_cell "btn", "code"

    @wait_for_idle()

    @then ->
      @test.assertSelectorHasText ".widget-area .btn", "Text Label!",
        "... populated with label"
    
    @then -> @capturePadded "docs/img/Button.png", ".widget-area .btn"