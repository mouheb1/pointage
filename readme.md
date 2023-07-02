### Development
```bash
# 1. Install packages
yarn OR npm install

# 2. Run development server and open http://localhost:PORT
yarn dev OR npm run dev

# 3. Run tests
yarn test OR npm run test

# 4. Run development server and open http://localhost:PORT
yarn dev OR npm run dev

# 5. Read the APIs documentation linked below for "Setup and development".
http://localhost:PORT/api-docs
```

### Build

To build the App, run

```bash
# 1. Build the project
yarn build

# 2. run the docker

# 3. create docker image for the project
yarn docker:build

# 3. run the created docker image with port PORT ( URL: http://localhost:PORT )
yarn docker:run

```

And you will see the generated file in `dist` that ready to be served.
