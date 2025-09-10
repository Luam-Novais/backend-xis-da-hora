-- CreateTable
CREATE TABLE "public"."Clients" (
    "user_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "password" VARCHAR(20) NOT NULL,

    CONSTRAINT "Clients_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."Products" (
    "product_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "price" MONEY NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("product_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clients_username_key" ON "public"."Clients"("username");
