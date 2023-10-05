
to install prisma and see the model:
sudo npm install prisma --save-dev
npx prisma init --datasource-provider sqlit
npx prisma migrate dev --name init
npx prisma studio