-- CreateTable
CREATE TABLE "admins" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "id_admin" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "colaborators" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lasttname" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "org_emitter" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "id_admin" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "colaborators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "colaborator_permission" (
    "id" SERIAL NOT NULL,
    "id_colaborator" INTEGER NOT NULL,
    "id_permission" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "colaborator_permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "types_stores" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "id_admin" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "types_stores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "typestore_store" (
    "id" SERIAL NOT NULL,
    "id_typestore" INTEGER NOT NULL,
    "id_store" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "typestore_store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specialities_stores" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "id_admin" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "specialities_stores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specialitiestore_store" (
    "id" SERIAL NOT NULL,
    "id_specstore_store" INTEGER NOT NULL,
    "id_store" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "specialitiestore_store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "owners" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "org_emitter" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "owners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stores" (
    "id" SERIAL NOT NULL,
    "persona_type" TEXT NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "display_name" TEXT,
    "delivery" BOOLEAN NOT NULL,
    "retire" BOOLEAN NOT NULL,
    "logo" TEXT,
    "cover" TEXT,
    "minimal_order" TEXT,
    "postal_code" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "instagram" TEXT,
    "facebook" TEXT,
    "whatsapp" TEXT,
    "isActive" BOOLEAN NOT NULL,
    "id_owner" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paymentsforservice" (
    "id" SERIAL NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "reference" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "id_store" INTEGER NOT NULL,
    "id_admin" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "paymentsforservice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "internal_categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "isActive" BOOLEAN NOT NULL,
    "id_owner" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "internal_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "internalstore_categorie" (
    "id" SERIAL NOT NULL,
    "id_store" INTEGER NOT NULL,
    "id_i_categorie" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "internalstore_categorie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments_methods" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "obs_method" TEXT,
    "id_owner" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments_stores" (
    "id" SERIAL NOT NULL,
    "id_store" INTEGER NOT NULL,
    "id_payment" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_stores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "price_promo" DECIMAL(65,30),
    "image" TEXT,
    "inPromotion" BOOLEAN NOT NULL,
    "avaliable" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products_categories" (
    "id" SERIAL NOT NULL,
    "id_categorie" INTEGER NOT NULL,
    "id_product" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "image" TEXT,
    "cpf" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders_client" (
    "id" SERIAL NOT NULL,
    "order_number" TEXT NOT NULL,
    "order_status" TEXT NOT NULL,
    "payment_status" TEXT NOT NULL,
    "obs_client" TEXT,
    "value" DECIMAL(65,30) NOT NULL,
    "store_id" INTEGER NOT NULL,
    "client_id" INTEGER NOT NULL,
    "payment_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders_products" (
    "id" SERIAL NOT NULL,
    "id_order" INTEGER NOT NULL,
    "id_product" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avaliations" (
    "id" SERIAL NOT NULL,
    "note" INTEGER NOT NULL,
    "comment" TEXT,
    "id_store" INTEGER NOT NULL,
    "id_order" INTEGER NOT NULL,
    "id_client" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "avaliations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorities_stores" (
    "id" SERIAL NOT NULL,
    "id_store" INTEGER NOT NULL,
    "id_client" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "favorities_stores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "avaliations_id_order_key" ON "avaliations"("id_order");

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_id_admin_fkey" FOREIGN KEY ("id_admin") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colaborators" ADD CONSTRAINT "colaborators_id_admin_fkey" FOREIGN KEY ("id_admin") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colaborator_permission" ADD CONSTRAINT "colaborator_permission_id_colaborator_fkey" FOREIGN KEY ("id_colaborator") REFERENCES "colaborators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colaborator_permission" ADD CONSTRAINT "colaborator_permission_id_permission_fkey" FOREIGN KEY ("id_permission") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "types_stores" ADD CONSTRAINT "types_stores_id_admin_fkey" FOREIGN KEY ("id_admin") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "typestore_store" ADD CONSTRAINT "typestore_store_id_typestore_fkey" FOREIGN KEY ("id_typestore") REFERENCES "types_stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "typestore_store" ADD CONSTRAINT "typestore_store_id_store_fkey" FOREIGN KEY ("id_store") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specialities_stores" ADD CONSTRAINT "specialities_stores_id_admin_fkey" FOREIGN KEY ("id_admin") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specialitiestore_store" ADD CONSTRAINT "specialitiestore_store_id_specstore_store_fkey" FOREIGN KEY ("id_specstore_store") REFERENCES "specialities_stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specialitiestore_store" ADD CONSTRAINT "specialitiestore_store_id_store_fkey" FOREIGN KEY ("id_store") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stores" ADD CONSTRAINT "stores_id_owner_fkey" FOREIGN KEY ("id_owner") REFERENCES "owners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentsforservice" ADD CONSTRAINT "paymentsforservice_id_store_fkey" FOREIGN KEY ("id_store") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentsforservice" ADD CONSTRAINT "paymentsforservice_id_admin_fkey" FOREIGN KEY ("id_admin") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "internal_categories" ADD CONSTRAINT "internal_categories_id_owner_fkey" FOREIGN KEY ("id_owner") REFERENCES "owners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "internalstore_categorie" ADD CONSTRAINT "internalstore_categorie_id_store_fkey" FOREIGN KEY ("id_store") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "internalstore_categorie" ADD CONSTRAINT "internalstore_categorie_id_i_categorie_fkey" FOREIGN KEY ("id_i_categorie") REFERENCES "internal_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments_methods" ADD CONSTRAINT "payments_methods_id_owner_fkey" FOREIGN KEY ("id_owner") REFERENCES "owners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments_stores" ADD CONSTRAINT "payments_stores_id_store_fkey" FOREIGN KEY ("id_store") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments_stores" ADD CONSTRAINT "payments_stores_id_payment_fkey" FOREIGN KEY ("id_payment") REFERENCES "payments_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_categories" ADD CONSTRAINT "products_categories_id_categorie_fkey" FOREIGN KEY ("id_categorie") REFERENCES "internal_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_categories" ADD CONSTRAINT "products_categories_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders_client" ADD CONSTRAINT "orders_client_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders_client" ADD CONSTRAINT "orders_client_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders_client" ADD CONSTRAINT "orders_client_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders_products" ADD CONSTRAINT "orders_products_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "orders_client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders_products" ADD CONSTRAINT "orders_products_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliations" ADD CONSTRAINT "avaliations_id_store_fkey" FOREIGN KEY ("id_store") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliations" ADD CONSTRAINT "avaliations_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "orders_client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliations" ADD CONSTRAINT "avaliations_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorities_stores" ADD CONSTRAINT "favorities_stores_id_store_fkey" FOREIGN KEY ("id_store") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorities_stores" ADD CONSTRAINT "favorities_stores_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
