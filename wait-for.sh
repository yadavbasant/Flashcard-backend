#!/bin/sh

# wait-for.sh
# Usage: ./wait-for.sh host:port -- command-to-run
# Example: ./wait-for.sh kafka:9092 -- npm run start:dev

HOST_PORT=$1
shift
CMD="$@"

echo "Waiting for $HOST_PORT to be available..."

while ! nc -z $(echo $HOST_PORT | cut -d: -f1) $(echo $HOST_PORT | cut -d: -f2); do
  sleep 1
done

echo "$HOST_PORT is available. Starting command: $CMD"
exec $CMD
