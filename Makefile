SHELL	= /bin/sh

NAME	= unspash

all:
	cd srcs && docker compose up --build


down:
	cd srcs && docker compose down -v
stop:
	cd srcs && docker compose stop
logs:
	cd srcs && docker-compose logs -f

exec:
	docker exec -it nginx /bin/sh

.phony: all down stop logs exec
# .phony: all down stop logs prune routine reset certs postgres \
# 	gateway gateway_restart authentif authentif_restart \
# 	profileapi profileapi_restart calcgame blockchain \
# 	makemessages compilemessages
