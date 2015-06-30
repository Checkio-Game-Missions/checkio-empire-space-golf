from checkio_referee import RefereeCodeGolf, validators, ENV_NAME


import settings_env
from tests import TESTS

cover = """def cover(func, data):
    return func(set(tuple(x) for x in data))
"""

Validator = validators.FloatEqualValidator

Validator.PRECISION = 2

def py_repr(data, f):
    return "{}({})".format(f, set(tuple(x) for x in data["input"]))


class Referee(RefereeCodeGolf):
    TESTS = TESTS
    DEFAULT_MAX_CODE_LENGTH = 250
    BASE_POINTS = 10
    ENVIRONMENTS = settings_env.ENVIRONMENTS
    VALIDATOR = Validator
    DEFAULT_FUNCTION_NAME = "golf"
    ENV_COVERCODE = {
        ENV_NAME.PYTHON: cover,
    }
    CALLED_REPRESENTATIONS = {
        ENV_NAME.PYTHON: py_repr,
    }
