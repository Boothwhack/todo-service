FROM python

RUN mkdir /app
WORKDIR /app

# tilføj pyproject og installer dependencies
ADD pyproject.toml /app
RUN python -m venv .venv && \
    .venv/bin/pip install -e .

# python koden behøver ikke et build step
ADD src /app/src

EXPOSE 80
# kør uvicorn på host 0.0.0.0 så andre containere kan forbinde
ENTRYPOINT [ ".venv/bin/uvicorn", "--host", "0.0.0.0", "--port", "80", "--app-dir", "/app/src", "app:app" ]
