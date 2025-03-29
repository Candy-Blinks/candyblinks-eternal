# Use Node.js Alpine image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install pnpm manually
RUN npm install -g pnpm

ENV PNPM_ENABLE_PRE_POST_SCRIPTS=true
RUN pnpm approve-builds @prisma/client @prisma/engines argon2 esbuild prisma --help 

# Copy package.json and pnpm-lock.yaml before installing dependencies
COPY package.json pnpm-lock.yaml ./



# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile



# Copy the rest of the application files
COPY . .

RUN pnpm prisma generate

RUN pnpm run prisma:migrate

RUN pnpm run build


# Expose the necessary port (change if needed)
EXPOSE 9000

# Run the application
CMD ["pnpm", "run", "start"]
# 