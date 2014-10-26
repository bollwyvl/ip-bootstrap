import glob
import os
import re

from IPython.testing import iptestcontroller

test_root = os.path.dirname(__file__)

tests = glob.glob(os.path.join(test_root, 'test_*.coffee')) + \
    glob.glob(os.path.join(test_root, 'test_*.js'))


class JSController(iptestcontroller.JSController):
    def __init__(self, section, xunit=True, engine='phantomjs', url=None):
        """Create new test runner."""
        iptestcontroller.TestController.__init__(self)

        self.engine = engine
        self.section = section
        self.xunit = xunit
        self.slimer_failure = re.compile('^FAIL.*', flags=re.MULTILINE)
        self.url = url

        ip_test_dir = iptestcontroller.get_js_test_dir()

        extras = [
            '--includes=' + ",".join([
                os.path.join(ip_test_dir, 'util.js'),
                os.path.join(test_root, 'util.coffee')
            ]),
            '--engine=%s' % self.engine
        ]

        self.cmd = ['casperjs', 'test'] + extras + tests


def main():
    controller = JSController("custom")
    exitcode = 1
    try:
        controller.setup()
        controller.launch(buffer_output=False)
        exitcode = controller.wait()
    except Exception as err:
        print(err)
        return 1
    finally:
        controller.cleanup()
    return exitcode


def test_widgets():
    assert main() == 0

if __name__ == '__main__':
    main()
