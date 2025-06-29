import time
from datetime import datetime
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        response = await call_next(request)
        duration = time.time() - start_time

        print(
            f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] "
            f"{request.method} {request.url.path} - {response.status_code} - "
            f"{duration:.2f}s"
        )

        return response
