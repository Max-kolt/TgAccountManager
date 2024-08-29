import secrets
import string
import bcrypt


def generate_password(lenght: int = 8) -> str:
    symbols = string.ascii_letters+string.digits+"@$!"
    return "".join([secrets.choice(symbols) for i in range(lenght)])  # Random symbols choices


def hashing_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed_psw = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_psw.decode('utf-8')


def verify_password(password: str, hashed_password: str) -> bool:
    verify_result = bcrypt.checkpw(
        password.encode('utf-8'),
        hashed_password.encode('utf-8')
    )
    return verify_result


