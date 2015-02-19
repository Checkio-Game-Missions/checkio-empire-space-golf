from checkio.referees.io import CheckiOReferee
from checkio import api



class CheckioRefereeGolf(CheckiOReferee):

    def __init__(self, max_length, **kwargs):
        self.max_length = max_length
        super().__init__(**kwargs)

    def check_current_test(self, data):
        if self.inspector:
            inspector_result, inspector_result_addon = self.inspector(self.code, self.runner)
            self.inspector = None
            self.current_test["inspector_result_addon"] = inspector_result_addon
            if not inspector_result:
                self.current_test["inspector_fail"] = True
                api.request_write_ext(self.current_test)
                return api.fail(0, inspector_result_addon)
        user_result = data['result']

        check_result = self.check_user_answer(user_result)
        self.current_test["result"], self.current_test["result_addon"] = check_result

        api.request_write_ext(self.current_test)

        if not self.current_test["result"]:
            return api.fail(self.current_step, self.get_current_test_fullname())

        if self.next_step():
            self.test_current_step()
        else:
            if self.next_env():
                self.restart_env()
            else:
                code_len = len(self.code)
                if code_len >= self.max_length:
                    message = "Your code is correct, but this is too long ({}) for any points".format(code_len)
                    self.current_test["inspector_result_addon"] = message
                    self.current_test["inspector_fail"] = True
                    api.request_write_ext(self.current_test)
                    return api.fail(0, message)
                else:
                    api.success(self.max_length - code_len)
