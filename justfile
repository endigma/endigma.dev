build:
	pnpm build

deploy: build
	rsync -azh dist/* darlene:/home/end/services/caddy/data/srv/endigma.dev/
