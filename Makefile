up:
	docker-compose up -d

down:
	docker-compose down -v --remove-orphans

build:
	docker-compose build
	docker image prune --filter label=stage=builder -f