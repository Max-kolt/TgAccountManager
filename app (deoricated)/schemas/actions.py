from pydantic import BaseModel


class ActionStartSchema(BaseModel):
    channel_link: str
    account_range: int
    mode: str
    bot_check: bool
    message_check: str
    answer_check: str
    boy_girl_ratio: int

