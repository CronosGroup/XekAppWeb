# XekAppWeb

## Deploy instructions
First run `npm run build` locally

Then create docker image using something like:
```sh
docker build --pull -f Dockerfile -t {tag}:{version} .
```

**IMPORTANT**: Gotta run the build locally first

## TODO
Create a decent automated build
