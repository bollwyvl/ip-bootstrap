import os
import time

from IPython.html.nbextensions import install_nbextension
from IPython.display import display, Javascript

pkg_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
nbextension = os.path.basename(pkg_path)
static = os.path.join(pkg_path, 'static', nbextension)

class InstallerMixin(object):
    '''
    An opinonated mixin for handling static assets associated with IPython
    widgets
    '''

    def __init__(self, *args, **kwargs):
        '''
        Each time an instance is created:
        - copy ALL assets in `static` to the current profile's nbextensions
        - ensure that the view module has been required
        
        It also doesn't fix the race condition that can occur from a cell
        output being displayed that uses a widget before it has been required.

        This is inefficient, but can't be better until requirejs is used
        instead of WidgetManager.
        '''

        # copy the static files to a namespaced location in `nbextensions`
        install_nbextension(static, verbose=0)

        # strip off the namespace
        try:
            view_ns, view_name = self._view_name.split("/")
        except:
            raise Exception("%s did not match the pattern `namespace/view`" % (
                self._view_name
            ))

        # magically-named files js/SomeWidgetView.js and css/SomeWidgetView.css
        magic_module = os.path.join(static, 'js', '%s.js' % view_name) 
        magic_style = os.path.join(static, 'css', '%s.css' % view_name)

        view_module = None

        if os.path.exists(magic_module):
            view_module =  'js/%s' % view_name
        view_module = getattr(self, '_view_module', view_module)
        
        if view_module is None:
            raise Exception(
                'No JavaScript found for %(name)s: i.e. js/%(name)s.js' % {
                    "name": view_name
                })

        styles = getattr(self, '_view_styles', [])
        if os.path.exists(magic_style):
            styles.append('css/%s.css' % view_name)
        styles = [
            '/nbextensions/%s/%s' % (nbextension, style)
            for style in styles
        ]

        # tell the front-end to request the assets
        display(
            Javascript("""
                if(!("%s/%s" in IPython.WidgetManager._view_types)){
                    IPython.load_extensions("%s/%s");
                }
            """ % (
                nbextension, view_name,
                nbextension, view_module
            ), css=styles)
        )

        # always call the parent constructor!
        super(InstallerMixin, self).__init__(*args, **kwargs)