
import requests

import asyncio
import aiohttp
import time


URL = "https://student.ifda.in/api/v1/students"

TOTAL_REQUESTS = 100000
CONCURRENCY = 1000

success = 0
fail = 0
completed = 0

lock = asyncio.Lock()


async def send_request(session):
    global success, fail, completed

    try:
        async with session.get(URL) as resp:
            status = resp.status
    except Exception:
        status = None

    async with lock:
        completed += 1

        if status == 200:
            success += 1
        else:
            fail += 1

        if completed % 1000 == 0:
            print(
                f"Completed={completed}, Success={success}, Fail={fail}"
            )


async def main():
    connector = aiohttp.TCPConnector(limit=0)

    timeout = aiohttp.ClientTimeout(total=60)

    async with aiohttp.ClientSession(
        connector=connector,
        timeout=timeout
    ) as session:

        sem = asyncio.Semaphore(CONCURRENCY)

        async def bounded():
            async with sem:
                await send_request(session)

        tasks = [asyncio.create_task(bounded()) for _ in range(TOTAL_REQUESTS)]

        await asyncio.gather(*tasks)


start = time.time()
asyncio.run(main())

print("\nFINAL RESULT")
print("Completed:", completed)
print("Success:", success)
print("Fail:", fail)
print("Time:", time.time() - start)