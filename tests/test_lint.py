import os

import subprocess


def main():
    child = subprocess.Popen(
        ["flake8", ".", "tests", "ipbs"],
        cwd=os.path.join(os.path.dirname(__file__), ".."))
    list(child.communicate())
    return child.returncode


def test_lint():
    assert main() == 0


if __name__ == "__main__":
    main()
