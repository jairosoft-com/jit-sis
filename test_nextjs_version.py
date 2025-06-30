import json
import os
import re

import pytest

PACKAGE_JSON_PATH = os.path.join(os.path.dirname(__file__), "package.json")


def get_nextjs_version():
    with open(PACKAGE_JSON_PATH, "r") as f:
        data = json.load(f)
    return data["dependencies"].get("next", "")


def test_nextjs_version_is_15():
    """
    This test asserts that the Next.js version in package.json starts with '15.'
    It should PASS if the version is 15.x.x.
    """
    version = get_nextjs_version()
    assert re.match(r"^15\.", version), f"Expected Next.js version to start with '15.', got '{version}'"
