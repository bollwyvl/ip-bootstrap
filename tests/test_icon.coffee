casper.test.begin "Widget: Icon", ->
  casper.notebook_test ->
    @then ->
      @viewport 1024, 768
      @execute_cell @append_cell """
        from IPython.display import display
        from IPython.html import widgets
        from ipbs.widgets import Icon
        import ipbs.bootstrap as bs
        from ipbs.icons import FontAwesome
      
        fa = FontAwesome()
      
        icon = Icon(fa.space_shuttle.context_success.spin * 2)""", "code"
  
    @wait_for_idle()

    @then -> @execute_cell @append_cell "display(icon)", "code"

    @wait_for_idle()

    selector = ".widget-area .fa.fa-space-shuttle.fa-spin.fa-stack-2x"

    @then -> @test.assertExists selector, "... created"
    @then -> @capturePadded "docs/img/Icon.png", selector
