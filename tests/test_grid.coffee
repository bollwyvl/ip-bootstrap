casper.test.begin "Grid", ->
  casper.notebook_test ->
    @then ->
      @viewport 1024, 768
      @execute_cell @append_cell """
        from IPython.html import widgets
        from ipbs.widgets import (
            Container,
            Row,
            Column,
            Label
        )
        from ipbs import bootstrap as bs
        contexts = list(bs.Context)
        
        grid = Container(*[
            Row(Column(Label(context)) + i, background=context)
            for i in range(12)
            for context in [contexts[i % len(contexts)]]
        ])
        """, "code"
  
    @wait_for_idle()

    @then -> @execute_cell @append_cell "grid", "code"
    @wait_for_idle()

    @then ->
      @test.assertExists ".widget-area .container-fluid .row .col-md-1",
        "populated"
    
    @then -> @capturePadded "docs/img/Grid.png",
      ".widget-area .container-fluid"
