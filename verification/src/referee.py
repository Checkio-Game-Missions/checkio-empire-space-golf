from checkio_referee import RefereeCodeGolf


import settings_env
from tests import TESTS

cover = """def cover(func, data):
    return func(set(tuple(x) for x in data))
"""


def py_repr(data, f):
    print(data)
    return "{}({})".format(f, set(tuple(x) for x in data["input"]))


class Referee(RefereeCodeGolf):
    TESTS = TESTS
    DEFAULT_MAX_CODE_LENGTH = 250
    BASE_POINTS = 10
    ENVIRONMENTS = settings_env.ENVIRONMENTS

    DEFAULT_FUNCTION_NAME = "golf"
    ENV_COVERCODE = {
        "python_2": cover,
        "python_3": cover,
        "javascript": None
    }
    CALLED_REPRESENTATIONS = {
        "python_2": py_repr,
        "python_3": py_repr,
        "javascript": None
    }
