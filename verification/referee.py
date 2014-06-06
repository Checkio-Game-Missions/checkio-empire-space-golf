from checkio.signals import ON_CONNECT
from checkio import api
from checkio.referees import checkers
from golf import CheckioRefereeGolf

from tests import TESTS


cover = """def cover(f, data):
    return f(set(tuple(x) for x in data))"""

api.add_listener(
    ON_CONNECT,
    CheckioRefereeGolf(
        max_length=400,
        tests=TESTS,
        cover_code={
            'python-27': cover,
            'python-3': cover
        },
        checker=checkers.float_comparison(2),
        function_name="golf"
    ).on_ready)
