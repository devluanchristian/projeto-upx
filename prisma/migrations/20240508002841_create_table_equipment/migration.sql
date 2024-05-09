-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL,
    "equipment" TEXT NOT NULL,
    "last_installation_date" TIMESTAMP(3),
    "next_installation_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);
