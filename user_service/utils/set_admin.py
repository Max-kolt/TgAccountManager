from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from sqlalchemy.exc import IntegrityError
from database import async_session_maker
from .password import generate_password, hashing_password
from loguru import logger


async def set_admin():
    async with async_session_maker() as session:
        session: AsyncSession
        username = "DimaSmile"
        password = generate_password(14)

        try:
            result = await session.execute(text(
                f'INSERT INTO users_data.users (name, password, is_admin, use_func, create_users, manage_tg_accounts, '
                f'check_tg_msg, is_active) VALUES'
                f'  (:username, :password , true, true, true, true, true, true);'
            ), {'username': username, 'password': hashing_password(password)})

            await session.commit()
        except IntegrityError:
            logger.info(f"Admin already exists")
            return

        logger.info(f'Admin: "{username}" with password "{password}"')
