from checkio_referee import RefereeCodeGolf

import settings
import settings_env
from tests import TESTS

cover = """def cover(func, data):
    return func(set(tuple(x) for x in data))
"""


class Referee(RefereeCodeGolf):
    TESTS = TESTS
    DEFAULT_LENGTH = 200
    BASE_POINTS = 15
    EXECUTABLE_PATH = settings.EXECUTABLE_PATH
    CURRENT_ENV = settings_env.CURRENT_ENV
    FUNCTION_NAME = "golf"
    ENV_COVERCODE = {
        "python_2": cover,
        "python_3": cover,
        "javascript": None
    }
