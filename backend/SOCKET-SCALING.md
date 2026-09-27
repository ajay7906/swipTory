# Realtime notifications

SwipTory stores each notification in MongoDB first, then emits `notification:new` to the authenticated recipient's private Socket.IO room (`user:<id>`). The REST inbox remains the source of truth; clients reload it after reconnecting, so a dropped socket does not lose notifications.

## One backend instance

Socket.IO runs on the same HTTP server as Express. No Redis service is required. The browser authenticates the socket handshake with its existing JWT; the server never accepts a client-selected room or recipient.

## Multiple backend instances

Set `REDIS_URL` on every instance and use a shared Redis service. The Redis adapter forwards room emissions between instances. Because this app supports Socket.IO's polling fallback, configure sticky sessions on the load balancer so each polling session stays on the same instance. If the deployment guarantees WebSocket support and you disable polling in both client and server, sticky sessions are not needed.

Socket transport uses WebSocket first and polling as a fallback. Reconnect uses bounded exponential backoff, notifications are deduplicated by ID in the client, and REST refresh catches up missed events.
